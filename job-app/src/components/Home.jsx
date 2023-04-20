import React from "react";
import { useState,useEffect } from 'react';
import {Link} from 'react-router-dom';

const Home = (props) => {
   
    
    const renderInfoCard = (card,index) => {
    return (
        
    <Link to =
    {{ pathname:`/job/${card.id}`, state: { card }}} style={{ textDecoration: 'none' }}> 
        
       <div class="col">
       <div class="card">
         <h5 class="card-title">{card.title}</h5>
         <p class="card-text">Company Name: {card.companyName}</p>
         <p class="card-text">Location: {card.location}</p>
       </div>
       </div>
       
    </Link>
    ) };

return (
    <div className="home">
            <h1 className = "head1">This is where you find your next job</h1>
            <Link to="/login">
            <button className="logout">Logout</button>
            </Link>
           
 
        <div class="row">
            <div class="col-md" >
            <label for="" class="p-2"> Job Name </label>
            <select name="name" id="name">
            <option value="Software Engineer">Software Engineer</option>
            <option value="Data Engineer">Data Engineer</option>
            <option value="Data Scientist">Data Scientist</option>
            </select>
            </div>
            
            <div class="col-sm" >
            <label for="" class="p-2 fil-lev">Level</label>
            <select name="level" id="level">
            <option value="Entry">Entry</option>
            <option value="Senior">Mid-Senior</option>
            <option value="Mid-Senior">Senior</option>
            </select>
            </div>
            
            <div class = "col-sm">
            <label for="" class="p-2 fil-loc">Location</label>
            <select name="location" id="location" class="fil-loc">
            <option value="SF">SF</option>
            <option value="AZ">AZ</option>
            <option value="NC">NC</option>
            <option value="NY">NY</option>
            </select>
            </div>

            <div class = "col-sm">
                <div className="btn-column p-1 fil-app">
                 <button type="btn btn-primary mb-3">Apply Filter</button>
                </div>
            </div>
            <div class="col-sm">
                <div className="btn-column p-1 fil-clr">
                <button type="btn btn-primary mb-3">Clear</button>
                </div>
            </div>
           
            </div>
            {/* <br/> */}
            <div className="row row-cols-1 row-cols-md-3 g-4">
                {props.jobs.map(renderInfoCard)}
            </div>   
    </div>
)
}

export default Home;

