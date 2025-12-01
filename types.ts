export interface VideoLink {
  title: string;
  url: string;
}

export interface Lesson {
  id: string;
  title: string;
  description: string;
  content: string; // Markdown-like theory
  initialCode: string;
  task: string;
  solutionExample?: string;
  videoLinks?: VideoLink[];
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

export interface CodeCheckResult {
  isCorrect: boolean;
  feedback: string;
  output?: string;
}

export enum TabState {
  THEORY = 'THEORY',
  PRACTICE = 'PRACTICE'
}

export interface GlossaryTerm {
  id: string;
  term: string;
  definition: string;
  example: string;
}

export type ViewState = 'LESSON' | 'GLOSSARY';