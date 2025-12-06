import React, { useState } from "react";
import EventCard from "./EventCard";
import EventDetailsModal from "./EventDetailsModal";

const OrganizedEvents = ({
  events = [],
  onEditEvent,
  onDeleteEvent,
  onInviteEvent,
}) => {
  const [selectedEvent, setSelectedEvent] = useState(null);

  function handleCardClick(eventObj) {
    setSelectedEvent(eventObj);
  }

  if (!events || events.length === 0) {
    return (
      <p className="text-center text-muted mt-4">
        You haven't created any events yet.
      </p>
    );
  }
  

  return (
    <>
      <div className="row row-cols-1 row-cols-md-3 g-4 m-4">
        {events.map((event) => (
          <div key={event.id} className="col">
            <EventCard event={event} onClick={handleCardClick} />
          </div>
        ))}
      </div>

      {/* Popup details + Edit/Delete/Invite */}
      <EventDetailsModal
        event={selectedEvent}
        onEdit={onEditEvent}
        onDelete={onDeleteEvent}
        onInvite={onInviteEvent}
      />
    </>
  );
};

export default OrganizedEvents;
