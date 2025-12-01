import React, { useState } from 'react';
import { GlossaryTerm } from '../types';

interface GlossaryProps {
  terms: GlossaryTerm[];
}

export const Glossary: React.FC<GlossaryProps> = ({ terms }) => {
  const [search, setSearch] = useState('');

  const filteredTerms = terms.filter(t => 
    t.term.toLowerCase().includes(search.toLowerCase()) || 
    t.definition.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 md:p-8 max-w-5xl mx-auto w-full h-full overflow-y-auto custom-scrollbar">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-white mb-4 flex items-center gap-3">
            <span className="text-4xl">📚</span> Глоссарий Python
        </h1>
        <p className="text-slate-400 mb-6 text-lg">Справочник ключевых терминов, которые должен знать каждый начинающий программист.</p>
        
        <div className="relative max-w-xl">
          <input
            type="text"
            placeholder="Поиск термина (например, 'Цикл')..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-slate-900 border border-slate-700 text-white rounded-xl px-5 py-3 pl-12 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all shadow-lg placeholder-slate-500"
          />
          <svg className="w-5 h-5 text-slate-500 absolute left-4 top-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-20">
        {filteredTerms.map(term => (
          <div key={term.id} className="bg-slate-900 border border-slate-800 rounded-xl p-6 hover:border-blue-500/50 transition-colors shadow-sm flex flex-col">
            <h3 className="text-xl font-bold text-blue-400 mb-3">{term.term}</h3>
            <p className="text-slate-300 mb-5 leading-relaxed flex-grow">{term.definition}</p>
            <div className="bg-slate-950 rounded-lg p-4 border border-slate-800 mt-auto">
              <span className="text-xs text-slate-500 uppercase font-bold tracking-wider block mb-2">Пример:</span>
              <pre className="text-green-400 font-mono text-sm whitespace-pre-wrap overflow-x-auto">{term.example}</pre>
            </div>
          </div>
        ))}
        {filteredTerms.length === 0 && (
            <div className="col-span-full text-center py-20 text-slate-500">
                <p className="text-xl">Ничего не найдено</p>
                <p className="text-sm mt-2">Попробуйте изменить запрос</p>
            </div>
        )}
      </div>
    </div>
  );
};