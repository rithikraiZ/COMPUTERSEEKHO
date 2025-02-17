import React, { useState } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from "@mui/material";
import toast from "react-hot-toast";

const colors = {
  primary: "#1A1A1D",
  secondary: "#3B1C32",
  accent: "#6A1E55",
  light: "#F2F2F2",
  white: "#FFFFFF",
};

const UpdateMessage = ({ isOpen, onClose, onUpdate, dialogTitle }) => {
  const [message, setMessage] = useState("");
  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      sx={{
        "& .MuiDialog-paper": {
          padding: "20px",
          borderRadius: "10px",
          backgroundColor: colors.light, // Light background for the dialog
          color: colors.primary, // Primary text color
        },
      }}
    >
      <DialogTitle sx={{ fontWeight: "bold", textAlign: "center", color: colors.accent }}>
        {dialogTitle}
      </DialogTitle>

      <DialogContent>
        <TextField
          label="Message"
          variant="outlined"
          fullWidth
          multiline
          rows={3}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          sx={{
            marginTop: "10px",
            backgroundColor: colors.white, // White background for the text field
            borderRadius: "4px",
          }}
        />
      </DialogContent>

      <DialogActions sx={{ justifyContent: "center", gap: "10px", paddingBottom: "15px" }}>
        <Button onClick={onClose} variant="outlined" sx={{ color: colors.secondary, borderColor: colors.secondary }}>
          Cancel
        </Button>
        <Button onClick={() => onUpdate(message)} variant="contained" sx={{ backgroundColor: colors.primary, color: colors.white }}>
          Update
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UpdateMessage;