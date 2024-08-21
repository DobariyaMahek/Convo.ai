import React, { useState, useEffect } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import "react-big-calendar/lib/css/react-big-calendar.css";
import EventModal from "./eventModal"; // Import the modal component
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import SoftBox from "components/SoftBox";
import { Card, Typography } from "@mui/material";
import "./calender.css";

const locales = {
  "en-US": require("date-fns/locale/en-US"),
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

function CalendarComponent() {
  const [events, setEvents] = useState(() => {
    const savedEvents = JSON.parse(localStorage.getItem("meetings")) || [];
    // Ensure the saved dates are converted back to Date objects
    return savedEvents.map((event) => ({
      ...event,
      start: new Date(event.start),
      end: new Date(event.end),
    }));
  });

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState(null);

  useEffect(() => {
    localStorage.setItem("meetings", JSON.stringify(events));
  }, [events]);

  const handleSelectSlot = (slot) => {
    setSelectedSlot(slot);
    setModalOpen(true);
  };

  const handleSaveEvent = (event) => {
    const newEvent = {
      id: new Date().getTime(),
      title: event.title,
      description: event.description,
      start: event.startDate,
      end: event.endDate,
    };
    setEvents([...events, newEvent]);
  };

  // Custom event display on the calendar
  const eventPropGetter = () => {
    return {
      style: {
        backgroundColor: "#66b5a3",
        color: "white",
        borderRadius: "5px",
        padding: "5px",
        margin: "2px 0",
      },
    };
  };

  const eventRenderer = ({ event }) => (
    <>
      <Typography variant="h6" fontWeight="bold" color="#fff" style={{ fontSize: "14px" }}>
        {event.title}
      </Typography>
      <Typography color="#fff" style={{ fontSize: "12px" }}>
        {format(event.start, "hh:mm a")} - {format(event.end, "hh:mm a")}
      </Typography>
    </>
  );

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox py={3}>
        <SoftBox mb={3}>
          <Card>
            <div style={{ height: "100vh" }}>
              <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                selectable
                onSelectSlot={handleSelectSlot}
                style={{ height: 952 }}
                eventPropGetter={eventPropGetter} // Apply custom styles to events
                components={{
                  event: eventRenderer, // Custom event renderer
                }}
              />
              <EventModal
                open={modalOpen}
                handleClose={() => setModalOpen(false)}
                handleSave={handleSaveEvent}
              />
            </div>
          </Card>
        </SoftBox>
      </SoftBox>
    </DashboardLayout>
  );
}

export default CalendarComponent;
