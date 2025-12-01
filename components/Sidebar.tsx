import React from 'react';
import { Lesson, ViewState } from '../types';

interface SidebarProps {
  lessons: Lesson[];
  currentLessonId: string;
  onSelectLesson: (lesson: Lesson) => void;
  isOpen: boolean;
  toggleSidebar: () => void;
  currentView: ViewState;
  onSelectView: (view: ViewState) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ 
    lessons, 
    currentLessonId, 
    onSelectLesson, 
    isOpen, 
    toggleSidebar,
    currentView,
    onSelectView
}) => {
  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-60 z-20 md:hidden backdrop-blur-sm"
          onClick={toggleSidebar}
        />
      )}

      <div className={`fixed inset-y-0 left-0 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 md:static md:flex-shrink-0 w-72 bg-slate-900 border-r border-slate-800 transition-transform duration-200 ease-in-out z-30 flex flex-col shadow-2xl md:shadow-none`}>
        <div className="p-6 border-b border-slate-800 flex items-center justify-between bg-slate-900/50">
          <h1 className="text-xl font-bold text-white flex items-center gap-3">
            <span className="text-2xl bg-blue-600 rounded-lg p-1">🐍</span> 
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">PyMaster</span>
          </h1>
          <button onClick={toggleSidebar} className="md:hidden text-slate-400 hover:text-white">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto p-4 space-y-6">
            
          {/* Main Navigation */}
          <div>
              <h2 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3 px-2">Обучение</h2>
              <div className="space-y-1">
                {lessons.map((lesson) => (
                    <button
                    key={lesson.id}
                    onClick={() => {
                        onSelectView('LESSON');
                        onSelectLesson(lesson);
                        if (window.innerWidth < 768) toggleSidebar();
                    }}
                    className={`w-full text-left px-3 py-2.5 rounded-lg transition-all duration-200 flex items-center gap-3 group ${
                        currentView === 'LESSON' && currentLessonId === lesson.id
                        ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/40'
                        : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                    }`}
                    >
                        <span className={`w-6 text-center text-sm ${currentView === 'LESSON' && currentLessonId === lesson.id ? 'opacity-100' : 'opacity-50 group-hover:opacity-100'}`}>
                            {lesson.id === 'intro' ? '👋' : 
                             lesson.id === 'variables' ? '📦' :
                             lesson.id === 'math' ? '🧮' :
                             lesson.id === 'strings' ? '📜' :
                             lesson.id === 'conditions' ? '🔀' : '🔁'}
                        </span>
                        <span className="text-sm font-medium truncate">{lesson.title}</span>
                    </button>
                ))}
              </div>
          </div>

          {/* Resources */}
          <div>
            <h2 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3 px-2">Ресурсы</h2>
            <button
                onClick={() => {
                    onSelectView('GLOSSARY');
                    if (window.innerWidth < 768) toggleSidebar();
                }}
                className={`w-full text-left px-3 py-2.5 rounded-lg transition-all duration-200 flex items-center gap-3 ${
                    currentView === 'GLOSSARY'
                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-900/40'
                    : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                }`}
            >
                <span className="text-lg">📚</span>
                <span className="text-sm font-medium">Глоссарий</span>
            </button>
          </div>

        </nav>
        
        <div className="p-4 border-t border-slate-800 bg-slate-900/50">
            <div className="text-xs text-slate-500 text-center flex items-center justify-center gap-1">
               <span>⚡</span> Powered by Gemini 2.5
            </div>
        </div>
      </div>
    </>
  );
};