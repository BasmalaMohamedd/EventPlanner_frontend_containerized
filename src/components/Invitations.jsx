import React, { useEffect, useState } from 'react'
import Invitation from './Invitation'

const Invitations = ({token, flag, setFlag}) => {
  const [events, setEvents] = useState([])

  function getInvitations(){
      fetch('http://backend-route-crt-20226011-dev.apps.rm3.7wse.p1.openshiftapps.com/events/invited_events', {
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
    getInvitations();

  }, [])

  useEffect(()=>{
    getInvitations();

  }, [flag])

  
  if (!events || events.length === 0) {
    return (
      <p className="text-center text-muted mt-4">
        You doesn't have any invitations.
      </p>
    );
  }
  return (
    <div>
      <ul class="list-group list-group-flush">
        {events.map((event)=>{
            return (
            <div key={event.id} className="col">
                <Invitation event={event} token={token} setFlag={setFlag}/>
            </div>)

        })}
      </ul>
    </div>
  )
}

export default Invitations
