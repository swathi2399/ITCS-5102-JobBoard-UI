import React from 'react';
import {useHistory,Link} from 'react-router-dom';
const JobDetails = (props) => {
  
  const history = useHistory()
  const info =  props.location
  const job = props.location.state.card
  
  if(!info.state)
  {
    history.push("/home")
  }
 
  return (
    <div>
      <Link to="/home">
      <div className="home-btn">
      <button className='home-btn'>Back Home</button> </div></Link> 
       
      <div className="job-d">
      <div className="mb-3 row">
      <div class ="col-sm-10 tit"> 
        {job.title}
      </div> 
      </div>
      <div className="mb-3 row">
      <div class ="col-sm-10"> 
        Company Name: {job.companyName}
      </div> 
      </div>
      <div className="mb-3 row">
      <div class ="col-sm-10">
        Location: {job.location}
      </div>
      </div>
      <div className="mb-3 row">
      <div class ="col-sm-10">
        Experience: {job.experience}
      </div> 
      </div>
      <div className="mb-3 row">
      <div class ="col-sm-10">
        Job Type: {job.jobType}
      </div> 
      </div>
      <div className="mb-3 row">
      <div class ="col-sm-10">
        Work Mode: {job.workMode}
      </div>  
      </div>
      <div className="mb-3 row">
      <div class ="col-sm-10">
        <div>Description : </div>
        {job.description}
      </div> 
      </div>
      <div className="mb-3 row">
      <div class ="col-sm-10 btn1">
        <button> <a href={job.applicationLink} target="_blank">Apply</a> </button>
      </div> 
      </div>
    <div>
    <div class="row gx-2">
      <div class="col-md-1 job1">
    <Link to = {{ pathname:`/edit/${job.id}`, state: { job }}}>
      <button>Edit</button>
    </Link>
      </div>
      <div class = "col-md-1 job1">
      <Link to = {{ pathname:`/delete/${job.id}`, state: { job }}}>
      <button>Delete</button>
      </Link>
      </div>
    </div>
    </div>
    </div>

    </div>
  )
}

export default JobDetails
