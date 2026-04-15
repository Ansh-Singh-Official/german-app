'use client';
import { signIn } from "next-auth/react";

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-black flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-zinc-900/50 border border-zinc-800 p-12 rounded-[3rem] backdrop-blur-xl text-center">
        <h1 className="text-5xl font-black italic tracking-tighter mb-8">
          JOIN THE <span className="text-blue-600">KLUB.</span>
        </h1>
        <p className="text-zinc-500 mb-10 text-sm tracking-widest uppercase">
          Save your progress & maintain your streak.
        </p>
        
        <button 
          onClick={() => signIn('google', { callbackUrl: '/' })}
          className="w-full bg-white text-black font-black py-4 rounded-2xl hover:bg-blue-600 hover:text-white transition-all active:scale-95 flex items-center justify-center gap-4"
        >
          Continue with Google
        </button>
      </div>
    </main>
  );
}