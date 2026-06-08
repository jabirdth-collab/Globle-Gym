import { useState } from 'react';
import { Program } from '../types';
import { INITIAL_PROGRAMS } from '../data';
import { Dumbbell, Flame, Shield, Compass, Zap, Heart, Trophy, Clock, Activity, ArrowRight } from 'lucide-react';

interface ProgramsProps {
  onSelectProgram: (programTitle: string) => void;
}

export default function Programs({ onSelectProgram }: ProgramsProps) {
  const [selectedIntensity, setSelectedIntensity] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const intensities = ['All', 'Beginner', 'Intermediate', 'Advanced'];

  const filteredPrograms = INITIAL_PROGRAMS.filter((program) => {
    const matchesIntensity = selectedIntensity === 'All' || program.intensity === selectedIntensity;
    const matchesSearch = program.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          program.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesIntensity && matchesSearch;
  });

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Dumbbell': return <Dumbbell className="h-6 w-6" />;
      case 'Flame': return <Flame className="h-6 w-6" />;
      case 'Shield': return <Shield className="h-6 w-6" />;
      case 'Compass': return <Compass className="h-6 w-6" />;
      case 'Zap': return <Zap className="h-6 w-6" />;
      case 'Heart': return <Heart className="h-6 w-6" />;
      default: return <Activity className="h-6 w-6" />;
    }
  };

  return (
    <section id="programs" className="py-24 bg-obsidian-800 relative">
      {/* Light decorative blobs */}
      <div className="absolute top-24 left-1/4 w-96 h-96 bg-neon-yellow/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header Block */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <span className="text-neon-yellow text-xs font-bold tracking-widest uppercase bg-neon-yellow/10 px-3.5 py-1.5 rounded-full">
            Elite Disciplines
          </span>
          <h2 className="font-display font-black text-3xl sm:text-5xl text-white tracking-tight uppercase">
            TRAINING BLUEPRINTS FOR HIGH ACHIEVERS
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            No cookie-cutter routines here. Select a specialized regime engineered by sports science professionals to target specific physiological goals.
          </p>
        </div>

        {/* Filters and Search Bar */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-12" id="programs-filters-and-search">
          {/* Intensity Tabs */}
          <div className="flex flex-wrap gap-2 overflow-x-auto pb-1 md:pb-0">
            {intensities.map((intensity) => (
              <button
                key={intensity}
                onClick={() => setSelectedIntensity(intensity)}
                className={`px-5 py-2.5 rounded-xl font-display font-semibold text-sm transition-all duration-200 shrink-0 ${
                  selectedIntensity === intensity
                    ? 'bg-neon-yellow text-obsidian-900 shadow-md shadow-neon-yellow/10'
                    : 'bg-obsidian-700/60 text-slate-300 hover:text-white hover:bg-obsidian-700 border border-transparent hover:border-slate-700'
                }`}
              >
                {intensity === 'All' ? 'All Classes' : `${intensity} Level`}
              </button>
            ))}
          </div>

          {/* Quick Search */}
          <div className="w-full md:max-w-xs relative">
            <input
              type="text"
              placeholder="Search programs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-obsidian-700/60 border border-obsidian-600 rounded-xl px-4 py-3 text-sm text-slate-200 placeholder-slate-400 focus:outline-none focus:border-neon-yellow focus:ring-1 focus:ring-neon-yellow transition-all"
            />
          </div>
        </div>

        {/* Programs Grid */}
        {filteredPrograms.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" id="programs-grid">
            {filteredPrograms.map((program) => (
              <div
                key={program.id}
                className="group relative bg-obsidian-900 rounded-2xl overflow-hidden border border-obsidian-700/80 hover:border-neon-yellow/30 transition-all duration-300 flex flex-col h-full shadow-lg hover:shadow-[0_12px_24px_rgba(0,0,0,0.4)]"
              >
                {/* Cover Image */}
                <div className="relative h-48 overflow-hidden shrink-0">
                  <div className="absolute inset-0 bg-gradient-to-t from-obsidian-900 via-obsidian-900/30 to-transparent z-10" />
                  <img
                    src={program.image}
                    alt={program.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  {/* Floating Icon Badges */}
                  <div className="absolute top-4 left-4 z-20 bg-neon-yellow text-obsidian-900 p-2.5 rounded-xl shadow-md">
                    {getIcon(program.iconName)}
                  </div>
                  <div className="absolute top-4 right-4 z-20 bg-obsidian-900/80 backdrop-blur-md border border-slate-700/60 px-3 py-1 rounded-full text-xs font-semibold text-slate-300">
                    {program.intensity}
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-6 flex flex-col flex-grow space-y-4">
                  <h3 className="font-display font-bold text-xl text-white group-hover:text-neon-yellow transition-colors leading-tight">
                    {program.title}
                  </h3>
                  <p className="text-sm text-slate-400 leading-relaxed line-clamp-3">
                    {program.description}
                  </p>

                  {/* Highlights Bulleting */}
                  <div className="space-y-2 pt-2 border-t border-slate-800/80">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Key Benefits:</p>
                    {program.benefits.map((benefit, i) => (
                      <div key={i} className="flex items-center space-x-2 text-xs text-slate-300">
                        <span className="h-1.5 w-1.5 rounded-full bg-neon-yellow block shrink-0" />
                        <span>{benefit}</span>
                      </div>
                    ))}
                  </div>

                  {/* Program Biometrics metrics Footer */}
                  <div className="mt-auto pt-4 flex items-center justify-between border-t border-slate-800/80 text-xs text-slate-400" id={`metrics-${program.id}`}>
                    <div className="flex items-center space-x-1">
                      <Clock className="h-3.5 w-3.5 text-neon-yellow" />
                      <span>{program.duration}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Trophy className="h-3.5 w-3.5 text-neon-yellow" />
                      <span>{program.caloriesBurned}</span>
                    </div>
                  </div>
                </div>

                {/* Hover Quick Action */}
                <div className="p-4 bg-obsidian-900/90 border-t border-obsidian-800 shrink-0">
                  <button
                    onClick={() => {
                      onSelectProgram(program.title);
                      const el = document.getElementById('contact');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="w-full py-3 px-4 bg-obsidian-800 hover:bg-neon-yellow hover:text-obsidian-900 text-sm font-semibold rounded-xl text-slate-200 flex items-center justify-center space-x-2 transition-all duration-300 group-hover:bg-obsidian-750"
                  >
                    <span>Request Program Info</span>
                    <ArrowRight className="h-4 w-4 shrink-0" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-obsidian-900/60 rounded-xl border border-obsidian-700">
            <p className="text-slate-400 font-medium">No training blueprint matches the selected criteria.</p>
            <button
              onClick={() => {
                setSelectedIntensity('All');
                setSearchQuery('');
              }}
              className="mt-4 text-neon-yellow font-bold text-sm hover:underline"
            >
              Reset Search Filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
