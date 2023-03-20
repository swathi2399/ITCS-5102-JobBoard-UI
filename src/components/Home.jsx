import React from "react";
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

const Home1 = () => {
    const JobInfo = [
        {
            title: "Software Engineer" ,
            company: "Google",
            Level: "Entry level",
            Location: "Seattle"
        },
        {
            title: "Data Engineer" ,
            company: "Netflix",
            Level: "Senior level",
            Location: "New York"
        },
        {
            title: "FrontEnd Engineer" ,
            company: "Meta",
            Level: "Mid-senior level",
            Location: "Chicago"
        },
        {
            title: "FullStack Engineer" ,
            company: "AirBnB",
            Level: "Entry level",
            Location: "Dallas"
        },
        {
            title: "Software Engineer" ,
            company: "Ebay",
            Level: "Senior level",
            Location: "Austin"
        },
        {
            title: "Data Engineer" ,
            company: "Fidelity",
            Level: "Entry level",
            Location: "Charlotte"
        },
        {
            title: "FrontEnd Engineer" ,
            company: "Walmart",
            Level: "Senior level",
            Location: "Charlotte"
        },
        {
        title: "FrontEnd Engineer" ,
        company: "CVS",
        Level: "Mid-senior level",
        Location: "Charlotte"
    }
     
    ]

    const renderInfoCard = (card,index) => {
    return (
       <MDBCard className = "card1">
       <MDBCardHeader className = "title1">{card.title}</MDBCardHeader>
       <MDBCardBody>
       <MDBCardText className = "company1">{card.company}</MDBCardText>
        <MDBCardText className = "level1">{card.Level}</MDBCardText>
        <MDBCardText className = "location1">{card.Location}</MDBCardText>
        {/* <MDBBtn className="btn-apply">Apply</MDBBtn> */}
        <button className="btn-apply">Apply</button>
       </MDBCardBody>
       </MDBCard>

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
                {JobInfo.map(renderInfoCard)}
            </div>
           
       
    </div>
)
}

export default Home1;