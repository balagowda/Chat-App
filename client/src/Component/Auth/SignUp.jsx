import React, { useState } from 'react';
import '../Styles/auth.css';
import {Link, useNavigate} from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SignUp = () => {

  const [input,setInput] = useState({fullName:"",email:"",password:"",cpassword:""});

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { fullName, email, password, cpassword } = input;

    const res = await fetch("/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fullName,
        email,
        password,
        cpassword,
      }),
    });

    const reply = await res.json();
    // console.log(reply);

    if (res.status === 422 || !input) {
      toast.warn(reply.error, {
        position: "top-center",
        });
    
    } else {
      navigate('/signin');
      setInput({
        ...input,
        fullName: "",
        email: "",
        password: "",
        cpassword: "",
      });
    }
  };

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
      <ToastContainer/>
    </div>
  )
}

export default SignUp