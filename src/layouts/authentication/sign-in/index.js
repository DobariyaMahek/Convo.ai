import { useState, useCallback } from "react";

// @mui material components
import Card from "@mui/material/Card";
import Checkbox from "@mui/material/Checkbox";

// Convo.AI React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftInput from "components/SoftInput";
import SoftButton from "components/SoftButton";

// Authentication layout components
import BasicLayout from "layouts/authentication/components/BasicLayout";
import Socials from "layouts/authentication/components/Socials";
import Separator from "layouts/authentication/components/Separator";

// Images
import curved6 from "assets/images/curved-images/curved14.jpg";
import { useNavigate } from "react-router-dom";
import { AppBar, Box, Tab, Tabs } from "@mui/material";
import "./sign-in.css";
function index() {
  document.title = "Convo.AI | SignIn";
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    agreement: true,
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [value, setValue] = useState("Carehome");

  const handleChangeTabs = (event, newValue) => {
    setValue(newValue);
  };
  const handleChange = useCallback(
    (e) => {
      const { name, value, type, checked } = e.target;
      setForm((prevForm) => ({
        ...prevForm,
        [name]: type === "checkbox" ? checked : value,
      }));
    },
    [setForm]
  );

  const validateForm = useCallback(() => {
    const { name, email, password } = form;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    let errors = {
      name: !name?.trim() ? "Name is required" : "",
      email: !email?.trim()
        ? "Email is required"
        : !emailRegex.test(email)
        ? "Please enter a valid email"
        : "",
      password: !password?.trim()
        ? "Password is required"
        : password.length < 6
        ? "Password must be at least 6 characters long."
        : "",
    };

    setError(errors);
    if (errors?.name || errors?.email || errors?.password) {
      return false;
    } else {
      return true;
    }
  }, [form]);

  const handleSubmit = useCallback(() => {
    if (validateForm()) {
      const { name, email, password } = form;
      localStorage.setItem("authUser", JSON.stringify({ name, email, password, role: value }));

      navigate("/dashboard");
    }
  }, [form, validateForm]);

  return (
    <BasicLayout
      title="Welcome to Convo.AI!"
      description="Securely manage your healthcare, stay informed, and connect with your care team. Log in to get started."
      image={curved6}
    >
      <Card>
        <SoftBox p={3} mb={3} textAlign="center">
          <AppBar position="static">
            <Tabs
              // orientation={tabsOrientation}
              value={value}
              onChange={handleChangeTabs}
              sx={{
                background: "transparent",
              }}
            >
              <Tab value="Carehome" label="Carehome" />
              <Tab value="Patient" label="Patient" />
              <Tab value="Family" label="Family" />
            </Tabs>
          </AppBar>
        </SoftBox>
        <SoftBox mb={2}>
          <Socials {...{ role: value }} />
        </SoftBox>
        <Separator />
        <SoftBox pt={2} pb={3} px={3}>
          <SoftBox component="form" role="form">
            <SoftBox mb={2}>
              <SoftInput
                placeholder="Name"
                name="name"
                value={form.name}
                onChange={handleChange}
                error={error?.name}
              />
            </SoftBox>
            <SoftBox mb={2}>
              <SoftInput
                type="email"
                placeholder="Email"
                name="email"
                value={form.email}
                onChange={handleChange}
                error={error?.email}
              />
            </SoftBox>
            <SoftBox mb={2}>
              <SoftInput
                type="password"
                placeholder="Password"
                name="password"
                value={form.password}
                onChange={handleChange}
                error={error?.password}
              />
            </SoftBox>

            <SoftBox display="flex" alignItems="center">
              <Checkbox name="agreement" checked={form.agreement} onChange={handleChange} />
              <SoftTypography
                variant="button"
                fontWeight="regular"
                onClick={() =>
                  setForm((prevForm) => ({
                    ...prevForm,
                    agreement: !prevForm.agreement,
                  }))
                }
                sx={{ cursor: "pointer", userSelect: "none" }}
              >
                &nbsp;&nbsp;I agree to the&nbsp;
              </SoftTypography>
              <SoftTypography
                component="a"
                href="#"
                variant="button"
                fontWeight="bold"
                textGradient
              >
                Terms and Conditions
              </SoftTypography>
            </SoftBox>
            <SoftBox mt={4} mb={1}>
              <SoftButton variant="gradient" color="dark" fullWidth onClick={handleSubmit}>
                Sign In
              </SoftButton>
            </SoftBox>
          </SoftBox>
        </SoftBox>
      </Card>
    </BasicLayout>
  );
}

export default index;
