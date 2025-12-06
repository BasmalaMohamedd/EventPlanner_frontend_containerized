import React from 'react'
import { NavLink } from 'react-router-dom'
import calendarImg from '../../public/images/calendar.png'
import ServiceCard from '../components/ServiceCard'
const services = [
    {title: "Create events", description: "add your events and invite other to attend"},
    {title: "Attend events", description: `get invited to events and mark them as "Going", "Maybe" and "Not Going"`},
    {title: "Search and filter", description: `search events by abc, filter events by abc`},
]
const LandingPage = () => {
    
  return (
    <div>
        <div className="card m-3 border border-0 rounded-0 p-1" style={{backgroundColor:'inherit', minHeight: "45vh"}}>
            <div className="row g-0">
                <div className="col-md-8">
                    <div className="card-body d-flex flex-column justify-content-around p-3" style={{ minHeight: "35vh" }}>
                        <h1 className="card-title fs-1">Organize and manage all your events in one place</h1>
                        <div className='text-end m-3'>
                            <NavLink to="/login">
                                <button 
                                className="btn px-4 py-2 fw-semibold login-btn"
                                style={{ color:"white"}}
                                >
                                Login Now
                                </button>
                            </NavLink>
                        </div>
                        
                    </div>
                </div>
                <div className="col-md-4">
                    <img src={calendarImg} className="img-fluid rounded-1" alt="..."/>
                </div>
                
            </div>
        </div>
        <div className='m-4 p-4 rounded' style={{backgroundColor:"#9B819A"}}>
            <div className="row row-cols-1 row-cols-md-3 g-4">
                    {services.map(({title, description})=>{
                        return (
                            <div className="col" key={title}>
                                <ServiceCard title={title} description={description}/>
                            </div>
                        )
                    })}
                
                
                </div>

        </div>

        <div className='text-end m-3 mt-5'>
                            <NavLink to="/signup">
                                <button 
                                className="btn px-4 py-2 fw-semibold signup-btn"
                                style={{color:"white"}}
                                >
                                Get Started <i className="bi bi-arrow-right"></i>
                                </button>
                            </NavLink>
                        </div>
    </div>
    
  )
}

export default LandingPage
