import React from 'react';
import { useHistory, Link } from 'react-router-dom';
import api from '../api/users';

const DeleteJob = (props) => {
  
    const history = useHistory();
    const job = props.location.state.job;
    const remove = async(id) => {
        await api.delete(`/jobs/${id}`);
        const newJobs  = props.jobs.filter((job) => {
          return job.id !== id;
        });
        props.setJobs(newJobs);  
        history.push("/home");
    };
  return (
    <div className="del"> 
        <p>Are you sure, you want to delete this job?</p>
        <button onClick={()=>{remove(job.id)}} className="btn-s">Yes</button> 
       <Link to= {{ pathname:`/job/${job.id}`, state: { card:job }}}>
        <button className="btn-n">No</button>
        </Link>
    </div>
  )
}

export default DeleteJob
