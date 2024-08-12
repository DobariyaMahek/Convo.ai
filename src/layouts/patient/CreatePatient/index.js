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
import Card from "@mui/material/Card";

// Convo.AI React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

// Convo.AI React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import Table from "examples/Tables/Table";

// Data
import authorsTableData from "layouts/tables/data/authorsTableData";
import projectsTableData from "layouts/tables/data/projectsTableData";

function CreatePatient() {
  const { columns, rows } = authorsTableData;
  const { columns: prCols, rows: prRows } = projectsTableData;
  document.title = "Convo.AI | Create Patients";
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox py={3}></SoftBox>
      {/* <Footer /> */}
    </DashboardLayout>
  );
}

export default CreatePatient;
