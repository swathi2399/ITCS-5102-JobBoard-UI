import { useState } from 'react';
import React from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom';
import api from '../api/users';
import axios from 'axios';
import { useAuth } from './auth';

const Login = () => {
  const [user, setUser] = useState(null);
  
  const navigate = useNavigate();
  const location = useLocation();
  const auth = useAuth();
  
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  
  
  const handleChange = async(e) => {
      e.preventDefault();
      if(email === "" || password === "") {
        alert("All the fields are mandatory")
        return
    }
      // const user = {email,password};
      // const response = await api.post("/users",user);
      console.log(email, password);
      const res = await axios.post("http://localhost:8080/api/v1/auth/authenticate", {
        email,
        password
      },{withCredentials: false});
      if (res.data) {
        console.log(res.data);
        auth.login(res.data);
        navigate("/");
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
                     onChange={(e) => setEmail(e.target.value) } //
                  
                     />
                 </div>
                 <div className="field">
                     <label>Password</label>
                     <input 
                     type="password" 
                     name="password" 
                     placeholder="enter password" 
                     value = {password} 
                     onChange={(e) => setPassword(e.target.value) } // the displayed value field
                    />
                 </div>

                 <button className='btn'>Sign In</button>
                 </form>
                 
                 {/* <button className='link-btn' onClick={navigate("/register")}>Don't have an account? SignUp</button> */}
                
                

    </div>
  )
}

export default Login
