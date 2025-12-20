import React, { useEffect, useState } from "react";
import EventCard from "./EventCard";
import EventDetailsModal from "./EventDetailsModal";

const OrganizedEvents = ({
  flag,
  token,
  onEditEvent,
  onDeleteEvent,
  onInviteEvent,
}) => {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  function getEvents(){
    fetch('http://localhost:8000/events/organized_events', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${token}`

        },
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
      console.log(data);
      setEvents(data);

      
    })
    .catch(error => {
        console.error('Error getting events:', error);
    });
  }
  useEffect(getEvents, [])
  useEffect(getEvents, [flag])

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
