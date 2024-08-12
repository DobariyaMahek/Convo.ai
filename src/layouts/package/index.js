/**
=========================================================
* Convo.AI Re6ct - v4.0.1
=========================================================

* Product Page: https://www.creative-tim.com/product/soft-ui-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// @mui material components
import Card from "@mui/material/Card";
import { Box, CardContent, Typography, Grid } from "@mui/material";

// Convo.AI React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftButton from "components/SoftButton";

// Convo.AI React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

// Context
import { useSoftUIController } from "context";
function Package() {
  const [controller] = useSoftUIController();
  const { sidenavColor } = controller;
  document.title = "Convo.AI | Package";

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox py={3}>
        <Box py={6} px={2} bgcolor="#f9f9f9">
          <Grid container spacing={4} justifyContent="center">
            {/* Basic Plan */}
            <Grid item xs={12} sm={6} md={6} lg={4}>
              <Card
                sx={{
                  borderRadius: "16px",
                  textAlign: "center",
                  bgcolor: "white",
                  paddingY: "20px",
                  transition: "transform 0.3s",
                  "&:hover": {
                    transform: "translateY(-10px)",
                  },
                }}
              >
                <CardContent>
                  <SoftTypography variant="h5" fontWeight="bold" mb={2} color="#66b5a3">
                    Basic Plan
                  </SoftTypography>
                  <Typography variant="h4" fontWeight="bold" color="#66b5a3" gutterBottom>
                    $19{" "}
                    <Typography variant="body2" component="span" color="textSecondary">
                      / month
                    </Typography>
                  </Typography>
                  <Typography variant="body1" mb={3} color="textSecondary">
                    Ideal for individuals who need basic features.
                  </Typography>
                  <Box mb={3}>
                    <SoftBox mt={2}>
                      <SoftButton variant="gradient" color={sidenavColor}>
                        Get Started
                      </SoftButton>
                    </SoftBox>
                  </Box>
                  <Typography variant="body2" color="textSecondary">
                    <ul style={{ listStyleType: "none", padding: 0, textAlign: "left" }}>
                      <li>Patient Management</li>
                      <li>Appointment Scheduling</li>
                      <li>Basic Reporting</li>
                      <li>10 GB Storage</li>
                      <li>Email Support</li>
                    </ul>
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            {/* Standard Plan */}
            <Grid item xs={12} sm={6} md={6} lg={4}>
              <Card
                sx={{
                  borderRadius: "16px",
                  textAlign: "center",
                  bgcolor: "white",
                  paddingY: "20px",
                  transition: "transform 0.3s",
                  "&:hover": {
                    transform: "translateY(-10px)",
                  },
                }}
              >
                <CardContent>
                  <SoftTypography variant="h5" fontWeight="bold" mb={2} color="#66b5a3">
                    Standard Plan
                  </SoftTypography>
                  <Typography variant="h4" fontWeight="bold" color="#66b5a3" gutterBottom>
                    $39{" "}
                    <Typography variant="body2" component="span" color="textSecondary">
                      / month
                    </Typography>
                  </Typography>
                  <Typography variant="body1" mb={3} color="textSecondary">
                    Perfect for small teams with more features.
                  </Typography>
                  <Box mb={3}>
                    <SoftBox mt={2}>
                      <SoftButton variant="gradient" color={sidenavColor}>
                        Get Started
                      </SoftButton>
                    </SoftBox>
                  </Box>
                  <Typography variant="body2" color="textSecondary">
                    <ul style={{ listStyleType: "none", padding: 0, textAlign: "left" }}>
                      <li>Patient Management</li>
                      <li>Appointment Scheduling</li>
                      <li>Advanced Reporting</li>
                      <li>50 GB Storage</li>
                      <li>Priority Email Support</li>
                    </ul>
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            {/* Premium Plan */}
            <Grid item xs={12} sm={6} md={6} lg={4}>
              <Card
                sx={{
                  borderRadius: "16px",
                  textAlign: "center",
                  bgcolor: "white",
                  paddingY: "20px",
                  transition: "transform 0.3s",
                  "&:hover": {
                    transform: "translateY(-10px)",
                  },
                }}
              >
                <CardContent>
                  <SoftTypography variant="h5" fontWeight="bold" mb={2} color="#66b5a3">
                    Premium Plan
                  </SoftTypography>
                  <Typography variant="h4" fontWeight="bold" color="#66b5a3" gutterBottom>
                    $59{" "}
                    <Typography variant="body2" component="span" color="textSecondary">
                      / month
                    </Typography>
                  </Typography>
                  <Typography variant="body1" mb={3} color="textSecondary">
                    Best for larger teams with all the features.
                  </Typography>
                  <Box mb={3}>
                    <SoftBox mt={2}>
                      <SoftButton variant="gradient" color={sidenavColor}>
                        Get Started
                      </SoftButton>
                    </SoftBox>
                  </Box>
                  <Typography variant="body2" color="textSecondary">
                    <ul style={{ listStyleType: "none", padding: 0, textAlign: "left" }}>
                      <li>Patient Management</li>
                      <li>Appointment Scheduling</li>
                      <li>Comprehensive Reporting</li>
                      <li>200 GB Storage</li>
                      <li>24/7 Support</li>
                    </ul>
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>
      </SoftBox>
      {/* <Footer /> */}
    </DashboardLayout>
  );
}

export default Package;
