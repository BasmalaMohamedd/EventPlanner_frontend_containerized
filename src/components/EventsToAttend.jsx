import React, { useEffect, useState } from 'react'
import EventToAttendItem from './EventToAttendItem';

const EventsToAttend = ({token,flag}) => {
  const [events, setEvents] = useState([])
  
    function getEvents(){
        fetch('backendd-basmala-student-dev.apps.rm3.7wse.p1.openshiftapps.com/events/events_attend', {
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
        setEvents(data);
  
        
      })
      .catch(error => {
          console.error('Error getting events:', error);
      });
      
      }
  
    useEffect(()=>{
      getEvents();
  
    }, [])
  
    useEffect(()=>{
      getEvents();
  
    }, [flag])
  
  
  if (!events || events.length === 0) {
    return (
      <p className="text-center text-muted mt-4">
        You doesn't have any Events.
      </p>
    );
  }
  return (
    <div>
      <ul class="list-group list-group-flush">
        {events.map((event)=>{
            return (
            <div key={event.id} className="col">
                <EventToAttendItem event={event}/>
            </div>)

        })}
      </ul>
    </div>
  )
}

export default EventsToAttend
