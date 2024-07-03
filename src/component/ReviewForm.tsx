import React from 'react';
import { useSelector } from 'react-redux';
import {
  Box,
  Button,
  Typography,
  Paper,
  Grid,
} from '@mui/material';
import { RootState } from '../store';


interface Props {
  handleSubmit: () => void;
  prevStep: () => void;
}

const ReviewForm: React.FC<Props> = ({ handleSubmit, prevStep }) => {
  const formState = useSelector((state: RootState) => state.form);

  const {
    personalInfo,
    education,
    workExperience,
    skills,
    additionalInfo,
  } = formState;
console.log(education)
  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h2" gutterBottom>
        Review Your Application
      </Typography>
      <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
        <Typography variant="h4" gutterBottom>
          Personal Information
        </Typography>
        <Typography variant="body1" paragraph>
          <strong>Name:</strong> {personalInfo.name}
        </Typography>
        <Typography variant="body1" paragraph>
          <strong>Email:</strong> {personalInfo.email}
        </Typography>
        <Typography variant="body1" paragraph>
          <strong>Phone:</strong> {personalInfo.phone}
        </Typography>
        <Typography variant="body1" paragraph>
          <strong>Address:</strong> {personalInfo.address}
        </Typography>
      </Paper>
      <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
        <Typography variant="h4" gutterBottom>
          Education
        </Typography>
        {education.map((edu) => (
          <Box key={edu.level} sx={{ mb: 3 }}>
            <Typography variant="h5" gutterBottom>
              {edu.level.toUpperCase()}
            </Typography>
            <Typography variant="body1" paragraph>
              <strong>School/Institute:</strong> {edu.school}
            </Typography>
            <Typography variant="body1" paragraph>
              <strong>Board/University:</strong> {edu.board}
            </Typography>
            <Typography variant="body1" paragraph>
              <strong>CGPA:</strong> {edu.cgpa}
            </Typography>
            <Typography variant="body1" paragraph>
              <strong>Passing Year:</strong> {edu.year}
            </Typography>
          </Box>
        ))}
     
      </Paper>
      <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
        <Typography variant="h4" gutterBottom>
          Work Experience
        </Typography>
        {workExperience.map((experience, index) => (
          <Box key={index} sx={{ mb: 3 }}>
            <Typography variant="body1" paragraph>
              <strong>Company Name:</strong> {experience.companyName}
            </Typography>
            <Typography variant="body1" paragraph>
              <strong>Job Title:</strong> {experience.jobTitle}
            </Typography>
            <Typography variant="body1" paragraph>
              <strong>Duration:</strong> {experience.duration}
            </Typography>
          </Box>
        ))}
      </Paper>
      <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
        <Typography variant="h4" gutterBottom>
          Skills and Qualifications
        </Typography>
        <Typography variant="body1" paragraph>
          <strong>Technical Skills:</strong> {skills.technicalSkills}
        </Typography>
        <Typography variant="body1" paragraph>
          <strong>Certifications:</strong> {skills.certifications}
        </Typography>
      </Paper>
      <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
        <Typography variant="h4" gutterBottom>
          Additional Information
        </Typography>
        <Typography variant="body1" paragraph>
          <strong>Cover Letter:</strong> {additionalInfo.coverLetter}
        </Typography>
        <Typography variant="body1" paragraph>
          <strong>Resume:</strong> {additionalInfo.resume && additionalInfo?.resume.name}
        </Typography>
      </Paper>
      <Grid container spacing={2}>
        <Grid item>
          <Button variant="contained" color="secondary" onClick={prevStep}>
            Previous
          </Button>
        </Grid>
        <Grid item>
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Submit Application
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ReviewForm;
