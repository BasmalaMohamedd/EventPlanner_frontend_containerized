import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import { useEffect, useState } from "react";
import Home from "./pages/Home";
import EventForm from "./components/EventForm";
import LandingPage from "./pages/LandingPage";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

const API_BASE_URL = "http://localhost:8000";

function App() {
  const [isLoggedin, setLoggedin] = useState(false);
  const [currentUser, setCurrentUser] = useState({
    first_name: "",
    last_name: "",
    username: "",
    email: "",
  });

  const [events, setEvents] = useState([]);
  const [isCreateModalOpen, setCreateModalOpen] = useState(false);

  const [testUser] = useState({
    first_name: "basmala",
    last_name: "mohamed",
    username: "basmalamohamed",
    email: "basmalamohamed934@gmail.com",
    password: "12345678",
  });

  const [organizedEventsFlag, setOrganizedEventsFlag] = useState(0);

  
  function getToken() {
    return localStorage.getItem("token");
  }

  
  async function handleAddEvent(eventData) {
    console.log(" eventData in handleAddEvent:", eventData);

    const token = getToken();
    if (!token) {
      alert("You must be logged in to create events.");
      console.warn("No token found in localStorage");
      return false;
    }

    try {
      const url = `${API_BASE_URL}/events/create`;
      console.log(" Sending POST to:", url);

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: eventData.title,
          date: eventData.date,
          time: eventData.time,
          location: eventData.location,
          description: eventData.description,
        }),
      });

      console.log(" create event status:", response.status);

      if (!response.ok) {
        const text = await response.text().catch(() => "");
        console.error(" Failed to create event. Body:", text);
        alert(`Failed to create event (status ${response.status})`);
        return false;
      }

      const data = await response.json();
      console.log(" create event JSON:", data);

      const backendEvent = data.event || data;

      const normalizedEvent = {
        ...backendEvent,
        id: backendEvent.id || backendEvent._id?.$oid || backendEvent._id,
      };

      setEvents((prev) => [...prev, normalizedEvent]);
      setOrganizedEventsFlag((prev)=>prev + 1);
      setCreateModalOpen(false);
      return true; // Success
    } catch (error) {
      console.error(" Error creating event (network / JS error):", error);
      
      // More specific error messages
      let errorMessage = "Error creating event: ";
      if (error.message === "Failed to fetch") {
        errorMessage += `Cannot connect to backend server at ${API_BASE_URL}. Please ensure the backend is running and accessible.`;
      } else {
        errorMessage += error.message;
      }
      
      alert(errorMessage);
      return false; 
    }
  }

  
  function handleDeleteEvent(id) {
    setEvents((prev) => prev.filter((e) => e.id !== id));
  }

  function handleCreateToggle() {
    setCreateModalOpen((prev) => !prev);
  }

  async function handleInvite({ email, eventId }) {
    console.log("Invite this email:", email, "to event:", eventId);

    const token = getToken();
    if (!token) {
      alert("You must be logged in to invite users.");
      return false;
    }

    if (!email || !eventId) {
      alert("Email and event ID are required.");
      return false;
    }

    try {
      const url = `${API_BASE_URL}/events/invite`;
      console.log(" Sending POST to:", url);

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          event_id: eventId,
          email: email,
        }),
      });

      console.log(" invite status:", response.status);

      if (!response.ok) {
        const text = await response.text().catch(() => "");
        console.error(" Failed to invite user. Body:", text);
        let errorMessage = `Failed to invite user (status ${response.status})`;
        try {
          const errorData = JSON.parse(text);
          errorMessage = errorData.detail || errorMessage;
        } catch (e) {
          
        }
        alert(errorMessage);
        return false;
      }

      const data = await response.json();
      console.log(" invite JSON:", data);
      return true; 
    } catch (error) {
      console.error("Error inviting user (network / JS error):", error);
      
      let errorMessage = "Error inviting user: ";
      if (error.message === "Failed to fetch") {
        errorMessage += `Cannot connect to backend server at ${API_BASE_URL}. Please ensure the backend is running and accessible.`;
      } else {
        errorMessage += error.message;
      }
      
      alert(errorMessage);
      return false;
    }
  }

  useEffect(()=>{
    const token = getToken();
    if(token)
    {
      fetch('http://localhost:8000/users/login/token', {
        method: 'POST',
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
      console.log(data);
      
        setCurrentUser({
        first_name:data.user.first_name,
        last_name:data.user.last_name,
        username:data.user.username,
        email:data.user.email
        
      })

        setLoggedin(true);
        localStorage.setItem('token', data.token);
        navigate('/')

    })
    .catch(error => {
        console.error('Error creating item:', error);
    });
    
    // if(token == "hello world")  
    // {
    //   setCurrentUser({
    //     first_name:testUser.first_name,
    //     last_name:testUser.last_name,
    //     username:testUser.username,
    //     email:testUser.email
        
    //   })
    //   setLoggedin(true);
        


    }
    
    

  },[])
  
  useEffect(() => {
    if (!isLoggedin) {

      setCurrentUser({
        first_name: "",
        last_name: "",
        username: "",
        email: "",
      });
      setEvents([]);
      setCreateModalOpen(false);
    }
  }, [isLoggedin]);

  // ✅ Load Organized Events → GET /events/organized_events

  useEffect(() => {
    async function loadOrganizedEvents() {
      if (!isLoggedin) return;

      const token = getToken();
      if (!token) {
        console.warn("No token when trying to load events");
        return;
      }

      try {
        const url = `${API_BASE_URL}/events/organized_events`;
        console.log("🔗 GET organized events:", url);

        const response = await fetch(url, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log("📥 organized events status:", response.status);

        if (!response.ok) {
          const text = await response.text().catch(() => "");
          console.error("❌ Failed to load events. Body:", text);
          setEvents([]);
          return;
        }

        const backendEvents = await response.json();
        console.log(" organized events JSON:", backendEvents);

        const normalized = backendEvents.map((ev) => ({
          ...ev,
          id: ev.id || ev._id?.$oid || ev._id,
        }));

        setEvents(normalized);
      } catch (error) {
        console.error(" Error loading events:", error);
        setEvents([]);
      }
    }
    loadOrganizedEvents();
  }, [organizedEventsFlag]);
  useEffect(() => {
    async function loadOrganizedEvents() {
      if (!isLoggedin) return;

      const token = getToken();
      if (!token) {
        console.warn("No token when trying to load events");
        return;
      }

      try {
        const url = `${API_BASE_URL}/events/organized_events`;
        console.log("🔗 GET organized events:", url);

        const response = await fetch(url, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log("📥 organized events status:", response.status);

        if (!response.ok) {
          const text = await response.text().catch(() => "");
          console.error("❌ Failed to load events. Body:", text);
          setEvents([]);
          return;
        }

        const backendEvents = await response.json();
        console.log(" organized events JSON:", backendEvents);

        const normalized = backendEvents.map((ev) => ({
          ...ev,
          id: ev.id || ev._id?.$oid || ev._id,
        }));

        setEvents(normalized);
      } catch (error) {
        console.error(" Error loading events:", error);
        setEvents([]);
      }
    }
    loadOrganizedEvents();
  }, []);

  return (
    <BrowserRouter>
      <Navbar
        isLoggedin={isLoggedin}
        setLoggedin={setLoggedin}
        onAddEventClick={handleCreateToggle}
      />

      <Routes>
        <Route
          path="/"
          element={
            isLoggedin ? (
              <Home
                userName={currentUser.first_name}
                events={events}
                isLoggedin={isLoggedin}
                onDeleteEvent={handleDeleteEvent}
                onInviteEvent={handleInvite}
                token={getToken()}
              />
            ) : (
              <LandingPage />
            )
          }
        />

        <Route path="/signup" element={<SignupPage />} />

        <Route
          path="/login"
          element={
            <LoginPage
              testUser={testUser}
              setCurrentUser={setCurrentUser}
              setLoggedin={setLoggedin}
            />
          }
        />

        <Route path="/profile" element={<ProfilePage />} />
      </Routes>

      {isLoggedin && <EventForm onSubmit={handleAddEvent} />}
    </BrowserRouter>
  );
}

export default App;