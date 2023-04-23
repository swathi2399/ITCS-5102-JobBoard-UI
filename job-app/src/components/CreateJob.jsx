import React from 'react'
import { useState } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import { useAuth } from './auth'
import axios from 'axios';



const CreateJob = () => {
    const auth = useAuth();
    const [title,setTitle] = useState('')
    const [companyName,setCompany] = useState('');
    const [description,setDescription] = useState('')
    const [experience,setExperience] = useState('')
    const [jobType,setJobType] = useState('')
    const [location,setLocation] = useState('')
    const [workMode,setWorkMode] = useState('')
    const [applicationLink,setLink] = useState('');

    const navigate = useNavigate();
    
    const handleSubmit = async(e) => {
        e.preventDefault();
        if(title === "" || description === "" || location === "" || applicationLink === "") {
            alert("All the fields are mandatory")
            return
        }

        const reqBody = {
            "title": title,
            "companyName": companyName,
            "description": description,
            "location": location,
            "experience": experience,
            "jobType": jobType,
            "workMode": workMode,
            "applicantsApplied" : 0,
            "createdBy": "",
            "bookmarkedBy": [],
            "applicationLink": applicationLink
        };

        try {
            const res = await axios.post(
                "http://localhost:8080/api/v1/jobs/create",
                reqBody,
                {headers: {"Authorization" : `Bearer ${auth.user.token}`, "Content-Type": "application/json"}},
                {withCredentials : true}
            );
            if (res.data) {
                navigate("/");
            }

        } catch(axiosError) {
            let { status } = axiosError.response;
            let { message } = axiosError.response.data;
            let error = {
                "status": status,
                "message": message
            }
            navigate('/error', { state : { error }});
        }
    }
    
    
  return (
    <div className="container-md mt-5">
        <h2>Create  a Job</h2>
        <form onSubmit={handleSubmit}>
            <div className='form-group m-2'>
                <label>Title</label>
                <input
                className="form-control" 
                type = "text"
                name = "title"
                placeholder='Enter job title'
                value = {title}
                onChange={(e) => setTitle(e.target.value)} />
            </div>
            <div className='form-group m-2'>
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
            <div className='form-group m-2'>
                <label>Description</label>
                <textarea name="description" 
                value={description}
                className="form-control" 
                placeholder='Enter description'
                onChange={(e) => setDescription(e.target.value)}>
                </textarea>
            </div>
            <div className='form-group m-2'>
                <label>Location</label>
                <input
                type = "text"
                name = "location"
                className="form-control" 
                placeholder='Enter location'
                value = {location}
                onChange={(e) => setLocation(e.target.value)}/>
            </div>
            <div className='form-group m-2'>
                <label>Experience</label>
                <select id="experience" name="experience" className="form-control" 
                 value = {experience} onChange={e => setExperience(e.target.value)} >
                    <option></option>
                    <option value="0-2 years">0-2 years</option>
                    <option value="2-4 years">2-4 years</option>
                    <option value="5+ years">5+ years</option>
                </select>
            </div>
            <div className='form-group m-2'>
                <label>Job Type</label>
                <select id="jobType" name="jobType" className="form-control" 
                value = {jobType} onChange={e => setJobType(e.target.value)}>
                    <option></option>
                    <option value="full-time">Full-time</option>
                    <option value="internship">Internship</option>
                    <option value="Co-op">Co-op</option>
                </select>
            </div>
            <div className='form-group m-2'>
                <label>Work mode</label>
                <select id="workMode" name="workMode" className="form-control" 
                value = {workMode} onChange={e => setWorkMode(e.target.value)}>
                    <option></option>
                    <option value="Onsite">Onsite</option>
                    <option value="Hybrid">Hybrid</option>
                    <option value="Remote">Remote</option>
                </select>
            </div>
            <div className='form-group m-2'>
                <label>Link</label>
                <input
                type = "text"
                name = "applicationLink"
                className="form-control" 
                placeholder='Enter job url'
                value = {applicationLink}
                onChange={(e) => setLink(e.target.value)} />
            </div>

            <button className="btn btn-primary m-2">Create Job</button>
            

 
        </form>
    </div>
  )
}

export default CreateJob;

