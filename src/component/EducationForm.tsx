import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Education } from "../features/types/type";
import { updateEducation } from "../features/form/form.slice";
import {
  Button,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
} from "@mui/material";
import { RootState } from "../store";

interface Props {
  nextStep: () => void;
  prevStep: () => void;
}

const EducationForm: React.FC<Props> = ({ nextStep, prevStep }) => {
  const dispatch = useDispatch();
  const educationFromStore = useSelector(
    (state: RootState) => state.form.education
  );
  const [education, setEducation] = useState<Education[]>(educationFromStore);

  const [editing, setEditing] = useState<{
    level: string | null;
    field: keyof Education | null;
  }>({ level: null, field: null });
  const [errors, setErrors] = useState<{
    [key: string]: { [key in keyof Education]?: string };
  }>({});
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    level: string,
    field: keyof Education
  ) => {
    const { value } = e.target;
    setEducation((prevEducation) =>
      prevEducation.map((edu) =>
        edu.level === level ? { ...edu, [field]: value } : edu
      )
    );
  };
  const [isValidData, setIsValidData] = useState<boolean>();
  const validateField = (
    level: string,
    field: keyof Education,
    value: string
  ) => {
    let error = "";
    const boardPattern = /^(?!^\d+$)[a-zA-Z0-9\s,.-]+$/;
    if (!value) {
      error = "Required";
    } else if (field === "board" && value.length > 50) {
      error = "Board/University name cannot exceed 50 characters";
    } else if (field === "board" && value.length < 4) {
      error = "Board/University name cannot be less than 4 characters";
    } else if(field === "board" && !boardPattern.test(value)) {
      error= 'Board/University contain both letters and numbers';
    }else if (
      field === "cgpa" &&
      (isNaN(Number(value)) || Number(value) < 0 || Number(value) > 10)
    ) {
      error = "Invalid CGPA";
    } else if (field === "year" && Number(value) < 1900) {
      error = "Year should be greater than 1900";
    } else if (
      field === "year" &&
      (isNaN(Number(value)) ||
        Number(value) < 1900 ||
        Number(value) > new Date().getFullYear())
    ) {
      error = "Invalid Year";
    }
    setErrors((prevErrors) => ({
      ...prevErrors,
      [level]: {
        ...prevErrors[level],
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
  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>,
    level: string,
    field: keyof Education
  ) => {
    const { value } = e.target;
    validateField(level, field, value);
  };
  
 
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const isValid = education.every((edu) =>
      ['school', 'board', 'cgpa', 'year'].every((field) =>
        validateField(edu.level, field as keyof Education, edu[field as keyof Education] as string)
      )
    );
    if (isValid) {
      dispatch(updateEducation(education));
      nextStep();
    }
  };


  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 2, mt: 3, mx: "auto", maxWidth: "80%"}}>
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
                  <TextField value={edu.school} disabled />
                </TableCell>
                <TableCell>
                  <TextField
                    value={edu.board}
                    onChange={(e) => handleChange(e, edu.level, "board")}
                    onBlur={(e) => handleBlur(e, edu.level, "board")}
                    error={Boolean(errors[edu.level]?.board)}
                    maxRows={2}
                    required
                    helperText={errors[edu.level]?.board}
                    fullWidth
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    value={edu.cgpa}
                    type="number"
                    onChange={(e) => handleChange(e, edu.level, "cgpa")}
                    onBlur={(e) => handleBlur(e, edu.level, "cgpa")}
                    error={Boolean(errors[edu.level]?.cgpa)}
                    helperText={errors[edu.level]?.cgpa}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    value={edu.year}
                    type="number"
                    onChange={(e) => handleChange(e, edu.level, "year")}
                    onBlur={(e) => handleBlur(e, edu.level, "year")}
                    error={Boolean(errors[edu.level]?.year)}
                    helperText={errors[edu.level]?.year}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div style={{ marginTop: "20px" }}>
        <Button
          variant="contained"
          onClick={prevStep}
          style={{ marginRight: "10px" }}
        >
          Previous
        </Button>
        <Button variant="contained" color="success" type="submit" disabled={isValidData ?? true}>
          Next
        </Button>
      </div>
    </form>
    </Box>
  );
};

export default EducationForm;
