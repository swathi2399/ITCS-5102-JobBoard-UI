import React from 'react';
import { useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import api from '../api/users';
import axios from 'axios';

const Registration = () => {
    const [firstname,setFirst] = useState('');
    const [lastname,setLast] = useState('');
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [role, setRole] = useState('user');
    const navigate = useNavigate();
    const handleSubmit = async(e) => {
        e.preventDefault();
        if(firstname === "" || lastname === "" || email === "" || password === "") {
            alert("All the fields are mandatory")
            return
        }
        // const user = {firstname,lastname,email,password};
        // const response = await api.post("/users",user);
       try {
        const res = await axios.post("http://localhost:8080/api/v1/auth/register", {
            firstname,
            lastname,
            email,
            password, 
            role
          },{withCredentials: false});
          if (res.data) {
            console.log(res.data);
            return navigate("/login");
          }
       } catch (err) {
            console.log(err);
       }
        


        

    }
    return (
        <div>
        <div className="row">
           <div className = "container-fluid  py-3">
              <header class = "text-center">
              <h2>Registration form</h2>
              </header>
           </div> 
           <section class = "container-fluid my-2 w-50 text">
           <form className="row g-6" onSubmit={handleSubmit}>
               <div className="mb-3 row">
               <div class ="col-sm-10 reg1"> 
                   <label className="col-sm-2 col-form-label reg">First Name</label>
                   <input 
                   type="text" 
                   name="firstname" 
                   placeholder="Enter first name" 
                   value = {firstname}
                   className="form-control"
                   onChange={(e) => setFirst(e.target.value) } // the displayed value field
                  />
                  </div>
              </div>
               <div className="mb-3 row">
               <div class ="col-sm-10 reg1"> 
                   <label className="col-sm-2 col-form-label reg">Last Name</label>
                   <input 
                   type="text" 
                   name="lastname" 
                   placeholder="Enter last name" 
                   value = {lastname}
                   className="form-control"
                   onChange={(e) => setLast(e.target.value) } // the displayed value field
                  />
                </div>
               </div>
               <div className="mb-3 row">
                   <div class ="col-sm-10 reg1"> 
                   <label className="col-sm-2 col-form-label reg">Email</label>
                   <input 
                   type="text" 
                   name="email" 
                   placeholder="Enter email"
                   className="form-control"
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
                   placeholder="Enter password" 
                   value = {password} 
                   className="form-control"
                   onChange={(e) => setPassword(e.target.value) }// the displayed value field
                  />
               </div>
              </div>
              <div class="col-auto reg1">
               <button className="btn btn-primary mb-3 reg">Sign Up</button>
              </div>
              
           </form>
           <div class="col-auto reg1">
                   <a className="text-primary" href="/">Already have an account? Sign In</a>
            </div>
           </section>
       </div> 
  </div>
  )
};

export default Registration;
