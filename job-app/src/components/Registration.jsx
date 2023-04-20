import React from 'react';
import { useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import api from '../api/users';
import axios from 'axios';

const Registration = () => {
    const [firstname,setFirst] = useState('');
    const [lastname,setLast] = useState('');
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const history = useHistory();
    const handleSubmit = async(e) => {
        e.preventDefault();
        if(firstname === "" || lastname === "" || email === "" || password === "") {
            alert("All the fields are mandatory")
            return
        }
        // const user = {firstname,lastname,email,password};
        // const response = await api.post("/users",user);
       
        const res = await axios.post("https://localhost:8080/api/v1/auth/register", {
            firstname,
            lastname,
            email,
            password
          },{withCredentials: true});
          if (res.data) {
            console.log(res.data);
            return history.push("/login");
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
                         placeholder="enter first name" 
                         value = {firstname}
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
                         placeholder="enter last name" 
                         value = {lastname}
                         onChange={(e) => setLast(e.target.value) } // the displayed value field
                        />
                      </div>
                     </div>
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
                         onChange={(e) => setPassword(e.target.value) }// the displayed value field
                        />
                     </div>
                    </div>
                    <div class="col-auto reg1">
                     <button className="btn btn-primary mb-3 reg">Sign Up</button>
                    </div>
                    
                 </form>
                 
                 <Link to="/login">
                 <div class="col-auto reg1">
                 <button className='link-btn reg'>Already have an account? Sign In</button>
                 </div>
                 </Link>
                 </section>
             </div> 
        </div>
      )
    };
    
    export default Registration;