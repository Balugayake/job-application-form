import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PersonalInfo } from '../features/types/type';
import { updatePersonalInfo } from '../features/form/form.slice';
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Snackbar,
  Alert,
} from '@mui/material';
import { RootState } from '../store';
import { addEmitHelpers } from 'typescript';

interface Props {
  nextStep: () => void;
}

const PersonalInfoForm: React.FC<Props> = ({ nextStep }) => {
  const dispatch = useDispatch();
  const personalInfoFromStore = useSelector((state: RootState) => state.form.personalInfo);
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo>(personalInfoFromStore);

  const [alert, setAlert] = useState({
    open: false,
    message: '',
    severity: 'error' as 'error' | 'warning' | 'info' | 'success',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPersonalInfo({
      ...personalInfo,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!personalInfo.name || !personalInfo.email || !personalInfo.phone || !personalInfo.address) {
      setAlert({
        open: true,
        message: 'All fields are required.',
        severity: 'error',
      });
      return;
    }
    dispatch(updatePersonalInfo(personalInfo));
    nextStep();
  };

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setAlert({ ...alert, open: false });
  };
const [allError,setAllError]=useState({
  nameError:"",
  emailError:"",
  phoneError:"",
  addressError:""
})

const validateName = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
  const { value } = e.target;
  const namePattern = /^[a-zA-Z]+(?: [a-zA-Z]+)*$/; 

  if (!value) {
    setAllError({ ...allError, nameError: 'Name is required' });
    return;
  }

  if (!namePattern.test(value)) {
    setAllError({ ...allError, nameError: 'Name must contain only alphabetical characters' });
    return;
  }
  if(value){
    setAllError({...allError,nameError:""})
  }
};
const validateEmail = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
  const { value } = e.target;
  if(!value){
    setAllError({...allError,emailError:"Email is required"})
    return
  }
  const checkEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  if(!checkEmail.test(value)){
    setAllError({...allError,emailError:"Invalid email"})
    return
  }
  if(value){
    setAllError({...allError,emailError:""})
  }
}
const validatePhone = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
  const { value } = e.target;
  if(!value){
    setAllError({...allError,phoneError:"Phone number is required"})
    return
  }
  const checkPhone = /^\d{10}$/;
  if(!checkPhone.test(personalInfo.phone)){
    setAllError({...allError,phoneError:"Invalid phone number"})
    return
  }
  if(value){
    setAllError({...allError,phoneError:""})
  }
}
const validateAddress = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
  const { value } = e.target;
  const addressPattern = /^(?!^\d+$)[a-zA-Z0-9\s,.-]+$/;
  if(!value){

    setAllError({...allError,addressError:"Address is required"})
    return
  }
  if (!addressPattern.test(value)) {
    setAllError({ ...allError, addressError: 'Address must contain both letters and numbers' });
    return;
  }
  if(value){
    setAllError({...allError,addressError:""})
  }
}
const isError=allError.nameError || allError.emailError || allError.phoneError || allError.addressError
  return (
    <Container component="main" maxWidth="xs">
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          mt: 3,
          p: 5,
          boxShadow: 2,
          borderRadius: 2,
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
          fullWidth
          id="name"
          label="Name *"
          name="name"
          autoComplete="name"
          inputProps={{ type: 'text',maxLength: 30,minLength: 2 }}
          autoFocus
          value={personalInfo.name}
          onChange={handleChange}
          onBlur={(e)=>validateName(e)}
          error={Boolean(allError.nameError)}
          helperText={allError.nameError}
        />
        <TextField
          margin="normal"
          
          fullWidth
          id="email"
          label="Email Address *"
          name="email"
          inputProps={{ type: 'email',maxLength: 30 }}
          autoComplete="email"
          value={personalInfo.email}
          onChange={handleChange}
          onBlur={(e)=>validateEmail(e)}
          error={Boolean(allError.emailError)}
          helperText={allError.emailError}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="phone"
          type="number"
          // pattern="[0-9]{10}"
          inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' ,minLength: 10,maxLength: 10 }}
          label="Phone Number"
          name="phone"
          autoComplete="phone"
          value={personalInfo.phone}
          onChange={handleChange}
          onBlur={(e)=>validatePhone(e)}
          error={Boolean(allError.phoneError)}
          helperText={allError.phoneError}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="address"
          label="Address"
          name="address"
          inputProps={{ maxLength: 60 }}
          autoComplete="address"
          value={personalInfo.address}
          onChange={handleChange}
          onBlur={(e)=>validateAddress(e)}
          error={Boolean(allError.addressError)}
          helperText={allError.addressError}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          disabled={Boolean(isError)}
         
        >
          Next
        </Button>
      </Box>
      <Snackbar
        open={alert.open}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity={alert.severity} sx={{ width: '100%' }}>
          {alert.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default PersonalInfoForm;
