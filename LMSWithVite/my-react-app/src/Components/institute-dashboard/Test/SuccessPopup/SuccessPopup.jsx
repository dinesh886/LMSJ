import React, { useEffect } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const SuccessPopup = ({ successPopupOpen, handleClosePopup, onClose }) => {
    useEffect(() => {
        if (successPopupOpen) {
            const timer = setTimeout(() => {
                handleClosePopup(); // Close the success popup
                onClose(); // Close the main dialog container
            }, 3000); // Auto close after 3 seconds

            return () => clearTimeout(timer); // Cleanup timeout
        }
    }, [successPopupOpen, handleClosePopup, onClose]);

    return (
        <Dialog
            open={successPopupOpen}
            onClose={handleClosePopup}
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                "& .MuiDialog-paper": {
                    width: "auto",
                    maxWidth: 500,
                },
            }}
        >
            <DialogTitle sx={{ display: "flex", alignItems: "center" }}>
                Publish successfully!
                <CheckCircleIcon sx={{ color: "#4caf50", fontSize: "30px", marginLeft: 1 }} />
            </DialogTitle>
            <DialogContent>
                <p>Your test has been successfully published.</p>
            </DialogContent>
            <DialogActions>
                <Button
                    onClick={() => {
                        handleClosePopup();
                        onClose(); // Ensure the main dialog is also closed
                    }}
                    sx={{
                        backgroundColor: "#037DE2",
                        color: "white",
                        "&:hover": {
                            backgroundColor: "#025EA6",
                        },
                    }}
                >
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default SuccessPopup;
