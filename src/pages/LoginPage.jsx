import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom';

const LoginPage = ({ setCurrentUser, setLoggedin}) => {

  const navigate = useNavigate();

  const [loginMessage, setLoginMessage] = useState("");

  function login(formData)
  {
    const email = formData.get("email");
    const password = formData.get("password"); 
    fetch('http://localhost:8000/users/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({email:email, password:password}) // Convert JavaScript object to JSON string
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

        setLoginMessage("login successfully")
        setLoggedin(true);
        localStorage.setItem('token', data.token);
        navigate('/')

    })
    .catch(error => {
        console.error('Error creating item:', error);
    });
    
    console.log(email);
    console.log(password);
    setLoginMessage("check console")
    
  }
  return (
    <section className="vh-100 m-1">
  <div className="mask d-flex align-items-center h-100 gradient-custom-3">
    <div className="container h-100">
      <div className="row d-flex justify-content-center align-items-center h-100">
        <div className="col-12 col-md-9 col-lg-7 col-xl-6">
          <div className="card" style={{borderRadius:"15px"}}>
            <div className="card-body p-5">
              <h2 className="text-uppercase text-center mb-5" style={{color:"#3A0C34"}}>Welcome back</h2>
              <h4 className='text-start' style={{color:"#D34128"}}>{loginMessage}</h4>


              <form action={login}>
                <div data-mdb-input-init className="form-outline mb-4">
                  <label className="form-label" htmlFor="form3Example3cg">Email</label>
                  <input type="email" name='email' id="form3Example3cg" className="form-control form-control-lg" />
                </div>

                <div data-mdb-input-init className="form-outline mb-4">
                  <label className="form-label" htmlFor="form3Example4cg">Password</label>
                  <input type="password" name='password' id="form3Example4cg" className="form-control form-control-lg" />
                </div>
                <div className="d-flex justify-content-end">
                  <button  type="submit" data-mdb-button-init
                    data-mdb-ripple-init className="btn btn-block btn-lg gradient-custom-4" style={{backgroundColor:"#54A98F", color:"#FCF6FF"}}>Login</button>
                </div>

                <p className="text-center text-muted mt-5 mb-0">Don't have an account?
                  <NavLink to="/signup" style={{textDecoration: "none", color:"#386F5F"}}>
                          <span className="fw-bold"><u>Signup here</u></span>    
                    </NavLink>
                  </p>
                    
              </form>

            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
  )
}

export default LoginPage
