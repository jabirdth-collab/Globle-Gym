import { useState, useEffect } from 'react';
import { GymLead, GymSettings } from './types';
import { INITIAL_MEMBERSHIPS, INITIAL_SETTINGS, INITIAL_SCHEDULE, INITIAL_TRAINERS } from './data';
import Header from './components/Header';
import Hero from './components/Hero';
import Programs from './components/Programs';
import VirtualTour from './components/VirtualTour';
import Schedule from './components/Schedule';
import BMICalculator from './components/BMICalculator';
import Membership from './components/Membership';
import Trainers from './components/Trainers';
import Contact from './components/Contact';
import AdminPanel from './components/AdminPanel';
import { Dumbbell, ArrowRight, Check, MapPin, Phone, Mail, Instagram, Twitter, Youtube, ExternalLink, Settings, Award } from 'lucide-react';

export default function App() {
  const [isAdminVisible, setIsAdminVisible] = useState<boolean>(false);
  const [gymSettings, setGymSettings] = useState<GymSettings>(INITIAL_SETTINGS);
  const [gymLeads, setGymLeads] = useState<GymLead[]>([]);
  
  // Selections routing state for Contact Form
  const [selectedProgram, setSelectedProgram] = useState<string>('');
  const [selectedPlan, setSelectedPlan] = useState<string>('');
  const [freePassTriggered, setFreePassTriggered] = useState<boolean>(false);

  // Initialize and load from local storage
  useEffect(() => {
    // Load leads
    const savedLeads = localStorage.getItem('global_gym_leads');
    if (savedLeads) {
      setGymLeads(JSON.parse(savedLeads));
    } else {
      // Seed an initial welcome lead so the admin panel doesn't look barren if opened immediately
      const initialSeedLead: GymLead = {
        id: 'seed-lead-1',
        name: 'James Rodriguez',
        email: 'james.rod@athletics.com',
        phone: '+1 (555) 765-4321',
        selectedProgram: 'Athletic Strength',
        selectedPlan: 'Elite Carbon Tier',
        message: 'Hi! Looking to optimize my squat biomechanics and try your recovery ice immersion baths. See you guys soon!',
        date: new Date().toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit'
        }),
        status: 'New'
      };
      setGymLeads([initialSeedLead]);
      localStorage.setItem('global_gym_leads', JSON.stringify([initialSeedLead]));
    }

    // Load settings
    const savedSettings = localStorage.getItem('global_gym_settings');
    if (savedSettings) {
      setGymSettings(JSON.parse(savedSettings));
    } else {
      localStorage.setItem('global_gym_settings', JSON.stringify(INITIAL_SETTINGS));
    }
  }, []);

  const handleUpdateSettings = (newSettings: GymSettings) => {
    setGymSettings(newSettings);
  };

  const handleUpdateLeads = (newLeads: GymLead[]) => {
    setGymLeads(newLeads);
  };

  const handleAddNewLead = (newLead: GymLead) => {
    setGymLeads((prev) => [newLead, ...prev]);
  };

  // Pre-filling contact form routers
  const handleSelectProgramFromCard = (programTitle: string) => {
    setSelectedProgram(programTitle);
    setSelectedPlan('');
  };

  const handleSelectPlanFromPricing = (planName: string) => {
    setSelectedPlan(planName);
    setSelectedProgram('');
  };

  const handleBookClassFromSchedule = (className: string, trainerName: string) => {
    setSelectedProgram(className);
    setSelectedPlan('Claimed Free Pass - 1 Session');
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleClaimFreePass = () => {
    setFreePassTriggered(true);
  };

  return (
    <div className="min-h-screen bg-obsidian-900 text-slate-100 flex flex-col font-sans selection:bg-neon-yellow selection:text-obsidian-900 overflow-x-hidden">
      
      {/* Header global navigation */}
      <Header
        isAdminVisible={isAdminVisible}
        onAdminToggle={() => setIsAdminVisible(!isAdminVisible)}
        onClaimFreePass={handleClaimFreePass}
      />

      {/* Main Sections */}
      <main className="flex-grow">
        
        {/* Active Drawer: Floating Admin settings panel overlay */}
        {isAdminVisible && (
          <div className="bg-obsidian-900 pt-28 pb-12 border-b border-obsidian-750 relative z-30" id="admin-hub-parent">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <AdminPanel
                leads={gymLeads}
                settings={gymSettings}
                onUpdateSettings={handleUpdateSettings}
                onUpdateLeadsList={handleUpdateLeads}
                onClose={() => setIsAdminVisible(false)}
              />
            </div>
          </div>
        )}

        {/* 1. Hero Dynamic Entrance */}
        <Hero
          settings={gymSettings}
          onExplorePricing={() => {
            const el = document.getElementById('pricing');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
          onViewSchedule={() => {
            const el = document.getElementById('schedule');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
          onClaimFreePass={handleClaimFreePass}
        />

        {/* 2. Athletic Programs Disciplines Grid */}
        <Programs onSelectProgram={handleSelectProgramFromCard} />

        {/* 3. Club Virtual Interactive Tour */}
        <VirtualTour />

        {/* 4. Weekly Power Classes Schedule Planner */}
        <Schedule onBookClass={handleBookClassFromSchedule} />

        {/* 5. Biometric BMI & Calorie Calculator Diagnostics */}
        <BMICalculator />

        {/* 6. Gym Memberships Plan Customization Panel */}
        <Membership onSelectPlan={handleSelectPlanFromPricing} />

        {/* 7. Coaches Bio Matrix */}
        <Trainers />

        {/* 8. Registration Lead Capture Form & Hours */}
        <Contact
          selectedProgram={selectedProgram}
          selectedPlan={selectedPlan}
          onNewLeadSubmit={handleAddNewLead}
          claimFreePassTriggered={freePassTriggered}
          onResetFreePassTrigger={() => setFreePassTriggered(false)}
        />

      </main>

      {/* Deep-Design Footer Block */}
      <footer className="bg-obsidian-950 border-t border-obsidian-800 pt-16 pb-12 text-slate-400 relative z-10" id="app-footer">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 border-b border-slate-900 pb-12">
            
            {/* Column 1: Core credentials & summary */}
            <div className="space-y-4 md:col-span-1.5 text-left">
              <a href="#home" className="flex items-center space-x-2">
                <span className="p-1.5 bg-neon-yellow text-obsidian-900 rounded">
                  <Dumbbell className="h-5 w-5" />
                </span>
                <span className="font-display font-black text-lg tracking-wider text-white">
                  GLOBAL<span className="text-neon-yellow">GYM</span>
                </span>
              </a>
              <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
                Engineering premium training sanctuaries prioritizing athletic power, biological optimization, and scientific recovery methodologies since 2018.
              </p>
              
              {/* Social Channels */}
              <div className="flex space-x-4 pt-2">
                <a href="#home" className="text-slate-500 hover:text-neon-yellow transition-colors" title="Instagram">
                  <Instagram className="h-5 w-5" />
                </a>
                <a href="#home" className="text-slate-500 hover:text-neon-yellow transition-colors" title="Twitter">
                  <Twitter className="h-5 w-5" />
                </a>
                <a href="#home" className="text-slate-500 hover:text-neon-yellow transition-colors" title="YouTube">
                  <Youtube className="h-5 w-5" />
                </a>
              </div>
            </div>

            {/* Column 2: Navigation shortcuts */}
            <div className="space-y-3.5 text-left text-xs">
              <h4 className="font-display font-bold text-white tracking-widest uppercase text-[10px]">FACILITY NAVIGATION</h4>
              <div className="grid grid-cols-2 gap-2">
                <a href="#programs" className="hover:text-neon-yellow transition-colors">Programs</a>
                <a href="#tour" className="hover:text-neon-yellow transition-colors">Virtual Tour</a>
                <a href="#schedule" className="hover:text-neon-yellow transition-colors">Timetable</a>
                <a href="#bmi" className="hover:text-neon-yellow transition-colors">Calorie Tool</a>
                <a href="#pricing" className="hover:text-neon-yellow transition-colors">Memberships</a>
                <a href="#coaches" className="hover:text-neon-yellow transition-colors">Elite coaches</a>
              </div>
            </div>

            {/* Column 3: Contact pointers */}
            <div className="space-y-3.5 text-left text-xs">
              <h4 className="font-display font-bold text-white tracking-widest uppercase text-[10px]">RELEVANT DIRECTORIES</h4>
              <div className="space-y-2 text-slate-400">
                <p className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4 text-neon-yellow shrink-0" />
                  <span>Sector 8, cPanel Avenue</span>
                </p>
                <p className="flex items-center space-x-2">
                  <Phone className="h-4 w-4 text-neon-yellow shrink-0" />
                  <span>+1 (800) 555-PHYS</span>
                </p>
                <p className="flex items-center space-x-2">
                  <Mail className="h-4 w-4 text-neon-yellow shrink-0" />
                  <span>support@globalgym.net</span>
                </p>
              </div>
            </div>

            {/* Column 4: cPanel deployment tips */}
            <div className="space-y-3.5 text-left text-xs bg-obsidian-900 p-4.5 rounded-2xl border border-obsidian-800">
              <h4 className="font-display font-bold text-neon-yellow tracking-widest uppercase text-[10px] flex items-center space-x-1">
                <Settings className="h-3.5 w-3.5" />
                <span>CPANEL READY SPEC</span>
              </h4>
              <p className="text-[11px] text-slate-400 leading-normal">
                This website compiles into lightweight static assets (HTML/CSS/JS). Ideal for directories hosted on **cPanel public_html/ FTP**. 
              </p>
              <div className="flex items-center text-[10px] text-white font-mono bg-obsidian-950 p-2 rounded border border-slate-800 font-bold justify-between">
                <span>⚡ Static SPA Ready</span>
                <span className="text-neon-yellow">100% Client-Side</span>
              </div>
            </div>

          </div>

          {/* Sub credentials credit alignment */}
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
            <p>&copy; {new Date().getFullYear()} GLOBAL GYM. Precision Sports Science Engineering. All rights reserved.</p>
            <div className="flex space-x-4">
              <span className="hover:underline cursor-pointer">Security Terms</span>
              <span>&bull;</span>
              <span className="hover:underline cursor-pointer">Privacy Protocol</span>
            </div>
          </div>

        </div>
      </footer>

    </div>
  );
}
