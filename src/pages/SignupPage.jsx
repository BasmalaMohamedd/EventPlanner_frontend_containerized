import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom';

const SignupPage = () => {
  const [signupMessage, setSignupMessage] = useState("");
  let navigate = useNavigate();
  function signup(formData)
  {
    const fName = formData.get("fName");
    const lName = formData.get("lName");
    const email = formData.get("email");
    const username = formData.get("username");
    const password = formData.get("password");
    const confirmPassword = formData.get("confirmPassword");
    if(password.length < 6)
    {
      setSignupMessage("password cann't be less than 6 characters")

    }
    else if(password == confirmPassword)
    {
      fetch('https://backend-route-crt-20226011-dev.apps.rm3.7wse.p1.openshiftapps.com/users/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email:email, password:password, first_name: fName, last_name:lName, username:username, role:"user"
        }) // Convert JavaScript object to JSON string
      })
      .then(response => {
          if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
      })
      .then(data => {
          console.log(data)
          navigate('/login')

      })
      .catch(error => {
          console.error('Error creating item:', error);
      });
      
    }
    else
      {
        setSignupMessage("password does not match")

    }
    

    
  }
  return (
    <section className="vh-100 m-1">
  <div className="mask d-flex align-items-center h-100 gradient-custom-3">
    <div className="container h-100">
      <div className="row d-flex justify-content-center align-items-center h-100">
        <div className="col-12 col-md-9 col-lg-7 col-xl-6">
          <div className="card" style={{borderRadius:"15px"}}>
            <div className="card-body p-5">
              <h2 className="text-uppercase text-center mb-5" style={{color: "#3A0C34"}}>Create an account</h2>
              <h4 className='text-start' style={{color:"#D34128"}}>{signupMessage}</h4>
              <form action={signup}>
                <div className='d-flex '>
                  <div data-mdb-input-init className="form-outline mb-4 me-1">
                  <label className="form-label" htmlFor="form3Example1cg">First Name</label>
                  <input type="text" name='fName' id="form3Example1cg" className="form-control form-control-lg" />
                </div>
                <div data-mdb-input-init className="form-outline mb-4 ms-1">
                  <label className="form-label" htmlFor="form3Example1cg">Last Name</label>
                  <input type="text" name='lName' id="form3Example1cg" className="form-control form-control-lg" />
                </div>
                </div>
                

                <div data-mdb-input-init className="form-outline mb-4">
                  <label className="form-label" htmlFor="form3Example3cg">username</label>
                  <input type="text" name='username' id="form3Example3cg" className="form-control form-control-lg" />
                </div>
                <div data-mdb-input-init className="form-outline mb-4">
                  <label className="form-label" htmlFor="form3Example3cg">Email</label>
                  <input type="email" name='email' id="form3Example3cg" className="form-control form-control-lg" />
                </div>

                <div data-mdb-input-init className="form-outline mb-4">
                  <label className="form-label" htmlFor="form3Example4cg">Password</label>
                  <input type="password" name='password' id="form3Example4cg" className="form-control form-control-lg" />
                </div>

                <div data-mdb-input-init className="form-outline mb-4">
                  <label className="form-label" htmlFor="form3Example4cdg">Confirm password</label>
                  <input type="password" name='confirmPassword' id="form3Example4cdg" className="form-control form-control-lg" />
                </div>

                <div className="d-flex justify-content-end">
                  <button  type="submit" data-mdb-button-init
                    data-mdb-ripple-init className="btn btn-block btn-lg gradient-custom-4" style={{backgroundColor:"#54A98F", color:"#FCF6FF"}}>Signup</button>
                </div>

                <p className="text-center text-muted mt-5 mb-0">Have already an account?
                  <NavLink to="/login" style={{textDecoration: "none", color:"#386F5F"}}>
                          <span className="fw-bold "><u>Login here</u></span>    
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

export default SignupPage
