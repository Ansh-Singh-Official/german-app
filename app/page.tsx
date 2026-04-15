'use client';
import Link from 'next/link';
import Translator from '../components/Translator'; 

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white p-6 md:p-20 flex flex-col items-center overflow-x-hidden">
      {/* Background Decor - Subtle Ambient Glows */}
      <div className="fixed top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/10 blur-[120px] rounded-full -z-10"></div>
      <div className="fixed bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-cyan-600/10 blur-[120px] rounded-full -z-10"></div>

      {/* Header Section */}
      <div className="text-center mb-20 animate-in fade-in slide-in-from-top-4 duration-1000">
        <h1 className="text-6xl md:text-9xl font-black italic tracking-tighter mb-4 bg-gradient-to-b from-white to-zinc-500 bg-clip-text text-transparent">
          Kalpana Sharma German Website <span className="text-blue-500">❤️</span>
        </h1>
        <p className="text-zinc-500 tracking-[0.5em] uppercase text-[10px] font-bold">
          Developed by Ansh Singh 😎• fOR Kalpana Sharma ❤️
        </p>
      </div>

      {/* NAVIGATION GRID - Awesome Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-5xl mb-16">
        
        {/* DICTIONARY CARD */}
        <Link href="/dictionary" className="group relative">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-[3rem] blur opacity-20 group-hover:opacity-60 transition duration-500"></div>
          <div className="relative flex flex-col items-center justify-center p-12 bg-zinc-900/40 backdrop-blur-xl border border-zinc-800 rounded-[3rem] hover:bg-zinc-900/60 transition-all shadow-2xl overflow-hidden">
            <div className="w-20 h-20 bg-blue-500/10 rounded-2xl flex items-center justify-center mb-6 group-hover:rotate-12 transition-transform duration-500">
              <span className="text-5xl">📚</span>
            </div>
            <h3 className="text-3xl font-black italic uppercase tracking-tighter mb-2">Dictionary</h3>
            <p className="text-zinc-500 text-center text-sm font-medium">Global EN → DE Lexicon</p>
          </div>
        </Link>

        {/* NEW AWESOME LESSONS CARD */}
        <Link href="/lessons" className="group relative">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-[3rem] blur opacity-20 group-hover:opacity-60 transition duration-500"></div>
          <div className="relative flex flex-col items-center justify-center p-12 bg-zinc-900/40 backdrop-blur-xl border border-zinc-800 rounded-[3rem] hover:bg-zinc-900/60 transition-all shadow-2xl overflow-hidden">
            <div className="w-20 h-20 bg-purple-500/10 rounded-2xl flex items-center justify-center mb-6 group-hover:-rotate-12 transition-transform duration-500">
              <span className="text-5xl">⚡</span>
            </div>
            <h3 className="text-3xl font-black italic uppercase tracking-tighter mb-2 text-white">Lessons</h3>
            <p className="text-zinc-500 text-center text-sm font-medium">Interactive Flashcards</p>
          </div>
        </Link>

      </div>

      {/* TRANSLATOR SECTION */}
      <div className="w-full max-w-4xl animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300">
        <div className="text-center mb-6">
           <span className="text-blue-500 font-black tracking-widest text-[10px] uppercase bg-blue-500/10 px-4 py-1 rounded-full">Active Module: Translator</span>
        </div>
        <Translator />
      </div>

      <footer className="mt-20 opacity-20 hover:opacity-100 transition-opacity">
        <p className="text-xs text-zinc-500">Built with Next.js 16 • 2026 Edition • The Ansh Singh  </p>
      </footer>
    </main>
  );
}