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
      <button className='home-btn'>Back Home</button></Link>
      <div>
        title: {job.title}
      </div> 
      <div>
        company Name: {job.companyName}
      </div> 
      <div>
       Description: {job.description}
      </div> 
      <div>
        Location: {job.location}
      </div>
      <div>
        Experience: {job.experience}
      </div> 
      <div>
        Job Type: {job.jobType}
      </div> 
      <div>
        Work Mode: {job.workMode}
      </div>  
      <div>
        <button> <a href={job.applicationLink} target="_blank">Apply</a> </button>
      </div> 
    <div>
    <Link to = {{ pathname:`/edit/${job.id}`, state: { job }}}>
      <button>Edit</button>
    </Link>
    </div>
    <div>
    <Link to = {{ pathname:`/delete/${job.id}`, state: { job }}}>
      <button>Delete</button>
    </Link>
    </div>

    </div>
  )
}

export default JobDetails
