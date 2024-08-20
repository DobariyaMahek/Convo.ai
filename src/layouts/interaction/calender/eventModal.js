import React, { useState } from "react";
import PropTypes from "prop-types";
import { Modal, Box, Grid } from "@mui/material";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/material_green.css";
import { useSoftUIController } from "context";
import SoftButton from "components/SoftButton";
import SoftInput from "components/SoftInput";
import moment from "moment";

const EventModal = ({ open, handleClose, handleSave }) => {
  const [controller] = useSoftUIController();
  const { sidenavColor } = controller;

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    startDate: null,
    endDate: null,
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};

    if (!formData.title) newErrors.title = "Event Name is required.";
    if (!formData.description) newErrors.description = "Description is required.";
    if (!formData.startDate) newErrors.startDate = "Start Date is required.";
    if (!formData.endDate) newErrors.endDate = "End Date is required.";
    if (formData.startDate && formData.endDate && formData.endDate < formData.startDate) {
      newErrors.endDate = "End Date must be after Start Date.";
    }

    return newErrors;
  };

  const handleDateChange = (dates) => {
    const [start, end] = dates;
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (start && end) {
      if (start < today || end < today) {
        setErrors({
          ...errors,
          date: "Selected date should be today or later",
        });
      } else {
        setFormData({
          ...formData,
          startDate: start,
          endDate: end,
        });
        setErrors({
          ...errors,
          date: "",
        });
      }
    } else if (start) {
      if (start < today) {
        setErrors({
          ...errors,
          date: "Selected date should be today or later",
        });
      } else {
        setFormData({
          ...formData,
          startDate: start,
          endDate: null,
        });
        setErrors({
          ...errors,
          date: "",
        });
      }
    }
  };

  const handleSubmit = () => {
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      handleSave(formData);
      handleClose();
      setErrors({});
      setFormData({
        title: "",
        description: "",
        startDate: null,
        endDate: null,
      });
    }
  };

  return (
    <Modal
      open={open}
      onClose={() => {
        handleClose();
        setFormData({
          title: "",
          description: "",
          startDate: null,
          endDate: null,
        });
        setErrors({});
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 500,
          bgcolor: "background.paper",
          borderRadius: 2,
          boxShadow: 24,
          p: 4,
          outline: "none",
        }}
      >
        <Grid item xs={12}>
          <label>
            Event Name <span>* {errors.title && errors.title}</span>
          </label>
          <SoftInput
            label="Event Name"
            fullWidth
            value={formData.title}
            onChange={(e) => {
              setFormData({ ...formData, title: e.target.value });
              if (errors.title) setErrors((prev) => ({ ...prev, title: "" }));
            }}
            margin="normal"
            error={!!errors.title}
          />
          <label>
            Description <span>* {errors.description && errors.description}</span>
          </label>
          <SoftInput
            label="Description"
            fullWidth
            multiline
            rows={4}
            value={formData.description}
            onChange={(e) => {
              setFormData({ ...formData, description: e.target.value });
              if (errors.description) setErrors((prev) => ({ ...prev, description: "" }));
            }}
            margin="normal"
            error={!!errors.description}
          />
          <Grid container display="flex" justifyContent="space-between">
            <Grid item xs={12} xl={6}>
              <label className="form-label" htmlFor="start-date">
                Start Date <span>* {errors.startDate && errors.startDate}</span>
              </label>
              <SoftInput
                type="text"
                className="form-control"
                id="start-date"
                placeholder="Start date"
                name="startDate"
                value={
                  formData.startDate ? moment(formData.startDate).format("DD-MM-YYYY hh:mm A") : ""
                }
                disabled
                error={!!errors.startDate}
              />
            </Grid>
            <Grid item xs={12} xl={6}>
              <label className="form-label" htmlFor="end-date">
                End Date <span>* {errors.endDate && errors.endDate}</span>
              </label>
              <SoftInput
                type="text"
                className="form-control"
                id="end-date"
                placeholder="End date"
                name="endDate"
                value={
                  formData.endDate ? moment(formData.endDate).format("DD-MM-YYYY hh:mm A") : ""
                }
                disabled
                error={!!errors.startDate}
              />
            </Grid>
          </Grid>{" "}
          <Grid xs={12} display="flex" justifyContent="center" margin="10px">
            <Flatpickr
              value={[formData.startDate, formData.endDate]}
              onChange={handleDateChange}
              options={{
                mode: "range",
                dateFormat: "Y-m-d h:i K", // Use K for AM/PM
                enableTime: true,
                time_24hr: false, // Disable 24-hour time format to show AM/PM
                minDate: "today",
                inline: true,
              }}
              className="hidden-input"
            />
          </Grid>
        </Grid>

        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <SoftButton
            onClick={() => {
              handleClose();
              setFormData({
                title: "",
                description: "",
                startDate: null,
                endDate: null,
              });
              setErrors({});
            }}
            variant="outlined"
            color="secondary"
            sx={{ marginRight: 1 }}
          >
            Cancel
          </SoftButton>
          <SoftButton onClick={handleSubmit} variant="outlined" color={sidenavColor}>
            Save
          </SoftButton>
        </Box>
      </Box>
    </Modal>
  );
};

// Add PropTypes validation
EventModal.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleSave: PropTypes.func.isRequired,
};

export default EventModal;
