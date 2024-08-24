import { useState, useCallback, useRef } from "react";
import Card from "@mui/material/Card";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftInput from "components/SoftInput";
import SoftButton from "components/SoftButton";
import BasicLayout from "layouts/authentication/components/BasicLayout";
import curved6 from "assets/images/curved-images/curved14.jpg";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logIn } from "../../../redux/ApiSlice/authSlice";
import toast from "react-hot-toast";
import { EMAIL_REGEX } from "helper/constant";

const validateField = (name, value) => {
  switch (name) {
    case "name":
      return !value?.trim() ? "Name is required" : "";
    case "email":
      return !value?.trim()
        ? "Email is required"
        : !EMAIL_REGEX.test(value)
        ? "Please enter a valid email"
        : "";
    case "password":
      return !value?.trim()
        ? "Password is required"
        : value.length < 6
        ? "Password must be at least 6 characters long."
        : "";
    default:
      return "";
  }
};

const validateForm = (form) => {
  return {
    name: validateField("name", form.name),
    email: validateField("email", form.email),
    password: validateField("password", form.password),
  };
};

function Index() {
  document.title = "Convo.AI | SignIn";

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState({
    name: "",
    email: "",
    password: "",
  });

  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = useCallback(
    (e) => {
      const { name, value } = e.target;
      setForm((prevForm) => ({
        ...prevForm,
        [name]: value?.trimStart(),
      }));

      // Update validation for the specific field
      setError((prevError) => ({
        ...prevError,
        [name]: validateField(name, value),
      }));
    },
    [setForm, setError]
  );

  const handleSubmit = useCallback(() => {
    const errors = validateForm(form);
    setError(errors);

    const firstInvalidField = Object.keys(errors).find(
      (key) => errors[key] !== ""
    );

    if (firstInvalidField) {
      if (firstInvalidField === "name") nameRef.current.focus();
      if (firstInvalidField === "email") emailRef.current.focus();
      if (firstInvalidField === "password") passwordRef.current.focus();
    } else {
      const { name, email, password } = form;
      dispatch(
        logIn({
          name: name?.trim(),
          email: email?.trim(),
          password: password?.trim(),
        })
      ).then((res) => {
        if (res?.payload?.status === "success") {
          toast("You have successfully logged in.");
          localStorage.setItem("authUser", JSON.stringify({ ...res?.payload }));
          navigate("/dashboard");
        } else {
          const errorMessage =
            res?.payload?.detail ===
            "Incorrect username, email, or password"
              ? "Invalid credentials"
              : "Oops! Something went wrong";
          toast(errorMessage);
        }
      });
    }
  }, [form, dispatch, navigate]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <BasicLayout
      title="Welcome to Convo.AI!"
      description="Securely manage your healthcare, stay informed, and connect with your care team. Log in to get started."
      image={curved6}
    >
      <Card>
        <SoftBox p={3} mb={1} textAlign="center">
          <SoftTypography variant="h5" fontWeight="medium">
            Sign In
          </SoftTypography>
        </SoftBox>
        <SoftBox pt={2} pb={3} px={3}>
          <SoftBox
            component="form"
            role="form"
            onKeyDown={handleKeyDown} // Handle Enter key press
          >
            <SoftBox mb={2}>
              <label>
                Name <span>{error?.name && error?.name}</span>
              </label>
              <SoftInput
                placeholder="Name"
                name="name"
                value={form.name}
                onChange={handleChange}
                error={!!error?.name}
                inputRef={nameRef} // Ref for focusing
              />
            </SoftBox>
            <SoftBox mb={2}>
              <label>
                Email <span>{error?.email && error?.email}</span>
              </label>
              <SoftInput
                placeholder="Email"
                name="email"
                value={form.email}
                onChange={handleChange}
                error={!!error?.email}
                inputRef={emailRef} // Ref for focusing
              />
            </SoftBox>
            <SoftBox mb={2}>
              <label>
                Password <span>{error?.password && error?.password}</span>
              </label>
              <SoftInput
                type="password"
                placeholder="Password"
                name="password"
                value={form.password}
                onChange={handleChange}
                error={!!error?.password}
                inputRef={passwordRef} // Ref for focusing
              />
            </SoftBox>

            <SoftBox display="flex" alignItems="center" justifyContent="end">
              <SoftTypography
                variant="button"
                fontWeight="regular"
                onClick={() => navigate("/authentication/forgot-password")}
                sx={{ cursor: "pointer", userSelect: "none", textAlign: "end" }}
              >
                <strong>Forgot Your Password?</strong>
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

export default Index;
