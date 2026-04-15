'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
// Importing the original variable name from your file
import { frenchLessons } from '../../data/lessons'; 
import Flashcard from '../../components/Flashcard';
import LevelSwitcher from '../../components/LevelSwitcher';

export default function LessonsPage() {
  const [level, setLevel] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      router.push(`/dictionary?word=${encodeURIComponent(searchTerm)}`);
    }
  };

  const filteredLessons = frenchLessons.filter(lesson => {
    // We search for 'de' instead of 'fr' now
    const matchesSearch = 
      (lesson.de?.toLowerCase().includes(searchTerm.toLowerCase())) || 
      (lesson.en?.toLowerCase().includes(searchTerm.toLowerCase()));
    
    return searchTerm ? matchesSearch : (lesson.level === level);
  });

  return (
    <main className="min-h-screen bg-black text-white p-6 md:p-20">
      <div className="max-w-6xl mx-auto">
        <header className="mb-12">
          <Link href="/" className="text-blue-500 hover:text-blue-400 font-bold mb-8 inline-block">
            ← Back Home
          </Link>
          <h1 className="text-4xl md:text-6xl font-black italic tracking-tighter mb-10">
            German <span className="text-blue-500">Lessons</span> 
            <span className="ml-2">For</span> <span className="text-blue-500">Kalpana❤️</span>
          </h1>

          <form onSubmit={handleSearchSubmit} className="mb-10 relative max-w-xl">
            <input 
              type="text"
              placeholder="Search or Enter for Dictionary..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-zinc-900/50 border border-zinc-800 rounded-2xl py-4 px-6 text-white outline-none focus:border-blue-500 transition-all shadow-2xl"
            />
          </form>

          <LevelSwitcher currentLevel={level} setLevel={setLevel} />
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredLessons.map((lesson: any) => (
            <Flashcard key={lesson.id} lesson={lesson} />
          ))}
        </div>
      </div>
    </main>
  );
}