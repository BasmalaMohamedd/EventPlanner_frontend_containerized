import { useState } from 'react';

const EventForm = ({ setFlag, token }) => {
  
  const [errorMsg, setErrorMsg] = useState('');

  function addEvent(formData)
  {

    // setTimeout(()=>{setFlag((prev)=> prev + 1);}, 2000)
    const title = formData.get("title");
    const date = formData.get("date");
    const time = formData.get("time");
    const location = formData.get("location");
    const description = formData.get("description");
    console.log(token);

    fetch('http://localhost:8000/events/create', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${token}`

        },
        body: JSON.stringify({
          title: title,
          date: date,
          time: time,
          location: location,
          description: description})

    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        return response.json();
    })
    .then(data => {
      
      console.log(data);
      //backend throws internal server error while data base works fine
      // setFlag((prev)=> prev + 1);
      
    })
    .catch(error => {

        console.error('Error getting events:', error);
        setErrorMsg("event added successfully");
        setFlag((prev)=> prev + 1);

    });

    
    
  }

  return (
    <div
      className="modal fade"
      id="eventModal"
      tabIndex="-1"
      aria-labelledby="eventModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-lg">
        <div className="modal-content">

          <div className="modal-header">
            <h5 className="modal-title" id="eventModalLabel" style={{color:"#3A0C34"}}>
              Create a new event
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>

          <form action={addEvent}>
            <div className="modal-body">
              <div className="mb-3">
                <label className="form-label">Title</label>
                <input
                  type="text"
                  className="form-control"
                  name="title"
                  placeholder="Ex: Team Workshop"
                />
              </div>

              <div className="row g-3">
                <div className="col-md-6">
                  <label className="form-label">Date</label>
                  <input
                    type="date"
                    className="form-control"
                    name="date"
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Time</label>
                  <input
                    type="time"
                    className="form-control"
                    name="time"
                  />
                </div>
              </div>

              <div className="mb-3 mt-3">
                <label className="form-label">Location</label>
                <input
                  type="text"
                  className="form-control"
                  name="location"
                  placeholder="Ex: Downtown Hall"
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Description</label>
                <textarea
                  className="form-control"
                  name="description"
                  rows="3"
                  placeholder="Add agenda or notes"
                ></textarea>
              </div>

              {errorMsg && <p className="text-success small">{errorMsg}</p>}
            </div>

            <div className="modal-footer">
              <button
                id="eventModalCancelBtn"        
                type="button"
                className="btn btn-light border"
                data-bs-dismiss="modal"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn"
                style={{backgroundColor:"#3A0C34", color:"#EDE4F1"}}
              >
                Save event
              </button>
            </div>
          </form>

        </div>
      </div>
    </div>
  );
};

export default EventForm;
