import { Trainer, Program, ScheduleSession, PricingPlan, GymSettings } from './types';

export const INITIAL_TRAINERS: Trainer[] = [
  {
    id: 'tr-1',
    name: 'Marcus Vance',
    role: 'Head of Strength & Conditioning',
    certification: 'CSCS, USAW Level 2, B.S. Kinesiology',
    image: 'https://images.unsplash.com/photo-1567013127542-490d757e51fc?auto=format&fit=crop&q=80&w=600',
    specialties: ['Olympic Weightlifting', 'Powerlifting', 'Athletic Performance'],
    socials: {
      instagram: 'marcus_vance_strength',
      twitter: 'marcusstrength',
      youtube: 'vancestrend'
    }
  },
  {
    id: 'tr-2',
    name: 'Sarah Jenkins',
    role: 'Director of HIIT & Cardio Burn',
    certification: 'NASM-PES, FMS Level 1, CrossFit L2',
    image: 'https://images.unsplash.com/photo-1548690312-e3b507d8c110?auto=format&fit=crop&q=80&w=600',
    specialties: ['Metabolic Conditioning', 'Fat Loss Blueprint', 'Kettlebell Flow'],
    socials: {
      instagram: 'sarah_burn_it',
      youtube: 'burnwithsarah'
    }
  },
  {
    id: 'tr-3',
    name: 'Viktor "The Ram" Borzo',
    role: 'Combat & MMA Coordinator',
    certification: 'Former Light-Heavyweight Pro Wrestler & Muay Thai Kru',
    image: 'https://images.unsplash.com/photo-1594381898411-846e7d193883?auto=format&fit=crop&q=80&w=600',
    specialties: ['Kickboxing Skills', 'Self Defense Tactics', 'Striking Speed'],
    socials: {
      instagram: 'viktor_ram_borzo',
      twitter: 'ramboxer'
    }
  },
  {
    id: 'tr-4',
    name: 'Elena Rostova',
    role: 'Holistic Yoga & Recovery Specialist',
    certification: 'RYT-500, Pilates Reformer Pro, Myofascial Therapist',
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=600',
    specialties: ['Vinyasa Flow', 'Deep Mobility', 'Posture Correction', 'Breathwork'],
    socials: {
      instagram: 'elena_yoga_flow',
      youtube: 'elenarostovaflow'
    }
  }
];

