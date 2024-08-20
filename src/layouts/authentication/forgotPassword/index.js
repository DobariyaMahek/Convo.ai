import { useCallback, useState } from "react";
import Card from "@mui/material/Card";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftInput from "components/SoftInput";
import SoftButton from "components/SoftButton";
import BasicLayout from "layouts/authentication/components/BasicLayout";
import curved6 from "assets/images/curved-images/curved14.jpg";
import toast from "react-hot-toast";
import { ArrowBack } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleEmailChange = (e) => setEmail(e.target.value);
  const validateForm = useCallback(() => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    let errors = !email?.trim()
      ? "Email is required"
      : !emailRegex.test(email)
      ? "Please enter a valid email"
      : "";

    setError(errors);
    if (errors) {
      return false;
    } else {
      return true;
    }
  }, [email]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        // const response = await fetch("/api/forgot-password", {
        //   method: "POST",
        //   headers: {
        //     "Content-Type": "application/json",
        //   },
        //   body: JSON.stringify({ email }),
        // });

        // const data = await response.json();

        // if (response.ok) {
        toast("A password reset link has been sent to your email.");
        // } else {
        //   setMessage(data.error || "An error occurred. Please try again.");
        // }
      } catch (error) {
        toast("An error occurred. Please try again.");
      }
    }
  };

  return (
    <BasicLayout
      title="Forgot Your Password?"
      description="Enter your email address below and we'll send you a link to reset your password."
      image={curved6}
    >
      <Card>
        <SoftBox p={3} mb={1} textAlign="center">
          <SoftTypography variant="h5" fontWeight="medium">
            Forgot Password
          </SoftTypography>
        </SoftBox>
        <SoftBox pt={2} pb={3} px={3}>
          <SoftBox>
            <SoftBox mb={2}>
              <label>
                Email <span>{error && error}</span>
              </label>
              <SoftInput
                type="email"
                placeholder="Email"
                name="email"
                value={email}
                onChange={handleEmailChange}
                error={error}
              />{" "}
            </SoftBox>
            <SoftBox mt={4} mb={1}>
              <SoftButton
                variant="gradient"
                color="dark"
                fullWidth
                disabled={loading}
                onClick={handleSubmit}
              >
                {loading ? "Sending..." : "Send Reset Link"}
              </SoftButton>
            </SoftBox>
            <SoftBox display="flex" alignItems="center" justifyContent="center">
              <SoftTypography
                variant="button"
                fontWeight="regular"
                onClick={() => navigate("/authentication/sign-in")}
                sx={{
                  cursor: "pointer",
                  userSelect: "none",
                  textAlign: "center",
                  marginTop: "20px",
                }}
              >
                <strong
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <ArrowBack /> &nbsp; Back to Sign In
                </strong>
              </SoftTypography>
            </SoftBox>
          </SoftBox>
        </SoftBox>
      </Card>
    </BasicLayout>
  );
}

export default ForgotPassword;
