import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TextField, Button, Box } from '@mui/material';
import { RootState } from '../store';
import { updateSkills } from '../features/form/form.slice';


interface Props {
  nextStep: () => void;
  prevStep: () => void;
}

const SkillForm: React.FC<Props> = ({ nextStep, prevStep }) => {
  const dispatch = useDispatch();

  const { technicalSkills, certifications } = useSelector((state: RootState) => state.form.skills);

  const [values, setValues] = React.useState({
    technicalSkills: technicalSkills || '',
    certifications: certifications || '',
  });

  useEffect(() => {
    setValues({
      technicalSkills: technicalSkills || '',
      certifications: certifications || '',
    });
  }, [technicalSkills, certifications]);

  const handleChange = (input: keyof typeof values) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [input]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(updateSkills(values));
    nextStep();
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      noValidate
      autoComplete="off"
      sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 3 }}
    >
      <TextField
        label="Technical Skills"
        variant="outlined"
        fullWidth
        margin="normal"
        value={values.technicalSkills}
        onChange={handleChange('technicalSkills')}
      />
      <TextField
        label="Certifications"
        variant="outlined"
        fullWidth
        margin="normal"
        value={values.certifications}
        onChange={handleChange('certifications')}
      />
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
        <Button variant="contained" color="secondary" onClick={prevStep}>
          Previous
        </Button>
        <Button type="submit" variant="contained" color="primary">
          Next
        </Button>
      </Box>
    </Box>
  );
};

export default SkillForm;
