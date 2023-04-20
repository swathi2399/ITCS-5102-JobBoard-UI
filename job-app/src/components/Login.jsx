import { useState } from 'react';
import React from 'react'
import {Link} from 'react-router-dom';
import api from '../api/users';
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
      // const user = {email,password};
      // const response = await api.post("/users",user);
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
                       <label className="col-sm-2 col-form-label reg">Email ID</label>
                       <input 
                       type="text" 
                       name="email" 
                       placeholder="enter emailId"
                       value = {email}
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
                       placeholder="enter password" 
                       value = {password} 
                       onChange={(e) => setPassword(e.target.value) } // the displayed value field
                      />
                   </div>
                   </div>
                   <div class="col-auto reg1">
                   <button className='btn btn-primary mb-3 reg'>Sign In</button>
                   </div>
              </form>
  
                   <Link to="/">
                   <div class="col-auto reg1">
                   <button className='link-btn reg'>Don't have an account? SignUp</button>
                   </div>
                   </Link>
            </section>
  
      </div>
  
    )
  }
  
  export default Login
  