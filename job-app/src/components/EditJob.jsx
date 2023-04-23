import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import axios from 'axios';
import { useAuth } from './auth';

const EditJob = () => {
    const auth = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const [jobPosting, setJobPosting] = useState(null);
    
    useEffect(() => {
        if (!location || !location.state || !location.state.jobPosting) {
            navigate('/error', { state : { 
                "status" : 400,
                "message": "Bad Request - validation error"
             }});
        }
        setJobPosting(location.state.jobPosting);
    }, []);

    const handleUpdate = async(e) => {
        e.preventDefault();
        if(jobPosting.title === "" || jobPosting.description === "" || jobPosting.location === "" || jobPosting.applicationLink === "") {
            alert("All the fields are mandatory")
            return
        }

        const reqBody = {
            "title": jobPosting.title,
            "companyName": jobPosting.companyName,
            "description": jobPosting.description,
            "location": jobPosting.location,
            "experience": jobPosting.experience,
            "jobType": jobPosting.jobType,
            "workMode": jobPosting.workMode,
            "applicantsApplied" : jobPosting.applicantsApplied,
            "createdBy": jobPosting.createdBy,
            "bookmarkedBy": jobPosting.bookmarkedBy,
            "applicationLink": jobPosting.applicationLink
        };

        try {
            const res = await axios.put(
                "http://localhost:8080/api/v1/jobs/update/" + jobPosting.jobId,
                reqBody,
                {headers: {"Authorization" : `Bearer ${auth.user.token}`, "Content-Type": "application/json"}},
                {withCredentials : true}
            );
            if (res.data) {
                navigate("/job/" + jobPosting.jobId, { state : { id : jobPosting.jobId } });
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

    const handleCancel = () => {
        navigate("/job/" + jobPosting.jobId, { state : { id : jobPosting.jobId } });
    }

    return (
    <>
        { jobPosting !== null && 
            <div className="container-md mt-2">
            <h2>Edit a Job</h2>
            <form>
                <div className='form-group mt-2'>
                    <label>Title</label>
                    <input
                    className="form-control" 
                    type = "text"
                    name = "title"
                    placeholder='enter the job name'
                    value = {jobPosting.title}
                    onChange={(e) => setJobPosting({...jobPosting , title: e.target.value})} />
                </div>
                {/* <div className='form-group mt-2'>
                    <label>Company Name</label>
                    <select id="companyName" name="companyName" className="form-control" 
                    value = {jobPosting.companyName} onChange={(e) => setJobPosting({...jobPosting, companyName:e.target.value})}>
                        <option></option>
                        <option value="Google">Google</option>
                        <option value="Meta">Meta</option>
                        <option value="Amazon">Amazon</option>
                        <option value="AirBnB">AirBnB</option>
                    </select>
                </div> */}
                <div className='form-group mt-2'>
                    <label>Description</label>
                    <textarea name="description" 
                    // rows="2" cols="10"
                    value={jobPosting.description}
                    className="form-control" 
                    onChange={(e) => setJobPosting({...jobPosting,description:e.target.value})}>
                    </textarea>
                </div>
                <div className='form-group mt-2'>
                    <label>Location</label>
                    <input
                    type = "text"
                    name = "location"
                    className="form-control" 
                    placeholder='enter the location'
                    value = {jobPosting.location}
                    onChange={(e) => setJobPosting({...jobPosting,location:e.target.value})}/>
                </div>
                <div className='form-group mt-2'>
                    <label>Experience</label>
                    <select id="experience" name="experience" className="form-control" 
                     value = {jobPosting.experience} onChange={(e) => setJobPosting({...jobPosting,experience:e.target.value})} >
                        <option></option>
                        <option value="0-2 years">0-2 years</option>
                        <option value="2-4 years">2-4 years</option>
                        <option value="5+ years">5+ years</option>
                    </select>
                </div>
                <div className='form-group mt-2'>
                    <label>Job Type</label>
                    <select id="jobType" name="jobType" className="form-control" 
                    value = {jobPosting.jobType} onChange={(e) => setJobPosting({...jobPosting,jobType:e.target.value})}>
                        <option></option>
                        <option value="full-time">full-time</option>
                        <option value="internship">internship</option>
                        <option value="Co-op">Co-op</option>
                    </select>
                </div>
                <div className='form-group mt-2'>
                    <label>WorkMode</label>
                    <select id="workMode" name="workMode" className="form-control" 
                    value = {jobPosting.workMode} onChange={(e) => setJobPosting({...jobPosting,workMode:e.target.value})}>
                        <option></option>
    
                        <option value="onsite">onsite</option>
                        <option value="hybrid">hybrid</option>
                        <option value="remote">remote</option>
                    </select>
                </div>
                <div className='form-group mt-2'>
                    <label>Link</label>
                    <input
                    type = "text"
                    name = "applicationLink"
                    className="form-control" 
                    placeholder='enter the job url'
                    value = {jobPosting.applicationLink}
                    onChange={(e) => setJobPosting({...jobPosting,applicationLink:e.target.value})} />
                </div>
    
                <button className="btn btn-primary m-2" onClick={handleUpdate}>Update</button>
                <button className='btn btn-secondary m-2' onClick={handleCancel}> Cancel</button>
    
     
            </form>
        </div>
        }
    </>
    );
}

export default EditJob;