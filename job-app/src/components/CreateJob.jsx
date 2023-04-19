import React from 'react'
import { useState } from 'react';
import {Link, useHistory} from 'react-router-dom';
import api from '../api/users';


const CreateJob = (props) => {
    const [title,setTitle] = useState('')
    const [companyName,setCompany] = useState('');
    const [description,setDescription] = useState('')
    const [experience,setExperience] = useState('')
    const [jobType,setJobType] = useState('')
    const [location,setLocation] = useState('')
    const [workMode,setWorkMode] = useState('')
    const [applicationLink,setLink] = useState('');
   const {setJobs} = props

    const history = useHistory();
    
    const handleSubmit = async(e) => {
        e.preventDefault();
        if(title === "" || description === "" || location === "" || applicationLink === "") {
            alert("All the fields are mandatory")
            return
        }

        const res = await api.post("/jobs", {
            title,
            companyName,
            description,
            location,
            experience,
            jobType,
            workMode,
            applicationLink
          },{withCredentials: true});

          if (res.data) {
            setJobs([...props.jobs,res.data])
            history.push({pathname:`/job/${res.data.id}`, state: {card:res.data} })
          }
         
        }
    
    
  return (
    <div className="container-md">
        <h2>Create  a Job</h2>
        <form onSubmit={handleSubmit}>
            <div className='form-group'>
                <label>Title</label>
                <input
                className="form-control" 
                type = "text"
                name = "title"
                placeholder='enter the job name'
                value = {title}
                onChange={(e) => setTitle(e.target.value)} />
            </div>
            <div className='form-group'>
                <label>Company Name</label>
                <select id="companyName" name="companyName" className="form-control" 
                value = {companyName} onChange={e => setCompany(e.target.value)}>
                    <option></option>
                    <option value="customOption">[type a custom value]</option>
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
                value={description}
                className="form-control" 
                onChange={(e) => setDescription(e.target.value)}>
                </textarea>
            </div>
            <div className='form-group'>
                <label>Location</label>
                <input
                type = "text"
                name = "location"
                className="form-control" 
                placeholder='enter the location'
                value = {location}
                onChange={(e) => setLocation(e.target.value)}/>
            </div>
            <div className='form-group'>
                <label>Experience</label>
                <select id="experience" name="experience" className="form-control" 
                 value = {experience} onChange={e => setExperience(e.target.value)} >
                    <option></option>
                    <option value="0-2">0-2years</option>
                    <option value="2-4">2-4years</option>
                    <option value="5+">5+years</option>
                </select>
            </div>
            <div className='form-group'>
                <label>Job Type</label>
                <select id="jobType" name="jobType" className="form-control" 
                value = {jobType} onChange={e => setJobType(e.target.value)}>
                    <option></option>
                    <option value="full-time">full-time</option>
                    <option value="internship">internship</option>
                    <option value="Co-op">Co-op</option>
                </select>
            </div>
            <div className='form-group'>
                <label>WorkMode</label>
                <select id="workMode" name="workMode" className="form-control" 
                value = {workMode} onChange={e => setWorkMode(e.target.value)}>
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
                value = {applicationLink}
                onChange={(e) => setLink(e.target.value)} />
            </div>

            <button className="btn btn-primary">Create Job</button>
            

 
        </form>
    </div>
  )
}

export default CreateJob;

