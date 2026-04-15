'use client';
import { useState } from 'react';
import { playGerman } from '../utils/speech';

// This tells TypeScript what our lesson data looks like
interface LessonProps {
  lesson: {
    fr: string;
    en: string;
    category: string;
  };
}

export default function Flashcard({ lesson }: LessonProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div 
      className="group h-64 w-full [perspective:1000px] cursor-pointer"
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <div className={`relative h-full w-full rounded-2xl shadow-2xl transition-all duration-500 [transform-style:preserve-3d] ${isFlipped ? '[transform:rotateY(180deg)]' : ''}`}>
        
        {/* Front: French Side */}
        <div className="absolute inset-0 flex flex-col items-center justify-center rounded-2xl bg-zinc-900 border border-zinc-800 hover:border-blue-500 transition-colors text-white [backface-visibility:hidden]">
          <span className="text-[10px] text-blue-500 font-bold tracking-[0.2em] mb-3 uppercase">{lesson.category}</span>
          <h2 className="text-3xl font-bold mb-6 tracking-tight">{lesson.fr}</h2>
          <button 
            onClick={(e) => { e.stopPropagation(); playFrench(lesson.fr); }}
            className="w-12 h-12 flex items-center justify-center bg-white/5 rounded-full hover:bg-blue-600 transition-all group-hover:scale-110"
          >
            🔊
          </button>
        </div>

        {/* Back: English Side */}
        <div className="absolute inset-0 flex flex-col items-center justify-center rounded-2xl bg-blue-600 text-white [transform:rotateY(180deg)] [backface-visibility:hidden] p-8 text-center">
          <h2 className="text-2xl font-bold mb-2">{lesson.en}</h2>
          <p className="text-blue-200 text-xs italic">Click to flip back</p>
        </div>
      </div>
    </div>
  );
}
{/* Front Side bottom hint */}
<div className="absolute bottom-4 text-[9px] text-zinc-600 font-bold uppercase tracking-widest">
  Click to Translate →
</div>