import React, { useState } from "react";
import { Modal, Box, Typography } from "@mui/material";
import PropTypes from "prop-types";
import SoftInput from "components/SoftInput";
import { ResetPassword } from "../../../redux/ApiSlice/authSlice";
import { useDispatch } from "react-redux";
import SoftButton from "components/SoftButton";
import toast from "react-hot-toast";

function ResetPasswordModal({ open, onClose, email, onResetPassword }) {
  const [formData, setFormData] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();

  const validateForm = (field, value) => {
    let error = { ...errors };

    if (field === "newPassword") {
      if (!value) {
        error.newPassword = "New Password is required";
      } else if (value.length < 6) {
        error.newPassword = "Password must be at least 6 characters";
      } else {
        delete error.newPassword;
      }
    }

    if (field === "confirmPassword") {
      if (!value) {
        error.confirmPassword = "Confirm Password is required";
      } else if (value.length < 6) {
        error.confirmPassword = "Password must be at least 6 characters";
      } else if (formData.newPassword && value !== formData.newPassword) {
        error.confirmPassword = "Passwords do not match";
      } else {
        delete error.confirmPassword;
      }
    }

    setErrors(error);
    return Object.keys(error).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    validateForm(name, value);
  };

  const handleSubmit = async () => {
    if (
      validateForm("newPassword", formData.newPassword) &&
      validateForm("confirmPassword", formData.confirmPassword)
    ) {
      await dispatch(ResetPassword({ email: email, new_password: formData.newPassword })).then(
        (res) => {
          if (res?.payload?.status === "success") {
            onClose();
            onResetPassword();
          }
        }
      );
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
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
        }}
      >
        <Typography variant="h6" component="h2" mb={2}>
          Reset Password
        </Typography>
        <label>
          New Password <span>* {errors?.newPassword}</span>
        </label>
        <SoftInput
          fullWidth
          name="newPassword"
          label="New Password"
          type="password"
          variant="outlined"
          value={formData.newPassword}
          onChange={handleChange}
          error={!!errors?.newPassword}
        />
        <label style={{ marginTop: "10px" }}>
          Confirm Password <span>* {errors?.confirmPassword}</span>
        </label>
        <SoftInput
          fullWidth
          name="confirmPassword"
          label="Confirm Password"
          type="password"
          variant="outlined"
          value={formData.confirmPassword}
          onChange={handleChange}
          error={!!errors?.confirmPassword}
        />
        <SoftButton fullWidth variant="gradient" color="dark" sx={{ mt: 2 }} onClick={handleSubmit}>
          Reset Password
        </SoftButton>
      </Box>
    </Modal>
  );
}

ResetPasswordModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  email: PropTypes.string.isRequired,
  onResetPassword: PropTypes.func.isRequired,
};

export default ResetPasswordModal;
