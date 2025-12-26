import React, { useState } from "react";

const EventDetailsModal = ({ event, onEdit, onDelete, onInvite, token }) => {
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteMessage, setInviteMessage] = useState("");

  const [attendess, setAttendees] = useState([]);

  function getAttendees()
  {
    fetch('http://localhost:8000/responses/attendees', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
              "Authorization": `Bearer ${token}`
  
          },
          body:JSON.stringify({
            event_id:event.id
          })
      })
      .then(response => {
          if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
      })
      .then(data => {
        setAttendees(data)
  
        
      })
      .catch(error => {
          console.error('Error getting events:', error);
      });
  }



  const handleEdit = () => {
    if (onEdit && event) {
      onEdit(event);
    }
  };

  const handleDelete = () => {
    if (onDelete && event) {
      onDelete(event.id);
    }
  };

  const handleInvite = async () => {
    setInviteMessage("");

    if (!inviteEmail.trim()) {
      setInviteMessage("Please enter an email address.");
      return;
    }

    // validation بسيط للـ email (مش perfect بس يكفي UI)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(inviteEmail)) {
      setInviteMessage("Please enter a valid email.");
      return;
    }

    if (onInvite && event) {
      setInviteMessage("Sending invitation...");
      const success = await onInvite({
        email: inviteEmail,
        eventId: event.id,
      });

      if (success) {
        setInviteMessage("Invitation sent successfully!");
        setInviteEmail("");
        // Clear success message after 3 seconds
        setTimeout(() => {
          setInviteMessage("");
        }, 3000);
      } else {
        setInviteMessage("Failed to send invitation. Please try again.");
      }
    }
  };

  return (
    <div
      className="modal fade"
      id="eventDetailsModal"
      tabIndex="-1"
      aria-labelledby="eventDetailsModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">

          <div className="modal-header">
            <h5
              className="modal-title"
              id="eventDetailsModalLabel"
              style={{ color: "#3A0C34" }}
            >
              {event ? event.title : "Event Details"}
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>

          <div className="modal-body">
            {event ? (
              <>
                {/* Basic info */}
                <p>
                  <i className="bi bi-geo-alt me-2"></i>
                  {event.location}
                </p>
                <p>
                  <i className="bi bi-calendar me-2"></i>
                  {event.date}
                </p>
                <p>
                  <i className="bi bi-clock me-2"></i>
                  {event.time}
                </p>
                <p className="mt-3">{event.description}</p>
                <div className="dropdown">
                  <button onClick={getAttendees} className="btn dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                    Your attendees
                  </button>
                  <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                    {
                      attendess.map((attendee)=>{
                          return <li className="d-flex justify-content-between full-width"><i className="bi bi-person mx-2"></i><div className="mx-2">{attendee.username}</div><div className="mx-2">{attendee.status}</div></li>

                      })
                    }
                    
                  </ul>
                </div>
                <hr className="my-3" />
                

                {/* 🔹 Invite section */}
                <h6 className="mb-2">Invite someone</h6>
                <div className="input-group mb-1">
                  <input
                    type="email"
                    className="form-control"
                    placeholder="example@email.com"
                    value={inviteEmail}
                    onChange={(e) => setInviteEmail(e.target.value)}
                  />
                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={handleInvite}
                    disabled={!event}
                  >
                    Invite
                  </button>
                </div>
                {inviteMessage && (
                  <small className="text-muted">{inviteMessage}</small>
                )}
              </>
            ) : (
              <p className="text-muted">No event selected</p>
            )}
          </div>

          <div className="modal-footer">

            {/* Delete */}
            <button
              type="button"
              className="btn btn-outline-danger me-auto"
              onClick={handleDelete}
              disabled={!event}
              data-bs-dismiss="modal"
            >
              <i className="bi bi-trash me-1"></i>
              Delete
            </button>

            {/* Edit */}
            <button
              type="button"
              className="btn"
              style={{ backgroundColor: "#3A0C34", color: "#EDE4F1" }}
              onClick={handleEdit}
              disabled={!event}
              data-bs-dismiss="modal"
            >
              <i className="bi bi-pencil-square me-1"></i>
              Edit
            </button>

            {/* Close */}
            <button
              type="button"
              className="btn btn-light border"
              data-bs-dismiss="modal"
            >
              Close
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default EventDetailsModal;