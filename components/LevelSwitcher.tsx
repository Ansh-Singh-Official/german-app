'use client';

interface Props {
  currentLevel: number;
  setLevel: (level: number) => void;
}

export default function LevelSwitcher({ currentLevel, setLevel }: Props) {
  const levels = [
    { id: 1, label: "Basic" },
    { id: 2, label: "Intermediate" },
    { id: 3, label: "Advanced" },
    { id: 4, label: "Native" }
  ];

  return (
    <div className="flex justify-center gap-4 mb-12 flex-wrap">
      {levels.map((lvl) => (
        <button
          key={lvl.id}
          onClick={() => setLevel(lvl.id)}
          className={`px-6 py-2 rounded-full font-bold transition-all border-2 ${
            currentLevel === lvl.id 
            ? "bg-blue-600 border-blue-400 text-white shadow-[0_0_15px_rgba(37,99,235,0.5)]" 
            : "bg-zinc-900 border-zinc-800 text-zinc-500 hover:border-zinc-600"
          }`}
        >
          {lvl.label}
        </button>
      ))}
    </div>
  );
}