import React from 'react'
import './Navbar.css'
import navlogo from '../../assets/banner_kids.png'
import navProfile from '../../assets/arrow.png'


const Navbar = () => {
  return (
    <div className="navbar">
        <h1> This on is navbar</h1>
      <img src={navlogo} alt="" className="nav-logo" />
      <img src={navProfile} alt="" className="nav-profile" />
    </div>
)
}

export default Navbar