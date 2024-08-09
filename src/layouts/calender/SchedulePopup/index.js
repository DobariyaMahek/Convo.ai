import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import moment from "moment";
import SoftButton from "components/SoftButton";
import { Icon } from "@mui/material";

function SchedulePopup({ open, onClose, onSave, initialStart, initialEnd }) {
  const [title, setTitle] = useState("");
  const [start, setStart] = useState(initialStart);
  const [end, setEnd] = useState(initialEnd);
  const [errors, setErrors] = useState({
    title: "",
    start: "",
    end: "",
  });

  useEffect(() => {
    // Reset errors when initialStart or initialEnd changes
    setStart(initialStart);
    setEnd(initialEnd);
    setErrors({
      title: "",
      start: "",
      end: "",
    });
  }, [initialStart, initialEnd]);

  const validate = () => {
    const newErrors = { ...errors };
    let isValid = true;

    // Validate title
    if (!title) {
      newErrors.title = "Title is required";
      isValid = false;
    } else {
      newErrors.title = "";
    }

    // Validate start time
    if (!start) {
      newErrors.start = "Start time is required";
      isValid = false;
    } else if (end && start >= end) {
      newErrors.start = "Start time must be before end time";
      isValid = false;
    } else {
      newErrors.start = "";
    }

    // Validate end time
    if (!end) {
      newErrors.end = "End time is required";
      isValid = false;
    } else if (start && end <= start) {
      newErrors.end = "End time must be after start time";
      isValid = false;
    } else {
      newErrors.end = "";
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSave = () => {
    if (validate()) {
      onSave({ title, start, end });
      onClose();
    }
  };

  return (
    <Modal open={open} onClose={onClose} aria-labelledby="schedule-popup-title">
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          boxShadow: 4,
          p: 4,
          borderRadius: 2,
          border: "none",
          display: "flex",
          flexDirection: "column",
          gap: 2,
          outline: "none",
        }}
      >
        <div>
          <Typography id="schedule-popup-title" variant="h6" component="h2" gutterBottom>
            Schedule New Event
          </Typography>
        </div>

        <TextField
          label="Event Title"
          type="text"
          value={title || " "}
          onChange={(e) => {
            setTitle(e.target.value);
            validate(); // Validate on change
          }}
          fullWidth
          variant="standard"
          margin="normal"
          error={!!errors.title}
          helperText={errors.title}
        />
        <TextField
          label="Start Time"
          type="datetime-local"
          value={moment(start).format("YYYY-MM-DDTHH:mm")}
          onChange={(e) => {
            const newStart = new Date(e.target.value);
            setStart(newStart);
            validate(); // Validate on change
          }}
          fullWidth
          variant="standard"
          margin="normal"
          error={!!errors.start}
          helperText={errors.start}
        />
        <TextField
          label="End Time"
          type="datetime-local"
          value={moment(end).format("YYYY-MM-DDTHH:mm")}
          onChange={(e) => {
            const newEnd = new Date(e.target.value);
            setEnd(newEnd);
            validate(); // Validate on change
          }}
          fullWidth
          variant="standard"
          margin="normal"
          error={!!errors.end}
          helperText={errors.end}
        />
        <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
          <Button variant="contained" color="primary" onClick={handleSave}>
            Save
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}

SchedulePopup.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  initialStart: PropTypes.instanceOf(Date).isRequired,
  initialEnd: PropTypes.instanceOf(Date).isRequired,
};

export default SchedulePopup;
