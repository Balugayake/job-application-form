import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Education } from '../features/types/type';
import { updateEducation } from '../features/form/form.slice';
import { Button, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { RootState } from '../store';

interface Props {
  nextStep: () => void;
  prevStep: () => void;
}

const EducationForm: React.FC<Props> = ({ nextStep, prevStep }) => {
  const dispatch = useDispatch();
  const educationFromStore = useSelector((state: RootState) => state.form.education);
  const [education, setEducation] = useState<Education[]>(educationFromStore)

  const [editing, setEditing] = useState<{ level: string | null; field: keyof Education | null }>({ level: null, field: null });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, level: string, field: keyof Education) => {
    const { value } = e.target;
    setEducation((prevEducation) =>
      prevEducation.map((edu) =>
        edu.level === level ? { ...edu, [field]: value } : edu
      )
    );
  };



  const handleSave = () => {
    setEditing({ level: null, field: null });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(updateEducation(education));
    nextStep();
  };

  return (
    <form onSubmit={handleSubmit} className="container mt-5">
      <h2>Education</h2>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
             
              <TableCell>School/Institute Name</TableCell>
              <TableCell>Board/University</TableCell>
              <TableCell>CGPA</TableCell>
              <TableCell>Passing Year</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {education.map((edu) => (
              <TableRow key={edu.level}>
                <TableCell>
                    <TextField
                      value={edu.school}
                      autoFocus
                    />
                 
                </TableCell>
                <TableCell>
                
                    <TextField
                      value={edu.board}
                      onChange={(e) => handleChange(e, edu.level, 'board')}
                      onBlur={handleSave}
                      autoFocus
                    />
                  
                </TableCell>
                <TableCell>
                
                    <TextField
                      value={edu.cgpa}
                      onChange={(e) => handleChange(e, edu.level, 'cgpa')}
                      onBlur={handleSave}
                      autoFocus
                    />
                 
                </TableCell>
                <TableCell>
                  
                    <TextField
                      value={edu.year}
                      onChange={(e) => handleChange(e, edu.level, 'year')}
                      onBlur={handleSave}
                      autoFocus
                    />
                  
                </TableCell>

              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div style={{ marginTop: '20px' }}>
        <Button variant="contained" onClick={prevStep} style={{ marginRight: '10px' }}>
          Previous
        </Button>
        <Button variant="contained" color="primary" type="submit">
          Next
        </Button>
      </div>
    </form>
  );
};

export default EducationForm;
