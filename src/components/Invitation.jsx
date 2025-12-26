import React from 'react'
import EventCard from './EventCard'

const Invitation = ({event, token, setFlag}) => {
    function recordRespose(formData){
        const status = formData.get("status");
        fetch('http://backend-route-crt-20226011-dev.apps.rm3.7wse.p1.openshiftapps.com/responses/status', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${token}`

        },
        body: JSON.stringify({event_id: event.id,status: status})

    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
      setFlag((prev)=> prev + 1);
      
    })
    .catch(error => {
        console.error('Error updating response:', error);
    });
        

    }
  return (
    <li className="list-group-item d-flex justify-content-between">
        <EventCard event={event}/>
        
            <form action={recordRespose} className='d-flex flex-column justify-content-end'>
                <select  name="status" defaultValue="pending" className="form-select" aria-label="Default select example">
                    <option disabled selected>pending</option>
                    <option value="going">Going</option>
                    <option value="maybe">Maybe</option>
                    <option value="not going">Not Going</option>
                </select>
                <button type="submit" className="btn btn-success">Confirm</button>

            </form>
    </li>
  )
}

export default Invitation