export const INITIAL_PROGRAMS: Program[] = [
  {
    id: 'prg-1',
    title: 'Athletic Strength',
    description: 'Build raw physical power and muscle density through proven powerlifting and hyper-trophy methodologies.',
    longDescription: 'Our Athletic Strength program is engineered for individuals looking to shatter personal plateaus. Focused on compounds lifts (Squat, Bench Press, Deadlift), progressive overload, and accessory exercises, our coaches guide you through strict scientific block periodization.',
    iconName: 'Dumbbell',
    benefits: ['Increase absolute muscle tissue strength', 'Correct postural imbalances', 'Skyrocket neural muscular activation', 'Improve bone and joint density'],
    intensity: 'Advanced',
    duration: '60-75 Mins',
    caloriesBurned: '600 kcal',
    image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&q=80&w=1000'
  },
  {
    id: 'prg-2',
    title: 'Kinetic HIIT',
    description: 'High-intensity, high-energy intervals designed to boost VO2 max and stimulate premium fat-burning hours after workouts.',
    longDescription: 'Fast-paced, adrenaline-pumping circuit classes featuring Air bikes, rowing machines, skiergs, slam balls, and dumbbell complexes. Utilizing HIIT and tabata protocols, this program keeps your heart rate spiked for ultimate cardiovascular optimization.',
    iconName: 'Flame',
    benefits: ['Shatter metabolic plateaus', 'Optimize resting cardiorespiratory rate', 'Burn extreme calories in short duration', 'Boost resting metabolic rate'],
    intensity: 'Intermediate',
    duration: '45 Mins',
    caloriesBurned: '750 kcal',
    image: 'https://images.unsplash.com/photo-1601422407692-ec4eeec1d9b3?auto=format&fit=crop&q=80&w=1000'
  },
  {
    id: 'prg-3',
    title: 'Striking Combat',
    description: 'Unleash inner warrior fire. Master the fundamentals of Muay Thai, boxing, and combat conditioning.',
    longDescription: 'This full-contact, sweat-dripping combat class focuses on striking mechanics, guard structures, bag work, and responsive sparring drills. Designed for both self-defense and peak conditioning without needing to set foot in a real ring.',
    iconName: 'Shield',
    benefits: ['Improve physical reflexes', 'Supreme core and oblique rotation strength', 'Confidence & strategic high composure', 'Master tactical striking arts'],
    intensity: 'All Levels',
    duration: '60 Mins',
    caloriesBurned: '800 kcal',
    image: 'https://images.unsplash.com/photo-1511556532299-8f662fc26c06?auto=format&fit=crop&q=80&w=1000'
  },
  {
    id: 'prg-4',
    title: 'Zen Mobility & Yoga',
    description: 'Unlock tight hip joints and soothe minds. Gentle athletic flows, static hold releases, and mindful pranayama.',
    longDescription: 'A modern, athletic fusion of traditional Vinyasa, Yin, and functional range mobility. Excellent for active gym lifters wanting to recover tissue length, decompress spinal structures, and alleviate mental burnout.',
    iconName: 'Compass',
    benefits: ['Deepen operational joint range of motion', 'Flush systemic lactate from sore tissues', 'Alleviate lumbar compression patterns', 'Lower baseline cortisol stress factors'],
    intensity: 'Beginner',
    duration: '50 Mins',
    caloriesBurned: '300 kcal',
    image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=1000'
  },
  {
    id: 'prg-5',
    title: 'CrossFit Elite',
    description: 'High-power functional workouts combining Olympic lifting, gymnastics, and endurance challenges.',
    longDescription: 'Experience the thrill of a CrossFit Box. Master the Snatch, Clean & Jerk, pull-ups, and handstand walks. Constantly varied, high-intensity workouts of the day (WODs) programmed carefully to ensure safety and performance progression.',
    iconName: 'Zap',
    benefits: ['Master Olympic standard technical movements', 'Build unmatched well-rounded fitness', 'Compete with a community of high achievers', 'Explosive physical power capacity'],
    intensity: 'Advanced',
    duration: '60 Mins',
    caloriesBurned: '700 kcal',
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=1000'
  },
  {
    id: 'prg-6',
    title: 'Bio-Recovery & Spa',
    description: 'Premium scientific recovery containing infrared sauna sessions, ice plunge pools, and compression therapy.',
    longDescription: 'Maximize your performance by prioritizing optimal recovery. Global Gym members have exclusive access to cold thermogenesis tubs, medical-grade infrared saunas, Hyperice compression gear, and skilled physiotherapists to speed muscle repair and boost longevity.',
    iconName: 'Heart',
    benefits: ['Reduce swelling and delayed-onset muscular pain (DOMS)', 'Optimize vascular circulation', 'Flush toxic systemic inflammatory elements', 'Improve nervous system recovery'],
    intensity: 'All Levels',
    duration: 'Flexible',
    caloriesBurned: '50 kcal',
    image: 'https://images.unsplash.com/photo-1600881333168-2ef49b341f30?auto=format&fit=crop&q=80&w=1000'
  }
];

