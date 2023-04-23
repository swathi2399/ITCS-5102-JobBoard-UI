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
    <div className="row">
          <div className = "container-fluid  py-3">
            <header class = "text-center">
          <h2>Login Page</h2>
          </header>
          </div> 
          <section class = "container-fluid my-2 w-50 text">
          <form className="row g-6" onSubmit={handleChange}>
  
                  <div className="mb-3 row">
                   <div class ="col-sm-10 reg1"> 
                       <label className="col-sm-2 col-form-label reg">Email</label>
                       <input 
                       type="text" 
                       name="email" 
                       placeholder="Enter email"
                       value = {email}
                       className="form-control"
                       onChange={(e) => setEmail(e.target.value) } //
                       />
                      </div>
                   </div>
                   <div className="mb-3 row">
                   <div class ="col-sm-10 reg1"> 
                       <label className="col-sm-2 col-form-label reg">Password</label>
                       <input 
                       type="password" 
                       name="password" 
                       placeholder="Enter password" 
                       value = {password} 
                       className="form-control"
                       onChange={(e) => setPassword(e.target.value) } // the displayed value field
                      />
                   </div>
                   </div>
                   <div class="col-auto reg1">
                   <button className='btn btn-primary mb-3 reg'>Sign In</button>
                   </div>
              </form>
  
                   
                   <div class="col-auto reg1">
                   <a className="text-primary" href="/register">Don't have an account? SignUp</a>
                   </div>
                   
            </section>
  
      </div>
  )
}

export default Login
