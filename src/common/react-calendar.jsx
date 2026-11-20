import React, { useCallback, useRef } from "react";
import Calendar from "@toast-ui/react-calendar";

import "@toast-ui/calendar/dist/toastui-calendar.min.css";
import "tui-date-picker/dist/tui-date-picker.css";
import "tui-time-picker/dist/tui-time-picker.css";

// Demo calendar (TOAST UI Calendar v2) with sample events — not yet wired to
// serve.'s scheduled events.

const start = new Date();
const end = new Date(new Date().setMinutes(start.getMinutes() + 30));

const initialEvents = [
  {
    id: "1",
    calendarId: "1",
    category: "time",
    title: "Study",
    body: "Test",
    start,
    end,
  },
  {
    id: "2",
    calendarId: "2",
    category: "time",
    title: "Meeting",
    body: "Description",
    start: new Date(new Date().setHours(start.getHours() + 1)),
    end: new Date(new Date().setHours(start.getHours() + 2)),
  },
];

const calendars = [
  {
    id: "1",
    name: "My Calendar",
    color: "#ffffff",
    backgroundColor: "#9e5fff",
    dragBackgroundColor: "#9e5fff",
    borderColor: "#9e5fff",
  },
  {
    id: "2",
    name: "Company",
    color: "#ffffff",
    backgroundColor: "#00a9ff",
    dragBackgroundColor: "#00a9ff",
    borderColor: "#00a9ff",
  },
];

const TheCalendar = () => {
  const cal = useRef(null);
  const instance = () => cal.current.getInstance();

  const onBeforeCreateEvent = useCallback((eventData) => {
    instance().createEvents([
      {
        ...eventData,
        id: String(Math.random()),
        category: eventData.isAllday ? "allday" : "time",
      },
    ]);
  }, []);

  const onBeforeDeleteEvent = useCallback(({ id, calendarId }) => {
    instance().deleteEvent(id, calendarId);
  }, []);

  const onBeforeUpdateEvent = useCallback(({ event, changes }) => {
    instance().updateEvent(event.id, event.calendarId, changes);
  }, []);

  return (
    <div className="App">
      <h1>Welcome to TOAST UI Calendar</h1>
      <Calendar
        ref={cal}
        height="1000px"
        view="week"
        useFormPopup={true}
        useDetailPopup={true}
        calendars={calendars}
        events={initialEvents}
        onBeforeCreateEvent={onBeforeCreateEvent}
        onBeforeDeleteEvent={onBeforeDeleteEvent}
        onBeforeUpdateEvent={onBeforeUpdateEvent}
      />
    </div>
  );
};

export default TheCalendar;
