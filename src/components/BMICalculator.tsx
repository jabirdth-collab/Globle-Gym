import { useState } from 'react';
import { Activity, Dumbbell, Sparkles, Check, Flame } from 'lucide-react';

export default function BMICalculator() {
  const [height, setHeight] = useState<number>(175); // in cm
  const [weight, setWeight] = useState<number>(70);  // in kg
  const [age, setAge] = useState<number>(26);
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [activity, setActivity] = useState<string>('moderate');

  // Calculates and displays
  const heightMeters = height / 100;
  const bmi = parseFloat((weight / (heightMeters * heightMeters)).toFixed(1));

  const getBmiCategory = (val: number) => {
    if (val < 18.5) return { label: 'Underweight', color: 'text-sky-400', barBg: 'bg-sky-400' };
    if (val < 25) return { label: 'Healthy Weight', color: 'text-emerald-400', barBg: 'bg-emerald-400' };
    if (val < 30) return { label: 'Overweight', color: 'text-amber-400', barBg: 'bg-amber-400' };
    return { label: 'Obese Range', color: 'text-rose-400', barBg: 'bg-rose-400' };
  };

  const bmiCat = getBmiCategory(bmi);

  // Basal Metabolic Rate (BMR) using Mifflin-St Jeor
  const bmr = gender === 'male'
    ? (10 * weight) + (6.25 * height) - (5 * age) + 5
    : (10 * weight) + (6.25 * height) - (5 * age) - 161;

  // Total Daily Energy Expenditure (TDEE) multiplier
  const getActivityMultiplier = (act: string) => {
    switch (act) {
      case 'sedentary': return 1.2;
      case 'light': return 1.375;
      case 'moderate': return 1.55;
      case 'active': return 1.725;
      default: return 1.55;
    }
  };

  const tdee = Math.round(bmr * getActivityMultiplier(activity));

  const getRecommendation = (val: number) => {
    if (val < 18.5) return {
      goal: 'Lean Muscle Hypertrophy',
      program: 'Athletic Strength',
      calories: tdee + 400,
      tips: ['Prioritize progressive compound lifts to build lean tissue mass.', 'Optimize protein uptake to 2.0g per kg of body weigh every day.', 'Supplement with high-quality creatine monohydrate and slow carbs.']
    };
    if (val < 25) return {
      goal: 'Performance Optimization',
      program: 'CrossFit Elite or Striking Combat',
      calories: tdee,
      tips: ['Engage in balanced Olympic lifts & cardiorespiratory HIIT routines.', 'Fuel workouts with structured simple sugars 30 mins pre-session.', 'Commit to active active restorative yoga loops for spine care.']
    };
    return {
      goal: 'Metabolic Fat Shred & Recomp',
      program: 'Kinetic HIIT',
      calories: tdee - 500,
      tips: ['Implement calorie deficits safely while preserving muscle with high resistance training.', 'Engage in post-strength steady-state low-heart-rate cardio work.', 'Cut out refined grains and highly processed vegetable oils.']
    };
  };

  const buildPlan = getRecommendation(bmi);

  return (
    <section id="bmi" className="py-24 bg-obsidian-900 border-b border-obsidian-750 relative overflow-hidden">
      <div className="absolute top-1/2 right-10 w-80 h-80 bg-neon-yellow/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Block */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <span className="text-neon-yellow text-xs font-bold tracking-widest uppercase bg-neon-yellow/10 px-3.5 py-1.5 rounded-full">
            Body Diagnostics
          </span>
          <h2 className="font-display font-black text-3xl sm:text-5xl text-white tracking-tight uppercase">
            CALCULATE HEALTH & CALORIE BLUEPRINTS
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            A scientifically built Mifflin-St Jeor engine. Input raw statistics to claim personalized dietary macros and program suggestions in seconds.
          </p>
        </div>

        {/* Dashboard layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch" id="bmi-panel">
          
          {/* Diagnostic Inputs Fields - Span 5 */}
          <div className="lg:col-span-5 bg-obsidian-800 border border-obsidian-750 p-6 sm:p-8 rounded-2xl flex flex-col justify-between" id="bmi-inputs-column">
            
            <div className="space-y-6">
              <h3 className="font-display font-bold text-lg text-white flex items-center space-x-2 border-b border-obsidian-700 pb-3">
                <Activity className="text-neon-yellow h-5 w-5" />
                <span>BIOMETRIC PARAMETERS</span>
              </h3>

              {/* Gender Toggle */}
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setGender('male')}
                  className={`py-3.5 rounded-xl font-display font-bold text-sm border-2 transition-all ${
                    gender === 'male'
                      ? 'bg-neon-yellow/15 border-neon-yellow text-white'
                      : 'bg-obsidian-750 border-obsidian-700 text-slate-400 hover:border-slate-500'
                  }`}
                >
                  MALE ATHLETE
                </button>
                <button
                  type="button"
                  onClick={() => setGender('female')}
                  className={`py-3.5 rounded-xl font-display font-bold text-sm border-2 transition-all ${
                    gender === 'female'
                      ? 'bg-neon-yellow/15 border-neon-yellow text-white'
                      : 'bg-obsidian-750 border-obsidian-700 text-slate-400 hover:border-slate-500'
                  }`}
                >
                  FEMALE ATHLETE
                </button>
              </div>

              {/* Height Slider */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-sm font-semibold">
                  <span className="text-slate-400">HEIGHT</span>
                  <span className="text-neon-yellow font-mono text-base">{height} cm</span>
                </div>
                <input
                  type="range"
                  min="130"
                  max="220"
                  value={height}
                  onChange={(e) => setHeight(parseInt(e.target.value))}
                  className="w-full accent-neon-yellow cursor-pointer h-1.5 bg-obsidian-700 rounded-lg"
                />
              </div>

              {/* Weight Slider */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-sm font-semibold">
                  <span className="text-slate-400">BODYWEIGHT</span>
                  <span className="text-neon-yellow font-mono text-base">{weight} kg <span className="text-[10px] text-slate-550">({Math.round(weight * 2.20462)} lbs)</span></span>
                </div>
                <input
                  type="range"
                  min="35"
                  max="150"
                  value={weight}
                  onChange={(e) => setWeight(parseInt(e.target.value))}
                  className="w-full accent-neon-yellow cursor-pointer h-1.5 bg-obsidian-700 rounded-lg"
                />
              </div>

              {/* Age & Activity */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wide">AGE (Years)</label>
                  <input
                    type="number"
                    min="14"
                    max="90"
                    value={age}
                    onChange={(e) => setAge(Math.max(14, Math.min(90, parseInt(e.target.value) || 20)))}
                    className="w-full bg-obsidian-750 border border-obsidian-700 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-neon-yellow"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wide">ACTIVITY FREQUENCY</label>
                  <select
                    value={activity}
                    onChange={(e) => setActivity(e.target.value)}
                    className="w-full bg-obsidian-750 border border-obsidian-700 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-neon-yellow cursor-pointer"
                  >
                    <option value="sedentary">Sedentary (desk job)</option>
                    <option value="light">Light Burn (1-2x/wk)</option>
                    <option value="moderate">Active Lifter (3-5x/wk)</option>
                    <option value="active">Extreme Athlete (每天/6x)</option>
                  </select>
                </div>
              </div>

            </div>

            <p className="text-[10px] text-slate-500 leading-relaxed pt-4 border-t border-slate-800/80">
              Disclaimer: Advanced muscle mass levels may skew standard BMI calculations. Our on-site InBody analysis is highly recommended for accurate muscle ratio metrics.
            </p>
          </div>

          {/* Premium Outcome Board - Span 7 */}
          <div className="lg:col-span-7 bg-obsidian-850 border border-obsidian-750 p-6 sm:p-8 rounded-2xl flex flex-col justify-between" id="bmi-outcomes-column">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              
              {/* Speedometer outcome wrapper */}
              <div className="space-y-4">
                <span className="text-[10px] font-extrabold text-slate-450 uppercase tracking-widest font-mono">YOUR DIAGNOSTIC RESULT:</span>
                
                <div className="bg-obsidian-900 border border-obsidian-700/60 p-6 rounded-2xl text-center space-y-2 relative overflow-hidden">
                  <p className="text-[11px] font-mono tracking-widest text-slate-400 uppercase">Body Mass Index (BMI)</p>
                  <p className="text-5xl font-display font-black text-white">{bmi}</p>
                  <p className={`font-display font-black tracking-wide text-sm ${bmiCat.color}`}>{bmiCat.label.toUpperCase()}</p>

                  {/* Horizontal Gauge Bar */}
                  <div className="w-full h-2 bg-obsidian-750 rounded-full overflow-hidden mt-4 relative">
                    <div className={`h-full ${bmiCat.barBg} transition-all duration-500`} style={{ width: `${Math.min(100, Math.max(10, ((bmi - 12) / 28) * 100))}%` }} />
                  </div>

                  <div className="flex justify-between font-mono text-[9px] text-slate-500 mt-1">
                    <span>18.5 (Min)</span>
                    <span>25.0 (Optimal)</span>
                    <span>30.0 (High)</span>
                  </div>
                </div>

                {/* Estimate Calories burn statistics card */}
                <div className="bg-obsidian-900 border border-obsidian-700/60 p-5 rounded-2xl space-y-1">
                  <p className="text-xs font-mono text-slate-450 tracking-wide uppercase flex items-center space-x-1">
                    <Flame className="h-4 w-4 text-neon-yellow shrink-0 animate-pulse" />
                    <span>Total Daily Expenditure (TDEE):</span>
                  </p>
                  <p className="font-display font-black text-2xl text-white font-mono">{tdee} <span className="text-xs text-slate-450 font-sans font-normal">kcal / day</span></p>
                  <p className="text-[10px] text-slate-400">Total estimated energy your system burns in a standard operational day.</p>
                </div>
              </div>

              {/* Dynamic Workout and Diet Checklist */}
              <div className="space-y-4 bg-obsidian-900 border border-obsidian-700/60 p-5 rounded-xl">
                <span className="text-[10px] font-mono tracking-widest text-slate-400 uppercase font-black flex items-center gap-1.5">
                  <Sparkles className="h-4 w-4 text-neon-yellow" />
                  <span>RECOMMENDED ACTION PLAN:</span>
                </span>

                <div className="space-y-1">
                  <p className="text-xs text-slate-450 font-semibold tracking-wide">FITNESS PATHWAY GOAL:</p>
                  <p className="font-display font-black text-base text-white flex items-center gap-1">
                    <Dumbbell className="h-4 w-4 text-neon-yellow" />
                    <span>{buildPlan.goal}</span>
                  </p>
                </div>

                <div className="space-y-1">
                  <p className="text-xs text-slate-450 font-semibold uppercase">Daily Dietary Target:</p>
                  <p className="font-display font-bold text-sm text-neon-yellow font-mono">{buildPlan.calories} kcal / day to reach goal</p>
                </div>

                <div className="space-y-2.5 pt-2 border-t border-slate-800/85">
                  <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">Macro & Behavior advice:</p>
                  {buildPlan.tips.map((tip, index) => (
                    <div key={index} className="flex items-start space-x-2 text-xs text-slate-350">
                      <div className="h-4 w-4 rounded bg-neon-yellow/10 border border-neon-yellow/20 flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="h-3 w-3 text-neon-yellow" />
                      </div>
                      <span className="leading-relaxed">{tip}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* CTA action routing to schedules */}
            <div className="border-t border-slate-800/80 pt-5 mt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
              <span className="text-xs font-semibold text-slate-400">Suggested Academy Program: <strong className="text-white bg-obsidian-700 px-2 py-0.5 rounded border border-slate-700 ml-1">{buildPlan.program}</strong></span>
              
              <a
                href="#pricing"
                className="text-xs text-black font-display font-black bg-neon-yellow px-5 py-2.5 rounded-xl flex items-center gap-1 animate-pulse-slow tracking-wider uppercase hover:bg-neon-yellow-hover"
              >
                <span>Shatter Obstacles - Join Gym</span>
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
