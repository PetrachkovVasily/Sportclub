import React, { useState } from "react";
import EventList from "../EventList/EventList";
import Dropdown from "../Dropdown/Dropdown";

interface Props {}

function EventForm({
  selectedDate,
  events,
  setEvents,
  closeModal,
  newEvent,
  setNewEvent,
  editIndex,
  setEditIndex,
}) {
  const resetEventForm = () => {
    setNewEvent({
      title: "",
      location: "",
      startTime: "",
      endTime: "",
    });
  };

  const addOrEditEvent = () => {
    const { title } = newEvent;
    if (!title.trim()) return;

    const key = selectedDate.format("YYYY-MM-DD");
    const currentEvents = events[key] || [];

    if (editIndex !== null) {
      const updated = [...currentEvents];
      updated[editIndex] = newEvent;
      setEvents({ ...events, [key]: updated });
    } else {
      setEvents({ ...events, [key]: [...currentEvents, newEvent] });
    }

    resetEventForm();
    setEditIndex(null);
  };

  const startEditing = (i, event) => {
    setNewEvent(event);
    setEditIndex(i);
  };

  const deleteEvent = (i) => {
    const key = selectedDate.format("YYYY-MM-DD");
    const updated = [...(events[key] || [])];
    updated.splice(i, 1);
    setEvents({ ...events, [key]: updated });
  };

  return (
    <>
      <EventList
        selectedDate={selectedDate}
        events={events}
        startEditing={startEditing}
        deleteEvent={deleteEvent}
        isUser={false}
      />

      {/* Форма добавления / редактирования */}
      <div className="space-y-2 mb-3">
        <div className="px-2 py-1 w-[100%] rounded-[4px] border-[2px] border-[#404040]/12 flex items-center ">
          <Dropdown
            isEmpty={true}
            options={[{ name: "1", option: "1" }]}
            width={"100%"}
            // value={}
            onChange={(e) =>
              setNewEvent({ ...newEvent, title: e.target.value })
            }
          />
        </div>

        <input
          type="text"
          placeholder="Location"
          value={newEvent.location}
          onChange={(e) =>
            setNewEvent({ ...newEvent, location: e.target.value })
          }
          className="w-full border-[2px] border-[#404040]/12 px-2 py-1 rounded-[4px]"
        />
        <div className="flex gap-2">
          <input
            type="time"
            value={newEvent.startTime}
            onChange={(e) =>
              setNewEvent({ ...newEvent, startTime: e.target.value })
            }
            className="w-1/2 border-[2px] border-[#404040]/12 px-2 py-1 rounded-[4px]"
          />
          <input
            type="time"
            value={newEvent.endTime}
            onChange={(e) =>
              setNewEvent({ ...newEvent, endTime: e.target.value })
            }
            className="w-1/2 border-[2px] border-[#404040]/12 px-2 py-1 rounded-[4px]"
          />
        </div>
      </div>

      <div className="flex justify-end gap-2">
        <button
          onClick={closeModal}
          className="px-3 py-1 bg-gray-300 rounded-[4px]"
        >
          Close
        </button>
        <button
          onClick={addOrEditEvent}
          className="px-3 py-1 bg-[#F2B749] text-white  rounded-[4px]"
        >
          {editIndex !== null ? "Save" : "Add"}
        </button>
      </div>
    </>
  );
}

export default EventForm;
