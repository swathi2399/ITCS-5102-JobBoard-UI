import React from 'react';
import { useState} from 'react';
import {Link} from 'react-router-dom';

const Registration = ({addUser}) => {
    const [firstname,setFirst] = useState('');
    const [lastname,setLast] = useState('');
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');

  

    const handleSubmit = (e) => {
        e.preventDefault();
        if(firstname === "" || lastname === "" || email === "" || password === "") {
            alert("All the fields are mandatory")
            return
        }
        const user = {firstname,lastname,email,password};
        addUser(user);
        setFirst('');
        setLast('');
        setEmail('');
        setPassword('');



        

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
                
                 <button className="ui button blue">Sign Up</button>
             </form>
             <Link to="/login">
             <button>Already have an account? Sign In</button>
             </Link>
             {/* onClick={() => onFormSwitch('Login')} */}
         </div>

      
    </div>
  )
};

export default Registration;
