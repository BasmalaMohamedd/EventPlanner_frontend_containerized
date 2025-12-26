import React, { useState } from "react";
import UserNav from "../components/UserNav";
import OrganizedEvents from "../components/OrganizedEvents";
import EventsToAttend from "../components/EventsToAttend";
import Invitations from "../components/Invitations";
import Search from "../components/Search";

const Home = ({
  userName,
  isLoggedin,
  onDeleteEvent,
  onInviteEvent,
  token,
  organizedEventsFlag
}) => {
  const [invitationsFlag, setInvitationsFlag] = useState(0);

  
  return (
    <div className="container py-4">
      <div className="">
        <h1 className="text-start mb-4">
        Hello {userName || "from home"}
      </h1>
      
      </div>
      

      {isLoggedin && <UserNav />}

      {isLoggedin && (
        <div
          className="border tab-content"
          id="myTabContent"
          style={{ backgroundColor: "white" }}
        >
          {/* My Organized Events */}
          <div
            className="tab-pane fade show active"
            id="myEvents"
            role="tabpanel"
            aria-labelledby="myEvents-tab"
          >
            <OrganizedEvents
              onDeleteEvent={onDeleteEvent}
              onInviteEvent={onInviteEvent}
              token ={token}
              flag={organizedEventsFlag}
              userFlag={isLoggedin}
            />
          </div>

          {/* Events To Attend */}
          <div
            className="tab-pane fade"
            id="eventsToAttend"
            role="tabpanel"
            aria-labelledby="eventsToAttend-tab"
          >
            <EventsToAttend token={token} flag={invitationsFlag}/>
          </div>

          {/* My Invitations */}
          <div
            className="tab-pane fade"
            id="invitations"
            role="tabpanel"
            aria-labelledby="invitations-tab"
          >
            <Invitations token={token} flag={invitationsFlag} setFlag={setInvitationsFlag}/>
          </div>
          {/* Search */}
          <div
            className="tab-pane fade"
            id="search"
            role="tabpanel"
            aria-labelledby="search-tab"
          >
            <Search token={token}/>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
