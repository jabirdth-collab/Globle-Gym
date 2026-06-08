import { useState, useEffect, FormEvent } from 'react';
import { GymLead, GymSettings } from '../types';
import { ClipboardList, Trash2, Check, RefreshCw, Star, Megaphone, Info, Database, Mail, Phone, DollarSign, Award } from 'lucide-react';

interface AdminPanelProps {
  leads: GymLead[];
  settings: GymSettings;
  onUpdateSettings: (newSettings: GymSettings) => void;
  onUpdateLeadsList: (leads: GymLead[]) => void;
  onClose: () => void;
}

export default function AdminPanel({
  leads,
  settings,
  onUpdateSettings,
  onUpdateLeadsList,
  onClose
}: AdminPanelProps) {
  const [announcement, setAnnouncement] = useState(settings.weeklyAnnouncement);
  const [gymName, setGymName] = useState(settings.gymName);
  const [freePass, setFreePass] = useState(settings.freePassActive);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Sync settings when initially rendered
  useEffect(() => {
    setAnnouncement(settings.weeklyAnnouncement);
    setGymName(settings.gymName);
    setFreePass(settings.freePassActive);
  }, [settings]);

  const handleUpdateStatus = (leadId: string, status: GymLead['status']) => {
    const updated = leads.map((l) => (l.id === leadId ? { ...l, status } : l));
    onUpdateLeadsList(updated);
    localStorage.setItem('global_gym_leads', JSON.stringify(updated));
  };

  const handleDeleteLead = (leadId: string) => {
    const remaining = leads.filter((l) => l.id !== leadId);
    onUpdateLeadsList(remaining);
    localStorage.setItem('global_gym_leads', JSON.stringify(remaining));
  };

  const handleBulkClear = () => {
    if (window.confirm('Are you sure you want to permanently clear all leads from cPanel localized storage?')) {
      onUpdateLeadsList([]);
      localStorage.removeItem('global_gym_leads');
    }
  };

  const handleSettingsSave = (e: FormEvent) => {
    e.preventDefault();
    const updatedSettings: GymSettings = {
      gymName: gymName.trim() || 'GLOBAL GYM',
      weeklyAnnouncement: announcement.trim(),
      freePassActive: freePass
    };
    onUpdateSettings(updatedSettings);
    localStorage.setItem('global_gym_settings', JSON.stringify(updatedSettings));
    
    setSaveSuccess(true);
    setTimeout(() => {
      setSaveSuccess(false);
    }, 3000);
  };

  // Compute CRM analytics totals
  const totalLeads = leads.length;
  const contactedLeads = leads.filter(l => l.status === 'Contacted').length;
  const enrolledLeads = leads.filter(l => l.status === 'Enrolled').length;
  
  // Calculate potential monthly revenue based on registered plans
  const computePotentialRevenue = () => {
    return leads.reduce((sum, lead) => {
      if (lead.status === 'Archived') return sum;
      if (lead.selectedPlan.includes('Basic')) return sum + 29;
      if (lead.selectedPlan.includes('Carbon')) return sum + 59;
      if (lead.selectedPlan.includes('Platinum')) return sum + 149;
      return sum;
    }, 0);
  };

  const revenue = computePotentialRevenue();

  const getStatusColor = (status: GymLead['status']) => {
    switch (status) {
      case 'New': return 'bg-sky-500/10 text-sky-400 border border-sky-500/20';
      case 'Contacted': return 'bg-amber-500/10 text-amber-400 border border-amber-500/20';
      case 'Enrolled': return 'bg-emerald-500/10 text-emerald-450 border border-emerald-500/20';
      default: return 'bg-slate-700/20 text-slate-400 border border-slate-700/30';
    }
  };

  return (
    <div className="bg-obsidian-900 border border-obsidian-750 p-6 sm:p-8 rounded-3xl space-y-8 relative overflow-hidden" id="admin-hub-dashboard">
      
      {/* Decorative Title */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pb-4 border-b border-slate-800/80 gap-4">
        <div>
          <span className="text-neon-yellow text-[10px] font-bold tracking-widest uppercase font-mono bg-neon-yellow/10 px-2.5 py-1 rounded-full">Automated Management Suite</span>
          <h2 className="font-display font-black text-2xl text-white tracking-wide mt-2">GLOBAL GYM ADMIN PORTAL</h2>
          <p className="text-xs text-slate-400">Manage client-side localized leads, update web variables, and audit CRM statistics instantly.</p>
        </div>
        <button
          onClick={onClose}
          className="px-4 py-2 border border-obsidian-700 hover:border-slate-500 text-slate-300 hover:text-white rounded-xl text-xs font-semibold cursor-pointer shrink-0"
        >
          Hide Dashboard
        </button>
      </div>

      {/* 1. Analytics highlights cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4" id="admin-analytics-grid">
        <div className="bg-obsidian-800 border border-obsidian-750 p-4 rounded-xl relative overflow-hidden font-mono text-center">
          <p className="text-[10px] text-slate-400 font-sans tracking-wide">TOTAL CRUTCH LEADS</p>
          <p className="text-3xl font-display font-black text-white mt-1">{totalLeads}</p>
          <div className="absolute top-2 right-2 p-1.5 bg-obsidian-900 rounded-lg text-neon-yellow">
            <ClipboardList className="h-4 w-4" />
          </div>
        </div>

        <div className="bg-obsidian-800 border border-obsidian-750 p-4 rounded-xl relative overflow-hidden font-mono text-center">
          <p className="text-[10px] text-slate-400 font-sans tracking-wide">SUCCESS ENROLLEMENTS</p>
          <p className="text-3xl font-display font-black text-emerald-400 mt-1">{enrolledLeads}</p>
          <div className="absolute top-2 right-2 p-1.5 bg-obsidian-900 rounded-lg text-emerald-450">
            <Check className="h-4 w-4" />
          </div>
        </div>

        <div className="bg-obsidian-800 border border-obsidian-750 p-4 rounded-xl relative overflow-hidden font-mono text-center">
          <p className="text-[10px] text-slate-400 font-sans tracking-wide">PENDING OUTREACH</p>
          <p className="text-3xl font-display font-black text-amber-400 mt-1">{leads.filter(l => l.status === 'New').length}</p>
          <div className="absolute top-2 right-2 p-1.5 bg-obsidian-900 rounded-lg text-amber-450">
            <RefreshCw className="h-4 w-4 animate-spin-slow" />
          </div>
        </div>

        <div className="bg-obsidian-800 border border-obsidian-750 p-4 rounded-xl relative overflow-hidden font-mono text-center">
          <p className="text-[10px] text-slate-400 font-sans tracking-wide">POTENTIAL REVENUE</p>
          <p className="text-3xl font-display font-black text-neon-yellow mt-1">${revenue} <span className="text-[11px] text-slate-500 font-sans">/mo</span></p>
          <div className="absolute top-2 right-2 p-1.5 bg-obsidian-900 rounded-lg text-neon-yellow">
            <DollarSign className="h-4 w-4 animate-pulse" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* 2. Left side: Dashboard configuration variables editor */}
        <div className="lg:col-span-5 bg-obsidian-800 border border-obsidian-750 p-5 rounded-2xl space-y-4" id="admin-settings-panel">
          <h3 className="font-display font-bold text-sm text-white tracking-widest uppercase flex items-center space-x-2 border-b border-obsidian-700 pb-2">
            <Megaphone className="h-4 w-4 text-neon-yellow" />
            <span>GLOBAL GYM REAL-TIME CMS VARIABLES</span>
          </h3>

          <form onSubmit={handleSettingsSave} className="space-y-4">
            
            {/* Save success banner */}
            {saveSuccess && (
              <div className="bg-emerald-500/15 border border-emerald-500/30 text-emerald-450 p-3 rounded-xl text-xs flex items-center space-x-2">
                <Check className="h-4 w-4" />
                <span>Real-time CMS values updated instantly!</span>
              </div>
            )}

            {/* Gym Name Customizer */}
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-slate-400 uppercase">GYM BRAND NAME</label>
              <input
                type="text"
                value={gymName}
                onChange={(e) => setGymName(e.target.value)}
                className="w-full bg-obsidian-900 border border-obsidian-700 rounded-xl px-3.5 py-2.5 text-xs text-slate-250 focus:outline-none focus:border-neon-yellow"
              />
            </div>

            {/* Live Announcements config */}
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-slate-400 uppercase">WEEKLY WEBSITE ANNOUNCEMENT BAR</label>
              <textarea
                value={announcement}
                onChange={(e) => setAnnouncement(e.target.value)}
                rows={3}
                placeholder="Declare active alerts or campaigns displayed in the Hero banner..."
                className="w-full bg-obsidian-900 border border-obsidian-700 rounded-xl px-3.5 py-2.5 text-xs text-slate-250 focus:outline-none focus:border-neon-yellow resize-none"
              />
            </div>

            {/* Free Pass variable toggle */}
            <div className="flex items-center justify-between p-3.5 bg-obsidian-900 rounded-xl border border-obsidian-700/80">
              <div className="space-y-0.5">
                <h4 className="text-xs font-bold text-white uppercase">ACTIVATED WORKOUT PASSPORT</h4>
                <p className="text-[10px] text-slate-450 leading-relaxed">Let guest visitors request 1 session passes</p>
              </div>
              <input
                type="checkbox"
                checked={freePass}
                onChange={(e) => setFreePass(e.target.checked)}
                className="w-4 h-4 accent-neon-yellow cursor-pointer"
              />
            </div>

            {/* Trigger Button */}
            <button
              type="submit"
              className="w-full bg-neon-yellow hover:bg-neon-yellow-hover text-obsidian-900 font-display font-black text-xs uppercase tracking-widest py-3 rounded-xl transition-all duration-300"
            >
              SAVE WEBSITE CHANGES
            </button>

          </form>

          <div className="bg-obsidian-900 border border-opsidian-750 p-4 rounded-xl text-[10px] text-slate-500 leading-normal">
            <Info className="h-4 w-4 text-neon-yellow shrink-0 mb-1" />
            <span>Any saved changes modify React states globally. Your user preview will reflect these shifts instantly. Perfect for cPanel static page updates!</span>
          </div>
        </div>

        {/* 3. Right side: Lead Registry CRM Reviewer List */}
        <div className="lg:col-span-7 bg-obsidian-800 border border-obsidian-750 p-5 rounded-2xl space-y-4" id="admin-crm-list-panel">
          <div className="flex items-center justify-between border-b border-obsidian-700 pb-2">
            <h3 className="font-display font-bold text-sm text-white tracking-widest uppercase flex items-center space-x-2">
              <ClipboardList className="h-4.5 w-4.5 text-neon-yellow" />
              <span>CLIENT LEAD INBOX REGISTRY ({totalLeads})</span>
            </h3>
            {totalLeads > 0 && (
              <button
                onClick={handleBulkClear}
                className="text-[10px] font-bold text-rose-450 hover:text-rose-450 flex items-center space-x-1 border border-rose-500/20 hover:border-rose-500/40 px-2 py-1 rounded"
              >
                <Trash2 className="h-3.5 w-3.5" />
                <span>Bulk Clear</span>
              </button>
            )}
          </div>

          {leads.length > 0 ? (
            <div className="space-y-4 max-h-[31rem] overflow-y-auto pr-1" id="leads-items-scroller">
              {leads.map((lead) => (
                <div
                  key={lead.id}
                  className="bg-obsidian-900 border border-obsidian-750 rounded-xl p-4.5 space-y-3 relative overflow-hidden"
                  id={`panel-lead-${lead.id}`}
                >
                  {/* Lead Header */}
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between border-b border-slate-800/80 pb-2.5 gap-2">
                    <div>
                      <h4 className="font-display font-bold text-sm text-white">{lead.name}</h4>
                      <p className="text-[10px] text-slate-450 font-mono mt-0.5">Logged: {lead.date}</p>
                    </div>

                    {/* Operational Onboarding status switches */}
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${getStatusColor(lead.status)}`}>
                        {lead.status}
                      </span>
                      
                      {/* Active Status update triggers */}
                      <select
                        value={lead.status}
                        onChange={(e) => handleUpdateStatus(lead.id, e.target.value as GymLead['status'])}
                        className="bg-obsidian-800 border border-slate-700 text-[10px] text-slate-300 rounded px-1.5 py-0.5 focus:outline-none"
                      >
                        <option value="New">Set New</option>
                        <option value="Contacted">Set Open</option>
                        <option value="Enrolled">Set Enroll</option>
                        <option value="Archived">Archive</option>
                      </select>

                      <button
                        onClick={() => handleDeleteLead(lead.id)}
                        className="text-slate-500 hover:text-rose-450 p-1 rounded hover:bg-obsidian-750"
                        title="Delete Lead"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Registered Options & Contacts */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs text-slate-350 bg-obsidian-800/40 p-2.5 rounded-lg border border-slate-800/60 font-mono">
                    <div className="space-y-1.5">
                      <div className="flex items-center space-x-1.5">
                        <Mail className="h-3.5 w-3.5 text-neon-yellow shrink-0" />
                        <span className="truncate">{lead.email}</span>
                      </div>
                      <div className="flex items-center space-x-1.5">
                        <Phone className="h-3.5 w-3.5 text-neon-yellow shrink-0" />
                        <span>{lead.phone}</span>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <p>Focus: <strong className="text-white font-sans">{lead.selectedProgram}</strong></p>
                      <p>Tier: <strong className="text-neon-yellow font-sans">{lead.selectedPlan}</strong></p>
                    </div>
                  </div>

                  {/* Custom Message */}
                  <div className="text-xs text-slate-400 bg-obsidian-850 p-3 rounded-lg border border-slate-800 italic leading-relaxed">
                    &ldquo;{lead.message}&rdquo;
                  </div>

                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-obsidian-900 rounded-xl border border-obsidian-750 flex flex-col items-center justify-center space-y-3">
              <Database className="h-10 w-10 text-slate-650 animate-pulse" />
              <div className="space-y-1">
                <p className="text-white font-medium font-display text-sm">Lead Database Registry Empty</p>
                <p className="text-[11px] text-slate-450 max-w-sm mx-auto leading-relaxed">There are currently no persistent customer enrollments logged. Use the Secure Inquiry form at the footer to log dynamic entries!</p>
              </div>
            </div>
          )}

        </div>

      </div>

    </div>
  );
}
