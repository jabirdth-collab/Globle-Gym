import { useState } from 'react';
import { Camera, ShieldCheck, MapPin, Minimize2, Maximize2 } from 'lucide-react';

interface TourZone {
  id: string;
  name: string;
  description: string;
  amenities: string[];
  image: string;
}

const TOUR_ZONES: TourZone[] = [
  {
    id: 'zone-1',
    name: 'Strength Arena & Free Weights',
    description: 'Our crown jewel. Engineered with 20+ specialized heavy squat and lifting cages, certified competition Olympic steel plates, customized Eleiko bars, and dumbbells scaling up to 150 lbs for high performance lifters.',
    amenities: ['Eleiko & Rogue certified rigs', '10 Competition lift podiums', 'Custom-machined pin loaded equipment', 'Shock-absorbent high-density vulcanized rubber flooring'],
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=1200'
  },
  {
    id: 'zone-2',
    name: 'Cardio & VO2 Sanctuary',
    description: 'Elevate your heart efficiency. Experience top-tier cardiovascular equipment including smart Technogym and woodway treadmills, high-resistance air assault bikes, rowers, and dynamic stairmasters with interactive virtual trails.',
    amenities: ['Built-in personal streaming consoles', 'In-session real-time heart rate feedback systems', 'Premium ventilation and oxygenation blowers', 'Spacious training gaps for maximum comfort'],
    image: 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?auto=format&fit=crop&q=80&w=1200'
  },
  {
    id: 'zone-3',
    name: 'CrossFit CrossFit Sandbox',
    description: 'High ceiling industrial compound designed purely for constant varied workouts of the day (WODs). Features comprehensive ceiling suspension systems, gymnastic rings, target medicine ball wall pads, and extensive battle rope runs.',
    amenities: ['Vast 40-foot continuous steel rig structures', 'Plyometric box lineups & wallballs', 'Sled run turf tracking lane (100 feet)', 'Specialized gymnastics rings & climbing ropes'],
    image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&q=80&w=1200'
  },
  {
    id: 'zone-4',
    name: 'Scientific Bio-Recovery Oasis',
    description: 'Where champions are put together. Flush localized muscle fatigue quickly through a dedicated cold water immersion tank, high-temp cedar dry heat infrared saunas, Hyperice percussion technology, and compression spaces.',
    amenities: ['Clean filtered cold ice whirlpool (45°F)', 'Cedar infrared recovery chambers', 'NormaTec lymphatic compression loungers', 'Certified in-house physiotherapy tables'],
    image: 'https://images.unsplash.com/photo-1600881333168-2ef49b341f30?auto=format&fit=crop&q=80&w=1200'
  },
  {
    id: 'zone-5',
    name: 'Oasis Fuel & Protein Rail',
    description: 'Post-workout dietary management. Feed sore muscles with organic cold-press greens, raw energy shot mixers, low-glycemic vegan carbs, and dynamic performance shakes custom formatted to your scientific macro guidelines.',
    amenities: ['Premium whey and plant protein mixers', 'Cold-pressed high-nutrient fruit juices', 'Pre-workout amino shot custom dispensers', 'Relaxing social bar counters & study pods'],
    image: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?auto=format&fit=crop&q=80&w=1200'
  }
];

