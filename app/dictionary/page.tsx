'use client';
import { useState, useMemo } from 'react';
import Link from 'next/link';

const DICTIONARY_DATA = [
  { en: "How are you", de: "Wie geht es dir?", cat: "Conversation" },
  { en: "Good morning", de: "Guten Morgen", cat: "Greetings" },
  { en: "Hello", de: "Hallo", cat: "Greetings" },
  { en: "Thank you", de: "Danke", cat: "Basics" },
  { en: "I love you", de: "Ich liebe dich", cat: "Emotion" },
  { en: "Where is", de: "Wo ist...", cat: "Travel" },
  { en: "Apple", de: "der Apfel", cat: "Food" },
  { en: "Bread", de: "das Brot", cat: "Food" },
];

export default function AestheticDictionary() {
  const [query, setQuery] = useState('');
  const [apiResult, setApiResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const localMatch = useMemo(() => {
    if (!query.trim()) return null;
    return DICTIONARY_DATA.find(item => item.en.toLowerCase() === query.toLowerCase().trim());
  }, [query]);

  const fetchTranslation = async (e: React.FormEvent) => {
    e.preventDefault();
    if (localMatch || !query.trim()) return;
    setLoading(true);
    try {
      const res = await fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(query)}&langpair=en|de`);
      const data = await res.json();
      setApiResult(data.responseData.translatedText);
    } catch (err) {
      setApiResult("Connection Lost");
    } finally {
      setLoading(false);
    }
  };

  const speak = (text: string) => {
    const speech = new SpeechSynthesisUtterance(text);
    speech.lang = 'de-DE';
    window.speechSynthesis.speak(speech);
  };

  return (
    <main className="relative min-h-screen bg-[#020202] text-zinc-100 overflow-hidden selection:bg-blue-500/30">
      {/* BACKGROUND AESTHETIC: MESH GRADIENT */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/10 blur-[120px] rounded-full" />
      <div className="absolute bottom-[-5%] right-[-5%] w-[30%] h-[30%] bg-indigo-600/10 blur-[100px] rounded-full" />

      <div className="relative z-10 max-w-5xl mx-auto px-6 py-12 md:py-24">
        
        {/* TOP NAVIGATION */}
        <nav className="flex justify-between items-center mb-24">
          <Link href="/" className="text-[10px] tracking-[0.5em] font-bold text-zinc-500 hover:text-blue-400 transition-all uppercase">
            ← Back to Terminal
          </Link>
          <div className="flex gap-1">
            <div className="w-2 h-2 rounded-full bg-red-500/20" />
            <div className="w-2 h-2 rounded-full bg-yellow-500/20" />
            <div className="w-2 h-2 rounded-full bg-green-500/20" />
          </div>
        </nav>

        {/* HERO SECTION */}
        <header className="mb-20">
          <div className="inline-block px-3 py-1 rounded-full border border-blue-500/20 bg-blue-500/5 text-blue-500 text-[10px] font-bold tracking-[0.2em] uppercase mb-6">
            Language Engine v2.0
          </div>
          <h1 className="text-8xl md:text-[10rem] font-black tracking-tightest leading-[0.8] italic mb-8">
            GERMAN<span className="text-blue-600">.</span>
          </h1>
          <p className="max-w-md text-zinc-500 text-lg font-light leading-relaxed">
            A high-fidelity dictionary crafted for precision and speed.
          </p>
        </header>

        {/* SEARCH INTERFACE */}
        <form onSubmit={fetchTranslation} className="relative group mb-32">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl blur opacity-0 group-focus-within:opacity-20 transition duration-1000"></div>
          
          <div className="relative flex items-center bg-zinc-900/40 border border-zinc-800/50 backdrop-blur-2xl rounded-2xl p-2">
            <input 
              type="text"
              placeholder="Start typing in English..."
              value={query}
              onChange={(e) => { setQuery(e.target.value); setApiResult(null); }}
              className="w-full bg-transparent py-6 px-8 text-2xl md:text-4xl font-light outline-none text-white placeholder:text-zinc-800"
            />
            <button 
              type="submit" 
              className="h-16 px-10 rounded-xl bg-blue-600 text-white font-black text-xs tracking-[0.2em] uppercase hover:bg-blue-500 transition-all active:scale-95 shadow-lg shadow-blue-600/20"
            >
              {loading ? '...' : 'Search'}
            </button>
          </div>
        </form>

        {/* RESULTS SECTION */}
        <div className="min-h-[400px]">
          {(localMatch || apiResult) && (
            <div className="animate-in fade-in zoom-in-95 duration-500">
              <div className="grid md:grid-cols-[1fr_auto] items-center gap-12 p-12 rounded-[3rem] bg-gradient-to-br from-zinc-900/50 to-transparent border border-zinc-800/50">
                
                <div>
                  <div className="flex items-center gap-4 mb-8">
                    <span className="h-[0px] w-8 bg-blue-600"></span>
                    <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.4em]">
                      {localMatch ? 'Verified Entry' : ''}
                    </span>
                  </div>
                  
                  <h2 className="text-6xl md:text-8xl font-black tracking-tighter text-white mb-4">
                    {localMatch ? localMatch.de : apiResult}
                  </h2>
                  <p className="text-2xl text-zinc-600 font-light italic">"{query}"</p>
                </div>

                <button 
                  onClick={() => speak(localMatch ? localMatch.de : apiResult!)}
                  className="w-32 h-32 rounded-full border border-zinc-800 flex items-center justify-center hover:bg-blue-600 hover:border-blue-600 transition-all group"
                >
                  <span className="text-4xl group-hover:scale-125 transition-transform group-hover:drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]">🔊</span>
                </button>
                
              </div>
            </div>
          )}
        </div>

        {/* FOOTER */}
        <footer className="mt-32 pt-8 border-t border-zinc-900 text-center">
          <p className="text-zinc-700 text-[10px] font-mono tracking-widest uppercase">
            Designed for Kalpana Sharma ❤️• 2026
          </p>
        </footer>
      </div>
    </main>
  );
}