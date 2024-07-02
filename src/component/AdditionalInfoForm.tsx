import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Box, Button, TextField, Typography } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { updateAdditionalInfo } from '../features/form/form.slice';

interface Props {
    nextStep: () => void;
    prevStep: () => void;
}

const AdditionalInfoForm: React.FC<Props> = ({ nextStep, prevStep }) => {
    const dispatch = useDispatch();
    const [additionalInfo, setAdditionalInfo] = useState({
        coverLetter: '',
        resume: null as File | null, // Explicitly define resume as File or null
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setAdditionalInfo({
            ...additionalInfo,
            [name]: value,
        });
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]; // Access files property safely
        if (file) {
            setAdditionalInfo({
                ...additionalInfo,
                resume: file,
            });
        }
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(updateAdditionalInfo(additionalInfo));
        nextStep();
    };

    return (
        <Box component="form" onSubmit={handleSubmit} className="container mt-5" sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Typography variant="h2">Additional Information</Typography>
            <Box sx={{ marginBottom: 3 }}>
                <Typography variant="body1" sx={{ marginBottom: 1 }}>Cover Letter</Typography>
                <TextField
                    name="coverLetter"
                    multiline
                    rows={4}
                    variant="outlined"
                    fullWidth
                    value={additionalInfo.coverLetter}
                    onChange={handleChange}
                    required
                />
            </Box>
            <Box sx={{ marginBottom: 3 }}>
                <Typography variant="body1" sx={{ marginBottom: 1 }}>Resume</Typography>
                <label htmlFor="resume-upload" style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
                    <input
                        id="resume-upload"
                        type="file"
                        name="resume"
                        onChange={handleFileChange}
                        style={{ display: 'none' }}
                    />
                    <Button
                        variant="contained"
                        component="span"
                        startIcon={<CloudUploadIcon />}
                    >
                        Upload Resume
                    </Button>
                    {additionalInfo.resume && (
                        <Typography variant="body1">{additionalInfo.resume.name}</Typography>
                    )}
                </label>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
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

export default AdditionalInfoForm;
