export interface PersonalInfo {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  dateOfBirth?: string;
  title?: string;
  summary?: string;
  linkedin?: string;
  github?: string;
  website?: string;
}

export interface Education {
  id: string;
  school: string;
  degree: string;
  fieldOfStudy: string;
  startDate: string;
  endDate?: string;
  location?: string;
  gpa?: string;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate?: string;
  location?: string;
  achievements?: string[];
  technologies?: string[];
}

export interface Skill {
  id: string;
  name: string;
  category?: string;
  color?: string;
  fontStyle?: "normal" | "italic";
  fontWeight?: "normal" | "bold";
  textDecoration?: "none" | "underline";
}

export interface Project {
  id: string;
  name: string;
  link?: string;
  technologies?: string[];
  startDate?: string;
  endDate?: string;
  highlights?: string[];
}

export interface CVStyle {
  primaryColor: string;
  backgroundColor: string;
  backgroundPattern?: string;
}

export interface CV {
  personalInfo?: PersonalInfo;
  education?: Education[];
  experience?: Experience[];
  skills?: Skill[];
  projects?: Project[];
  style?: CVStyle;
  id?: string;
  lastUpdated?: string;
}
