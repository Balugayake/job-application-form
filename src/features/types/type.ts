
export interface PersonalInfo {
    name: string;
    email: string;
    phone: string;
    address: string;
  }
  
  export interface Education {
    level: 'ssc' | 'hsc' | 'graduation' | 'postGraduation';
    school: string;
    board: string;
    cgpa: string;
    year: string;
  }
  
  export interface WorkExperience {
    id: number;
    companyName: string;
    jobTitle: string;
    duration: string;
  }
  
  export interface Skills {
    technicalSkills: string;
    certifications: string;
  }
  
  export interface AdditionalInfo {
    coverLetter: string;
    resume: File | null;
  }
  
  export interface FormState {
    personalInfo: PersonalInfo;
    education: Education[];
    workExperience: WorkExperience[];
    skills: Skills;
    additionalInfo: AdditionalInfo;
  }
  