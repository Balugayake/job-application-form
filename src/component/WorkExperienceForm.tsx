import React, { useState, FormEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Button, TextField, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { Add, Delete } from '@mui/icons-material';
import { updateWorkExperience } from '../features/form/form.slice';
import { WorkExperience } from '../features/types/type';
import { RootState } from '../store'

interface Props {
  nextStep: () => void;
  prevStep: () => void;
}

const WorkExperienceForm: React.FC<Props> = ({ nextStep, prevStep }) => {
  const dispatch = useDispatch();
  const workExperienceFromStore = useSelector((state: RootState) => state.form.workExperience);
  const [workExperience, setWorkExperience] = useState<WorkExperience[]>(workExperienceFromStore)


  const handleChange = (id: number, field: keyof WorkExperience, value: string) => {
    const updatedExperience = workExperience.map((experience) =>
      experience.id === id ? { ...experience, [field]: value } : experience
    );
    setWorkExperience(updatedExperience);
  };

  const addExperience = () => {
    const newId = workExperience.length > 0 ? workExperience[workExperience.length - 1].id + 1 : 1;
    setWorkExperience([...workExperience, { id: newId, companyName: '', jobTitle: '', duration: '' }]);
  };

  const removeExperience = (id: number) => {
    const updatedExperience = workExperience.filter((experience) => experience.id !== id);
    setWorkExperience(updatedExperience);
  };



  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(updateWorkExperience(workExperience));
    nextStep();
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Work Experience</h2>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Company Name</TableCell>
              <TableCell>Job Title</TableCell>
              <TableCell>Duration</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {workExperience.map((experience) => (
              <TableRow key={experience.id}>
                <TableCell>
                
                    <TextField
                      value={experience.companyName}
                      onChange={(e) => handleChange(experience.id, 'companyName', e.target.value)}
                      fullWidth
                    />
                 
                </TableCell>
                <TableCell>
                 
                    <TextField
                      value={experience.jobTitle}
                      onChange={(e) => handleChange(experience.id, 'jobTitle', e.target.value)}
                      fullWidth
                    />
               
                </TableCell>
                <TableCell>
                 
                    <TextField
                      value={experience.duration}
                      onChange={(e) => handleChange(experience.id, 'duration', e.target.value)}
                      fullWidth
                    />
                
                </TableCell>
                <TableCell>
                <IconButton onClick={() => removeExperience(experience.id)} aria-label="delete">
                    <Delete />
                </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Button startIcon={<Add />} onClick={addExperience} style={{ marginTop: '10px' }}>
        Add Experience
      </Button>

      <div>
        <Button variant="contained" onClick={prevStep} style={{ marginTop: '10px', marginRight: '10px' }}>
          Previous
        </Button>
        <Button variant="contained" color="primary" type="submit" style={{ marginTop: '10px' }}>
          Next
        </Button>
      </div>
    </form>
  );
};

export default WorkExperienceForm;
