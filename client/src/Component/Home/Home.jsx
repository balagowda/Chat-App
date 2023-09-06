import React from 'react'
import '../Styles/home.css'
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className='home'>
        <div className="home-container">
            <h2 className='home-header'>Chat-App</h2>
            <div className="home-links">
                <Link to={'/signup'} className='home-link'>Sign Up</Link>
                <Link to={'/signin'} className='home-link'>Login</Link>
            </div>
        </div>
        <div className="round-1"></div>
        <div className="round-2"></div>
    </div>
  )
}

export default Home