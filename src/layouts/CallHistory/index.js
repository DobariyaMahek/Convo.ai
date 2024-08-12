import React, { useState } from "react";
import {
  Card,
  Grid,
  TableRow,
  TableCell,
  TableBody,
  TableHead,
  Table,
  TableContainer,
  IconButton,
} from "@mui/material";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import CallReceivedIcon from "@mui/icons-material/CallReceived";
import CallMissedIcon from "@mui/icons-material/CallMissed";

// Dummy Data
const authorsTableData = {
  columns: [
    { id: "name", label: "Name" },
    { id: "status", label: "Status" },
    { id: "duration", label: "Duration" },
  ],
  rows: [
    { id: "1", name: "John Doe", status: "received", duration: "5 min" },
    { id: "2", name: "Jane Smith", status: "missed", duration: "8 min" },
    { id: "3", name: "Michael Johnson", status: "received", duration: "3 min" },
    { id: "4", name: "Emily Davis", status: "missed", duration: "7 min" },
  ],
};

function CallHistory() {
  const { columns, rows } = authorsTableData;
  const [selectedCall, setSelectedCall] = useState(null);

  const handleRowClick = (row) => {
    setSelectedCall(row);
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox py={3}>
        <Grid container spacing={3}>
          {/* Left side: Call History List */}
          <Grid item xs={12} md={4}>
            <Card>
              <SoftBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
                <SoftTypography variant="h6">Call History</SoftTypography>
              </SoftBox>
              <SoftBox>
                <TableContainer>
                  <Table>
                    <TableBody>
                      {rows.map((row) => (
                        <TableRow
                          key={row.id}
                          onClick={() => handleRowClick(row)}
                          style={{ cursor: "pointer" }}
                        >
                          <TableCell>{row.name}</TableCell>
                          <TableCell>
                            {row.status === "received" ? (
                              <CallReceivedIcon color="#66b5a3" />
                            ) : (
                              <CallMissedIcon color="error" />
                            )}
                          </TableCell>
                          <TableCell>{row.duration}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </SoftBox>
            </Card>
          </Grid>
          {/* Right side: Selected Call Details */}
          <Grid item xs={12} md={8}>
            <Card>
              <SoftBox p={3}>
                <SoftTypography variant="h6">Call Details</SoftTypography>
                {selectedCall ? (
                  <SoftBox mt={2}>
                    <SoftTypography variant="body1">
                      <strong>Name:</strong> {selectedCall.name}
                    </SoftTypography>
                    <SoftTypography variant="body1">
                      <strong>Status:</strong> {selectedCall.status}
                    </SoftTypography>
                    <SoftTypography variant="body1">
                      <strong>Duration:</strong> {selectedCall.duration}
                    </SoftTypography>
                    {/* Add more details if needed */}
                  </SoftBox>
                ) : (
                  <SoftTypography variant="body1" my={5}>
                    Please select a call from the list to see the details.
                  </SoftTypography>
                )}
              </SoftBox>
            </Card>
          </Grid>
        </Grid>
      </SoftBox>
      {/* <Footer /> */}
    </DashboardLayout>
  );
}

export default CallHistory;
