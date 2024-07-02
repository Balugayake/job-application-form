import React, { useState } from 'react';
import './App.css';
import { Routes, Route, useNavigate } from 'react-router-dom';
import PersonalInfoForm from './component/PersonalInfoForm';
import { nextTick } from 'process';
import EducationForm from './component/EducationForm';
import WorkExperienceForm from './component/WorkExperienceForm';
import SkillsForm from "./component/SkillForm"
import AdditionalInfoForm from './component/AdditionalInfoForm';
import ReviewForm from './component/ReviewForm';

function App() {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();

  const nextStep = () => {
    setStep(step + 1);
    navigate(`/step${step + 1}`);
  };

  const prevStep = () => {
    setStep(step - 1);
    navigate(`/step${step - 1}`);
  };

  const handleSubmit = () => {
    alert('Application Submitted!');
  };
  return (
    <div className='app-container'>
      <Routes>
        <Route path="/step1" element={<PersonalInfoForm nextStep={nextStep}/>} />
        <Route path="/step2" element={<EducationForm nextStep={nextStep} prevStep={prevStep}/>} />
        <Route path="/step3" element={<WorkExperienceForm nextStep={nextStep} prevStep={prevStep} />} />
        <Route path="/step4" element={<SkillsForm nextStep={nextStep} prevStep={prevStep} />} />
        <Route path="/step5" element={<AdditionalInfoForm nextStep={nextStep} prevStep={prevStep} />} />
        <Route path="/step6" element={<ReviewForm prevStep={prevStep} handleSubmit={handleSubmit} />} />
      </Routes>
    </div>
  );
}

export default App;
