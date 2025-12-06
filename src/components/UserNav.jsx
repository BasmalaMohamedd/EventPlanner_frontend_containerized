import React from 'react'
// import { NavLink } from 'react-router-dom'

const UserNav = () => {

    function toggleActive(event){
        const navLinks = document.querySelector(".nav-link");
        navLinks.forEach(element => {
            element.classNameList.remove('active');
            
        });
        event.target.classNameList.add('active');

    }

    
  return (
    <ul className="nav nav-tabs" id="myTab" role="tablist">
  <li className="nav-item" role="presentation">
        <button className="nav-link active" id="myEvents-tab" data-bs-toggle="tab" data-bs-target="#myEvents" type="button" role="tab" aria-controls="myEvents" aria-selected="true">My Organized Events</button>
  </li>
  <li className="nav-item" role="presentation">
    <button className="nav-link" id="eventsToAttend-tab" data-bs-toggle="tab" data-bs-target="#eventsToAttend" type="button" role="tab" aria-controls="eventsToAttend" aria-selected="false">Events To Attend</button>
  </li>
  <li className="nav-item" role="presentation">
    <button className="nav-link" id="invitations-tab" data-bs-toggle="tab" data-bs-target="#invitations" type="button" role="tab" aria-controls="invitations" aria-selected="false">My Invitations</button>
  </li>
  <li className="nav-item" role="presentation">
    <button className="nav-link" id="search-tab" data-bs-toggle="tab" data-bs-target="#search" type="button" role="tab" aria-controls="search" aria-selected="false">Search</button>
  </li>
</ul>

    
  )
}

export default UserNav
