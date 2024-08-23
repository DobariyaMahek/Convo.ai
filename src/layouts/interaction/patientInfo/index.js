import React, { useState } from "react";
import Card from "@mui/material/Card";
import PropTypes from "prop-types";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import SoftInput from "components/SoftInput";
import { useSoftUIController } from "context";
import { EMAIL_REGAX } from "helper/constant";
import { Close } from "@mui/icons-material";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import SoftButton from "components/SoftButton";
import SoftBox from "components/SoftBox";
// import "./PatientInfo.css";
import { FormControl, FormControlLabel, Radio, RadioGroup, TextareaAutosize } from "@mui/material";
import { useNavigate } from "react-router-dom";
import SoftTypography from "components/SoftTypography";
import toast from "react-hot-toast";
function PatientInfo({ setCurrentSection }) {
  const [controller] = useSoftUIController();
  const { sidenavColor } = controller;
  const navigate = useNavigate();
  const [generalInfo, setGeneralInfo] = useState({
    lastName: "",
    firstName: "",
    description: "",
  });

  const [errors, setErrors] = useState({});

  const validateGeneralInfo = () => {
    let newErrors = {};
    Object.keys(generalInfo).forEach((key) => {
      if (!generalInfo[key]) {
        newErrors[key] = `${key} is required`;
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setGeneralInfo((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = () => {
    if (validateGeneralInfo()) {
      setCurrentSection(2);
      // Handle form submission logic
    }
  };

  return (
    <SoftBox py={3}>
      {" "}
      <Grid item xs={12} display="flex" justifyContent="space-between" gap="10px">
        <SoftTypography variant="h6" gutterBottom>
          Patient Information
        </SoftTypography>{" "}
        <SoftButton variant="gradient" color={sidenavColor} onClick={handleSubmit}>
          Submit
        </SoftButton>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Card sx={{ marginTop: "20px" }}>
            <SoftBox p={3}>
              {" "}
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  {/* General Info Fields */}
                  <label>
                    First Name <span>* {errors.firstName && errors.firstName}</span>
                  </label>
                  <SoftInput
                    fullWidth
                    label="First name"
                    name="firstName"
                    type="text"
                    value={generalInfo.firstName}
                    onChange={handleInputChange}
                    error={Boolean(errors.firstName)}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <label>
                    Last Name <span>* {errors.lastName && errors.lastName}</span>
                  </label>
                  <SoftInput
                    fullWidth
                    label="Last name"
                    name="lastName"
                    type="text"
                    value={generalInfo.lastName}
                    onChange={handleInputChange}
                    error={Boolean(errors.lastName)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <label>
                    Description <span>* {errors.description && errors.description}</span>
                  </label>
                  <textarea
                    rows={7}
                    name="description"
                    className={errors.description ? "errorTextArea" : "textAreaInput"}
                    value={generalInfo.description}
                    onChange={handleInputChange}
                  />
                </Grid>
              </Grid>
            </SoftBox>
          </Card>
        </Grid>
      </Grid>
    </SoftBox>
  );
}
PatientInfo.propTypes = {
  setCurrentSection: PropTypes.func, // Ensure it's a function
};

export default PatientInfo;
