'use client';
import { useEffect, useState } from 'react';
import { useSession } from "next-auth/react";

export default function StreakCounter() {
  const { data: session } = useSession();
  const [streak, setStreak] = useState(0);

  useEffect(() => {
    if (!session?.user?.email) return;

    const userEmail = session.user.email;
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Normalize to start of day

    const STREAK_KEY = `streak_${userEmail}`;
    const LAST_VISIT_KEY = `lastVisit_${userEmail}`;

    const lastVisitStr = localStorage.getItem(LAST_VISIT_KEY);
    const savedStreak = Number(localStorage.getItem(STREAK_KEY)) || 0;

    if (lastVisitStr) {
      const lastVisit = new Date(lastVisitStr);
      lastVisit.setHours(0, 0, 0, 0);

      const diffTime = today.getTime() - lastVisit.getTime();
      const diffDays = diffTime / (1000 * 60 * 60 * 24);

      if (diffDays === 0) {
        // Already visited today, keep streak same
        setStreak(savedStreak);
      } else if (diffDays === 1) {
        // Visited yesterday! Increment streak
        const newStreak = savedStreak + 1;
        setStreak(newStreak);
        localStorage.setItem(STREAK_KEY, newStreak.toString());
        localStorage.setItem(LAST_VISIT_KEY, today.toISOString());
      } else {
        // Streak broken (gap > 1 day)
        setStreak(1);
        localStorage.setItem(STREAK_KEY, '1');
        localStorage.setItem(LAST_VISIT_KEY, today.toISOString());
      }
    } else {
      // First time ever visiting
      setStreak(1);
      localStorage.setItem(STREAK_KEY, '1');
      localStorage.setItem(LAST_VISIT_KEY, today.toISOString());
    }
  }, [session]);

  if (!session) return null;

  return (
    <div className="flex items-center gap-3 px-4 py-3 bg-zinc-900 border border-zinc-800 rounded-2xl">
      <span className="text-2xl">🔥</span>
      <div>
        <p className="text-[10px] text-zinc-500 uppercase font-black tracking-widest">Current Streak</p>
        <p className="text-lg font-black text-white">{streak} DAYS</p>
      </div>
    </div>
  );
}