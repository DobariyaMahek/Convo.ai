import React, { useState, useEffect } from "react";
import SoftBox from "components/SoftBox";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
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
  // Load initial events from localStorage
  const [eventsData, setEventsData] = useState(() => {
    const savedEvents = JSON.parse(localStorage.getItem("appointment")) || [];
    return savedEvents;
  });

  useEffect(() => {
    // Update localStorage whenever eventsData changes
    localStorage.setItem("appointment", JSON.stringify(eventsData));
  }, [eventsData]);

  document.title = "Convo.AI | Call Calender";

  const handleActionComplete = (args) => {
    if (args.requestType === "eventCreated") {
      const newEvent = args.addedRecords[0];

      // Generate a unique ID if necessary
      if (!newEvent.Id) {
        newEvent.Id = new Date().getTime(); // Example: Use timestamp as unique ID
      }

      // Prevent duplicates by checking if the ID already exists
      const isDuplicate = eventsData.some((event) => event.Id === newEvent.Id);
      if (!isDuplicate) {
        const updatedEvents = [...eventsData, newEvent];
        setEventsData(updatedEvents); // Update the state and localStorage via useEffect
      }
    } else if (args.requestType === "eventChanged") {
      const updatedEvent = args.changedRecords[0];
      const updatedEvents = eventsData.map((item) =>
        item.Id === updatedEvent.Id ? updatedEvent : item
      );
      setEventsData(updatedEvents); // Update the state and localStorage via useEffect
    } else if (args.requestType === "eventRemoved") {
      const updatedEvent = args.deletedRecords[0];
      const updatedEvents = eventsData.filter((item) => item.Id !== updatedEvent.Id);
      setEventsData(updatedEvents);
    }
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
                eventSettings={{ dataSource: eventsData }}
                actionComplete={handleActionComplete}
              >
                <Inject services={[Day, Week, WorkWeek, Month, Agenda]} />
              </ScheduleComponent>
            </SoftBox>
          </Card>
        </SoftBox>
      </SoftBox>
    </DashboardLayout>
  );
}

export default CalendarComponent;
