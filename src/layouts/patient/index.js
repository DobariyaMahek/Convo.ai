import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "@mui/material/Card";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Table from "examples/Tables/Table";
import SoftAvatar from "components/SoftAvatar";
import SoftBadge from "components/SoftBadge";
import PropTypes from "prop-types";

// Images for fallback
import fallbackImage from "assets/images/bruce-mars.jpg";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Icon,
  Modal,
  Pagination,
  Typography,
} from "@mui/material";
import "./patient.css";
import { PATIENT_LIST_COLUMNS } from "helper/constant";
import SoftButton from "components/SoftButton";
import {
  Cancel,
  CancelOutlined,
  CancelPresentation,
  CancelRounded,
  CancelScheduleSendOutlined,
  ChangeCircleOutlined,
  Delete,
  DeleteOutlined,
  Edit,
  Warning,
  WarningAmber,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import Close from "@mui/icons-material/Close";
import SoftInput from "components/SoftInput";
import { GetActivePatientInfo } from "../../redux/ApiSlice/patientSlice";
import { useDispatch ,useSelector} from "react-redux";
import useDebounce from "helper/useDebounce";
// Author component
function Author({ name, email }) {
  return (
    <SoftBox display="flex" alignItems="center" px={1} py={0.5}>
      <SoftBox display="flex" flexDirection="column">
        <SoftTypography variant="button" fontWeight="medium">
          {name}
        </SoftTypography>
        <SoftTypography variant="caption" color="secondary">
          {email}
        </SoftTypography>
      </SoftBox>
    </SoftBox>
  );
}

Author.propTypes = {
  image: PropTypes.string,
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
};

// Function component
function Function({ job, org }) {
  return (
    <SoftBox display="flex" flexDirection="column">
      <SoftTypography variant="caption" fontWeight="medium" color="text">
        {job}
      </SoftTypography>
      <SoftTypography variant="caption" color="secondary">
        {org}
      </SoftTypography>
    </SoftBox>
  );
}

Function.propTypes = {
  job: PropTypes.string.isRequired,
  org: PropTypes.string.isRequired,
};

function Patient() {
  document.title = "Convo.AI | Patients";
  const {patientInfo}= useSelector((state) => state.patient);
  const [open, setOpen] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const debounceSearch = useDebounce(search, 1000);

  const currentRows = patientInfo.map((item) => ({
    patient: <Author name={`${item?.first_name} ${item?.last_name}`} email={item?.email} />,
    birthDate: (
      <SoftTypography variant="caption" color="secondary" fontWeight="medium">
        {item.birthdate}
      </SoftTypography>
    ),
    status: (
      <SoftBadge
        variant="gradient"
        badgeContent={item.is_active === true ? "Active" : "Inactive"}
        color={item.is_active === true ? "success" : "secondary"}
        size="xs"
        container
      />
    ),
    action: (
      <>
        <Icon
          sx={{ cursor: "pointer" }}
          onClick={() => {
            navigate(`/update-patient/${item?.id}`);
          }}
        >
          <Edit />
        </Icon>
        <Icon
          sx={{ marginLeft: "20px", cursor: "pointer" }}
          onClick={() => {
            setSelectedPatient(item);
            setOpen(true);
          }}
        >
          <Delete />
        </Icon>
      </>
    ),
  }));

  const handleClose = () => {
    setOpen(false);
    setSelectedPatient(null);
  };

  const handleConfirmDelete = () => {
    // Add your delete logic here
    setOpen(false);
    setSelectedPatient(null);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(GetActivePatientInfo({ search: debounceSearch }));
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    fetchData();
  }, [debounceSearch]);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox py={3}>
        <SoftBox mb={3}>
          <Card>
            <SoftBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
              <SoftTypography variant="h6">Patient List</SoftTypography>
              <SoftInput
                placeholder="Type here..."
                icon={{ component: "search", direction: "left" }}
                value={search}
                onChange={(e) => {
                  setSearch(e?.target?.value?.trimStart());
                }}
              />
            </SoftBox>
            <SoftBox
              sx={{
                "& .MuiTableRow-root:not(:last-child)": {
                  "& td": {
                    borderBottom: ({ borders: { borderWidth, borderColor } }) =>
                      `${borderWidth[1]} solid ${borderColor}`,
                  },
                },
              }}
            >
              <Table columns={PATIENT_LIST_COLUMNS} rows={currentRows} />
            </SoftBox>
          </Card>
        </SoftBox>
        {/* <Grid container spacing={3} marginTop="20px">
          <Grid xs={12} display="flex" justifyContent="end">
            <Pagination count={10} color="primary" variant="outlined" shape="rounded" />
          </Grid>
        </Grid> */}
      </SoftBox>

      {/* Confirmation Dialog */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="confirm-modal-title"
        aria-describedby="confirm-modal-description"
        sx={{ outline: "none" }}
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 500,
            bgcolor: "background.paper",
            borderRadius: 2,
            boxShadow: 24,
            p: 4,
            textAlign: "center",
            outline: "none",
          }}
        >
          <Icon
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: "absolute",
              top: 8,
              right: 8,
              color: "text.secondary",
            }}
          >
            <Close />
          </Icon>

          <Typography id="confirm-modal-title" variant="h4" component="h2" gutterBottom>
            Are you sure?
          </Typography>
          <Typography id="confirm-modal-description" variant="body2" color="text.secondary" mb={3}>
            Do you really want to delete these records? This process cannot be undone.
          </Typography>
          <SoftButton variant="outlined" color="secondary" onClick={handleClose} sx={{ mr: 1 }}>
            Cancel
          </SoftButton>
          <SoftButton variant="gradient" color="error" onClick={handleConfirmDelete}>
            Delete
          </SoftButton>
        </Box>
      </Modal>
    </DashboardLayout>
  );
}

export default Patient;
