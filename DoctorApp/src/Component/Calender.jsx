import React, { useState } from "react";
import Background from "../assets/background.png";

const daysOfWeek = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const monthOfYear = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function Calendar() {
  const currentDate = new Date();
  const [currentMonth, setCurrentMonth] = useState(currentDate.getMonth());
  const [currentYear, setCurrentYear] = useState(currentDate.getFullYear());
  const [selectedDay, setSelectedDay] = useState(null);
  const [showEventPopup, setShowEventPopup] = useState(false);
  const [events, setEvents] = useState([]);
  const [eventTime, setEventTime] = useState({ hour: "00", minutes: "00" });
  const [eventText, setEventText] = useState("");
  const [editingEvent, setEditingEvent] = useState(null);
  const [time, setTime] = useState(
    new Date().toLocaleTimeString("en-US", { hour12: false })
  );

  const dateOfMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

  const startClock = () => {
    setInterval(() =>
      setTime(new Date().toLocaleTimeString("en-US", { hour12: false }))
    );
  };

  const updatedTime = () => {
    setTime(new Date().toLocaleTimeString("en-US", { hour12: false }));
  };

  const handleDayClick = (day) => {
    const clickedDate = new Date(currentYear, currentMonth, day);
    const today = new Date();

    if (clickedDate >= today) {
      setSelectedDay(clickedDate);
      setShowEventPopup(true);
      setEventTime({ hour: "00", minutes: "00" });
      setEventText("");
      setEditingEvent(null);
    }
  };

  const handleEventSubmit = () => {
    const newEvent = {
      id: editingEvent ? editingEvent.id : Date.now(),
      date: selectedDay,
      time: `${eventTime.hour.padStart(2, "0")}:${eventTime.minutes.padStart(
        2,
        "0"
      )}`,
      text: eventText,
    };

    let updatedEvents = [...events];

    if (editingEvent) {
      updatedEvents = updatedEvents.map((event) =>
        event.id === editingEvent.id ? newEvent : event
      );
    } else {
      updatedEvents.push(newEvent);
    }

    updatedEvents.sort((a, b) => new Date(a.date) - new Date(b.date));

    setEvents(updatedEvents);
    setEventTime({ hour: "00", minutes: "00" });
    setEventText("");
    setShowEventPopup(false);
    setEditingEvent(null);
  };

  const handleEditingEvents = (event) => {
    setSelectedDay(new Date(event.date));
    setEventTime({
      hour: event.time.split(":")[0],
      minutes: event.time.split(":")[1],
    });
    setEventText(event.text);
    setEditingEvent(event);
    setShowEventPopup(true);
  };

  const handleDeleteEvents = (eventId) => {
    setEvents((prevEvents) =>
      prevEvents.filter((event) => event.id !== eventId)
    );
  };

  const closePopup = () => {
    setShowEventPopup(false);
  };

  const prevMonth = () => {
    setCurrentMonth((prevMonth) => (prevMonth === 0 ? 11 : prevMonth - 1));
    setCurrentYear((prevYear) =>
      currentMonth === 0 ? prevYear - 1 : prevYear
    );
  };

  const nextMonth = () => {
    setCurrentMonth((prevMonth) => (prevMonth === 11 ? 0 : prevMonth + 1));
    setCurrentYear((prevYear) =>
      currentMonth === 11 ? prevYear + 1 : prevYear
    );
  };

  startClock();

  return (
    <div
      className="Calendar-App flex flex-col items-center justify-center min-h-screen bg-cover bg-center bg-no-repeat p-7"
      style={{ backgroundImage: `url(${Background})` }}
    >
      <div className="bg-white shadow-lg rounded-2xl p-4 w-full max-w-lg text-center mb-4">
        <h1 className="text-2xl font-bold text-[#258C9B]">
          Current Time: {time}
        </h1>
        <button
          onClick={updatedTime}
          className="bg-[#258C9B] text-white px-4 py-2 rounded-lg hover:bg-[#2a3e41] transition"
        >
          Update Time
        </button>
      </div>

      <div className="Calendar bg-white shadow-lg rounded-2xl p-6 w-full max-w-lg">
        <h1 className="Header text-4xl font-bold text-center text-[#258C9B] mb-4">
          Reminder
        </h1>

        <div className="Navigate flex justify-between items-center bg-[#7ea8af] p-3 rounded-lg mb-4">
          <button
            className="text-white hover:text-[#258C9B] text-2xl px-2"
            onClick={prevMonth}
          >
            ❮
          </button>
          <div className="flex flex-col items-center">
            <h2 className="month text-lg font-semibold text-white">
              {monthOfYear[currentMonth]}
            </h2>
            <h2 className="year text-lg font-semibold text-white">
              {currentYear}
            </h2>
          </div>
          <button
            className="text-white hover:text-[#258C9B] text-2xl px-2"
            onClick={nextMonth}
          >
            ❯
          </button>
        </div>

        <div className="weekdays grid grid-cols-7 text-xs text-center font-semibold text-[#258C9B] mb-2 border-b pb-2">
          {daysOfWeek.map((day) => (
            <span key={day}>{day}</span>
          ))}
        </div>

        <div className="days grid grid-cols-7 gap-1 text-center text-[#258C9B]">
          {[...Array(firstDayOfMonth)].map((_, index) => (
            <span key={`empty-${index}`} />
          ))}

          {[...Array(dateOfMonth)].map((_, day) => (
            <span
              key={day + 1}
              className={`p-2 rounded-full w-10 h-10 flex items-center justify-center cursor-pointer 
                ${
                  day + 1 === currentDate.getDate() &&
                  currentMonth === currentDate.getMonth() &&
                  currentYear === currentDate.getFullYear()
                    ? "bg-[#258C9B] text-white font-bold shadow-lg"
                    : "text-[#258C9B] hover:bg-[#71aeb8]"
                }`}
              onClick={() => handleDayClick(day + 1)}
            >
              {day + 1}
            </span>
          ))}
        </div>

        <div className="events mt-6 p-4 bg-[#7c979c] rounded-lg shadow-sm">
          {showEventPopup && (
            <div className="event-popup bg-white p-6 rounded-lg shadow-lg fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 z-50">
              <h2 className="text-[#258C9B] font-semibold text-center mb-3">
                Add Event - {selectedDay?.toDateString()}
              </h2>
              <div className="time-input flex space-x-2 mb-2">
                <div className="event-popup-time font-semibold text-[#258C9B]">
                  Time
                </div>
                <input
                  type="number"
                  name="Hours"
                  min={0}
                  max={23}
                  className="p-2 border rounded-lg w-1/2"
                  placeholder="Hour"
                  value={eventTime.hour || ""}
                  onChange={(e) =>
                    setEventTime({ ...eventTime, hour: e.target.value })
                  }
                />
                <input
                  type="number"
                  name="minutes"
                  min={0}
                  max={59}
                  className="p-2 border rounded-lg w-1/2"
                  placeholder="Minute"
                  value={eventTime.minutes}
                  onChange={(e) =>
                    setEventTime({ ...eventTime, minutes: e.target.value })
                  }
                />
              </div>
              <textarea
                className="w-full p-2 border rounded-lg"
                placeholder="Enter the event"
                value={eventText}
                onChange={(e) => {
                  if (e.target.value.length <= 60) {
                    setEventText(e.target.value);
                  }
                }}
              ></textarea>
              <button
                className="event-popup-btn mt-2 w-full bg-[#258C9B] text-white p-2 rounded-lg hover:bg-[#95afb3] transition-all"
                onClick={handleEventSubmit}
              >
                Add Event
              </button>
              <button
                className="close-popup-btn text-gray-600 hover:text-red-600 mt-2 w-full"
                onClick={closePopup}
              >
                ❌ Close
              </button>
            </div>
          )}

          {events.map((event, index) => (
            <div
              className="event bg-[#f8f8f8] p-3 rounded-lg shadow-md mt-4"
              key={index}
            >
              <div className="event-date-wrapper flex justify-between items-center">
                <div className="event-date text-[#258C9B] font-semibold">
                  {monthOfYear[event.date.getMonth()]} - {event.date.getDate()} -{" "}
                  {event.date.getFullYear()}
                </div>
                <div className="event-time text-[#258C9B]">{event.time}</div>
              </div>
              <div className="event-text flex justify-end space-x-2 mt-2 text-[#258C9B]">
                {event.text}
              </div>
              <div className="flex justify-end space-x-3 mt-2">
                <i
                  className="bx bxs-edit-alt text-pink-500 cursor-pointer"
                  onClick={() => handleEditingEvents(event)}
                ></i>
                <i
                  className="bx bxs-message-alt-x text-red-500 cursor-pointer"
                  onClick={() => handleDeleteEvents(event.id)}
                ></i>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Calendar;
