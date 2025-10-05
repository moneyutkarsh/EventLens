import React from "react";
import { useSavedEvents } from "./SavedEventsContext";
import EventsCard from "../Components/EventsCard";

const SavedEvents = () => {
  const { saved } = useSavedEvents();

  return (
    <div >
      <br></br>
      <br></br>
      <h1 className="text-3xl font-bold text-center mb-6">⭐ Saved Events</h1>

      {saved.length === 0 ? (
        <p className="text-center text-gray-400">No saved events yet.</p>
      ) : (
        <EventsCard eventsData={saved} />
      )}
    </div>
  );
};

export default SavedEvents;
