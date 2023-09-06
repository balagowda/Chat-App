import React, { useState } from "react";
import "../Styles/auth.css";
import {Link} from 'react-router-dom';

const SignIn = () => {
  const [input, setInput] = useState({ userName: "", password: "" });

  const handleChange = (e) => {
    const {name,value} = e.target;

    setInput((prev)=>({
      ...prev,
      [name]:value
    }))
  };

  const handleSubmit = () => {};

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2 className="auth-header">Login</h2>
        <div className="auth-form-login">
          <form onSubmit={handleSubmit} className="auth-form-login">
            <div class="input-container">
              <input
                type="email"
                placeholder="email"
                name="userName"
                onChange={handleChange}
                value={input.userName}
              />
              <label>User Name</label>
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
            <button type="submit" className="btn">
              Login
            </button>
            <br />
            <div className="redirect">
              Don't have an account? <Link to='/signup' className="link-color">SignUp</Link>
            </div>
          </form>
        </div>
      </div>
      <div className="round-2"></div>
    </div>
  );
};

export default SignIn;
