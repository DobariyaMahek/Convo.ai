import React, { useState } from "react";
import Card from "@mui/material/Card";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Grid from "@mui/material/Grid";
import SoftBox from "components/SoftBox";
import SoftButton from "components/SoftButton";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import SoftInput from "components/SoftInput";
import "./createPatient.css";
import { useSoftUIController } from "context";
import { EMAIL_REGAX } from "helper/constant";
import { Delete } from "@mui/icons-material";

function CreatePatient() {
  const [controller, dispatch] = useSoftUIController();
  const { sidenavColor } = controller;
  const [activeTab, setActiveTab] = useState("General");
  const [generalInfo, setGeneralInfo] = useState({
    lastName: "",
    firstName: "",
    birthdate: "",
    phoneNumber: "",
    email: "",
    address: "",
  });
  const [familyInfo, setFamilyInfo] = useState([{ relation: "", name: "", email: "" }]);
  const [medicalHistory, setMedicalHistory] = useState({
    allergies: "",
    chronicConditions: "",
    medications: "",
  });
  const [errors, setErrors] = useState({});
  const [familyErrors, setFamilyErrors] = useState([{}]);
  const [medicalErrors, setMedicalErrors] = useState({});

  const handleTabChange = (event, newValue) => {
    if (newValue === "Family" && !validateGeneralInfo()) {
      return;
    }
    if (newValue === "Medical History" && !validateFamilyInfo()) {
      return;
    }
    setActiveTab(newValue);
  };

  const validateGeneralInfo = () => {
    let newErrors = {};
    Object.keys(generalInfo).forEach((key) => {
      if (!generalInfo[key]) {
        newErrors[key] = `${key} is required`;
      } else if (generalInfo[key] && key == "email" && !EMAIL_REGAX?.test(generalInfo[key])) {
        newErrors[key] = `${key} is not valid`;
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateFamilyInfo = () => {
    let valid = true;
    const newFamilyErrors = familyInfo.map((member, index) => {
      let memberErrors = {};
      if (!member.relation) {
        memberErrors.relation = "Relation is required";
        valid = false;
      }
      if (!member.name) {
        memberErrors.name = "Name is required";
        valid = false;
      }
      if (!member.email) {
        memberErrors.email = "Email is required";
        valid = false;
      }
      return memberErrors;
    });

    setFamilyErrors(newFamilyErrors);
    return valid;
  };

  const validateMedicalHistory = () => {
    let newErrors = {};
    Object.keys(medicalHistory).forEach((key) => {
      if (!medicalHistory[key]) {
        newErrors[key] = `${key} is required`;
      }
    });
    setMedicalErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setGeneralInfo((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleFamilyChange = (index, event) => {
    const { name, value } = event.target;
    const updatedFamilyInfo = [...familyInfo];
    updatedFamilyInfo[index][name] = value;
    setFamilyInfo(updatedFamilyInfo);

    const updatedFamilyErrors = [...familyErrors];
    updatedFamilyErrors[index][name] = "";
    setFamilyErrors(updatedFamilyErrors);
  };

  const handleMedicalHistoryChange = (event) => {
    const { name, value } = event.target;
    setMedicalHistory((prev) => ({ ...prev, [name]: value }));
    setMedicalErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const addFamilyMember = () => {
    setFamilyInfo((prev) => [...prev, { relation: "", name: "", email: "" }]);
    setFamilyErrors((prev) => [...prev, {}]);
  };

  const handleSubmit = () => {
    if (validateGeneralInfo() && validateFamilyInfo() && validateMedicalHistory()) {
      console.log("Form Submitted", { generalInfo, familyInfo, medicalHistory });
      // Handle form submission logic
    }
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox py={3}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Tabs value={activeTab} onChange={handleTabChange}>
              <Tab label="General" value="General" />
              <Tab label="Family" value="Family" />
              <Tab label="Medical History" value="Medical History" />
            </Tabs>
            <Card>
              <SoftBox p={3}>
                {activeTab === "General" && (
                  <Grid container spacing={2}>
                    {/* General Info Fields */}
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
                    <Grid item xs={12} md={6}>
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
                        Date of birth <span>* {errors.birthdate && errors.birthdate}</span>
                      </label>
                      <SoftInput
                        fullWidth
                        label="Date of birth"
                        name="birthdate"
                        type="date"
                        value={generalInfo.birthdate}
                        onChange={handleInputChange}
                        error={Boolean(errors.birthdate)}
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <label>
                        Phone Number <span>* {errors.phoneNumber && errors.phoneNumber}</span>
                      </label>
                      <SoftInput
                        fullWidth
                        label="Phone number"
                        name="phoneNumber"
                        type="number"
                        value={generalInfo.phoneNumber}
                        onChange={handleInputChange}
                        error={Boolean(errors.phoneNumber)}
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <label>
                        Email <span>* {errors.email && errors.email}</span>
                      </label>
                      <SoftInput
                        fullWidth
                        label="Email"
                        name="email"
                        type="email"
                        value={generalInfo.email}
                        onChange={handleInputChange}
                        error={Boolean(errors.email)}
                      />
                    </Grid>
                    <Grid item xs={12} md={12}>
                      <label>
                        Address <span>* {errors.address && errors.address}</span>
                      </label>
                      <SoftInput
                        fullWidth
                        label="Address"
                        name="address"
                        type="text"
                        value={generalInfo.address}
                        onChange={handleInputChange}
                        error={Boolean(errors.address)}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <SoftButton
                        variant="gradient"
                        color={sidenavColor}
                        onClick={() => {
                          if (validateGeneralInfo()) {
                            setActiveTab("Family");
                          }
                        }}
                      >
                        Next
                      </SoftButton>
                    </Grid>
                  </Grid>
                )}
                {activeTab === "Family" && (
                  <SoftBox>
                    {familyInfo.map((member, index) => (
                      <Grid container spacing={2} key={index}>
                        <Grid item xs={12} md={3}>
                          <label>
                            Relation <span>* {familyErrors[index]?.relation}</span>
                          </label>
                          <SoftInput
                            fullWidth
                            label="Relation"
                            name="relation"
                            type="text"
                            value={member.relation}
                            onChange={(event) => handleFamilyChange(index, event)}
                            error={Boolean(familyErrors[index]?.relation)}
                          />
                        </Grid>
                        <Grid item xs={12} md={3}>
                          <label>
                            Name <span>* {familyErrors[index]?.name}</span>
                          </label>
                          <SoftInput
                            fullWidth
                            label="Name"
                            name="name"
                            type="text"
                            value={member.name}
                            onChange={(event) => handleFamilyChange(index, event)}
                            error={Boolean(familyErrors[index]?.name)}
                          />
                        </Grid>
                        <Grid item xs={12} md={3}>
                          <label>
                            Email <span>* {familyErrors[index]?.email}</span>
                          </label>
                          <SoftInput
                            fullWidth
                            label="Email"
                            name="email"
                            type="email"
                            value={member.email}
                            onChange={(event) => handleFamilyChange(index, event)}
                            error={Boolean(familyErrors[index]?.email)}
                          />
                        </Grid>{" "}
                        <Grid item xs={12} md={2}>
                          <label>
                            Date of birth <span>* {familyErrors[index]?.birthdate}</span>
                          </label>
                          <SoftInput
                            fullWidth
                            label="Date of birth"
                            name="birthdate"
                            type="date"
                            value={member.birthdate}
                            onChange={(event) => handleFamilyChange(index, event)}
                            error={Boolean(familyErrors[index]?.birthdate)}
                          />
                        </Grid>
                        <Grid
                          item
                          md={1}
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <Delete />
                        </Grid>
                      </Grid>
                    ))}
                    <Grid item xs={12} mt={2}>
                      <SoftButton variant="gradient" color={sidenavColor} onClick={addFamilyMember}>
                        Add Family Member
                      </SoftButton>
                      <SoftButton
                        variant="gradient"
                        color={sidenavColor}
                        onClick={() => {
                          if (validateFamilyInfo()) {
                            setActiveTab("Medical History");
                          }
                        }}
                      >
                        Next
                      </SoftButton>
                    </Grid>
                  </SoftBox>
                )}
                {activeTab === "Medical History" && (
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                      <label>
                        Allergies{" "}
                        <span>* {medicalErrors.allergies && medicalErrors.allergies}</span>
                      </label>
                      <SoftInput
                        fullWidth
                        label="Allergies"
                        name="allergies"
                        type="text"
                        value={medicalHistory.allergies}
                        onChange={handleMedicalHistoryChange}
                        error={Boolean(medicalErrors.allergies)}
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <label>
                        Chronic Conditions{" "}
                        <span>
                          * {medicalErrors.chronicConditions && medicalErrors.chronicConditions}
                        </span>
                      </label>
                      <SoftInput
                        fullWidth
                        label="Chronic Conditions"
                        name="chronicConditions"
                        type="text"
                        value={medicalHistory.chronicConditions}
                        onChange={handleMedicalHistoryChange}
                        error={Boolean(medicalErrors.chronicConditions)}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <label>
                        Medications{" "}
                        <span>* {medicalErrors.medications && medicalErrors.medications}</span>
                      </label>
                      <SoftInput
                        fullWidth
                        label="Medications"
                        name="medications"
                        type="text"
                        value={medicalHistory.medications}
                        onChange={handleMedicalHistoryChange}
                        error={Boolean(medicalErrors.medications)}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <SoftButton variant="gradient" color={sidenavColor} onClick={handleSubmit}>
                        Submit
                      </SoftButton>
                    </Grid>
                  </Grid>
                )}
              </SoftBox>
            </Card>
          </Grid>
        </Grid>
      </SoftBox>
    </DashboardLayout>
  );
}

export default CreatePatient;
