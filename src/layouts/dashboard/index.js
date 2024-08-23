/**
=========================================================
* Convo.AI React - v4.0.1
=========================================================

* Product Page: https://www.creative-tim.com/product/soft-ui-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// @mui material components
import Grid from "@mui/material/Grid";

// Convo.AI React components
import SoftBox from "components/SoftBox";

// Convo.AI React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import MiniStatisticsCard from "examples/Cards/StatisticsCards/MiniStatisticsCard";

// Convo.AI React base styles
import typography from "assets/theme/base/typography";

// Dashboard layout components
import BuildByDevelopers from "layouts/dashboard/components/BuildByDevelopers";
import WorkWithTheRockets from "layouts/dashboard/components/WorkWithTheRockets";

// Data
import reportsBarChartData from "layouts/dashboard/data/reportsBarChartData";
import { getSession } from "helper/authHelper";
import SoftTypography from "components/SoftTypography";
import { Card } from "@mui/material";
import moment from "moment";
function Dashboard() {
  const { size } = typography;
  const { chart, items } = reportsBarChartData;
  document.title = "Convo.AI | Dashboard";
  const userInfo = getSession();
  const patientInfo = {
    last_name: "gomez",
    first_name: "selena",
    birthdate: "1997-06-04T00:00:00.000Z",
    email: "selena@yopmail.com",
    medical_history:
      "A medical history typically follows the history of the present illness if obtained by the treating clinician. The medical history can reveal diagnosed medical conditions, past medical conditions, and potential future health risks for the patient. In addition, the medical history aids in forming differential diagnoses.",
    family_members: [
      {
        relation: "Father",
        name: "robin",
        email: "robin@yopmail.com",
      },
      {
        relation: "Mother",
        name: "kindle",
        email: "kindle@yopmail.com",
      },
    ],
  };
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox py={3}>
        {userInfo?.role == "care_home" && (
          <SoftBox mb={3}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6} xl={3}>
                <MiniStatisticsCard
                  title={{ text: "Active Patients" }}
                  count="10"
                  percentage={{ color: "success" }}
                  icon={{ color: "info", component: "group" }}
                />
              </Grid>
            </Grid>
          </SoftBox>
        )}
        {userInfo?.role == "patient" && (
          <SoftBox mb={3}>
            <Grid container spacing={3}>
              <Grid item xs={12} lg={7}>
                <BuildByDevelopers />
              </Grid>
            </Grid>
          </SoftBox>
        )}
        {userInfo?.role === "family_member" && (
          <SoftBox mb={3}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Card>
                  <SoftBox p={2}>
                    <Grid container spacing={3}>
                      <Grid item xs={12}>
                        <SoftBox display="flex" flexDirection="column" height="100%">
                          <SoftTypography variant="h5" pt={1} fontWeight="bold" gutterBottom>
                            Patient Information
                          </SoftTypography>
                          <SoftBox mt={4} mb={2}>
                            <SoftTypography variant="body2" color="text" fontWeight="bold">
                              {/* It&apos;s {moment(new Date()).format("ddd MMM DD YYYY")} Today */}
                              Name :
                              <SoftTypography
                                variant="p"
                                sx={{ color: "gray", fontSize: "14px", Padding: "0" }}
                              >
                                {" "}
                                {patientInfo.first_name} {patientInfo.last_name}
                              </SoftTypography>
                            </SoftTypography>
                            <SoftTypography variant="body2" color="text" fontWeight="bold">
                              {/* It&apos;s {moment(new Date()).format("ddd MMM DD YYYY")} Today */}
                              Birthdate :
                              <SoftTypography
                                variant="p"
                                sx={{ color: "gray", fontSize: "14px", Padding: "0" }}
                              >
                                {" "}
                                {moment(new Date(patientInfo.birthdate)).format("DD MMM, YYYY")}
                              </SoftTypography>
                            </SoftTypography>{" "}
                            <SoftTypography variant="body2" color="text" fontWeight="bold">
                              {/* It&apos;s {moment(new Date()).format("ddd MMM DD YYYY")} Today */}
                              Status :
                              <SoftTypography
                                variant="p"
                                sx={{ color: "gray", fontSize: "14px", Padding: "0" }}
                              >
                                {" "}
                                Active
                              </SoftTypography>
                            </SoftTypography>{" "}
                            <SoftTypography variant="body2" color="text" fontWeight="bold">
                              {/* It&apos;s {moment(new Date()).format("ddd MMM DD YYYY")} Today */}
                              Email :
                              <SoftTypography
                                variant="p"
                                sx={{ color: "gray", fontSize: "14px", Padding: "0" }}
                              >
                                {" "}
                                {patientInfo.email}
                              </SoftTypography>
                            </SoftTypography>
                            <SoftTypography variant="body2" color="text" fontWeight="bold">
                              {/* It&apos;s {moment(new Date()).format("ddd MMM DD YYYY")} Today */}
                              Medical History :
                              <SoftTypography
                                variant="p"
                                sx={{ color: "gray", fontSize: "14px", Padding: "0" }}
                              >
                                {" "}
                                {patientInfo.medical_history}
                              </SoftTypography>
                            </SoftTypography>
                          </SoftBox>{" "}
                        </SoftBox>
                      </Grid>
                    </Grid>
                  </SoftBox>
                </Card>
              </Grid>
            </Grid>
          </SoftBox>
        )}
      </SoftBox>
      {/* <Footer /> */}
    </DashboardLayout>
  );
}

export default Dashboard;
