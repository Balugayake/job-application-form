import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PersonalInfo } from '../features/types/type';
import { updatePersonalInfo } from '../features/form/form.slice';
import { Container, TextField, Button, Typography, Box } from '@mui/material';
import { RootState } from '../store';

interface Props {
  nextStep: () => void;
}

const PersonalInfoForm: React.FC<Props> = ({ nextStep }) => {
  const dispatch = useDispatch();  
  const personalInfoFromStore = useSelector((state: RootState) => state.form.personalInfo);
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo>(personalInfoFromStore);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPersonalInfo({
      ...personalInfo,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(updatePersonalInfo(personalInfo));
    nextStep();
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          mt: 3,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5">
          Personal Information
        </Typography>
        <TextField
          margin="normal"
          required
          fullWidth
          id="name"
          label="Name"
          name="name"
          autoComplete="name"
          autoFocus
          value={personalInfo.name}
          onChange={handleChange}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          value={personalInfo.email}
          onChange={handleChange}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="phone"
          label="Phone Number"
          name="phone"
          autoComplete="phone"
          value={personalInfo.phone}
          onChange={handleChange}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="address"
          label="Address"
          name="address"
          autoComplete="address"
          value={personalInfo.address}
          onChange={handleChange}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Next
        </Button>
      </Box>
    </Container>
  );
};

export default PersonalInfoForm;
