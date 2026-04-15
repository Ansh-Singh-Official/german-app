'use client';
import { useState } from 'react';

// Sample data - replace with your actual dictionary data
const dictionaryData = [
  { en: "Hello", de: "Hallo", category: "Greeting" },
  { en: "Goodbye", de: "Auf Wiedersehen", category: "Greeting" },
  { en: "Please", de: "Bitte", category: "Common" },
  { en: "Thank you", de: "Danke", category: "Common" },
];

export default function DictionaryPage() {
  const [search, setSearch] = useState('');

  const filteredData = dictionaryData.filter(item =>
    item.en.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-black text-white p-4 md:p-8 pt-20 md:pt-8">
      {/* Header Section */}
      <div className="max-w-4xl mx-auto mb-10">
        <h1 className="text-4xl font-black mb-2 italic">DICTIONARY<span className="text-blue-600">.</span></h1>
        <p className="text-zinc-500 font-bold uppercase text-xs tracking-widest">Global EN → DE Lexicon</p>
      </div>

      {/* Search Bar - Responsive width */}
      <div className="max-w-4xl mx-auto mb-8">
        <div className="relative group">
          <input
            type="text"
            placeholder="Search English words..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-zinc-900 border border-zinc-800 rounded-2xl p-4 pl-12 focus:outline-none focus:border-blue-600 transition-all text-lg font-medium"
          />
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-blue-600 transition-colors">
            🔍
          </span>
        </div>
      </div>

      {/* Results Grid - 1 column on mobile, 2 on tablet, 3 on desktop */}
      <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredData.map((item, index) => (
          <div 
            key={index} 
            className="bg-zinc-900/50 border border-zinc-800 p-6 rounded-2xl hover:border-blue-600 transition-all group"
          >
            <span className="text-[10px] text-blue-500 font-black uppercase tracking-tighter mb-2 block">
              {item.category}
            </span>
            <h3 className="text-zinc-400 text-sm font-bold mb-1">English</h3>
            <p className="text-xl font-bold mb-4">{item.en}</p>
            
            <div className="h-px w-full bg-zinc-800 mb-4 group-hover:bg-blue-600/30 transition-colors" />
            
            <h3 className="text-blue-500 text-sm font-bold mb-1">German</h3>
            <p className="text-2xl font-black italic">{item.de}</p>
          </div>
        ))}

        {filteredData.length === 0 && (
          <div className="col-span-full text-center py-20 bg-zinc-900/30 rounded-3xl border border-dashed border-zinc-800">
            <p className="text-zinc-500 font-bold italic">No words found matching "{search}"</p>
          </div>
        )}
      </div>
    </div>
  );
}