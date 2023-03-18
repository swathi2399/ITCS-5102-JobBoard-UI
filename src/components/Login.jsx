import { useState } from 'react';
import React from 'react'
import {Link} from 'react-router-dom';
import axios from 'axios';

const Login = () => {
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const handleChange = async(e) => {
      e.preventDefault();
      if(email === "" || password === "") {
        alert("All the fields are mandatory")
        return
    }

    console.log(email, password);
    const res = await axios.post("https://localhost:8080/api/v1/auth/authenticate", {
      email,
      password
    },{withCredentials: true});
    if (res.data) {
      console.log(res.data);
    }
  }

  return (
    <div className='login'>
        <h2>Login Page</h2>
        <form className="reg-form" onSubmit={handleChange}>
                <div className="field">
                     <label>Email ID</label>
                     <input 
                     type="text" 
                     name="email" 
                     placeholder="enter emailId"
                     value = {email}
                    onChange={(e) => setEmail(e.target.value) } 
                  
                     />
                 </div>
                 <div className="field">
                     <label>Password</label>
                     <input 
                     type="password" 
                     name="password" 
                     placeholder="enter password" 
                     value = {password} 
                    onChange={(e) => setPassword(e.target.value) }// the displayed value field
                    />
                 </div>

                 <button className='btn'>Sign In</button>
                 </form>
                 <Link to="/">
                 <button className='link-btn'>Don't have an account? SignUp</button>
                 </Link>
                

    </div>
  )
}

export default Login
