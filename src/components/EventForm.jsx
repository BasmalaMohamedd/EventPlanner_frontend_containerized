import { useState } from 'react';

const initialForm = {
  title: '',
  date: '',
  time: '',
  location: '',
  description: ''
};

const EventForm = ({ onSubmit }) => {
  const [formValues, setFormValues] = useState(initialForm);
  const [error, setError] = useState('');

  function handleChange(event){
    const {name, value} = event.target;
    setFormValues((prev)=>({
      ...prev,
      [name]: value
    }));
  }

  function handleSubmit(event){
    event.preventDefault();

    
    const emptyField = Object.entries(formValues).find(([, value])=>!value.trim());
    if(emptyField){
      setError(`Please fill the ${emptyField[0]} field before saving.`);
      return;
    }

    
    onSubmit(formValues);
    setFormValues(initialForm);
    setError('');

    
    const cancelBtn = document.getElementById('eventModalCancelBtn');
    if (cancelBtn) {
      cancelBtn.click();
    }
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

          <form onSubmit={handleSubmit}>
            <div className="modal-body">
              <div className="mb-3">
                <label className="form-label">Title</label>
                <input
                  type="text"
                  className="form-control"
                  name="title"
                  value={formValues.title}
                  onChange={handleChange}
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
                    value={formValues.date}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Time</label>
                  <input
                    type="time"
                    className="form-control"
                    name="time"
                    value={formValues.time}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="mb-3 mt-3">
                <label className="form-label">Location</label>
                <input
                  type="text"
                  className="form-control"
                  name="location"
                  value={formValues.location}
                  onChange={handleChange}
                  placeholder="Ex: Downtown Hall"
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Description</label>
                <textarea
                  className="form-control"
                  name="description"
                  rows="3"
                  value={formValues.description}
                  onChange={handleChange}
                  placeholder="Add agenda or notes"
                ></textarea>
              </div>

              {error && <p className="text-danger small">{error}</p>}
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
