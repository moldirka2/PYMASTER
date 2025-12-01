import React, { useState } from 'react';
import { CodeCheckResult } from '../types';

interface EditorProps {
  code: string;
  onChange: (code: string) => void;
  onRun: () => void;
  isChecking: boolean;
  result: CodeCheckResult | null;
  task: string;
}

export const Editor: React.FC<EditorProps> = ({ code, onChange, onRun, isChecking, result, task }) => {
  return (
    <div className="flex flex-col h-full bg-slate-900 rounded-xl overflow-hidden border border-slate-700 shadow-xl">
      {/* Toolbar */}
      <div className="bg-slate-800 p-3 flex justify-between items-center border-b border-slate-700">
        <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <span className="ml-2 text-xs text-slate-400 font-mono">main.py</span>
        </div>
        <button
          onClick={onRun}
          disabled={isChecking}
          className={`px-4 py-1.5 rounded text-sm font-semibold transition-all flex items-center gap-2 ${
            isChecking
              ? 'bg-slate-600 text-slate-400 cursor-not-allowed'
              : 'bg-green-600 hover:bg-green-500 text-white hover:shadow-lg hover:shadow-green-500/20'
          }`}
        >
          {isChecking ? (
            <>
                <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Проверка...
            </>
          ) : (
            <>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                </svg>
                Запустить
            </>
          )}
        </button>
      </div>

      {/* Code Input */}
      <div className="flex-1 relative font-mono text-sm">
        <textarea
          value={code}
          onChange={(e) => onChange(e.target.value)}
          className="w-full h-full bg-slate-900 text-slate-300 p-4 resize-none outline-none focus:ring-0 leading-6"
          spellCheck={false}
          placeholder="# Пишите код здесь..."
        />
      </div>

      {/* Task Description Panel (Sticky bottom of editor) */}
      <div className="bg-slate-800 border-t border-slate-700 p-4">
          <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Задание</h4>
          <p className="text-sm text-slate-200">{task}</p>
      </div>

      {/* Output Console */}
      <div className={`transition-all duration-300 ease-in-out border-t border-slate-700 ${result ? 'h-48' : 'h-0'} overflow-hidden bg-black`}>
        {result && (
          <div className="h-full p-4 overflow-y-auto font-mono text-sm">
            <div className="flex justify-between items-start mb-2">
                <span className="text-xs text-slate-500 uppercase">Консоль</span>
                <span className={`text-xs px-2 py-0.5 rounded ${result.isCorrect ? 'bg-green-900 text-green-300' : 'bg-red-900 text-red-300'}`}>
                    {result.isCorrect ? 'Верно' : 'Ошибка'}
                </span>
            </div>
            
            <div className="mb-4">
                <span className="text-slate-500">$ python main.py</span>
                <pre className="text-white mt-1 whitespace-pre-wrap">{result.output}</pre>
            </div>

            <div className={`p-3 rounded border ${result.isCorrect ? 'border-green-800 bg-green-900/20' : 'border-red-800 bg-red-900/20'}`}>
                <p className={`${result.isCorrect ? 'text-green-400' : 'text-red-400'}`}>
                    AI Feedback: {result.feedback}
                </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};