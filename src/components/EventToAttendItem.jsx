import React from 'react'
import EventCard from './EventCard'

const EventToAttendItem = ({event={}}) => {
    function getColor(){
        if(event.status == "going")
        {
            return 'text-green-400'
        }
        else if(event.status == "not going")
        {
            return 'text-red-400'
        }
        else if(event.status == "maybe")
        {
            return 'text-gray-400'
        }
        return ''
    }
  return (
    <li className="list-group-item d-flex justify-content-between">
        <EventCard event={event}/>
        <div className={getColor()}>{event.status}</div>
    </li>
  )
}

export default EventToAttendItem
