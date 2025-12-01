import { GoogleGenAI, Type } from "@google/genai";
import { CodeCheckResult, ChatMessage } from "../types";

const checkApiKey = () => {
    if (!process.env.API_KEY) {
        console.error("API_KEY is missing. Code checking and AI features will not work.");
        return false;
    }
    return true;
};

export const checkUserCode = async (taskDescription: string, userCode: string): Promise<CodeCheckResult> => {
  if (!checkApiKey()) {
      return {
          isCorrect: false,
          feedback: "API Key не найден. Проверка невозможна.",
          output: "Error"
      };
  }

  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  const prompt = `
    Task: ${taskDescription}
    User Code:
    ${userCode}

    Analyze the user's Python code based on the task.
    1. Determine if the code correctly solves the task.
    2. Provide a short, constructive feedback message in Russian.
    3. IMPORTANT: If the code is incorrect, your feedback MUST include a "hint" (подсказку) that guides the user to the correct solution without giving the full answer immediately.
    4. Simulate the output of the code if it runs successfully, or show the error message.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            isCorrect: { type: Type.BOOLEAN },
            feedback: { type: Type.STRING },
            output: { type: Type.STRING }
          },
          required: ["isCorrect", "feedback"]
        }
      }
    });

    const result = JSON.parse(response.text || "{}");
    return {
        isCorrect: result.isCorrect,
        feedback: result.feedback,
        output: result.output || ""
    };

  } catch (error) {
    console.error("Gemini Code Check Error:", error);
    return {
      isCorrect: false,
      feedback: "Произошла ошибка при проверке кода. Попробуйте позже.",
      output: "Error connecting to AI service."
    };
  }
};

export const getAiTutorResponse = async (history: ChatMessage[], currentLessonContext: string): Promise<string> => {
    if (!checkApiKey()) return "API Key не сконфигурирован.";

    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    const systemInstruction = `Ты дружелюбный и терпеливый учитель программирования Python для начинающих. 
    Отвечай на русском языке. Используй Markdown для форматирования кода.
    Текущий контекст урока: ${currentLessonContext}.
    Не давай сразу готовых решений заданий, а наводи ученика на мысль (давай подсказки).
    Если ученик спрашивает про видео уроки, посоветуй искать каналы "Python Today", "Гоша Дударь" или "Тимофей Хирьянов".`;

    try {
        const chat = ai.chats.create({
            model: 'gemini-2.5-flash',
            config: {
                systemInstruction: systemInstruction,
            },
            history: history.slice(0, -1).map(msg => ({
                role: msg.role,
                parts: [{ text: msg.text }]
            }))
        });

        const lastMessage = history[history.length - 1];
        const result = await chat.sendMessage({ message: lastMessage.text });
        return result.text || "Извините, я не смог сформировать ответ.";

    } catch (error) {
        console.error("Gemini Chat Error:", error);
        return "Произошла ошибка связи с учителем.";
    }
};