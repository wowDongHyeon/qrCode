import React, { useState } from 'react';
import { 
  Box, 
  TextField, 
  Button, 
  Typography, 
  Paper,
  Grid 
} from '@mui/material';

const StudentCardForm = ({ onSubmit }) => {
  const [studentInfo, setStudentInfo] = useState({
    name: '',
    studentId: '',
    department: '',
    grade: '',
    issueDate: new Date().toISOString().split('T')[0]
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudentInfo(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(studentInfo);
  };

  return (
    <Paper elevation={3} sx={{ p: 3, maxWidth: 600, mx: 'auto', mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        학생증 정보 입력
      </Typography>
      <Box component="form" onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="이름"
              name="name"
              value={studentInfo.name}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="학번"
              name="studentId"
              value={studentInfo.studentId}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="학과"
              name="department"
              value={studentInfo.department}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="학년"
              name="grade"
              value={studentInfo.grade}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <Button 
              type="submit" 
              variant="contained" 
              color="primary" 
              fullWidth
              size="large"
            >
              QR코드 생성
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
};

export default StudentCardForm; 