import React from 'react';

const EventCard = ({ event, onClick }) => {
  const { id, title, location, date, time, description } = event;

  return (
    <div
      className="card h-100 shadow-sm event-card"
      onClick={() => onClick(event)}
      data-bs-toggle="modal"
      data-bs-target="#eventDetailsModal"
      style={{ cursor: "pointer" }}
    >
      <div className="card-body">

        <h5 className="card-title" style={{ color: "#3A0C34" }}>
          {title}
        </h5>

        {/* Location */}
        <div className="d-flex align-items-center mb-2">
          <i className="bi bi-geo-alt me-2"></i>
          <p className="mb-0">{location}</p>
        </div>

        {/* Date */}
        <div className="d-flex align-items-center mb-2">
          <i className="bi bi-calendar me-2"></i>
          <p className="mb-0">{date}</p>
        </div>

        {/* Time */}
        <div className="d-flex align-items-center mb-3">
          <i className="bi bi-clock me-2"></i>
          <p className="mb-0">{time}</p>
        </div>

        <p className="card-text">{description}</p>

      </div>
    </div>
  );
};

export default EventCard;
