import React, { useState } from "react";
import "../Styles/auth.css";
import {Link, useNavigate} from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useContext } from "react";
import { LoginContext } from "../Context/context";

const SignIn = () => {
  const [input, setInput] = useState({ userName: "", password: "" });

  const {account,setAccount} = useContext(LoginContext);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { userName, password } = input;

    const res = await fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userName,
        password,
      }),
    });

    const reply = await res.json();
    console.log(reply);

    if (res.status === 422 || !input) {
      toast.warn(reply.error, {
        position: "top-center",
      });
    } else {
      setAccount(reply);
      navigate("/chat");
      setInput({
        ...input,
        userName: "",
        password: "",
      });
    }
  }

  const handleChange = (e) => {
    const {name,value} = e.target;

    setInput((prev)=>({
      ...prev,
      [name]:value
    }))
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2 className="auth-header">Login</h2>
        <div className="auth-form-login">
          <form onSubmit={handleSubmit} className="auth-form-login">
            <div className="input-container">
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
            <div className="input-container">
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
      <ToastContainer/>
    </div>
  );
};

export default SignIn;