export default function VirtualTour() {
  const [activeZoneId, setActiveZoneId] = useState<string>('zone-1');
  const [isFullscreen, setIsFullscreen] = useState(false);

  const activeZone = TOUR_ZONES.find(z => z.id === activeZoneId) || TOUR_ZONES[0];

  return (
    <section id="tour" className="py-24 bg-obsidian-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Title */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <span className="text-neon-yellow text-xs font-bold tracking-widest uppercase bg-neon-yellow/10 px-3.5 py-1.5 rounded-full">
            Virtual Club Tour
          </span>
          <h2 className="font-display font-black text-3xl sm:text-5xl text-white tracking-tight uppercase">
            EXPLORE THE SACTUARY OF TRAINING
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            High ceiling designs, precise equipment alignments, and ultra-hygienic environments. Toggle through our layout zones to see why Global Gym stands out.
          </p>
        </div>

        {/* Dynamic Zone Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch" id="tour-panel-wrapper">
          
          {/* Navigation and Text Specifications - Span 5 */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-8" id="tour-nav-and-content">
            {/* Clickable Zone Tabs */}
            <div className="space-y-2.5 flex flex-col">
              <span className="text-xs font-bold text-slate-450 uppercase tracking-widest pl-2 mb-1">Select Facility Zone:</span>
              {TOUR_ZONES.map((zone) => (
                <button
                  key={zone.id}
                  onClick={() => setActiveZoneId(zone.id)}
                  className={`w-full text-left p-4 rounded-xl font-display font-semibold text-sm transition-all duration-300 flex items-center justify-between group border ${
                    activeZoneId === zone.id
                      ? 'bg-neon-yellow/10 border-neon-yellow/40 text-neon-yellow'
                      : 'bg-obsidian-800/40 border-obsidian-700/60 text-slate-350 hover:bg-obsidian-800 hover:text-white hover:border-slate-600'
                  }`}
                >
                  <span className="truncate pr-4">{zone.name}</span>
                  <Camera className={`h-4.5 w-4.5 shrink-0 transition-transform ${
                    activeZoneId === zone.id ? 'scale-110 text-neon-yellow' : 'text-slate-500 group-hover:text-slate-350 group-hover:rotate-6'
                  }`} />
                </button>
              ))}
            </div>

            {/* Description Card for Selected Zone */}
            <div className="bg-obsidian-800/60 border border-obsidian-750 p-6 rounded-2xl space-y-4">
              <h3 className="font-display font-bold text-xl text-white flex items-center space-x-2">
                <MapPin className="text-neon-yellow h-5 w-5 shrink-0" />
                <span>{activeZone.name}</span>
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                {activeZone.description}
              </p>

              {/* Amenity checklist */}
              <div className="space-y-2 pt-2 border-t border-slate-700/40">
                <span className="text-[10px] font-bold text-slate-450 uppercase tracking-widest flex items-center space-x-1.5 mb-1.5">
                  <ShieldCheck className="h-3.5 w-3.5 text-neon-yellow" />
                  <span>Elite Specs:</span>
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {activeZone.amenities.map((amenity, index) => (
                    <div key={index} className="flex items-center space-x-2 text-xs text-slate-350">
                      <span className="h-1.5 w-1.5 rounded-full bg-neon-yellow shrink-0" />
                      <span className="line-clamp-1">{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Screen Display - Span 7 */}
          <div className="lg:col-span-7 flex flex-col justify-center" id="tour-viewscreen">
            <div className={`relative rounded-3xl overflow-hidden border border-obsidian-750 group ${
              isFullscreen ? 'fixed inset-0 z-50 bg-obsidian-950 p-4 flex items-center justify-center' : 'h-[32rem] sm:h-[36rem]'
            }`}>
              
              {/* Cover visual asset */}
              <img
                src={activeZone.image}
                alt={activeZone.name}
                className="w-full h-full object-cover object-center group-hover:scale-[1.01] transition-transform duration-700"
                referrerPolicy="no-referrer"
              />

              {/* Shade screen overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-obsidian-950/70 via-transparent to-black/30 pointer-events-none" />

              {/* Screen widgets: expand/collapse, live camera feed status */}
              <div className="absolute top-4 right-4 flex items-center space-x-2 z-10">
                <button
                  onClick={() => setIsFullscreen(!isFullscreen)}
                  className="bg-obsidian-900/80 backdrop-blur-md hover:bg-neon-yellow hover:text-obsidian-900 p-2.5 rounded-xl text-slate-300 transition-all border border-slate-800"
                  title={isFullscreen ? "Exit Fullscreen" : "Fullscreen View"}
                  id="fullscreen-tour-btn"
                >
                  {isFullscreen ? <Minimize2 className="h-4.5 w-4.5" /> : <Maximize2 className="h-4.5 w-4.5" />}
                </button>
              </div>

              {/* Overlay camera status tag */}
              <div className="absolute top-4 left-4 z-10 flex items-center space-x-2 bg-obsidian-900/85 backdrop-blur-sm px-3.5 py-1.5 rounded-full border border-slate-700/60">
                <span className="h-2 w-2 rounded-full bg-red-500 animate-ping inline-block shrink-0" />
                <span className="h-2 w-2 rounded-full bg-red-650 inline-block shrink-0 absolute left-3.5" />
                <span className="font-mono text-[10px] tracking-widest text-slate-350 uppercase">LIVE CAM-0{activeZoneId.slice(-1)}</span>
              </div>

              {/* Overlay Zone Badge lower-left */}
              <div className="absolute bottom-6 left-6 right-6 z-15 p-5 bg-obsidian-900/90 backdrop-blur-md border border-slate-800/80 rounded-2xl">
                <span className="text-[10px] uppercase text-neon-yellow tracking-widest font-extrabold font-mono block mb-1">Facility Highlights</span>
                <p className="font-display font-bold text-lg text-white mb-0.5 line-clamp-1">{activeZone.name}</p>
                <p className="text-xs text-slate-400 font-normal">Highly sanitized. Real-time slot reservation active.</p>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
