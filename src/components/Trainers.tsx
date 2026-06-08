import { INITIAL_TRAINERS } from '../data';
import { Award, ShieldAlert, Instagram, Twitter, Youtube, CheckCircle } from 'lucide-react';

export default function Trainers() {
  return (
    <section id="coaches" className="py-24 bg-obsidian-900 relative">
      <div className="absolute bottom-12 left-1/3 w-80 h-80 bg-neon-yellow/3 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Block */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <span className="text-neon-yellow text-xs font-bold tracking-widest uppercase bg-neon-yellow/10 px-3.5 py-1.5 rounded-full">
            Elite Coaching Force
          </span>
          <h2 className="font-display font-black text-3xl sm:text-5xl text-white tracking-tight uppercase">
            CERTIFIED BIOMECHANIC & PERFORMANCE COACHES
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            Our trainers aren&apos;t just influencers. They hold advanced university degrees in Exercise Science, CSCS certifications, and years of coaching olympic class athletes.
          </p>
        </div>

        {/* Coaches Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8" id="coaches-grid">
          {INITIAL_TRAINERS.map((trainer) => (
            <div
              key={trainer.id}
              className="bg-obsidian-800 border border-obsidian-750 rounded-2xl overflow-hidden group hover:border-neon-yellow/40 transition-all duration-300 flex flex-col justify-between h-full shadow-lg"
              id={`trainer-${trainer.id}`}
            >
              
              {/* Photo Area with Specialization Hover */}
              <div className="relative h-72 overflow-hidden shrink-0">
                <div className="absolute inset-0 bg-gradient-to-t from-obsidian-850 via-obsidian-850/10 to-transparent z-10" />
                <img
                  src={trainer.image}
                  alt={trainer.name}
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />

                {/* Overlaid credentials/certification tags */}
                <div className="absolute bottom-4 left-4 right-4 z-20 bg-obsidian-900/90 backdrop-blur-sm border border-slate-700/60 p-3 rounded-xl">
                  <span className="text-[9px] uppercase tracking-wider text-neon-yellow font-extrabold font-mono flex items-center gap-1">
                    <Award className="h-3.5 w-3.5" />
                    <span>Credentials:</span>
                  </span>
                  <p className="text-white text-xs font-medium truncate mt-0.5" title={trainer.certification}>{trainer.certification}</p>
                </div>
              </div>

              {/* Bio Details */}
              <div className="p-5 flex-grow flex flex-col justify-between space-y-4">
                
                <div className="space-y-1">
                  <h3 className="font-display font-bold text-lg text-white group-hover:text-neon-yellow transition-colors">{trainer.name}</h3>
                  <p className="text-xs text-neon-yellow font-semibold">{trainer.role}</p>
                </div>

                {/* Specialties tag block */}
                <div className="space-y-1.5">
                  <span className="text-[9px] font-bold text-slate-455 uppercase tracking-wider font-mono block">Coaching Specialties:</span>
                  <div className="flex flex-wrap gap-1">
                    {trainer.specialties.map((spec, i) => (
                      <span key={i} className="text-[10px] bg-obsidian-900 px-2 py-0.5 rounded text-slate-350 border border-slate-800">
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Custom Social Channels Links */}
                <div className="pt-4 border-t border-slate-800 flex items-center justify-between text-slate-400 mt-auto">
                  <span className="text-[10px] uppercase font-mono tracking-wider">Connect:</span>
                  <div className="flex space-x-3 text-slate-400">
                    {trainer.socials.instagram && (
                      <a
                        href={`https://instagram.com/${trainer.socials.instagram}`}
                        target="_blank"
                        rel="noreferrer"
                        className="hover:text-white transition-colors p-1 hover:bg-obsidian-750 rounded"
                        title={`Instagram: @${trainer.socials.instagram}`}
                      >
                        <Instagram className="h-4.5 w-4.5" />
                      </a>
                    )}
                    {trainer.socials.twitter && (
                      <a
                        href={`https://twitter.com/${trainer.socials.twitter}`}
                        target="_blank"
                        rel="noreferrer"
                        className="hover:text-white transition-colors p-1 hover:bg-obsidian-750 rounded"
                        title={`Twitter: @${trainer.socials.twitter}`}
                      >
                        <Twitter className="h-4.5 w-4.5" />
                      </a>
                    )}
                    {trainer.socials.youtube && (
                      <a
                        href={`https://youtube.com/${trainer.socials.youtube}`}
                        target="_blank"
                        rel="noreferrer"
                        className="hover:text-white transition-colors p-1 hover:bg-obsidian-750 rounded"
                        title="YouTube Channel"
                      >
                        <Youtube className="h-4.5 w-4.5" />
                      </a>
                    )}
                  </div>
                </div>

              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
