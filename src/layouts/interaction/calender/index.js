import React, { useState } from "react";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
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
  document.title = "Convo.AI | Call Calender";
  const eventData = [
    {
      Id: 1,
      Subject: "Meeting",
      StartTime: new Date("Fri Aug 09 2024 18:05:23 GMT+0530 (India Standard Time)"),
      EndTime: new Date("Fri Aug 09 2024 18:45:23 GMT+0530 (India Standard Time)"),
    },
    {
      Id: 2,
      Subject: "Conference",
      StartTime: new Date(2024, 7, 11, 9, 0),
      EndTime: new Date(2024, 7, 11, 11, 0),
    },
    {
      Id: 3,
      Subject: "Webinar",
      StartTime: new Date(2024, 7, 12, 14, 0),
      EndTime: new Date(2024, 7, 12, 16, 0),
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
            <SoftBox>
              <ScheduleComponent
                currentView="Month"
                height={"810px"}
                eventSettings={{ dataSource: eventData }}
              >
                <Inject services={[Day, Week, WorkWeek, Month, Agenda]} />
              </ScheduleComponent>
            </SoftBox>
          </Card>
        </SoftBox>
      </SoftBox>
      {/* <Footer /> */}
    </DashboardLayout>
  );
}

export default CalendarComponent;