export const INITIAL_SCHEDULE: ScheduleSession[] = [
  // Monday
  { id: 'sc-1', day: 'Monday', time: '06:00 AM', className: 'CrossFit Power-WOD', trainerName: 'Marcus Vance', duration: '60 mins', spotsLeft: 12, level: 'Advanced' },
  { id: 'sc-2', day: 'Monday', time: '09:00 AM', className: 'HIIT Extreme Burn', trainerName: 'Sarah Jenkins', duration: '45 mins', spotsLeft: 8, level: 'Intermediate' },
  { id: 'sc-3', day: 'Monday', time: '11:00 AM', className: 'Power Yoga Flow', trainerName: 'Elena Rostova', duration: '50 mins', spotsLeft: 15, level: 'Beginner' },
  { id: 'sc-4', day: 'Monday', time: '05:30 PM', className: 'Athletic Strength Max', trainerName: 'Marcus Vance', duration: '75 mins', spotsLeft: 6, level: 'Advanced' },
  { id: 'sc-5', day: 'Monday', time: '07:00 PM', className: 'Muay Thai Striking', trainerName: 'Viktor Borzo', duration: '60 mins', spotsLeft: 10, level: 'All Levels' },

  // Tuesday
  { id: 'sc-6', day: 'Tuesday', time: '06:30 AM', className: 'Metabolic Ignite', trainerName: 'Sarah Jenkins', duration: '45 mins', spotsLeft: 14, level: 'Intermediate' },
  { id: 'sc-7', day: 'Tuesday', time: '10:00 AM', className: 'Olympic Lifting Drills', trainerName: 'Marcus Vance', duration: '60 mins', spotsLeft: 7, level: 'Advanced' },
  { id: 'sc-8', day: 'Tuesday', time: '04:30 PM', className: 'Restorative Mobility', trainerName: 'Elena Rostova', duration: '50 mins', spotsLeft: 20, level: 'All Levels' },
  { id: 'sc-9', day: 'Tuesday', time: '06:00 PM', className: 'MMA Grappling 101', trainerName: 'Viktor Borzo', duration: '60 mins', spotsLeft: 8, level: 'All Levels' },

  // Wednesday
  { id: 'sc-10', day: 'Wednesday', time: '06:00 AM', className: 'CrossFit Power-WOD', trainerName: 'Marcus Vance', duration: '60 mins', spotsLeft: 11, level: 'Advanced' },
  { id: 'sc-11', day: 'Wednesday', time: '09:00 AM', className: 'Kettlebell Velocity', trainerName: 'Sarah Jenkins', duration: '45 mins', spotsLeft: 9, level: 'Intermediate' },
  { id: 'sc-12', day: 'Wednesday', time: '05:30 PM', className: 'Hypertrophy Mastery', trainerName: 'Marcus Vance', duration: '75 mins', spotsLeft: 5, level: 'Advanced' },
  { id: 'sc-13', day: 'Wednesday', time: '07:00 PM', className: 'Cardio Kickboxing', trainerName: 'Viktor Borzo', duration: '60 mins', spotsLeft: 18, level: 'All Levels' },

  // Thursday
  { id: 'sc-14', day: 'Thursday', time: '07:00 AM', className: 'Fat Shed Circuit', trainerName: 'Sarah Jenkins', duration: '45 mins', spotsLeft: 15, level: 'Intermediate' },
  { id: 'sc-15', day: 'Thursday', time: '11:00 AM', className: 'Spine & Hip Care', trainerName: 'Elena Rostova', duration: '50 mins', spotsLeft: 19, level: 'Beginner' },
  { id: 'sc-16', day: 'Thursday', time: '06:00 PM', className: 'Fight Club Sparring', trainerName: 'Viktor Borzo', duration: '60 mins', spotsLeft: 4, level: 'Advanced' },

  // Friday
  { id: 'sc-17', day: 'Friday', time: '06:00 AM', className: 'CrossFit Power-WOD', trainerName: 'Marcus Vance', duration: '60 mins', spotsLeft: 14, level: 'Advanced' },
  { id: 'sc-18', day: 'Friday', time: '12:00 PM', className: 'Friday Fat Burner', trainerName: 'Sarah Jenkins', duration: '45 mins', spotsLeft: 12, level: 'Intermediate' },
  { id: 'sc-19', day: 'Friday', time: '05:30 PM', className: 'Chakra Awakening Flow', trainerName: 'Elena Rostova', duration: '50 mins', spotsLeft: 16, level: 'All Levels' },

  // Saturday
  { id: 'sc-20', day: 'Saturday', time: '08:00 AM', className: 'Weekend Warrior WOD', trainerName: 'Marcus Vance', duration: '60 mins', spotsLeft: 8, level: 'Advanced' },
  { id: 'sc-21', day: 'Saturday', time: '10:00 AM', className: 'Full-Body Combat Burn', trainerName: 'Viktor Borzo', duration: '60 mins', spotsLeft: 11, level: 'All Levels' },
  { id: 'sc-22', day: 'Saturday', time: '11:30 AM', className: 'Yin Yoga Restorative', trainerName: 'Elena Rostova', duration: '60 mins', spotsLeft: 22, level: 'Beginner' }
];

export const INITIAL_MEMBERSHIPS: PricingPlan[] = [
  {
    id: 'pay-1',
    name: 'Basic Gym Pass',
    price: 29,
    period: 'month',
    description: 'Ideal for independent lifters looking for premium-grade equipment and access.',
    features: [
      'Unlimited access to free weights and machines',
      'Modern locker rooms & shower facilities',
      'High-speed premium Wi-Fi',
      '1 Free body composition analysis',
      'Access from 5:00 AM to 11:00 PM'
    ],
    isPopular: false
  },
  {
    id: 'pay-2',
    name: 'Elite Carbon Tier',
    price: 59,
    period: 'month',
    description: 'Perfect for enthusiasts wanting to level up their training habits and join group classes.',
    features: [
      'All features of Basic Gym Pass',
      'Unlimited dynamic group-exercise classes',
      '2 Guest passes per month',
      '10% Discount at our Juice & Protein Bar',
      'Access to Bio-Recovery & Infrared Sauna',
      '24/7 Access to training facilities'
    ],
    isPopular: true
  },
  {
    id: 'pay-3',
    name: 'Platinum VIP Membership',
    price: 149,
    period: 'month',
    description: 'The ultimate bespoke wellness and performance experience with dedicated support.',
    features: [
      'All features of Elite Carbon Tier',
      '2 Private coaching check-ins per month',
      'Unlimited Access to Ice Plunges and Spa',
      'Customized metabolic & macro nutrition meal plan',
      'Complimentary workout towel service',
      'Exclusive priority class reservations via portal',
      'Dedicated private luxury locker storage'
    ],
    isPopular: false
  }
];

export const INITIAL_SETTINGS: GymSettings = {
  gymName: 'GLOBAL GYM',
  weeklyAnnouncement: '🚀 SUMMER ATHLETIC CAMP starts this Thursday! Sign up at our front desk today. 🔥',
  freePassActive: true
};
