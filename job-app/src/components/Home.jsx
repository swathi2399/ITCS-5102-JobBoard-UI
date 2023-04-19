import React from "react";
import { useState,useEffect } from 'react';
import {
    MDBCard,
    MDBCardBody,
    MDBCardTitle,
    MDBCardText,
    MDBCardHeader,
    MDBCardFooter,
    MDBBtn
  } from 'mdb-react-ui-kit';
import {Link} from 'react-router-dom';

const Home = (props) => {
   
    
    const renderInfoCard = (card,index) => {
    return (
    <Link to =
    {{ pathname:`/job/${card.id}`, state: { card }}}>

       <MDBCard className = "card">
       <MDBCardHeader className = "card-title">{card.title}</MDBCardHeader>
       <MDBCardBody>
       <MDBCardText className = "company1">{card.companyName}</MDBCardText>
        <MDBCardText className = "location1">{card.location}</MDBCardText>
        {/* <MDBBtn href='#' className="btn btn-primary">Apply</MDBBtn> */}
       </MDBCardBody>
       </MDBCard>
    </Link>

    ) };

return (
    <div className="home">
            <h1 className = "head1"> This is where you find your next job</h1>
            <Link to="/login">
            <button className="logout">Logout</button>
            </Link>
           
 
        <div class="row">
            <div class="column" >
            <label for=""> Job Name </label>
            <select name="name" id="name">
            <option value="Software Engineer">Software Engineer</option>
            <option value="Data Engineer">Data Engineer</option>
            <option value="Data Scientist">Data Scientist</option>
            </select>
            </div>
            
            <div class="column" >
            <label for="">Level</label>
            <select name="level" id="level">
            <option value="Entry">Entry</option>
            <option value="Senior">Mid-Senior</option>
            <option value="Mid-Senior">Senior</option>
            </select>
            </div>
            
            <div class = "column">
            <label for="">Location</label>
            <select name="location" id="location">
            <option value="SF">SF</option>
            <option value="AZ">AZ</option>
            <option value="NC">NC</option>
            <option value="NY">NY</option>
            </select>
            </div>

            <div class = "column">
                <div className="btn-column">
                 <button type="submit">Apply Filter</button>
                </div>
            </div>
            <div class="column">
                <div className="btn-column">
                <button type="submit">Clear</button>
                </div>
            </div>
           
            </div>
            {/* <br/> */}
            <div className="job-card">

                {props.jobs.map(renderInfoCard)}
            </div>
           
       
    </div>
)
}

export default Home;