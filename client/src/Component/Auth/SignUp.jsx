import React, { useState } from 'react';
import '../Styles/auth.css';
import {Link} from 'react-router-dom';

const SignUp = () => {

  const [input,setInput] = useState({fullName:"",email:"",password:"",cpassword:""});

  const handleSubmit = ()=>{

  }

  const handleChange = (e) => {
    const {name,value} = e.target;

    setInput((prev)=>({
      ...prev,
      [name]:value
    }))
  };

  return (
    <div className='auth-container'>
      <div className="auth-card-signup">
        <h2 className="auth-header">
          Sign Up
        </h2>
        <div className="auth-form-signup">
          <form onSubmit={handleSubmit} className="auth-form-login">
          <div class="input-container">
              <input
                type="text"
                placeholder="fullName"
                name="fullName"
                onChange={handleChange}
                value={input.fullName}
              />
              <label>Full Name</label>
            </div>
            <br />
            <div class="input-container">
              <input
                type="email"
                placeholder="email"
                name="email"
                onChange={handleChange}
                value={input.email}
              />
              <label>Email</label>
            </div>
            <br />
            <div class="input-container">
              <input
                type="password"
                placeholder="password"
                name="password"
                onChange={handleChange}
                value={input.password}
              />
              <label>Password</label>
            </div>
            <br />
            <div class="input-container">
              <input
                type="password"
                placeholder="cpassword"
                name="cpassword"
                onChange={handleChange}
                value={input.cpassword}
              />
              <label>Confirm Password</label>
            </div>
            <button type="submit" className="btn-2">
              Sign Up
            </button>
            <br />
            <div className="redirect">
              Have an account? <Link to='/signin' className="link-color">Login</Link>
            </div>
          </form>
        </div>
      </div>
      <div className="round-2"></div>
    </div>
  )
}

export default SignUp