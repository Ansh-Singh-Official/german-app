'use client';
import { signOut, useSession } from "next-auth/react";
import StreakCounter from './StreakCounter';
import Link from 'next/link';

export default function Sidebar() {
  const { data: session } = useSession();

  return (
    <aside className="fixed left-0 top-0 h-full w-64 bg-black border-r border-zinc-900 p-6 flex flex-col">
      <div className="mb-10">
        <h1 className="text-2xl font-black italic">GERMAN<span className="text-blue-600">.</span></h1>
      </div>

      <nav className="flex-1 space-y-2">
        <Link href="/" className="block p-3 hover:bg-zinc-900 rounded-xl font-bold">Translator</Link>
        <Link href="/lessons" className="block p-3 hover:bg-zinc-900 rounded-xl font-bold">Lessons</Link>
        <Link href="/dictionary" className="block p-3 hover:bg-zinc-900 rounded-xl font-bold">Dictionary</Link>
      </nav>

      {/* STREAK & USER INFO AT BOTTOM */}
      <div className="mt-auto space-y-6">
        <StreakCounter />

        {session?.user && (
          <div className="flex items-center gap-3 p-2 bg-zinc-900/50 rounded-2xl border border-zinc-800">
            <img 
              src={session.user.image!} 
              alt="Avatar" 
              className="w-10 h-10 rounded-full border border-blue-600 p-0.5" 
            />
            <div className="flex flex-col min-w-0">
              <span className="text-sm font-bold truncate text-white">{session.user.name}</span>
              <button 
                onClick={() => signOut()}
                className="text-[10px] text-zinc-500 text-left hover:text-red-500 font-bold uppercase"
              >
                Sign Out
              </button>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}