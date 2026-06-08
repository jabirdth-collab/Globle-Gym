import { useState, useEffect, FormEvent } from 'react';
import { GymLead } from '../types';
import { Mail, Phone, MapPin, Clock, Send, ShieldAlert, CheckCircle, Gift } from 'lucide-react';

interface ContactProps {
  selectedProgram: string;
  selectedPlan: string;
  onNewLeadSubmit: (lead: GymLead) => void;
  claimFreePassTriggered: boolean;
  onResetFreePassTrigger: () => void;
}

export default function Contact({
  selectedProgram,
  selectedPlan,
  onNewLeadSubmit,
  claimFreePassTriggered,
  onResetFreePassTrigger
}: ContactProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [program, setProgram] = useState('');
  const [plan, setPlan] = useState('');
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Handle outside state selections
  useEffect(() => {
    if (selectedProgram) {
      setProgram(selectedProgram);
    }
  }, [selectedProgram]);

  useEffect(() => {
    if (selectedPlan) {
      setPlan(selectedPlan);
    }
  }, [selectedPlan]);

  useEffect(() => {
    if (claimFreePassTriggered) {
      setPlan('Claimed Free Pass - 1 Session');
      setProgram('Athletic Strength'); // Default selection
      setMessage('I want to claim my Free Workout Pass! Please set up my diagnostic check-in.');
      onResetFreePassTrigger();
      const el = document.getElementById('contact');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  }, [claimFreePassTriggered, onResetFreePassTrigger]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    // Quick validation checks
    if (!name.trim()) return setErrorMessage('Please enter your full name.');
    if (!email.trim() || !email.includes('@')) return setErrorMessage('Please enter a valid email address.');
    if (!phone.trim() || phone.length < 8) return setErrorMessage('Please enter a valid phone number.');

    const newLead: GymLead = {
      id: `lead-${Date.now()}`,
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
      selectedProgram: program || 'General Fitness',
      selectedPlan: plan || 'Explore Tier',
      message: message.trim() || 'No custom message specified.',
      date: new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
      }),
      status: 'New'
    };

    // Store in localStorage
    const savedLeads = localStorage.getItem('global_gym_leads');
    const list: GymLead[] = savedLeads ? JSON.parse(savedLeads) : [];
    list.unshift(newLead);
    localStorage.setItem('global_gym_leads', JSON.stringify(list));

    // Callback to update administrative stats
    onNewLeadSubmit(newLead);

    // Reset forms & trigger success states
    setSuccess(true);
    setName('');
    setEmail('');
    setPhone('');
    setProgram('');
    setPlan('');
    setMessage('');

    setTimeout(() => {
      setSuccess(false);
    }, 5000);
  };

  return (
    <section id="contact" className="py-24 bg-obsidian-850 relative scroll-mt-12">
      <div className="absolute top-1/4 right-1/4 w-80 h-80 bg-neon-yellow/3 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Block */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <span className="text-neon-yellow text-xs font-bold tracking-widest uppercase bg-neon-yellow/10 px-3.5 py-1.5 rounded-full">
            Inquire Within
          </span>
          <h2 className="font-display font-black text-3xl sm:text-5xl text-white tracking-tight uppercase">
            BEGIN YOUR REVOLUTION TODAY
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            Have questions about our biomechanic diagnostics or facilities? Fill out the portal. Our performance planners respond within 2 business hours.
          </p>
        </div>

        {/* Dashboard Grid split 5-7 */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch" id="contact-wrapper">
          
          {/* Company Details left - Span 5 */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-8 bg-obsidian-900 border border-obsidian-750 p-6 sm:p-8 rounded-2xl" id="contact-info-col">
            <div className="space-y-6">
              <h3 className="font-display font-bold text-xl text-white">READY TO JOIN THE ELITE?</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Connect with our front desk managers or book a private walkthrough tour of our facilities. We look forward to seeing your potential.
              </p>

              {/* Information listings */}
              <div className="space-y-4">
                
                {/* Physical Location */}
                <div className="flex items-start space-x-3.5 text-sm">
                  <div className="bg-neon-yellow/10 p-2.5 rounded-lg text-neon-yellow mt-0.5 shrink-0">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white uppercase tracking-wider text-[11px]">Flagship Location</h4>
                    <p className="text-slate-350 text-xs mt-1 leading-relaxed">742 Performance Way, Kinetic District,<br />Sector 8, cPanel Avenue</p>
                  </div>
                </div>

                {/* Email Contact */}
                <div className="flex items-start space-x-3.5 text-sm">
                  <div className="bg-neon-yellow/10 p-2.5 rounded-lg text-neon-yellow mt-0.5 shrink-0">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white uppercase tracking-wider text-[11px]">Direct Email</h4>
                    <p className="text-slate-350 text-xs mt-1">support@globalgym.net</p>
                  </div>
                </div>

                {/* Phone Line */}
                <div className="flex items-start space-x-3.5 text-sm">
                  <div className="bg-neon-yellow/10 p-2.5 rounded-lg text-neon-yellow mt-0.5 shrink-0">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white uppercase tracking-wider text-[11px]">Club Frontdesk Hotline</h4>
                    <p className="text-slate-350 text-xs mt-1">+1 (800) 555-PHYS (7497)</p>
                  </div>
                </div>

                {/* Facility Hours */}
                <div className="flex items-start space-x-3.5 text-sm">
                  <div className="bg-neon-yellow/10 p-2.5 rounded-lg text-neon-yellow mt-0.5 shrink-0">
                    <Clock className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white uppercase tracking-wider text-[11px]">Sactuary Hours</h4>
                    <p className="text-slate-350 text-xs mt-1">Weekdays: 5:00 AM - 11:00 PM</p>
                    <p className="text-slate-450 text-[11px] mt-0.5">Weekends: 6:00 AM - 9:00 PM</p>
                  </div>
                </div>

              </div>
            </div>

            {/* Simulated Live map widget placeholder */}
            <div className="relative h-44 rounded-xl overflow-hidden border border-obsidian-750">
              <div className="absolute inset-0 bg-obsidian-800 flex flex-col items-center justify-center space-y-2 select-none">
                <MapPin className="h-8 w-8 text-neon-yellow animate-bounce-slow" />
                <span className="text-white font-display text-xs font-bold tracking-widest uppercase">Kinetic District Flagship</span>
                <span className="text-[10px] text-slate-450">Active route navigation enabled</span>
              </div>
            </div>

          </div>

          {/* Core Interactive Portal - Span 7 */}
          <div className="lg:col-span-7 bg-obsidian-900 border border-obsidian-750 p-6 sm:p-8 rounded-2xl flex flex-col justify-between" id="contact-portal-col">
            
            <form onSubmit={handleSubmit} className="space-y-5" id="lead-submit-form">
              <h3 className="font-display font-bold text-lg text-white pb-3 border-b border-slate-800/80 uppercase">
                Secure Inquiry Terminal
              </h3>

              {/* Form errors feedback */}
              {errorMessage && (
                <div className="bg-rose-500/10 border border-rose-500/35 text-rose-400 p-4 rounded-xl text-xs sm:text-sm flex items-center space-x-2">
                  <ShieldAlert className="h-4.5 w-4.5 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Form success toast feedback */}
              {success && (
                <div className="bg-emerald-500/10 border border-emerald-500/35 text-emerald-450 p-4 rounded-xl text-xs sm:text-sm space-y-1 block md:flex md:items-center md:justify-between">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-5 w-5 shrink-0 text-emerald-400 animate-pulse" />
                    <div>
                      <h4 className="font-bold">Registration Confirmed!</h4>
                      <p className="text-xs text-slate-400">Lead added into Local Storage Registry.</p>
                    </div>
                  </div>
                  <div className="text-xs text-slate-400 font-mono mt-2 md:mt-0 font-bold bg-obsidian-800 p-2 rounded">
                    Check Admin Hub at top to verify leads.
                  </div>
                </div>
              )}

              {/* Two Column Inputs Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-1">Full Name</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter athlete name"
                    className="w-full bg-obsidian-800 border border-obsidian-700 rounded-xl px-4 py-3 text-sm text-slate-100 placeholder-slate-400 focus:outline-none focus:border-neon-yellow"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-1">Email Address</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@domain.com"
                    className="w-full bg-obsidian-800 border border-obsidian-700 rounded-xl px-4 py-3 text-sm text-slate-100 placeholder-slate-400 focus:outline-none focus:border-neon-yellow"
                  />
                </div>
              </div>

              {/* Personal Contact phone line & program selection */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-1">Contact Phone</label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+1 (555) 000-0000"
                    className="w-full bg-obsidian-800 border border-obsidian-700 rounded-xl px-4 py-3 text-sm text-slate-100 placeholder-slate-400 focus:outline-none focus:border-neon-yellow"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-1">Preferred Program</label>
                  <select
                    value={program}
                    onChange={(e) => setProgram(e.target.value)}
                    className="w-full bg-obsidian-800 border border-obsidian-700 rounded-xl px-4 py-3 text-sm text-slate-100 placeholder-slate-400 focus:outline-none focus:border-neon-yellow"
                  >
                    <option value="">Select training focus...</option>
                    <option value="Athletic Strength">Athletic Strength Focus</option>
                    <option value="Kinetic HIIT">Kinetic HIIT Interval</option>
                    <option value="Striking Combat">Striking Combat MMA</option>
                    <option value="Zen Mobility & Yoga">Zen Mobility Yoga</option>
                    <option value="CrossFit Elite">CrossFit Elite WOD</option>
                    <option value="Bio-Recovery & Spa">Bio-Recovery Spa Session</option>
                  </select>
                </div>
              </div>

              {/* Package selection */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-1 font-semibold">Active Interest Membership Plan</label>
                <select
                  value={plan}
                  onChange={(e) => setPlan(e.target.value)}
                  className="w-full bg-obsidian-800 border border-obsidian-700 rounded-xl px-4 py-3 text-sm text-slate-100 focus:outline-none focus:border-neon-yellow cursor-pointer"
                >
                  <option value="">Select Package Tier</option>
                  <option value="Basic Gym Pass">Basic Gym Pass ($29/mo)</option>
                  <option value="Elite Carbon Tier">Elite Carbon Tier ($59/mo)</option>
                  <option value="Platinum VIP Membership">Platinum VIP Membership ($149/mo)</option>
                  <option value="Claimed Free Pass - 1 Session">Free Pass Ticket (1 Free Day)</option>
                </select>
              </div>

              {/* Custom message box */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-1">Personal Message & Goals</label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={3}
                  placeholder="Tell us about your fitness background, injuries, or goals..."
                  className="w-full bg-obsidian-800 border border-obsidian-700 rounded-xl px-4 py-3 text-sm text-slate-100 placeholder-slate-400 focus:outline-none focus:border-neon-yellow resize-none"
                />
              </div>

              {/* Core trigger action */}
              <button
                type="submit"
                id="submit-lead-btn"
                className="w-full bg-neon-yellow hover:bg-neon-yellow-hover text-obsidian-900 font-display font-medium py-3 rounded-xl uppercase tracking-widest text-sm flex items-center justify-center space-x-2 transition-all duration-300 transform active:scale-95 shadow-[0_4px_14px_rgba(202,234,16,0.2)]"
              >
                <span>Transmit Safe Registration</span>
                <Send className="h-4.5 w-4.5 shrink-0" />
              </button>

            </form>

            <div className="mt-4 pt-4 border-t border-slate-800 text-[10px] text-slate-500 leading-snug flex items-center space-x-2">
              <Gift className="text-neon-yellow h-4.5 w-4.5 shrink-0" />
              <span>Submit this register to trigger client-side persistent logging. Toggle top admin gear button to manage registered leads instantly.</span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
