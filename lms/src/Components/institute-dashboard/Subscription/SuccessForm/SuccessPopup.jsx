import React from 'react';
import { Dialog, DialogContent, DialogActions, Button } from '@mui/material';
import './SuccessPopup.css';

const SuccessPopup = ({ onClose }) => {
  return (
    <Dialog open={true} onClose={onClose} maxWidth="sm" fullWidth className="success-popup">
      <DialogContent className="success-content">
        <div className="success-icon">
          <i className="fas fa-check-circle"></i>
        </div>
        <h2 className="success-title">Request Sent Successfully!</h2>
        <p className="success-message">
          Thank you for customizing your subscription. We'll review your request and get back to you shortly.
        </p>
      </DialogContent>
      <DialogActions className="success-actions" >
        <Button onClick={onClose} variant="contained" color="primary" className="success-button" style={{justifyContent:"center"}}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SuccessPopup;

