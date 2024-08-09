import React, { useState } from "react";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import SchedulePopup from "./SchedulePopup"; // Adjust the import path as needed
import { Card } from "@mui/material";
import {
  ScheduleComponent,
  Day,
  Week,
  WorkWeek,
  Month,
  Agenda,
  Inject,
} from "@syncfusion/ej2-react-schedule";
import "./calender.css";
function CalendarComponent() {
  const [eventsData, setEventsData] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const localizer = momentLocalizer(moment);
  const data = [
    {
      Id: 1,
      Subject: "Meeting",
      StartTime: new Date(2023, 1, 15, 10, 0),
      EndTime: new Date(2023, 1, 15, 12, 30),
    },
  ];
  const handleSelect = ({ start, end }) => {
    setSelectedSlot({ start, end });
  };

  const handleSaveEvent = ({ title, start, end }) => {
    setEventsData([...eventsData, { title, start, end }]);
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox py={3}>
        <SoftBox mb={3}>
          <Card>
            <SoftBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
              <SoftTypography variant="h6">Authors table</SoftTypography>
            </SoftBox>
            <SoftBox>
              <ScheduleComponent currentView="Month" height={"720px"}>
                <Inject services={[Day, Week, WorkWeek, Month, Agenda]} />
              </ScheduleComponent>
            </SoftBox>
          </Card>
        </SoftBox>
      </SoftBox>
      <Footer />
      {/* {selectedSlot && (
        <SchedulePopup
          open={!!selectedSlot}
          initialStart={selectedSlot.start}
          initialEnd={selectedSlot.end}
          onClose={() => setSelectedSlot(null)}
          onSave={handleSaveEvent}
        />
      )} */}
    </DashboardLayout>
  );
}

export default CalendarComponent;
