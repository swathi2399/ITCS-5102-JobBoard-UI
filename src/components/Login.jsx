import { useState } from 'react';
import React from 'react'
import {Link} from 'react-router-dom';

const Login = () => {
    const handleChange = () => {}
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');

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
                    //  onChange={(e) => setEmail(e.target.value) } //
                  
                     />
                 </div>
                 <div className="field">
                     <label>Password</label>
                     <input 
                     type="password" 
                     name="password" 
                     placeholder="enter password" 
                     value = {password} 
                    //  onChange={(e) => setPassword(e.target.value) }// the displayed value field
                    />
                 </div>

                 <button>Sign In</button>
                 </form>
                 <Link to="/">
                 <button>Don't have an account? SignUp</button>
                 </Link>
                

    </div>
  )
}

export default Login
