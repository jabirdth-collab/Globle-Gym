import { useState } from 'react';
import { PricingPlan } from '../types';
import { INITIAL_MEMBERSHIPS } from '../data';
import { Check, Info, Sparkles, ShieldAlert, Plus, ToggleLeft, ToggleRight } from 'lucide-react';

interface MembershipProps {
  onSelectPlan: (planName: string, finalPrice: number) => void;
}

export default function Membership({ onSelectPlan }: MembershipProps) {
  // Customizer add-ons state
  const [personalTrainer, setPersonalTrainer] = useState(false);
  const [dietPlan, setDietPlan] = useState(false);
  const [spaAccess, setSpaAccess] = useState(false);
  const [vipLocker, setVipLocker] = useState(false);

  // Compute custom rates
  const ptCost = 40;
  const dietCost = 15;
  const spaCost = 25;
  const lockerCost = 10;

  const getAddonTotal = () => {
    let total = 0;
    if (personalTrainer) total += ptCost;
    if (dietPlan) total += dietCost;
    if (spaAccess) total += spaCost;
    if (vipLocker) total += lockerCost;
    return total;
  };

  const getFinalPrice = (basePrice: number) => {
    return basePrice + getAddonTotal();
  };

  return (
    <section id="pricing" className="py-24 bg-obsidian-905 relative overflow-hidden">
      {/* Absolute graphic filters */}
      <div className="absolute top-1/3 left-10 w-96 h-96 bg-neon-yellow/3 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Block */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <span className="text-neon-yellow text-xs font-bold tracking-widest uppercase bg-neon-yellow/10 px-3.5 py-1.5 rounded-full">
            MEMBERSHIP TIERS
          </span>
          <h2 className="font-display font-black text-3xl sm:text-5xl text-white tracking-tight uppercase">
            CHOOSE YOUR PASS TO POTENTIAL
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            No lock-in contracts. Cancel or modify membership levels on-demand. Personalize your package below to get tailored pricing.
          </p>
        </div>

        {/* 1. Dynamic Add-ons Customizer Console */}
        <div className="bg-obsidian-900 border border-obsidian-750 rounded-3xl p-6 sm:p-8 mb-16" id="pricing-customizer">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Customizer explanation */}
            <div className="lg:col-span-5 space-y-4">
              <span className="text-[10px] uppercase font-mono bg-neon-yellow/10 text-neon-yellow font-extrabold px-3 py-1 rounded-full">
                Interactive Customizer
              </span>
              <h3 className="font-display font-black text-xl sm:text-2xl text-white">
                BUILD YOUR BESPOKE PACKAGE
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Want extra performance boosters? Customize your gym membership with highly localized add-ons. Toggling items below will update the monthly rates on the package cards in real-time.
              </p>

              {/* Summary item */}
              <div className="p-4 bg-obsidian-800 border border-obsidian-750 rounded-xl space-y-2">
                <p className="text-xs text-slate-400">CURRENT CUSTOMIZER TOTALS:</p>
                <p className="font-display font-black text-2xl text-neon-yellow font-mono">+${getAddonTotal()} <span className="text-xs text-slate-400 font-sans font-normal">/ month added</span></p>
              </div>
            </div>

            {/* Interactive Toggle Grid */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4" id="addons-controls">
              
              {/* Option 1: PT */}
              <div
                onClick={() => setPersonalTrainer(!personalTrainer)}
                className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-start justify-between select-none ${
                  personalTrainer
                    ? 'bg-neon-yellow/10 border-neon-yellow'
                    : 'bg-obsidian-800 border-obsidian-750 hover:border-slate-650'
                }`}
              >
                <div className="space-y-1">
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider">Certified coach (1-on-1)</h4>
                  <p className="text-[11px] text-slate-400 leading-snug">Weekly private coaching check-in</p>
                </div>
                <div className="text-right flex flex-col items-end space-y-2">
                  <span className="font-mono text-xs font-black text-neon-yellow">+${ptCost}/mo</span>
                  {personalTrainer ? (
                    <ToggleRight className="h-6 w-6 text-neon-yellow" />
                  ) : (
                    <ToggleLeft className="h-6 w-6 text-slate-500" />
                  )}
                </div>
              </div>

              {/* Option 2: Meal Plan */}
              <div
                onClick={() => setDietPlan(!dietPlan)}
                className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-start justify-between select-none ${
                  dietPlan
                    ? 'bg-neon-yellow/10 border-neon-yellow'
                    : 'bg-obsidian-800 border-obsidian-750 hover:border-slate-650'
                }`}
              >
                <div className="space-y-1">
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider">Custom meal macros</h4>
                  <p className="text-[11px] text-slate-450 leading-snug">Flexible nutrition plans updated monthly</p>
                </div>
                <div className="text-right flex flex-col items-end space-y-2">
                  <span className="font-mono text-xs font-black text-neon-yellow">+${dietCost}/mo</span>
                  {dietPlan ? (
                    <ToggleRight className="h-6 w-6 text-neon-yellow" />
                  ) : (
                    <ToggleLeft className="h-6 w-6 text-slate-500" />
                  )}
                </div>
              </div>

              {/* Option 3: Cryo/Spa */}
              <div
                onClick={() => setSpaAccess(!spaAccess)}
                className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-start justify-between select-none ${
                  spaAccess
                    ? 'bg-neon-yellow/10 border-neon-yellow'
                    : 'bg-obsidian-800 border-obsidian-750 hover:border-slate-650'
                }`}
              >
                <div className="space-y-1">
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider">Ice plunge & Cryo access</h4>
                  <p className="text-[11px] text-slate-450 leading-snug">Unlimited recovery lounges & saunas</p>
                </div>
                <div className="text-right flex flex-col items-end space-y-2">
                  <span className="font-mono text-xs font-black text-neon-yellow">+${spaCost}/mo</span>
                  {spaAccess ? (
                    <ToggleRight className="h-6 w-6 text-neon-yellow" />
                  ) : (
                    <ToggleLeft className="h-6 w-6 text-slate-500" />
                  )}
                </div>
              </div>

              {/* Option 4: Luxury Locker */}
              <div
                onClick={() => setVipLocker(!vipLocker)}
                className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-start justify-between select-none ${
                  vipLocker
                    ? 'bg-neon-yellow/10 border-neon-yellow'
                    : 'bg-obsidian-800 border-obsidian-750 hover:border-slate-650'
                }`}
              >
                <div className="space-y-1">
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider">Towel & Private Locker</h4>
                  <p className="text-[11px] text-slate-450 leading-snug">Fresh laundry towel service each session</p>
                </div>
                <div className="text-right flex flex-col items-end space-y-2">
                  <span className="font-mono text-xs font-black text-neon-yellow">+${lockerCost}/mo</span>
                  {vipLocker ? (
                    <ToggleRight className="h-6 w-6 text-neon-yellow" />
                  ) : (
                    <ToggleLeft className="h-6 w-6 text-slate-500" />
                  )}
                </div>
              </div>

            </div>

          </div>
        </div>

        {/* 2. Three Columns Standard Packages Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch" id="pricing-tier-grid">
          {INITIAL_MEMBERSHIPS.map((plan) => {
            const calculatedPrice = getFinalPrice(plan.price);
            return (
              <div
                key={plan.id}
                className={`relative rounded-3xl bg-obsidian-900 border overflow-hidden p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 hover:-translate-y-2 ${
                  plan.isPopular
                    ? 'border-neon-yellow shadow-[0_12px_36px_rgba(202,234,16,0.15)] ring-1 ring-neon-yellow/30'
                    : 'border-obsidian-750 hover:border-slate-705'
                }`}
                id={`plan-card-${plan.id}`}
              >
                {/* Popular highlight pill */}
                {plan.isPopular && (
                  <div className="absolute top-0 right-0 bg-neon-yellow text-obsidian-900 px-5 py-1.5 rounded-bl-2xl font-display font-extrabold text-[10px] tracking-widest uppercase flex items-center space-x-1 shadow-md z-10 animate-pulse-slow">
                    <Sparkles className="h-3.5 w-3.5" />
                    <span>BEST SELLER</span>
                  </div>
                )}

                {/* Package Headings */}
                <div className="space-y-4">
                  <div>
                    <h3 className="font-display font-black text-xl text-white tracking-wide">{plan.name}</h3>
                    <p className="text-slate-450 text-xs mt-1 leading-relaxed">{plan.description}</p>
                  </div>

                  {/* Price breakdown block */}
                  <div className="bg-obsidian-800/80 border border-obsidian-750 p-4 rounded-2xl flex items-baseline space-x-2 relative font-mono">
                    <span className="text-neon-yellow font-display font-black text-4xl">${calculatedPrice}</span>
                    <span className="text-xs text-slate-400">/ {plan.period}</span>
                    {getAddonTotal() > 0 && (
                      <span className="absolute bottom-1 right-3 text-[9px] text-slate-450 font-sans tracking-wide">Incl: +${getAddonTotal()} additions</span>
                    )}
                  </div>

                  <h4 className="text-xs font-bold text-slate-350 tracking-widest uppercase pb-2 border-b border-slate-800/80">INCLUDED ACCESS BENEFITS:</h4>
                  
                  {/* Highlights checklist */}
                  <div className="space-y-3">
                    {plan.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start space-x-2.5 text-xs text-slate-300">
                        <div className="h-4 w-4 rounded-full bg-neon-yellow/10 border border-neon-yellow/20 flex items-center justify-center shrink-0 mt-0.5">
                          <Check className="h-2.5 w-2.5 text-neon-yellow" />
                        </div>
                        <span>{feature}</span>
                      </div>
                    ))}

                    {/* Show customizable additions if enabled */}
                    {personalTrainer && (
                      <div className="flex items-start space-x-2.5 text-xs text-neon-yellow bg-neon-yellow/5 p-2 rounded-lg border border-neon-yellow/20">
                        <Check className="h-4 w-4 shrink-0" />
                        <span className="font-semibold">Add-on: 1-on-1 Certified Coach Included</span>
                      </div>
                    )}
                    {dietPlan && (
                      <div className="flex items-start space-x-2.5 text-xs text-neon-yellow bg-neon-yellow/5 p-2 rounded-lg border border-neon-yellow/20">
                        <Check className="h-4 w-4 shrink-0" />
                        <span className="font-semibold">Add-on: Nutritional Macro Map Blueprint</span>
                      </div>
                    )}
                    {spaAccess && (
                      <div className="flex items-start space-x-2.5 text-xs text-neon-yellow bg-neon-yellow/5 p-2 rounded-lg border border-neon-yellow/20">
                        <Check className="h-4 w-4 shrink-0" />
                        <span className="font-semibold">Add-on: Recovery Plunge & Spa Lounge</span>
                      </div>
                    )}
                    {vipLocker && (
                      <div className="flex items-start space-x-2.5 text-xs text-neon-yellow bg-neon-yellow/5 p-2 rounded-lg border border-neon-yellow/20">
                        <Check className="h-4 w-4 shrink-0" />
                        <span className="font-semibold">Add-on: Private Locker + Fresh Towel Service</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Confirm Tier CTA Plan */}
                <div className="pt-8 mt-6">
                  <button
                    onClick={() => {
                      onSelectPlan(plan.name, calculatedPrice);
                      const contactSection = document.getElementById('contact');
                      if (contactSection) contactSection.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className={`w-full py-4.5 rounded-xl font-display font-black text-sm tracking-widest uppercase transition-all duration-300 shadow-md ${
                      plan.isPopular
                        ? 'bg-neon-yellow hover:bg-neon-yellow-hover text-obsidian-900 shadow-neon-yellow/25 hover:shadow-neon-yellow/35'
                        : 'bg-obsidian-800 hover:bg-neon-yellow text-slate-200 hover:text-obsidian-900 border border-obsidian-750'
                    }`}
                  >
                    SELECT TIER PACKAGE
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Guarantee highlight */}
        <div className="mt-12 text-center text-xs text-slate-500 max-w-sm mx-auto flex items-center justify-center space-x-2 bg-obsidian-900/40 p-3 rounded-full border border-obsidian-750">
          <Info className="h-4 w-4 text-neon-yellow shrink-0" />
          <span>7-Day satisfaction Money Back policy. No hidden signup fees.</span>
        </div>

      </div>
    </section>
  );
}
