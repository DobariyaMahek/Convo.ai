import React, { useState } from "react";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import SoftInput from "components/SoftInput";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { useSoftUIController } from "context";
import { EMAIL_REGEX } from "helper/constant";
import { Close } from "@mui/icons-material";
import SoftButton from "components/SoftButton";
import SoftBox from "components/SoftBox";
import { FormControl, FormControlLabel, Radio, RadioGroup } from "@mui/material";
import { useNavigate } from "react-router-dom";
import SoftTypography from "components/SoftTypography";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { createPatient } from "../../../redux/ApiSlice/patientSlice";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { CountryPhoneNumberDigit } from "helper/phonenumberdigit";

function CreatePatient() {
  const [controller] = useSoftUIController();
  const { sidenavColor } = controller;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [generalInfo, setGeneralInfo] = useState({
    lastName: "",
    firstName: "",
    birthdate: "",
    phoneNumber: "",
    email: "",
    hasEmail: "yes",
    country: "in", // Default to India for demonstration
  });
  const [familyInfo, setFamilyInfo] = useState([
    { relation: "", name: "", email: "", phoneNumber: "", hasEmail: "yes", country: "in" },
  ]);
  const [medicalHistory, setMedicalHistory] = useState({ description: "" });
  const [errors, setErrors] = useState({});
  const [familyErrors, setFamilyErrors] = useState([{}]);
  const [medicalErrors, setMedicalErrors] = useState({});

  const validateField = (fieldName, value, countryCode = "in") => {
    const digit = CountryPhoneNumberDigit?.find(
      (item) => item?.code?.toLowerCase() == countryCode?.toLowerCase()
    );

    let error = "";
    switch (fieldName) {
      case "firstName":
      case "lastName":
      case "birthdate":
      case "description":
      case "name":
      case "relation":
        if (!value?.trim()) error = `${fieldName} is required`;
        break;
      case "email":
        if (generalInfo.hasEmail === "yes") {
          error = !value?.trim()
            ? "Email is required"
            : !EMAIL_REGEX.test(value?.trim()?.toLowerCase())
            ? "Email is not valid"
            : "";
        }
        break;
      case "phoneNumber":
        if (generalInfo.hasEmail === "no") {
          error = !value
            ? "Phone number is required"
            : digit?.phoneNumberLength &&
              value?.length <
                digit?.phoneNumberLength + digit.countryCode.replace("+", "")?.length
            ? `Phone number must have at most ${digit?.phoneNumberLength} digits`
            : "";
        }
        break;
      default:
        break;
    }
    return error;
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    const error = validateField(name, value?.trim());
    setGeneralInfo((prev) => ({
      ...prev,
      [name]: name == "email" ? value?.trim()?.toLowerCase() : value?.trimStart(),
    }));
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handlePhoneChange = (phone, country) => {
    const error = validateField("phoneNumber", phone, country.countryCode);
    setGeneralInfo((prev) => ({
      ...prev,
      phoneNumber: phone?.trim(),
      country: country?.countryCode?.trim(),
    }));
    setErrors((prev) => ({ ...prev, phoneNumber: error }));
  };

  const handleFamilyChange = (index, event) => {
    const { name, value } = event.target;
    const updatedFamilyInfo = [...familyInfo];
    updatedFamilyInfo[index][name] =
      name == "email" ? value?.trim()?.toLowerCase() : value?.trimStart();

    const error = validateField(name, value?.trimStart(), updatedFamilyInfo[index].country);
    const updatedFamilyErrors = [...familyErrors];
    updatedFamilyErrors[index][name] = error;

    setFamilyInfo(updatedFamilyInfo);
    setFamilyErrors(updatedFamilyErrors);
  };

  const handleFamilyPhoneChange = (index, phone, country) => {
    const error = validateField("phoneNumber", phone?.trim(), country.countryCode?.trim());
    const updatedFamilyInfo = [...familyInfo];
    updatedFamilyInfo[index].phoneNumber = phone?.trim();
    updatedFamilyInfo[index].country = country.countryCode?.trim();

    const updatedFamilyErrors = [...familyErrors];
    updatedFamilyErrors[index].phoneNumber = error;

    setFamilyInfo(updatedFamilyInfo);
    setFamilyErrors(updatedFamilyErrors);
  };

  const handleMedicalHistoryChange = (event) => {
    const { name, value } = event.target;
    const error = validateField(name, value?.trim());
    setMedicalHistory((prev) => ({ ...prev, [name]: value?.trimStart() }));
    setMedicalErrors((prev) => ({ ...prev, [name]: error }));
  };

  const addFamilyMember = () => {
    setFamilyInfo((prev) => [
      ...prev,
      { relation: "", name: "", email: "", phoneNumber: "", hasEmail: "yes", country: "in" },
    ]);
    setFamilyErrors((prev) => [...prev, {}]);
  };

  const handleSubmit = () => {
    const newErrors = {};
    Object.keys(generalInfo).forEach((key) => {
      newErrors[key] = validateField(key, generalInfo[key], generalInfo.country);
    });

    const newFamilyErrors = familyInfo.map((member) => {
      const memberErrors = {};
      Object.keys(member).forEach((key) => {
        if (key !== "country") {
          memberErrors[key] = validateField(key, member[key], member.country);
        }
      });
      return memberErrors;
    });

    const newMedicalErrors = {};
    Object.keys(medicalHistory).forEach((key) => {
      newMedicalErrors[key] = validateField(key, medicalHistory[key]);
    });

    setErrors(newErrors);
    setFamilyErrors(newFamilyErrors);
    setMedicalErrors(newMedicalErrors);

    if (
      !Object.values(newErrors).some((error) => error) &&
      !newFamilyErrors.some((memberErrors) => Object.values(memberErrors).some((error) => error)) &&
      !Object.values(newMedicalErrors).some((error) => error)
    ) {
      const body = {
        last_name: generalInfo.lastName?.trim(),
        first_name: generalInfo.firstName?.trim(),
        birthdate: new Date(generalInfo.birthdate),
        email: generalInfo.email?.trim(),
        phone_number: generalInfo.phoneNumber?.trim(),
        medical_history: medicalHistory.description?.trim(),
        family_members: familyInfo.map(({ hasEmail, ...rest }) => rest),
      };
      dispatch(createPatient(body)).then((res) => {
        if (res?.payload?.status === "success") {
          navigate("/patients");
          setGeneralInfo({
            lastName: "",
            firstName: "",
            birthdate: "",
            phoneNumber: "",
            email: "",
            hasEmail: "yes",
            country: "in",
          });
          setMedicalHistory({ description: "" });
          setFamilyInfo([
            { relation: "", name: "", email: "", phoneNumber: "", hasEmail: "yes", country: "in" },
          ]);
        } else {
          toast("Oops! Something went wrong");
        }
      });
    }
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox py={3}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Card sx={{ marginTop: "20px" }}>
              <SoftBox p={3}>
                <SoftTypography variant="h6" gutterBottom>
                  General Information
                </SoftTypography>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <label>
                      First Name <span>* {errors.firstName && errors.firstName}</span>
                    </label>
                    <SoftInput
                      fullWidth
                      label="First name"
                      name="firstName"
                      type="text"
                      placeholder="Please enter first name"
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
                      placeholder="Please enter last name"
                      value={generalInfo.lastName}
                      onChange={handleInputChange}
                      error={Boolean(errors.lastName)}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <label>
                      Date of Birth <span>* {errors.birthdate && errors.birthdate}</span>
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
                  {generalInfo.hasEmail === "yes" ? (
                    <Grid item xs={12} md={6}>
                      <label>
                        Email <span>* {errors.email && errors.email}</span>
                      </label>
                      <SoftInput
                        fullWidth
                        label="Email"
                        name="email"
                        value={generalInfo.email}
                        onChange={handleInputChange}
                        error={Boolean(errors.email)}
                      />
                    </Grid>
                  ) : (
                    <Grid item xs={12} md={6}>
                      <label>
                        Phone Number <span>* {errors.phoneNumber && errors.phoneNumber}</span>
                      </label>
                      <PhoneInput
                        country={generalInfo.country}
                        value={generalInfo.phoneNumber}
                        onChange={(phone, country) => handlePhoneChange(phone, country)}
                        inputStyle={{
                          width: "100%",
                          border: errors.phoneNumber ? "1px solid red" : "1px solid #ccc",
                        }}
                      />
                    </Grid>
                  )}
                  <Grid item xs={12} md={6}>
                    <FormControl component="fieldset">
                      <label>Do they have an email?</label>
                      <RadioGroup
                        aria-label="hasEmail"
                        name="hasEmail"
                        value={generalInfo.hasEmail}
                        onChange={handleInputChange}
                        sx={{ marginLeft: "10px" }}
                      >
                        <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                        <FormControlLabel value="no" control={<Radio />} label="No" />
                      </RadioGroup>
                    </FormControl>
                  </Grid>
                </Grid>
              </SoftBox>
            </Card>
            <Card sx={{ marginTop: "20px" }}>
              <SoftBox p={3}>
                <SoftTypography variant="h6" gutterBottom>
                  Medical History
                </SoftTypography>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <label>
                      Description{" "}
                      <span>* {medicalErrors?.description && medicalErrors?.description}</span>
                    </label>
                    <textarea
                      rows={7}
                      name="description"
                      className={medicalErrors?.description ? "errorTextArea" : "textAreaInput"}
                      value={medicalHistory.description}
                      onChange={handleMedicalHistoryChange}
                    />
                  </Grid>
                </Grid>
              </SoftBox>
            </Card>
            <Card sx={{ marginTop: "20px" }}>
              <SoftBox p={3}>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <SoftTypography variant="h6" gutterBottom>
                      Family Information
                    </SoftTypography>
                  </Grid>
                  <Grid item xs={6} textAlign="end">
                    <SoftButton variant="gradient" color={sidenavColor} onClick={addFamilyMember}>
                      Add Family Member
                    </SoftButton>
                  </Grid>
                </Grid>
                <SoftBox>
                  {familyInfo.map((member, index) => (
                    <div
                      key={index}
                      style={{
                        position: "relative",
                        border: "0.0625rem solid #d2d6da",
                        borderRadius: "0.5rem",
                        padding: "10px 20px 20px 20px",
                        marginTop: "10px",
                      }}
                    >
                      <IconButton
                        color="primary"
                        onClick={() => {
                          const updatedFamilyInfo = [...familyInfo];
                          updatedFamilyInfo.splice(index, 1);
                          setFamilyInfo(updatedFamilyInfo);
                          const updatedFamilyErrors = [...familyErrors];
                          updatedFamilyErrors.splice(index, 1);
                          setFamilyErrors(updatedFamilyErrors);
                        }}
                        style={{
                          position: "absolute",
                          top: "0px",
                          right: "0px",
                        }}
                      >
                        <Close />
                      </IconButton>

                      <Grid container spacing={2}>
                        <Grid item xs={12} md={6}>
                          <label htmlFor={`relation-select-${index}`}>
                            Relation
                            <span style={{ color: "red" }}> * {familyErrors[index]?.relation}</span>
                          </label>
                          <select
                            id={`relation-select-${index}`}
                            name="relation"
                            className="relation-dropdown"
                            value={member.relation}
                            onChange={(event) => handleFamilyChange(index, event)}
                            style={{
                              width: "100%",
                              padding: "8px",
                              border: Boolean(familyErrors[index]?.relation)
                                ? "1px solid red"
                                : "1px solid #ccc",
                            }}
                          >
                            <option value="">Select Relation</option>
                            <option value="Father">Father</option>
                            <option value="Mother">Mother</option>
                            <option value="Siblings">Siblings</option>
                            <option value="Son">Son</option>
                            <option value="Daughter">Daughter</option>
                            <option value="Spouse">Spouse</option>
                            <option value="Other">Other</option>
                          </select>
                          {member.relation === "Other" && (
                            <>
                              <label>
                                <span>{familyErrors[index]?.otherRelation}</span>
                              </label>
                              <SoftInput
                                fullWidth
                                label="Specify Relation"
                                name="otherRelation"
                                type="text"
                                value={member.otherRelation || ""}
                                onChange={(event) => handleFamilyChange(index, event)}
                                error={Boolean(familyErrors[index]?.otherRelation)}
                              />
                            </>
                          )}
                        </Grid>
                        <Grid item xs={12} md={6}>
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
                        <Grid item xs={12} md={6}>
                          <FormControl component="fieldset">
                            <label>Do they have an email?</label>
                            <RadioGroup
                              aria-label="hasEmail"
                              name="hasEmail"
                              value={member.hasEmail}
                              onChange={(event) => handleFamilyChange(index, event)}
                              sx={{ marginLeft: "10px" }}
                            >
                              <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                              <FormControlLabel value="no" control={<Radio />} label="No" />
                            </RadioGroup>
                          </FormControl>
                        </Grid>
                        {member.hasEmail === "yes" ? (
                          <Grid item xs={12} md={6}>
                            <label>
                              Email{" "}
                              <span>
                                * {familyErrors[index]?.email && familyErrors[index]?.email}
                              </span>
                            </label>
                            <SoftInput
                              fullWidth
                              label="Email"
                              name="email"
                              value={member.email}
                              onChange={(event) => handleFamilyChange(index, event)}
                              error={Boolean(familyErrors[index]?.email)}
                            />
                          </Grid>
                        ) : (
                          <Grid item xs={12} md={6}>
                            <label>
                              Phone Number{" "}
                              <span>
                                *{" "}
                                {familyErrors[index]?.phoneNumber &&
                                  familyErrors[index]?.phoneNumber}
                              </span>
                            </label>
                            <PhoneInput
                              country={member.country}
                              value={member.phoneNumber}
                              onChange={(phone, country) =>
                                handleFamilyPhoneChange(index, phone, country)
                              }
                              inputStyle={{
                                width: "100%",
                                border: familyErrors[index]?.phoneNumber
                                  ? "1px solid red"
                                  : "1px solid #ccc",
                              }}
                            />
                          </Grid>
                        )}
                      </Grid>
                    </div>
                  ))}
                </SoftBox>
              </SoftBox>
            </Card>
          </Grid>
        </Grid>
        <Grid item xs={12} marginTop={"20px"} display="flex" justifyContent="start" gap="10px">
          <SoftButton variant="gradient" color={sidenavColor} onClick={handleSubmit}>
            Submit
          </SoftButton>
          <SoftButton
            variant="gradient"
            color={"secondary"}
            onClick={() => {
              navigate("/patients");
            }}
          >
            Cancel
          </SoftButton>
        </Grid>
      </SoftBox>
    </DashboardLayout>
  );
}

export default CreatePatient;
