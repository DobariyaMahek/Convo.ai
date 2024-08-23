import React, { useState, useCallback } from "react";
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
import { SendOTP, VerifyForgotPasswordOTP } from "../../../redux/ApiSlice/authSlice";
import { useDispatch } from "react-redux";
import OTPModal from "./OTPModal"; // Import OTPModal
import ResetPasswordModal from "./ResetPasswordModal"; // Import ResetPasswordModal

function ForgotPassword() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [otpModalOpen, setOtpModalOpen] = useState(false);
  const [resetPasswordModalOpen, setResetPasswordModalOpen] = useState(false);
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
    return !errors;
  }, [email]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        await dispatch(SendOTP({ email })).then((res) => {
          if (res?.payload?.status == "success") {
            toast("OTP has been sent to your email.");

            setOtpModalOpen(true); // Open OTP Modal after sending OTP
          } else if (res?.payload?.detail == "An OTP was already sent. Please check your email.") {
            toast(res?.payload?.detail);
            setOtpModalOpen(true); // Open OTP Modal after sending OTP
          }
        });
      } catch (error) {
        toast("An error occurred. Please try again.");
      }
    }
  };

  const handleVerifyOTP = (otp) => {
    dispatch(VerifyForgotPasswordOTP({ email, otp_code: otp })).then((res) => {
      if (res?.payload?.status == "success") {
        toast("OTP verified successfully");

        setOtpModalOpen(false); // Close OTP Modal
        setResetPasswordModalOpen(true); // Open Reset Password Modal
      } else {
        toast(res?.payload?.detail);
      }
    });
  };

  const handleResetPassword = (newPassword) => {
    setResetPasswordModalOpen(false); // Close Reset Password Modal
    toast("Password has been reset successfully.");
    navigate("/authentication/sign-in");
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
                error={!!error}
              />
            </SoftBox>

            <SoftBox mb={1} mt={4}>
              <SoftButton variant="gradient" color="dark" fullWidth onClick={handleSubmit}>
                {"Send OTP"}
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

      {/* OTP Modal */}
      <OTPModal
        open={otpModalOpen}
        onClose={() => setOtpModalOpen(false)}
        onVerify={handleVerifyOTP}
        onSubmit={handleSubmit}
      />

      {/* Reset Password Modal */}
      <ResetPasswordModal
        open={resetPasswordModalOpen}
        onClose={() => {
          setResetPasswordModalOpen(false);
        }}
        email={email}
        onResetPassword={handleResetPassword}
      />
    </BasicLayout>
  );
}

export default ForgotPassword;
