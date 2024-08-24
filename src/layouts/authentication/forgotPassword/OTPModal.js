import React, { useState, useCallback } from "react";
import { Modal, Box, Grid } from "@mui/material";
import PropTypes from "prop-types";
import SoftTypography from "components/SoftTypography";
import SoftButton from "components/SoftButton";
import SoftInput from "components/SoftInput";

function OTPModal({ open, onClose, onVerify, onSubmit }) {
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [activeInput, setActiveInput] = useState(0);
  const [error, setError] = useState("");

  const handleOtpChange = useCallback((newOtp) => {
    const otpValue = newOtp.join("");
    otpValue.length === 6 ? setError("") : setError("Please enter a valid 6-digit OTP");
  }, []);

  const changeCodeAtFocus = useCallback(
    (str) => {
      const updatedOTPValues = [...otp];
      updatedOTPValues[activeInput] = str[0] || "";
      setOtp(updatedOTPValues);
      handleOtpChange(updatedOTPValues);
    },
    [activeInput, handleOtpChange, otp]
  );

  const focusInput = useCallback((inputIndex) => {
    const selectedIndex = Math.max(Math.min(5, inputIndex), 0);
    setActiveInput(selectedIndex);
    document.getElementById(`otp-input-${selectedIndex}`).focus();
  }, []);

  const handleOnChange = useCallback(
    (e) => {
      const val = e.target.value;
      if (/^\d$/.test(val)) {
        changeCodeAtFocus(val);
        focusInput(activeInput + 1);
      }
    },
    [activeInput, changeCodeAtFocus, focusInput]
  );

  const handleOnKeyDown = useCallback(
    (e) => {
      const pressedKey = e.key;

      switch (pressedKey) {
        case "Backspace":
        case "Delete": {
          e.preventDefault();
          if (otp[activeInput]) {
            changeCodeAtFocus("");
          } else {
            focusInput(activeInput - 1);
          }
          break;
        }
        case "ArrowLeft": {
          e.preventDefault();
          focusInput(activeInput - 1);
          break;
        }
        case "ArrowRight": {
          e.preventDefault();
          focusInput(activeInput + 1);
          break;
        }
        case "Enter": {
          e.preventDefault();
          handleSubmit(e);
        }
        default: {
          if (pressedKey.match(/^[^a-zA-Z0-9]$/)) {
            e.preventDefault();
          }
          break;
        }
      }
    },
    [activeInput, changeCodeAtFocus, focusInput, otp]
  );

  const handlePaste = useCallback(
    (e) => {
      e.preventDefault();
      const pastedData = e.clipboardData
        .getData("text")
        .slice(0, 6 - activeInput)
        .split("");
      if (pastedData) {
        const updatedOTPValues = [...otp];
        pastedData.forEach((char, index) => {
          updatedOTPValues[activeInput + index] = char;
        });
        setOtp(updatedOTPValues);
        handleOtpChange(updatedOTPValues);

        // Focus on the last filled input
        const lastFilledInput = Math.min(activeInput + pastedData.length - 1, 5);
        setActiveInput(lastFilledInput);
        focusInput(lastFilledInput + 1);
      }
    },
    [activeInput, handleOtpChange, focusInput, otp]
  );

  const handleSubmit = () => {
    const otpValue = otp.join("");
    if (otpValue.length !== 6) {
      setError("Please enter a valid 6-digit OTP");
    } else {
      setError("");
      onVerify(otpValue);
      setOtp(new Array(6).fill(""));
      focusInput(0);
    }
  };

  return (
    <Modal
      open={open}
      onClose={(e) => {
        onClose(e);
        setOtp(new Array(6).fill(""));
        setError("");
      }}
      sx={{ border: "none", outline: "none" }}
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
          border: "none",
          outline: "none",
        }}
      >
        <label>
          Verify OTP <span>* {error && error}</span>
        </label>
        <Grid container spacing={2} justifyContent="center" mb={2}>
          {otp.map((value, index) => (
            <Grid item key={index} xs={2}>
              <SoftInput
                inputProps={{
                  maxLength: 1,
                  style: { textAlign: "center" },
                  id: `otp-input-${index}`,
                  onPaste: handlePaste, // Add paste event listener
                }}
                type={"text"}
                value={value}
                onChange={handleOnChange}
                onKeyDown={(e) => handleOnKeyDown(e, index)}
                onFocus={() => setActiveInput(index)}
                error={!value && error}
              />
            </Grid>
          ))}
        </Grid>

        <SoftTypography
          variant="button"
          fontWeight="regular"
          onClick={onSubmit}
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
            Resend OTP
          </strong>
        </SoftTypography>
        <SoftButton fullWidth variant="gradient" color="dark" sx={{ mt: 2 }} onClick={handleSubmit}>
          Verify OTP
        </SoftButton>
      </Box>
    </Modal>
  );
}

OTPModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onVerify: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default OTPModal;
