import React from 'react';
import { VideoLink } from '../types';

interface LessonContentProps {
  content: string;
  videoLinks?: VideoLink[];
}

export const LessonContent: React.FC<LessonContentProps> = ({ content, videoLinks }) => {
  // Improved simple renderer that handles code blocks roughly
  const parts = content.split('```');
  
  return (
    <div className="prose prose-invert max-w-none">
      {/* Content Rendering */}
      {parts.map((part, index) => {
        if (index % 2 === 1) {
          // Code block
          let language = 'text';
          let code = part;
          if (part.startsWith('python')) {
            language = 'python';
            code = part.replace('python', '');
          }
          return (
            <div key={index} className="my-6 bg-slate-900 rounded-lg border border-slate-800 overflow-hidden shadow-lg">
                <div className="px-4 py-2 bg-slate-800/50 text-xs text-slate-400 font-mono border-b border-slate-700 uppercase flex justify-between items-center">
                    <span>{language}</span>
                    <div className="flex gap-1.5">
                        <div className="w-2.5 h-2.5 rounded-full bg-slate-600"></div>
                        <div className="w-2.5 h-2.5 rounded-full bg-slate-600"></div>
                    </div>
                </div>
                <pre className="p-5 overflow-x-auto text-sm text-green-400 font-mono leading-relaxed">
                    {code.trim()}
                </pre>
            </div>
          );
        } else {
          // Regular text (with simple header parsing)
          return (
            <div key={index}>
                {part.split('\n').map((line, i) => {
                    const trimmed = line.trim();
                    if (trimmed.startsWith('# ')) return <h2 key={i} className="text-3xl font-extrabold text-white mt-10 mb-6 pb-2 border-b border-slate-800">{trimmed.replace('# ', '')}</h2>;
                    if (trimmed.startsWith('## ')) return <h3 key={i} className="text-2xl font-bold text-slate-100 mt-8 mb-4">{trimmed.replace('## ', '')}</h3>;
                    if (trimmed.startsWith('* ')) return <li key={i} className="ml-5 list-disc text-slate-300 mb-2 pl-1 marker:text-blue-500">{trimmed.replace('* ', '')}</li>;
                    if (trimmed === '') return <div key={i} className="h-2"></div>;
                    
                    // Simple bold parse
                    const boldRegex = /\*\*(.*?)\*\*/g;
                    const parts = line.split(boldRegex);
                    if (parts.length > 1) {
                        return <p key={i} className="text-slate-300 mb-4 leading-relaxed text-lg">
                            {parts.map((p, pi) => pi % 2 === 1 ? <strong key={pi} className="text-blue-300 font-bold bg-blue-900/20 px-1 rounded">{p}</strong> : p)}
                        </p>
                    }
                    
                    return <p key={i} className="text-slate-300 mb-4 leading-relaxed text-lg">{line}</p>;
                })}
            </div>
          );
        }
      })}

      {/* Video Links Section */}
      {videoLinks && videoLinks.length > 0 && (
          <div className="mt-12 mb-8 pt-8 border-t border-slate-800">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <span className="text-red-500">📺</span> Видео материалы по теме
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {videoLinks.map((video, idx) => (
                      <a 
                        key={idx}
                        href={video.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-4 p-4 rounded-xl bg-slate-800 border border-slate-700 hover:bg-slate-700 hover:border-slate-600 hover:shadow-lg transition-all group"
                      >
                          <div className="w-10 h-10 rounded-full bg-red-500/10 flex items-center justify-center flex-shrink-0 group-hover:bg-red-500/20 transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                            </svg>
                          </div>
                          <div>
                              <p className="font-medium text-slate-200 text-sm group-hover:text-white">{video.title}</p>
                              <p className="text-xs text-slate-500 mt-0.5">Смотреть на YouTube ↗</p>
                          </div>
                      </a>
                  ))}
              </div>
          </div>
      )}
    </div>
  );
};