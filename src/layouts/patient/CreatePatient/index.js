import React, { useState } from "react";
import Card from "@mui/material/Card";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import SoftButton from "components/SoftButton";
import { useSoftUIController } from "context";

function CreatePatient() {
  const [controller] = useSoftUIController();
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
  const [familyInfo, setFamilyInfo] = useState([{ relation: "", name: "", age: "" }]);
  const [errors, setErrors] = useState({});

  const handleTabChange = (event, newValue) => {
    if (newValue === "Family" && !validateGeneralInfo()) {
      return;
    }
    setActiveTab(newValue);
  };

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

  const handleFamilyChange = (index, event) => {
    const { name, value } = event.target;
    const updatedFamilyInfo = [...familyInfo];
    updatedFamilyInfo[index][name] = value;
    setFamilyInfo(updatedFamilyInfo);
  };

  const addFamilyMember = () => {
    setFamilyInfo((prev) => [...prev, { relation: "", name: "", age: "" }]);
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
            </Tabs>
            <Card>
              <SoftBox p={3}>
                {activeTab === "General" && (
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                      <TextField
                        fullWidth
                        label="Last name"
                        name="lastName"
                        value={generalInfo.lastName}
                        onChange={handleInputChange}
                        error={!!errors.lastName}
                        helperText={errors.lastName}
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <TextField
                        fullWidth
                        label="First name"
                        name="firstName"
                        value={generalInfo.firstName}
                        onChange={handleInputChange}
                        error={!!errors.firstName}
                        helperText={errors.firstName}
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <TextField
                        fullWidth
                        label="Birthdate"
                        name="birthdate"
                        value={generalInfo.birthdate}
                        onChange={handleInputChange}
                        error={!!errors.birthdate}
                        helperText={errors.birthdate}
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <TextField
                        fullWidth
                        label="Phone number"
                        name="phoneNumber"
                        value={generalInfo.phoneNumber}
                        onChange={handleInputChange}
                        error={!!errors.phoneNumber}
                        helperText={errors.phoneNumber}
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <TextField
                        fullWidth
                        label="Email"
                        name="email"
                        value={generalInfo.email}
                        onChange={handleInputChange}
                        error={!!errors.email}
                        helperText={errors.email}
                      />
                    </Grid>
                    <Grid item xs={12} md={12}>
                      <TextField
                        fullWidth
                        label="Address"
                        name="address"
                        value={generalInfo.address}
                        onChange={handleInputChange}
                        error={!!errors.address}
                        helperText={errors.address}
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
                        <Grid item xs={12} md={4}>
                          <TextField
                            fullWidth
                            label="Relation"
                            name="relation"
                            value={member.relation}
                            onChange={(event) => handleFamilyChange(index, event)}
                          />
                        </Grid>
                        <Grid item xs={12} md={4}>
                          <TextField
                            fullWidth
                            label="Name"
                            name="name"
                            value={member.name}
                            onChange={(event) => handleFamilyChange(index, event)}
                          />
                        </Grid>
                        <Grid item xs={12} md={4}>
                          <TextField
                            fullWidth
                            label="Age"
                            name="age"
                            value={member.age}
                            onChange={(event) => handleFamilyChange(index, event)}
                          />
                        </Grid>
                      </Grid>
                    ))}
                    <SoftButton variant="gradient" color={sidenavColor} onClick={addFamilyMember}>
                      Add Family Member
                    </SoftButton>
                  </SoftBox>
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
