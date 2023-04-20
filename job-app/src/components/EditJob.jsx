import React, { useEffect } from 'react';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import api from '../api/users';

const EditJob = (props) => {
    const history = useHistory();
    console.log("editpage",props)
    const job = props.location.state.job;
    const [temp,setTemp] = useState(job)

    const updateJob = async(e) => {
        e.preventDefault();
        const res = await api.put(`/jobs/${temp.id}`,temp)
        const {id} = res.data
        if (res.data) {
            history.push({pathname:`/job/${res.data.id}`, state: {card:res.data} })
          } 
    };
  return (
      <div className="container-md">
        <h2>Edit a Job</h2>
        <form onSubmit={updateJob}>
            <div className='form-group'>
                <label>Title</label>
                <input
                className="form-control" 
                type = "text"
                name = "title"
                placeholder='enter the job name'
                value = {temp.title}
                onChange={(e) => setTemp({...temp , title: e.target.value})} />
            </div>
            <div className='form-group'>
                <label>Company Name</label>
                <select id="companyName" name="companyName" className="form-control" 
                value = {temp.companyName} onChange={(e) => setTemp({...temp, companyName:e.target.value})}>
                    <option></option>
                    <option value="Google">Google</option>
                    <option value="Meta">Meta</option>
                    <option value="Amazon">Amazon</option>
                    <option value="AirBnB">AirBnB</option>
                </select>
            </div>
            <div className='form-group'>
                <label>Description</label>
                <textarea name="description" 
                // rows="2" cols="10"
                value={temp.description}
                className="form-control" 
                onChange={(e) => setTemp({...temp,description:e.target.value})}>
                </textarea>
            </div>
            <div className='form-group'>
                <label>Location</label>
                <input
                type = "text"
                name = "location"
                className="form-control" 
                placeholder='enter the location'
                value = {temp.location}
                onChange={(e) => setTemp({...temp,location:e.target.value})}/>
            </div>
            <div className='form-group'>
                <label>Experience</label>
                <select id="experience" name="experience" className="form-control" 
                 value = {temp.experience} onChange={(e) => setTemp({...temp,experience:e.target.value})} >
                    <option></option>
                    <option value="0-2">0-2years</option>
                    <option value="2-4">2-4years</option>
                    <option value="5+">5+years</option>
                </select>
            </div>
            <div className='form-group'>
                <label>Job Type</label>
                <select id="jobType" name="jobType" className="form-control" 
                value = {temp.jobType} onChange={(e) => setTemp({...temp,jobType:e.target.value})}>
                    <option></option>
                    <option value="full-time">full-time</option>
                    <option value="internship">internship</option>
                    <option value="Co-op">Co-op</option>
                </select>
            </div>
            <div className='form-group'>
                <label>WorkMode</label>
                <select id="workMode" name="workMode" className="form-control" 
                value = {temp.workMode} onChange={(e) => setTemp({...temp,workMode:e.target.value})}>
                    <option></option>

                    <option value="onsite">onsite</option>
                    <option value="hybrid">hybrid</option>
                    <option value="remote">remote</option>
                </select>
            </div>
            <div className='form-group'>
                <label>Link</label>
                <input
                type = "text"
                name = "applicationLink"
                className="form-control" 
                placeholder='enter the job url'
                value = {temp.applicationLink}
                onChange={(e) => setTemp({...temp,applicationLink:e.target.value})} />
            </div>

            <button className="btn btn-primary upd">Update</button>
            

 
        </form>
    </div>
  )
}

export default EditJob;
