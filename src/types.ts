export interface Trainer {
  id: string;
  name: string;
  role: string;
  certification: string;
  image: string;
  specialties: string[];
  socials: {
    instagram?: string;
    twitter?: string;
    youtube?: string;
  };
}

export interface Program {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  iconName: string;
  benefits: string[];
  intensity: 'Beginner' | 'Intermediate' | 'Advanced' | 'All Levels';
  duration: string;
  caloriesBurned: string;
  image: string;
}

export interface ScheduleSession {
  id: string;
  day: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';
  time: string;
  className: string;
  trainerName: string;
  duration: string;
  spotsLeft: number;
  level: string;
}

export interface PricingPlan {
  id: string;
  name: string;
  price: number;
  period: string;
  description: string;
  features: string[];
  isPopular: boolean;
}

export interface GymLead {
  id: string;
  name: string;
  email: string;
  phone: string;
  selectedProgram: string;
  selectedPlan: string;
  message: string;
  date: string;
  status: 'New' | 'Contacted' | 'Enrolled' | 'Archived';
}

export interface GymSettings {
  gymName: string;
  weeklyAnnouncement: string;
  freePassActive: boolean;
}
