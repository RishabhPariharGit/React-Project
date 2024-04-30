import React from 'react'
import { useState } from "react";
import './Css/LoginSignup.css'




export default function LoginSignup() {

  const [state, setstate] = useState("Login");
  const [formData,setFormData] = useState({
    username:"",
    password:"",
    email:""
  })

  const changeHandler = (e) =>{
    setFormData({...formData,[e.target.name]:e.target.value})
  }


  
  const login = async () =>{
console.log("login",formData);

let responseData;
    await fetch('http://localhost:4000/login',{
      method:'POST',
      headers:{
        Accept:'application/form-data',
        'Content-Type':'application/json',
      },
      body:JSON.stringify(formData),
    }).then((reponse)=>reponse.json()).then((data)=>responseData=data)

    if(responseData.success){
      localStorage.setItem('auth-token',responseData.token);
      window.location.replace("/");
    }
    else{
      alert(responseData.errors)
    }

  }

  const signup = async () =>{
    console.log("signup",formData);
    let responseData;
    await fetch('http://localhost:4000/signup',{
      method:'POST',
      headers:{
        Accept:'application/form-data',
        'Content-Type':'application/json',
      },
      body:JSON.stringify(formData),
    }).then((reponse)=>reponse.json()).then((data)=>responseData=data)

    if(responseData.success){
      localStorage.setItem('auth-token',responseData.token);
      window.location.replace("/");
    }
    else{
      alert(responseData.errors)
    }
  }



  return (
    <div className="main-cont-Login">
      <div className="loginSignup-cont">
        <h1>{state}</h1>
        <div className="loginSignup-fields">
          {state==="Sign up"?<input  name='username' value={formData.username} onChange={changeHandler} type='text' placeholder='your name'/>:<></>}
          <input name='email' value={formData.email} onChange={changeHandler} type='email' placeholder='Email Address'/>
          <input name='password' value={formData.password} onChange={changeHandler} type='password' placeholder='Password'/>
        </div>
        <button onClick={()=>{ state === "Login" ? login():signup()}}>Continue</button>{state === "Sign up"?<p className="loginsignup-login">Already have an account <span onClick={()=>{
          setstate("Login");
        }}>Login</span></p>:<p className="loginsignup-login">Create an Account <span onClick={()=>{
          setstate("Sign up");
        }}>click here</span></p>}
        {/* <p className="loginsignup-login">Already have an account <span>Login</span></p> */}
        
        <div className="loginsignup-agree">
          <input type='checkbox' name='' id='' />
          <p>By continueing i agree to terms of use and Privacy Policy</p>
        </div>
      </div>
    </div>
  )
}


