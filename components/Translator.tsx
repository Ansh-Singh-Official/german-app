'use client';
import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';

export default function TranslatorPage() {
  const [text, setText] = useState('');
  const [translated, setTranslated] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  // 1. THE TRANSLATION LOGIC (MEMOIZED)
  const handleTranslate = useCallback(async () => {
    if (!text.trim()) return;
    
    setLoading(true);
    setError(false);
    
    try {
      // Using MyMemory API with forced English to German pair
      const res = await fetch(
        `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text.trim())}&langpair=en|de`
      );
      const data = await res.json();
      
      if (data.responseData) {
        setTranslated(data.responseData.translatedText);
      } else {
        setError(true);
      }
    } catch (err) {
      setError(true);
    } finally {
      setLoading(false);
    }
  }, [text]);

  // 2. KEYBOARD LISTENER (Enter Key)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault(); // Prevents new line in textarea
        handleTranslate();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleTranslate]);

  const speak = (phrase: string) => {
    window.speechSynthesis.cancel();
    const speech = new SpeechSynthesisUtterance(phrase);
    speech.lang = 'de-DE';
    speech.rate = 0.9;
    window.speechSynthesis.speak(speech);
  };

  return (
    <main className="min-h-screen bg-[#050505] text-white selection:bg-blue-500/30 font-sans">
      {/* GLOW DECOR */}
      <div className="fixed top-0 right-0 w-[500px] h-[500px] bg-blue-600/5 blur-[120px] pointer-events-none" />
      
      <div className="max-w-4xl mx-auto px-6 py-12 md:py-20">
        
        {/* HEADER */}
        <header className="mb-12 flex justify-between items-end">
          <div>
            <h1 className="text-6xl md:text-8xl font-black italic tracking-tighter">
              TRANS<span className="text-blue-600">LATE.</span>
            </h1>
          </div>
          <div className="text-right hidden md:block">
            <p className="text-zinc-700 text-[10px] font-mono uppercase tracking-widest">Language: EN_DE</p>
            <p className="text-zinc-700 text-[10px] font-mono uppercase tracking-widest">Status: Ready</p>
          </div>
        </header>

        {/* INPUT BOX */}
        <div className="relative mb-8 group">
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-600/20 to-transparent rounded-[2rem] blur group-focus-within:opacity-100 opacity-0 transition duration-500" />
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter English text... (Press Enter to Translate)"
            className="relative w-full bg-zinc-900/40 border border-zinc-800 rounded-[2rem] p-8 md:p-12 text-2xl md:text-4xl font-light outline-none focus:border-blue-500/50 transition-all h-64 md:h-80 resize-none backdrop-blur-xl placeholder:text-zinc-800"
          />
          <div className="absolute bottom-6 right-8 flex items-center gap-4">
             <span className="text-zinc-600 text-[10px] font-bold tracking-widest hidden md:block">PRESS ENTER ↵</span>
             <button 
               onClick={handleTranslate}
               disabled={loading}
               className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-3 rounded-full font-black text-[10px] tracking-widest uppercase transition-all active:scale-95 disabled:opacity-50 shadow-xl shadow-blue-600/20"
             >
               {loading ? 'Thinking...' : 'Process'}
             </button>
          </div>
        </div>

        {/* OUTPUT BOX */}
        <div className="min-h-[200px]">
          {translated && (
            <div className="bg-gradient-to-br from-blue-600 to-blue-700 p-1 rounded-[2.5rem] animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="bg-[#050505] rounded-[2.4rem] p-10 md:p-16 relative overflow-hidden">
                {/* Visual Accent */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rotate-45 translate-x-16 -translate-y-16" />
                
                <p className="text-blue-500 text-[10px] font-black tracking-[0.5em] uppercase mb-6">German Interpretation</p>
                <h2 className="text-4xl md:text-6xl font-bold leading-tight mb-10 text-white italic">
                  {translated}
                </h2>
                
                <button 
                  onClick={() => speak(translated)}
                  className="group flex items-center gap-4 bg-zinc-900 hover:bg-white transition-all px-8 py-4 rounded-2xl border border-zinc-800 shadow-2xl"
                >
                  <span className="text-2xl group-hover:scale-110 transition-transform">🔊</span>
                  <span className="text-[10px] font-black text-zinc-500 group-hover:text-black tracking-widest uppercase">Listen to Pronunciation</span>
                </button>
              </div>
            </div>
          )}

          {error && (
            <div className="text-center p-12 border border-dashed border-zinc-900 rounded-[2.5rem]">
              <p className="text-zinc-700 font-mono text-sm tracking-widest uppercase italic">System timeout. Please verify connection.</p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}