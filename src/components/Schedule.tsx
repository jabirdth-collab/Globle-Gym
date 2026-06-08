import { useState } from 'react';
import { ScheduleSession } from '../types';
import { INITIAL_SCHEDULE } from '../data';
import { Calendar, Clock, User, Users, CheckCircle, Search, AlertTriangle } from 'lucide-react';

interface ScheduleProps {
  onBookClass: (className: string, trainerName: string) => void;
}

export default function Schedule({ onBookClass }: ScheduleProps) {
  const [activeDay, setActiveDay] = useState<ScheduleSession['day']>('Monday');
  const [levelFilter, setLevelFilter] = useState<string>('All');
  const [searchVal, setSearchVal] = useState<string>('');
  const [bookedSessions, setBookedSessions] = useState<string[]>([]);

  const days: ScheduleSession['day'][] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  const filteredSessions = INITIAL_SCHEDULE.filter((session) => {
    const matchesDay = session.day === activeDay;
    const matchesLevel = levelFilter === 'All' || session.level === levelFilter;
    const matchesSearch = session.className.toLowerCase().includes(searchVal.toLowerCase()) ||
                          session.trainerName.toLowerCase().includes(searchVal.toLowerCase());
    return matchesDay && matchesLevel && matchesSearch;
  });

  const handleBook = (session: ScheduleSession) => {
    if (bookedSessions.includes(session.id)) return;
    setBookedSessions([...bookedSessions, session.id]);
    onBookClass(session.className, session.trainerName);
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Beginner': return 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20';
      case 'Intermediate': return 'bg-amber-500/10 text-amber-400 border border-amber-500/20';
      case 'Advanced': return 'bg-rose-500/10 text-rose-400 border border-rose-500/20';
      default: return 'bg-blue-500/10 text-blue-400 border border-blue-500/20';
    }
  };

  return (
    <section id="schedule" className="py-24 bg-obsidian-800 relative border-t border-b border-obsidian-750">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Block */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <span className="text-neon-yellow text-xs font-bold tracking-widest uppercase bg-neon-yellow/10 px-3.5 py-1.5 rounded-full">
            Active Timetable
          </span>
          <h2 className="font-display font-black text-3xl sm:text-5xl text-white tracking-tight uppercase animate-pulse-slow">
            WEEKLY POWER GRID SCHEDULE
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            Plan your workouts ahead of time. Filter sessions by weekdays or skill levels. Click to lock in your free session slot with any coach.
          </p>
        </div>

        {/* Control and Filter Zone */}
        <div className="bg-obsidian-900 border border-obsidian-750 rounded-2xl p-6 sm:p-8 space-y-6 mb-10" id="schedule-controls-box">
          
          {/* Weekdays Toggle Slider */}
          <div className="flex flex-nowrap gap-2 overflow-x-auto pb-3 sm:pb-0 scrollbar-none" id="schedule-days-list">
            {days.map((day) => (
              <button
                key={day}
                onClick={() => setActiveDay(day)}
                className={`px-5 py-3 rounded-xl font-display font-bold text-sm tracking-wide transition-all duration-300 shrink-0 ${
                  activeDay === day
                    ? 'bg-neon-yellow text-obsidian-900 shadow-md shadow-neon-yellow/15'
                    : 'bg-obsidian-850 hover:bg-obsidian-750 text-slate-350 hover:text-white border border-obsidian-750 hover:border-slate-700'
                }`}
              >
                {day}
              </button>
            ))}
          </div>

          <div className="h-px bg-obsidian-750 w-full" />

          {/* Secondary Level Filters and Search Box */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            {/* Class Level filters */}
            <div className="flex space-x-2">
              {['All', 'Beginner', 'Intermediate', 'Advanced'].map((lvl) => (
                <button
                  key={lvl}
                  onClick={() => setLevelFilter(lvl)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold border ${
                    levelFilter === lvl
                      ? 'bg-obsidian-700 border-neon-yellow text-neon-yellow'
                      : 'bg-transparent border-obsidian-700 text-slate-400 hover:text-white'
                  }`}
                >
                  {lvl}
                </button>
              ))}
            </div>

            {/* Timetable Class Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
              <input
                type="text"
                placeholder="Search class or coach..."
                value={searchVal}
                onChange={(e) => setSearchVal(e.target.value)}
                className="w-full sm:max-w-xs bg-obsidian-850 border border-obsidian-700 rounded-xl pl-9 pr-4 py-2 text-xs text-slate-300 focus:outline-none focus:border-neon-yellow focus:ring-1 focus:ring-neon-yellow"
              />
            </div>
          </div>
        </div>

        {/* Schedule Timetable Display Grid */}
        {filteredSessions.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" id="schedule-sessions-grid">
            {filteredSessions.map((session) => {
              const isBooked = bookedSessions.includes(session.id);
              return (
                <div
                  key={session.id}
                  className={`bg-obsidian-900 border rounded-2xl p-5 sm:p-6 flex flex-col justify-between space-y-4 transition-all duration-300 hover:-translate-y-1 ${
                    isBooked
                      ? 'border-neon-yellow/45 shadow-[0_4px_16px_rgba(202,234,16,0.1)]'
                      : 'border-obsidian-700 hover:border-slate-650'
                  }`}
                  id={`session-${session.id}`}
                >
                  {/* Title and Level Tag */}
                  <div className="space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <span className={`text-[10px] uppercase font-mono px-2 py-0.5 rounded-md font-bold tracking-wider shrink-0 ${getLevelColor(session.level)}`}>
                        {session.level}
                      </span>
                      <span className="text-xs font-semibold text-slate-450 tracking-wide font-mono flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5 text-neon-yellow" />
                        <span>{session.time}</span>
                      </span>
                    </div>
                    <h3 className="font-display font-bold text-lg text-white leading-snug hover:text-neon-yellow transition-colors cursor-pointer" onClick={() => handleBook(session)}>
                      {session.className}
                    </h3>
                  </div>

                  {/* Coach and Specs */}
                  <div className="space-y-2.5 pt-3 border-t border-slate-800/80 text-xs">
                    <div className="flex items-center space-x-2 text-slate-350">
                      <User className="h-4 w-4 text-neon-yellow shrink-0" />
                      <span>Coach: <strong className="text-slate-200">{session.trainerName}</strong></span>
                    </div>

                    <div className="flex items-center justify-between text-slate-400">
                      <div className="flex items-center space-x-1">
                        <Users className="h-4 w-4 text-neon-yellow shrink-0" />
                        <span>{session.spotsLeft} spots remaining</span>
                      </div>
                      <span className="font-mono bg-obsidian-800 px-2 py-0.5 rounded border border-slate-750 text-[10px]">{session.duration}</span>
                    </div>
                  </div>

                  {/* Operational Action */}
                  <button
                    onClick={() => handleBook(session)}
                    className={`w-full py-2.5 rounded-xl font-display font-extrabold text-xs tracking-uppercase flex items-center justify-center space-x-1.5 transition-all duration-300 ${
                      isBooked
                        ? 'bg-emerald-500/10 text-emerald-450 border border-emerald-500/30'
                        : 'bg-obsidian-800 hover:bg-neon-yellow text-slate-200 hover:text-obsidian-900'
                    }`}
                  >
                    {isBooked ? (
                      <>
                        <CheckCircle className="h-4.5 w-4.5" />
                        <span>SPOT RESERVED</span>
                      </>
                    ) : (
                      <>
                        <Calendar className="h-4 w-4" />
                        <span>RESERVE SPORT PLACE</span>
                      </>
                    )}
                  </button>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-12 bg-obsidian-900 rounded-2xl border border-obsidian-750 flex flex-col items-center justify-center space-y-4 select-none">
            <AlertTriangle className="h-10 w-10 text-amber-400/80 animate-bounce-slow" />
            <div className="space-y-1">
              <p className="text-white font-display font-medium text-base">Rest Day or No Classes Programmed</p>
              <p className="text-xs text-slate-450 leading-relaxed max-w-sm">No training session matches your search in {activeDay}. Enjoy high-quality recovery facilities or browse general schedule times.</p>
            </div>
            <button
              onClick={() => {
                setLevelFilter('All');
                setSearchVal('');
              }}
              className="text-xs text-neon-yellow font-bold hover:underline"
            >
              Reset Selected Filters
            </button>
          </div>
        )}

      </div>
    </section>
  );
}
