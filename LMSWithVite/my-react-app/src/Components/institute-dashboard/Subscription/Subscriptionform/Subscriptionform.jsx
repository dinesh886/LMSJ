import React, { useState, useEffect } from 'react';
import { 
  Button, 
  TextField, 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions, 
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material';
import SuccessPopup from '../SuccessForm/SuccessPopup'
import './Subscriptionform.css';

const Subscriptionform = ({ onClose, defaultValues }) => {
  const [formData, setFormData] = useState({
    classes: '',
    teachers: '',
    students: '',
    tests: '',
    totalTestHours: '',
    questionBanks: '',
    totalQuestions: '',
    message: '',
    withTeam: '',
    guestUsers: '',
    validTillDays: ''
  });
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  useEffect(() => {
    if (defaultValues) {
      setFormData({
        classes: defaultValues.Classes || '',
        teachers: defaultValues.Teachers || '',
        students: defaultValues.Students || '',
        tests: defaultValues.Tests || '',
        totalTestHours: defaultValues.TotalTestHours || '',
        questionBanks: defaultValues.QuestionBanks || '',
        totalQuestions: defaultValues.TotalQuestions || '',
        message: '',
        withTeam: defaultValues.WithTeam || '',
        guestUsers: defaultValues.GuestUsers || '',
        validTillDays: defaultValues.ValidTillDays || ''
      });
    }
  }, [defaultValues]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setShowSuccessPopup(true);
  };

  const handleSuccessClose = () => {
    setShowSuccessPopup(false);
    onClose();
  };

  return (
    <>
      <Dialog open={true} onClose={onClose} maxWidth="md" fullWidth>
        <DialogTitle className="customize-title">Customize Your Subscription</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  id="classes"
                  name="classes"
                  label="Number of Classes"
                  type="number"
                  fullWidth
                  value={formData.classes}
                  onChange={handleChange}
                  margin="normal"
                />
                <TextField
                  id="teachers"
                  name="teachers"
                  label="Number of Teachers"
                  type="number"
                  fullWidth
                  value={formData.teachers}
                  onChange={handleChange}
                  margin="normal"
                />
                <TextField
                  id="students"
                  name="students"
                  label="Number of Students"
                  type="number"
                  fullWidth
                  value={formData.students}
                  onChange={handleChange}
                  margin="normal"
                />
                <TextField
                  id="tests"
                  name="tests"
                  label="Number of Tests"
                  type="number"
                  fullWidth
                  value={formData.tests}
                  onChange={handleChange}
                  margin="normal"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  id="totalTestHours"
                  name="totalTestHours"
                  label="Total Test Hours"
                  type="number"
                  fullWidth
                  value={formData.totalTestHours}
                  onChange={handleChange}
                  margin="normal"
                />
                <TextField
                  id="questionBanks"
                  name="questionBanks"
                  label="Number of Question Banks"
                  type="number"
                  fullWidth
                  value={formData.questionBanks}
                  onChange={handleChange}
                  margin="normal"
                />
                <TextField
                  id="totalQuestions"
                  name="totalQuestions"
                  label="Total Questions"
                  type="number"
                  fullWidth
                  value={formData.totalQuestions}
                  onChange={handleChange}
                  margin="normal"
                />

               
                <FormControl fullWidth margin="normal">
                  <InputLabel id="guest-users-label">Guest Users</InputLabel>
                  <Select
                    labelId="guest-users-label"
                    id="guestUsers"
                    name="guestUsers"
                    value={formData.guestUsers}
                    onChange={handleChange}
                    label="Guest Users"
                  >
                    <MenuItem value="yes">Yes</MenuItem>
                    <MenuItem value="no">No</MenuItem>
                  </Select>
                </FormControl>
            
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth margin="normal">
                  <InputLabel id="with-team-label">With or Without Team</InputLabel>
                  <Select
                    labelId="with-team-label"
                    id="withTeam"
                    name="withTeam"
                    value={formData.withTeam}
                    onChange={handleChange}
                    label="With or Without Team"
                  >
                    <MenuItem value="with">With Team</MenuItem>
                    <MenuItem value="without">Without Team</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            
             
              <Grid item xs={12} sm={6}>
                <TextField
                  id="validTillDays"
                  name="validTillDays"
                  label="Valid Till (Days)"
                  type="number"
                  fullWidth
                  value={formData.validTillDays}
                  onChange={handleChange}
                  margin="normal"
                  InputProps={{ inputProps: { min: 1 } }}
                  helperText="Number of days from subscription payment date"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="message"
                  name="message"
                  label="Additional Message"
                  multiline
                  rows={4}
                  fullWidth
                  value={formData.message}
                  onChange={handleChange}
                  margin="normal"
                />
              </Grid>
            </Grid>
            <DialogActions>
              <Button type="submit" variant="contained" color="primary" className='subscription-submit'>
                Send Request
              </Button>
              <Button onClick={onClose} variant="outlined" color="secondary" className='subscription-cancel'>
                Cancel
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
      {showSuccessPopup && <SuccessPopup onClose={handleSuccessClose} />}
    </>
  );
};

export default Subscriptionform;