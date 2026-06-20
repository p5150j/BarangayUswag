export interface Cohort {
  id?: string;
  name: string;
  status: "upcoming" | "active" | "completed";
  venue: string;
  barangay: string;
  startDate: string;
  endDate: string;
  sessionCount: number;
  description?: string;
  createdAt: Date;
}

export interface Registration {
  id?: string;
  cohortId: string;
  cohortName: string;
  childFirstName: string;
  childLastName: string;
  age: number;
  gender: "Male" | "Female" | "Prefer not to say";
  gradeLevel: string;
  schoolName: string;
  barangay: string;
  hasSmartphone: boolean;
  guardianName: string;
  guardianContact: string;
  heardFrom: string;
  createdAt: Date;
}

export interface Session {
  id?: string;
  cohortId: string;
  cohortName: string;
  venue: string;
  date: string;
  phase: 1 | 2 | 3 | 4;
  kidsPresent: number;
  volunteersPresent: number;
  volunteerHours: number;
  appsShipped: number;
  notes: string;
  createdAt: Date;
}

export interface Volunteer {
  id?: string;
  name: string;
  contact: string;
  type: "local" | "remote";
  localRole?: string;
  remoteRole?: string;
  cohortId?: string;
  cohortName?: string;
  shippingHardware: boolean;
  hardwareType?: string;
  location?: string;
  notes?: string;
  createdAt: Date;
}
