
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FormState, PersonalInfo, Education, WorkExperience, Skills, AdditionalInfo } from '../types/type';

const initialState: FormState = {
  personalInfo: { name: '', email: '', phone: '', address: '' },
  education: [
    { level: 'ssc', school: 'ssc', board: '', cgpa: '', year: '' },
    { level: 'hsc', school: 'hsc', board: '', cgpa: '', year: '' },
    { level: 'graduation', school: 'graduation', board: '', cgpa: '', year: '' },
    { level: 'postGraduation', school: 'postGraduation', board: '', cgpa: '', year: '' },
  ],
  workExperience: [{id:1, companyName: '', jobTitle: '', duration: '' }],
  skills: { technicalSkills: '', certifications: '' }, 
  additionalInfo: { coverLetter: '', resume: null },
};

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    updatePersonalInfo: (state, action: PayloadAction<PersonalInfo>) => {
      state.personalInfo = action.payload;
    },
    updateEducation: (state, action: PayloadAction<Education[]>) => {
      state.education = action.payload;
    },
    updateWorkExperience: (state, action: PayloadAction<WorkExperience[]>) => {
      state.workExperience = action.payload;
    },
    updateSkills: (state, action: PayloadAction<Skills>) => {
      state.skills = action.payload;
    },
    updateAdditionalInfo: (state, action: PayloadAction<AdditionalInfo>) => {
      state.additionalInfo = action.payload;
    },
  },
});

export const {
  updatePersonalInfo,
  updateEducation,
  updateWorkExperience,
  updateSkills,
  updateAdditionalInfo,
} = formSlice.actions;

export default formSlice.reducer;
