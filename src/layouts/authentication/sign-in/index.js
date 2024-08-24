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

function Index() {
  document.title = "Convo.AI | SignIn";

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
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
        [name]: value,
      }));
      setError((prevError) => ({
        ...prevError,
        [name]: "",
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

    // Return the name of the first invalid field
    if (!name?.trim()) return "name";
    if (!email?.trim() || !emailRegex.test(email)) return "email";
    if (!password?.trim() || password.length < 6) return "password";
    return null;
  }, [form]);

  const handleSubmit = useCallback(() => {
    const firstInvalidField = validateForm();
    if (firstInvalidField) {
      if (firstInvalidField === "name") nameRef.current.focus();
      if (firstInvalidField === "email") emailRef.current.focus();
      if (firstInvalidField === "password") passwordRef.current.focus();
    } else {
      const { name, email, password } = form;
      dispatch(logIn({ name, email, password })).then((res) => {
        if (res?.payload?.status === "success") {
          toast("You have successfully logged in.");
          localStorage.setItem("authUser", JSON.stringify({ ...res?.payload }));
          navigate("/dashboard");
        } else {
          const errorMessage =
            res?.payload?.detail === "Incorrect username, email, or password"
              ? "Invalid credentials"
              : "Oops! Something went wrong";
          toast(errorMessage);
        }
      });
    }
  }, [form, validateForm, dispatch, navigate]);

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
                type="email"
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
