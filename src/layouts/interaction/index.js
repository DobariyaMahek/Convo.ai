import React, { useState } from "react";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import SoftBox from "components/SoftBox";
import ChatBot from "./chatbot";
import PatientInfo from "./patientInfo";

const Interaction = () => {
  const [currentSection, setCurrentSection] = useState(1);
  document.title = "Convo.AI | Chatbot";
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox py={3}>
        {currentSection == 1 && <PatientInfo {...{ setCurrentSection }} />}
        {currentSection == 2 && <ChatBot {...{}} />}
      </SoftBox>
      {/* <Footer /> */}
    </DashboardLayout>
  );
};

export default Interaction;
