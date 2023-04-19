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
          <div className="registration">
             
             <h2>Registration form</h2>
             <form className="reg-form" onSubmit={handleSubmit}>
                 <div className="field">
                     <label>First Name</label>
                     <input 
                     type="text" 
                     name="firstname" 
                     placeholder="enter first name" 
                     value = {firstname}
                     onChange={(e) => setFirst(e.target.value) } // the displayed value field
                    />
                 </div>
                 <div className="field">
                     <label>Last Name</label>
                     <input 
                     type="text" 
                     name="lastname" 
                     placeholder="enter last name" 
                     value = {lastname}
                     onChange={(e) => setLast(e.target.value) } // the displayed value field
                    />
                  
                 </div>
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
                     onChange={(e) => setPassword(e.target.value) }// the displayed value field
                    />
                 </div>
                <div>
                    <label for="role">Choose a Role:</label>

                    <select name="role" id="role" onChange={ e => setRole(e.target.value)}>
                        <option value="user">User</option>
                        <option value="admin">Recruiter</option>
                        
                    </select>
                </div> 
                 
                <button className="btn">Sign Up</button>
                   
                
             </form>
             
             
             <button className='link-btn'>Already have an account? Sign In</button>
             
         </div>

      
    </div>
  )
};

export default Registration;
