import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = ({ isLoggedin, setLoggedin, onAddEventClick }) => {
  function logout() {
    setLoggedin(false);
    localStorage.removeItem("token"); 
  }

  return (
    <nav
      className="navbar navbar-expand-lg p-3 shadow-sm"
      style={{ backgroundColor: "#FCF6FF" }}
    >
      <div className="container-fluid">
        <NavLink to="/" style={{ textDecoration: "none" }}>
          <div className="navbar-brand">
            <i
              className="bi bi-calendar-event p-1 m-1 h4"
              style={{
                backgroundColor: "#6B3F69",
                color: "#EDE4F1",
                borderRadius: "0.5rem",
              }}
            ></i>
            <span className="fs-4 fw-bold" style={{ color: "#3A0C34" }}>
              Event Planner
            </span>
          </div>
        </NavLink>

        <div className="d-flex gap-2">
          {isLoggedin && (
            <>
            
              
              <button
                className="btn hover"
                style={{ backgroundColor: "#3A0C34", color: "#EDE4F1" }}
                type="button"
                data-bs-toggle="modal"
                data-bs-target="#eventModal"
                onClick={onAddEventClick}
              >
                <span className="me-1">Add Event</span>
                <i className="bi bi-plus-lg"></i>
              </button>

              {/* User menu */}
              <div className="dropdown">
                <button
                  className="btn dropdown-toggle border border-0 no-arrow"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <i
                    className="bi bi-person-circle h3 m-2"
                    style={{ color: "#3A0C34" }}
                  ></i>
                </button>
                <ul className="dropdown-menu dropdown-menu-end">
                  <li>
                    <NavLink
                      to="/profile"
                      style={{ textDecoration: "none" }}
                    >
                      <span className="dropdown-item">Profile</span>
                    </NavLink>
                  </li>
                  <li>
                    <button className="dropdown-item" onClick={logout}>
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            </>
          )}

          {!isLoggedin && (
            <>
              <NavLink to="/login" className="btn btn-outline-secondary">
                Login
              </NavLink>
              <NavLink
                to="/signup"
                className="btn"
                style={{ backgroundColor: "#3A0C34", color: "#EDE4F1" }}
              >
                Sign up
              </NavLink>
            </>
          )}
        </div>
      </div>
      
    </nav>
  );
};

export default Navbar;
