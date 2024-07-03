import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Button, TextField, Typography } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { updateAdditionalInfo } from "../features/form/form.slice";
import { RootState } from "../store";
import { useNavigate } from "react-router-dom";

interface Props {
  nextStep: () => void;
  prevStep: () => void;
}

const AdditionalInfoForm: React.FC<Props> = ({ nextStep, prevStep }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const additionalInfo = useSelector(
    (state: RootState) => state.form.additionalInfo
  );
  const [errors, setErrors] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    dispatch(updateAdditionalInfo({ ...additionalInfo, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      dispatch(updateAdditionalInfo({ ...additionalInfo, ["resume"]: file }));
    }
  };

  const validateField = (value: string) => {
    let error = "";
    if (!value) {
      error = "Required";
    }
    setErrors(error);
    return error === "";
  };

  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    validateField(event.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(updateAdditionalInfo({ ...additionalInfo }));
    // navigate('/step6')
  };
  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      className="container mt-5"
      sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 2, mt: 3, mx: "auto", maxWidth: "80%"}}
    >
      <Typography variant="h3">Additional Information</Typography>
      <Box sx={{ marginBottom: 3 }}>
        <Typography variant="body1" sx={{ marginBottom: 1 }}>
          Cover Letter <b style={{ color: "red" }}>*</b>
        </Typography>
        <TextField
          name="coverLetter"
          multiline
          rows={4}
          variant="outlined"
          inputProps={{ maxLength: 120 }}
          fullWidth
          value={additionalInfo.coverLetter}
          onChange={handleChange}
          onBlur={handleBlur}
          required
          autoFocus
          error={!!errors}
          helperText={errors}
        />
      </Box>
      <Box sx={{ marginBottom: 3 }}>
        <Typography variant="body1" sx={{ marginBottom: 1 }}>
          Resume <b style={{ color: "red" }}>*</b>{" "}
        </Typography>
        <label
          htmlFor="resume-upload"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            cursor: "pointer",
          }}
        >
          <input
            id="resume-upload"
            type="file"
            name="resume"
            onChange={handleFileChange}
            style={{ display: "none" }}
          />
          <Button
            variant="contained"
            component="span"
            startIcon={<CloudUploadIcon />}
          >
            Upload Resume
          </Button>
          {additionalInfo.resume && (
            <Typography variant="body1">
              {additionalInfo.resume?.name}
            </Typography>
          )}
        </label>
      </Box>
      <Box sx={{ display: "flex" ,gap: 4 }}>
        <Button variant="contained" color="secondary" onClick={prevStep}>
          Previous
        </Button>
        <Button
          type="submit"
          variant="contained"
          color="success"
          onClick={nextStep}
        >
          Next
        </Button>
      </Box>
    </Box>
  );
};

export default AdditionalInfoForm;
