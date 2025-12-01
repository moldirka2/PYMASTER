import React, { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { LessonContent } from './components/LessonContent';
import { Editor } from './components/Editor';
import { AiTutor } from './components/AiTutor';
import { Glossary } from './components/Glossary';
import { lessons } from './data/lessons';
import { glossaryTerms } from './data/glossary';
import { Lesson, CodeCheckResult, ChatMessage, TabState, ViewState } from './types';
import { checkUserCode, getAiTutorResponse } from './services/geminiService';

const App: React.FC = () => {
  const [currentLesson, setCurrentLesson] = useState<Lesson>(lessons[0]);
  const [userCode, setUserCode] = useState<string>(lessons[0].initialCode);
  const [checkResult, setCheckResult] = useState<CodeCheckResult | null>(null);
  const [isChecking, setIsChecking] = useState<boolean>(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<TabState>(TabState.THEORY);
  const [currentView, setCurrentView] = useState<ViewState>('LESSON');
  
  // Chat state
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [isChatLoading, setIsChatLoading] = useState<boolean>(false);
  const [showChat, setShowChat] = useState<boolean>(false);

  useEffect(() => {
    // Reset state when lesson changes
    if (currentView === 'LESSON') {
        setUserCode(currentLesson.initialCode);
        setCheckResult(null);
        setChatMessages([]);
    }
  }, [currentLesson, currentView]);

  const handleRunCode = async () => {
    if (isChecking) return;
    setIsChecking(true);
    setCheckResult(null);

    const result = await checkUserCode(currentLesson.task, userCode);
    
    setCheckResult(result);
    setIsChecking(false);
  };

  const handleSendMessage = async (text: string) => {
    const newUserMsg: ChatMessage = { role: 'user', text };
    const updatedHistory = [...chatMessages, newUserMsg];
    
    setChatMessages(updatedHistory);
    setIsChatLoading(true);

    const context = currentView === 'LESSON' 
        ? `Lesson: ${currentLesson.title}. Theory: ${currentLesson.content}. User Code: ${userCode}` 
        : `Student is viewing the Glossary. Available terms: ${glossaryTerms.map(t => t.term).join(', ')}`;

    const responseText = await getAiTutorResponse(updatedHistory, context);

    setChatMessages(prev => [...prev, { role: 'model', text: responseText }]);
    setIsChatLoading(false);
  };

  return (
    <div className="flex h-screen bg-slate-950 overflow-hidden font-sans text-slate-200">
      
      {/* Sidebar */}
      <Sidebar 
        lessons={lessons}
        currentLessonId={currentLesson.id}
        onSelectLesson={(l) => {
          setCurrentLesson(l);
          if (window.innerWidth < 1024) setIsSidebarOpen(false);
        }}
        isOpen={isSidebarOpen}
        toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        currentView={currentView}
        onSelectView={setCurrentView}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-full w-full relative">
        
        {/* Mobile Header */}
        <div className="md:hidden bg-slate-900 border-b border-slate-800 p-4 flex items-center justify-between z-20">
           <button onClick={() => setIsSidebarOpen(true)} className="text-slate-300">
             <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
             </svg>
           </button>
           <span className="font-bold text-white truncate px-2">
               {currentView === 'LESSON' ? currentLesson.title : 'Глоссарий'}
           </span>
           <button 
             onClick={() => setShowChat(!showChat)}
             className={`p-2 rounded-full ${showChat ? 'bg-blue-600 text-white' : 'text-slate-400'}`}
           >
              🤖
           </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 flex overflow-hidden">
            
            {/* View Switching Logic */}
            {currentView === 'GLOSSARY' ? (
                <div className="flex-1 flex overflow-hidden">
                    <Glossary terms={glossaryTerms} />
                    {/* Chat side panel optional for glossary, but good to have */}
                     <div className={`
                        ${showChat ? 'w-80 border-l border-slate-800' : 'w-0 opacity-0 overflow-hidden'} 
                        transition-all duration-300 hidden lg:flex flex-col bg-slate-900
                    `}>
                        <div className="flex-1 p-4 flex flex-col h-full">
                            <AiTutor 
                                messages={chatMessages}
                                onSendMessage={handleSendMessage}
                                isLoading={isChatLoading}
                            />
                        </div>
                    </div>
                     {/* Mobile Chat Overlay for Glossary */}
                     {showChat && (
                         <div className="lg:hidden absolute inset-0 z-30 bg-slate-900 p-4">
                             <button onClick={() => setShowChat(false)} className="absolute top-2 right-2 text-slate-400">✖</button>
                             <AiTutor messages={chatMessages} onSendMessage={handleSendMessage} isLoading={isChatLoading} />
                         </div>
                     )}
                </div>
            ) : (
                /* LESSON VIEW (Split Screen) */
                <>
                    {/* Left/Top Panel: Theory (Responsive split) */}
                    <div className={`flex-1 overflow-y-auto p-6 md:p-8 lg:w-1/2 lg:flex-none w-full bg-slate-950 custom-scrollbar ${activeTab === TabState.THEORY ? 'block' : 'hidden lg:block'}`}>
                        <div className="max-w-3xl mx-auto">
                            <div className="mb-8">
                                <span className="text-xs font-bold tracking-wider text-blue-500 uppercase">Урок</span>
                                <h1 className="text-3xl md:text-4xl font-extrabold text-white mt-2 mb-4">{currentLesson.title}</h1>
                                <p className="text-lg text-slate-400 leading-relaxed">{currentLesson.description}</p>
                            </div>
                            
                            <LessonContent 
                                content={currentLesson.content} 
                                videoLinks={currentLesson.videoLinks}
                            />

                            <div className="mt-12 p-6 rounded-xl bg-gradient-to-r from-blue-900/10 to-indigo-900/10 border border-blue-500/20 shadow-lg">
                                <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
                                    <span>🚀</span> Задание
                                </h3>
                                <p className="text-slate-300">{currentLesson.task}</p>
                            </div>
                            
                            <div className="h-24 lg:hidden"></div> {/* Spacer for mobile fab */}
                        </div>
                    </div>

                    {/* Right/Bottom Panel: Editor & Chat */}
                    <div className={`flex-1 flex flex-col bg-slate-900 border-l border-slate-800 ${activeTab === TabState.PRACTICE ? 'block absolute inset-0 z-10 lg:static' : 'hidden lg:flex'}`}>
                        <div className="flex-1 p-4 relative h-full flex flex-col gap-4">
                            
                            {/* Mobile Tabs for Editor View */}
                            <div className="lg:hidden absolute top-4 left-4 z-20 flex bg-slate-800 rounded-lg p-1 border border-slate-700 shadow-lg">
                                <button 
                                    onClick={() => setActiveTab(TabState.THEORY)}
                                    className="px-3 py-1 text-xs font-bold rounded text-slate-400 hover:text-white"
                                >
                                    Теория
                                </button>
                                <button 
                                    onClick={() => setActiveTab(TabState.PRACTICE)}
                                    className="px-3 py-1 text-xs font-bold rounded bg-blue-600 text-white shadow"
                                >
                                    Практика
                                </button>
                            </div>

                            <div className={`${showChat ? 'h-1/2' : 'h-full'} transition-all duration-300`}>
                                <Editor 
                                    code={userCode}
                                    onChange={setUserCode}
                                    onRun={handleRunCode}
                                    isChecking={isChecking}
                                    result={checkResult}
                                    task={currentLesson.task}
                                />
                            </div>

                            {/* Chat Panel - Collapsible */}
                            <div className={`
                                ${showChat ? 'flex-1 min-h-0 opacity-100' : 'h-0 opacity-0 overflow-hidden'} 
                                transition-all duration-300 flex flex-col
                            `}>
                                <AiTutor 
                                    messages={chatMessages}
                                    onSendMessage={handleSendMessage}
                                    isLoading={isChatLoading}
                                />
                            </div>
                        </div>

                        {/* Desktop Toggle Chat Button */}
                        <div className="hidden lg:flex h-12 bg-slate-900 border-t border-slate-800 items-center justify-between px-4">
                            <span className="text-xs text-slate-600 font-medium">Gemini 2.5 Flash API</span>
                            <button 
                                onClick={() => setShowChat(!showChat)}
                                className={`text-sm font-medium px-4 py-1.5 rounded-lg transition-all flex items-center gap-2 ${showChat ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/30' : 'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white'}`}
                            >
                            <span>{showChat ? 'Скрыть наставника' : 'Задать вопрос AI'}</span>
                            {!showChat && <span>🤖</span>}
                            </button>
                        </div>
                    </div>
                </>
            )}

        </div>

        {/* Mobile FAB to toggle Practice/Theory if not in sidebar (Only visible in LESSON view) */}
        {currentView === 'LESSON' && (
            <div className="lg:hidden fixed bottom-6 right-6 flex flex-col gap-4 z-50">
                {activeTab === TabState.THEORY ? (
                    <button 
                        onClick={() => setActiveTab(TabState.PRACTICE)}
                        className="bg-blue-600 text-white p-4 rounded-full shadow-xl shadow-blue-900/50 hover:bg-blue-500 transition-transform hover:scale-105 active:scale-95"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                        </svg>
                    </button>
                ) : (
                    <button 
                        onClick={() => setActiveTab(TabState.THEORY)}
                        className="bg-slate-700 text-white p-4 rounded-full shadow-xl hover:bg-slate-600 transition-transform hover:scale-105 active:scale-95"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                    </button>
                )}
            </div>
        )}
      </div>
    </div>
  );
};

export default App;