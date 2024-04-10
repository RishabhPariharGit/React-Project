import React from 'react'
import './Css/LoginSignup.css'

export default function LoginSignup() {
  return (
    <div className="main-cont-Login">
      <div className="loginSignup-cont">
        <h1>Sign UP</h1>
        <div className="loginSignup-fields">
          <input type='text' placeholder='your name'/>
          <input type='email' placeholder='Email Address'/>
          <input type='password' placeholder='Password'/>
        </div>
        <button>Continue</button>
        <p className="loginsignup-login">Already have an account <span>Login</span></p>
        <div className="loginsignup-agree">
          <input type='checkbox' name='' id='' />
          <p>By continueing i agree to terms of use and Privacy Policy</p>
        </div>
      </div>
    </div>
  )
}


