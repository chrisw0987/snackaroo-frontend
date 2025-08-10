import React, { useState } from 'react'
import './CSS/LoginSignup.css'
import { useNavigate } from 'react-router-dom';

const LoginSignup = () => {
  const navigate = useNavigate();
  const [state, setState] = useState("Login");

  const [formData, setFormData] = useState({
    username:"",
    password:"",
    email:"",
  });

  const changeHandler = (e)=>{
    setFormData({...formData, [e.target.name]:e.target.value});
  }

  const login = async () => {
    console.log("Login Function Executed", formData);
    let responseData;
    await fetch('https://snackaroo-backend.onrender.com/login', {
      method: 'POST',
      headers: {
        Accept: 'application/form-data',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
      }).then((response)=>response.json()).then((data)=>responseData=data)

      if (responseData.success) {
        localStorage.setItem('auth-token',responseData.token);
        navigate('/', {replace: true});
      }
      else {
        alert(responseData.errors);
      }
  }

  const signup = async () => {
      console.log("SignUp Function Executed", formData);
      let responseData;
      await fetch('https://snackaroo-backend.onrender.com/signup', {
        method: 'POST',
        headers: {
          Accept: 'application/form-data',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      }).then((response)=>response.json()).then((data)=>responseData=data)

      if (responseData.success) {
        localStorage.setItem('auth-token',responseData.token);
        navigate('/', {replace: true});
      }
      else {
        alert(responseData.errors);
      }
  }

  return (
    <div className="loginsignup">
      <div className="loginsignup-container">
        <h1>{state}</h1>
        <div className="loginsignup-fields">
          {state=== "Sign Up"?<input name='username' value={formData.username} onChange={changeHandler} type="text" placeholder="Your Name"/>:<></>}
          <input name='email' value={formData.email} onChange={changeHandler} type="email" placeholder="Email Address"/>
          <input name='password' value={formData.password} onChange={changeHandler} type="password" placeholder="Password"/>
        </div>
        <button onClick={()=> {state==='Login'?login():signup()}}>Continue</button>
        {state==='Sign Up'?
        <p className="loginsignup-login">Already Have An Account? <span onClick={()=>{setState('Login')}}>Login Here</span></p>:
        <p className="loginsignup-login">Create an Account? <span onClick={()=>{setState('Sign Up')}}>Click Here</span></p>}
        <div className="loginsignup-agree">
          <input type="checkbox" name='' id=''/>
          <p>By continuing, I agree to the terms of use & privacy policy.</p>
        </div>
      </div>
    </div>
  )
}

export default LoginSignup;