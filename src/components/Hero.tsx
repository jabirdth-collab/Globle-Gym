import { ArrowRight, Play, Zap, Calendar, Medal } from 'lucide-react';
import { GymSettings } from '../types';

interface HeroProps {
  settings: GymSettings;
  onExplorePricing: () => void;
  onViewSchedule: () => void;
  onClaimFreePass: () => void;
}

export default function Hero({ settings, onExplorePricing, onViewSchedule, onClaimFreePass }: HeroProps) {
  return (
    <section id="home" className="relative min-h-screen flex items-center pt-24 pb-16 overflow-hidden">
      {/* Background Graphic */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-radial-gradient from-obsidian-800/40 via-obsidian-900/90 to-obsidian-900 z-10" />
        <img
          src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=2000"
          alt="Premium Gym Interior"
          className="w-full h-full object-cover object-center opacity-40 scale-105 animate-pulse-slow"
          referrerPolicy="no-referrer"
        />
      </div>

      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Weekly Announcement */}
        {settings.weeklyAnnouncement && (
          <div
            id="global-announcement"
            className="inline-flex items-center space-x-2 bg-neon-yellow/10 border border-neon-yellow/20 rounded-full px-4 py-1.5 mb-8 text-xs sm:text-sm text-neon-yellow tracking-wide animate-bounce-slow"
          >
            <Zap className="h-4 w-4 shrink-0 animate-pulse" />
            <span className="font-semibold uppercase tracking-wider">Announcement:</span>
            <span>{settings.weeklyAnnouncement}</span>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Hero Left Content */}
          <div className="lg:col-span-7 space-y-6 text-left" id="hero-left-content">
            <h1 className="font-display font-extrabold text-4xl sm:text-6xl xl:text-7xl text-white leading-none tracking-tight">
              PRACTICE LIKE <span className="text-neon-yellow block sm:inline">CHAMPIONS.</span> <br />
              REDEFINE YOUR FOCUS.
            </h1>
            <p className="text-slate-300 text-lg sm:text-xl max-w-xl font-normal leading-relaxed">
              Step into {settings.gymName}, the ultimate premium fitness sanctuary. Engineered with world-class Olympic lifting hubs, custom bio-recovery suites, and elite coaching blueprints.
            </p>

            {/* Quick CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 pt-4">
              <button
                onClick={onClaimFreePass}
                id="hero-free-pass-call"
                className="bg-neon-yellow hover:bg-neon-yellow-hover text-obsidian-900 px-8 py-4 rounded-xl font-display font-bold text-base tracking-wide flex items-center justify-center space-x-2 shadow-lg hover:shadow-[0_8px_24px_rgba(202,234,16,0.3)] transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <span>Claim Free Workout Pass</span>
                <ArrowRight className="h-5 w-5" />
              </button>
              
              <button
                onClick={onExplorePricing}
                id="hero-explore-pricing-call"
                className="bg-obsidian-800 hover:bg-obsidian-700 border border-obsidian-600 px-8 py-4 rounded-xl font-display font-medium text-base text-white flex items-center justify-center space-x-2 transition-all duration-300 hover:border-slate-400"
              >
                <span>Explore Memberships</span>
              </button>
            </div>

            {/* Value Indicators */}
            <div className="grid grid-cols-3 gap-4 pt-8 border-t border-slate-800/60 max-w-lg" id="hero-stats">
              <div>
                <p className="font-display text-2xl sm:text-3xl font-extrabold text-neon-yellow">15,000 ft²</p>
                <p className="text-xs sm:text-sm text-slate-400 tracking-wide font-medium mt-1 uppercase">Elite Safe Zone</p>
              </div>
              <div className="border-l border-slate-800/80 pl-4">
                <p className="font-display text-2xl sm:text-3xl font-extrabold text-neon-yellow">45+</p>
                <p className="text-xs sm:text-sm text-slate-400 tracking-wide font-medium mt-1 uppercase">Weekly WOD Classes</p>
              </div>
              <div className="border-l border-slate-800/80 pl-4">
                <p className="font-display text-2xl sm:text-3xl font-extrabold text-neon-yellow">100%</p>
                <p className="text-xs sm:text-sm text-slate-400 tracking-wide font-medium mt-1 uppercase">Certified Coaches</p>
              </div>
            </div>
          </div>

          {/* Hero Right Card / Quick Highlights Grid */}
          <div className="lg:col-span-5 relative mt-8 lg:mt-0" id="hero-right-visual">
            <div className="absolute -inset-1 bg-gradient-to-r from-neon-yellow to-lime-500 rounded-2xl blur-xl opacity-20 animate-pulse" />
            
            <div className="relative bg-obsidian-800/90 border border-obsidian-700 rounded-2xl p-6 sm:p-8 space-y-6">
              <h3 className="font-display font-bold text-xl text-white border-b border-obsidian-700 pb-3 flex items-center space-x-2">
                <Medal className="text-neon-yellow h-5 w-5" />
                <span>WHY CHOOSE GLOBAL GYM?</span>
              </h3>

              <div className="space-y-4">
                {/* Point 1 */}
                <div className="flex items-start space-x-3">
                  <div className="bg-neon-yellow/10 p-2.5 rounded-lg text-neon-yellow shrink-0 mt-0.5">
                    <Zap className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-white">Biometric Progression Tracking</h4>
                    <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                      Every membership includes complimentary access to our InBody 570 body fat scanner and continuous coach-guided biometric analysis.
                    </p>
                  </div>
                </div>

                {/* Point 2 */}
                <div className="flex items-start space-x-3">
                  <div className="bg-neon-yellow/10 p-2.5 rounded-lg text-neon-yellow shrink-0 mt-0.5">
                    <Calendar className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-white">Dynamic Reservation Calendar</h4>
                    <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                      Book specific lockers, high-intensity classes, or massage spa sessions easily through our web interface. Zero lines, zero waits.
                    </p>
                  </div>
                </div>

                {/* Point 3 */}
                <div className="flex items-start space-x-3">
                  <div className="bg-neon-yellow/10 p-2.5 rounded-lg text-neon-yellow shrink-0 mt-0.5">
                    <Play className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-white">Hyperized Recovery Lounge</h4>
                    <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                      Recover like elite Olympians using specialized bio-infrared heat cabins, instant cooling tubs, and Compression Boots.
                    </p>
                  </div>
                </div>
              </div>

              {/* Instant Social proof snippet */}
              <div className="pt-4 border-t border-obsidian-700 flex items-center justify-between text-xs text-slate-400">
                <span>⭐ Excellent: <strong>4.9 / 5.0</strong> on Google Review</span>
                <span className="text-neon-yellow hover:underline cursor-pointer" onClick={onViewSchedule}>Check Class Times</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
