import React, { useState, FormEvent, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  Button,
  TextField,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
} from "@mui/material";
import { Add, Delete } from "@mui/icons-material";
import { updateWorkExperience } from "../features/form/form.slice";
import { WorkExperience } from "../features/types/type";
import { RootState } from "../store";

interface Props {
  nextStep: () => void;
  prevStep: () => void;
}

const WorkExperienceForm: React.FC<Props> = ({ nextStep, prevStep }) => {
  const dispatch = useDispatch();
  const workExperienceFromStore = useSelector(
    (state: RootState) => state.form.workExperience
  );
  const [workExperience, setWorkExperience] = useState<WorkExperience[]>(
    workExperienceFromStore
  );

  const [errors, setErrors] = useState<{
    [key: number]: { [key in keyof WorkExperience]?: string };
  }>({});

  const handleChange = (
    id: number,
    field: keyof WorkExperience,
    value: string
  ) => {
    const updatedExperience = workExperience.map((experience) =>
      experience.id === id ? { ...experience, [field]: value } : experience
    );
    setWorkExperience(updatedExperience);
  };

  const addExperience = () => {
    const newId =
      workExperience.length > 0
        ? workExperience[workExperience.length - 1].id + 1
        : 1;
    setWorkExperience([
      ...workExperience,
      { id: newId, companyName: "", jobTitle: "", duration: "" },
    ]);
  };

  const removeExperience = (id: number) => {
    const updatedExperience = workExperience.filter(
      (experience) => experience.id !== id
    );
    setWorkExperience(updatedExperience);
  };
  const [isValidData, setIsValidData] = useState<boolean>();
  const validateField = (
    field: string,
    value1: string | number,
    id: number
  ) => {
    let error = "";
    const value = value1.toString();
    if (!value) {
      error = "Required";
    }
    if (field === "companyName" && value.length > 50) {
      error = "Company name should be less than 50 characters";
    } else if (field === "companyName" && value.length < 2 && !error) {
      error = "Company name should be greater than 2 characters";
    } else if (field === "jobTitle" && value.length > 30) {
      error = "Job title should be less than 30 characters";
    } else if (field === "jobTitle" && value.length < 4 && !error) {
      error = "Job title should be greater than 4 characters";
    } else if (field === "duration" && value.length > 40) {
      error = "Duration should be less than 40 characters";
    } else if (field === "duration" && value.length < 0) {
      error = "Enter the Positive Number";
    }
    setErrors((prevErrors) => ({
      ...prevErrors,
      [id]: {
        ...prevErrors[id],
        [field]: error,
      },
    }));
    if (error) {
      setIsValidData(true);
    } else {
      setIsValidData(false);
    }
    return error === "";
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const isValid = workExperience.every((experience) =>
      ["companyName", "jobTitle", "duration"].every((field) =>
        validateField(
          field as keyof WorkExperience,
          experience[field as keyof WorkExperience],
          experience.id
        )
      )
    );
    if (isValid) {
      dispatch(updateWorkExperience(workExperience));
      nextStep();
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 2, mt: 3, mx: "auto", maxWidth: "80%"}}>
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
                    type="text"
                    value={experience.companyName}
                    autoFocus
                    onChange={(e) =>
                      handleChange(experience.id, "companyName", e.target.value)
                    }
                    onBlur={(e) => {
                      const value = e.target.value;
                      validateField("companyName", value, experience.id);
                    }}
                    error={Boolean(errors[experience.id]?.companyName)}
                    helperText={errors[experience.id]?.companyName}
                    fullWidth
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    type="text"
                    value={experience.jobTitle}
                    onChange={(e) =>
                      handleChange(experience.id, "jobTitle", e.target.value)
                    }
                    onBlur={(e) => {
                      const value = e.target.value;
                      validateField("jobTitle", value, experience.id);
                    }}
                    error={Boolean(errors[experience.id]?.jobTitle)}
                    helperText={errors[experience.id]?.jobTitle}
                    fullWidth
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    value={experience.duration}
                    type="number"
                    InputProps={{ inputProps: { min: 0, max: 40 } }}
                    onChange={(e) =>
                      handleChange(experience.id, "duration", e.target.value)
                    }
                    onBlur={(e) => {
                      const value = e.target.value;
                      validateField("duration", value, experience.id);
                    }}
                    error={Boolean(errors[experience.id]?.duration)}
                    helperText={errors[experience.id]?.duration}
                  />
                </TableCell>
                <TableCell>
                  <IconButton
                    onClick={() => removeExperience(experience.id)}
                    aria-label="delete"
                  >
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Button
        startIcon={<Add />}
        onClick={addExperience}
        style={{ marginTop: "10px" }}
      >
        Add Experience
      </Button>

      <div>
        <Button
          variant="contained"
          onClick={prevStep}
          style={{ marginTop: "10px", marginRight: "10px" }}
        >
          Previous
        </Button>
        <Button
          variant="contained"
          color="primary"
          type="submit"
          style={{ marginTop: "10px" }}
          disabled={isValidData ?? true}
         
        >
          Next
        </Button>
      </div>
    </form>
    </Box>
  );
};

export default WorkExperienceForm;
