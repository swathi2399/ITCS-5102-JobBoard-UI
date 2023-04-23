import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import axios from 'axios';
import { useAuth } from './auth';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import DeleteIcon from '@mui/icons-material/Delete';
import { pink } from '@mui/material/colors';

const JobDetail = () => {
    const auth = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const [jobPosting, setJobPosting] = useState(null);

    useEffect(() => {
        if (!location || !location.state || !location.state.id) {
            navigate('/error', { state : { 
                "status" : 400,
                "message": "Bad Request - validation error"
             }});
        }
    }, []);

    useEffect(() => {
        const fetchJobDetail = async () => {
            try {
                const res = await axios.get(
                    "http://localhost:8080/api/v1/jobs/" + location.state.id,
                    {headers: {"Authorization" : `Bearer ${auth.user.token}`, "Content-Type": "application/json"}},
                    {withCredentials : true}
                );
                console.log(res.data);
                setJobPosting(res.data);
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
        fetchJobDetail();
    }, []);

    const handleApply = () => {
        window.open(jobPosting.applicationLink, "_blank");
    }

    const handleEditJob = () => {
        return navigate("/edit/" + location.state.id, {
            state: {
                jobPosting
            }
        });
    }

    const handleDeleteJob = async () => {
        try {
            const res = await axios.delete(
                "http://localhost:8080/api/v1/jobs/delete/" + jobPosting.jobId,
                {headers: {"Authorization" : `Bearer ${auth.user.token}`, "Content-Type": "application/json"}},
                {withCredentials : true}
            )
            if (res.status == 200) {
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

    // {
    //     "title": "Software Development Engineer",
    //     "companyName": "Amazon",
    //     "description": "This is an entry-level position",
    //     "location": "Seattle, WA",
    //     "experience": "1-2yrs",
    //     "jobType": "fulltime",
    //     "workMode": "Hybrid",
    //     "applicantsApplied" : 0,
    //     "createdBy": "",
    //     "bookmarkedBy": [],
    //     "applicationLink": "https://linkedin.com/"
    // }

    return (
        <div>
            { jobPosting !== null && <div className='container m-5'>
                <div className="row">
                    <div className="col-md-3"></div>
                    <div className="col-md-6">
                        <div className='card'> 
                            <div className="card-body">
                                <div className='row '>
                                    <div className='col-md-10 d-flex justify-content-center text-wrap'> <h3> { jobPosting.title } </h3> </div>
                                    <div className="col-md-2">
                                        <ModeEditOutlineIcon className='mx-1' style={{cursor : "pointer"}} onClick={handleEditJob}/>
                                        <DeleteIcon className='mx-1' style={{cursor : "pointer"}} sx={{ color: pink[500] }} onClick={handleDeleteJob} />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6" style={{textAlign: "end"}} > Company:   </div>
                                    <div className="col-md-6"> { jobPosting.companyName } </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6" style={{textAlign: "end"}}> Description: </div>
                                    <div className="col-md-6 text-wrap" > { jobPosting.description } </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6" style={{textAlign: "end"}}> Location: </div>
                                    <div className="col-md-6"> { jobPosting.location } </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6" style={{textAlign: "end"}}> Experience: </div>
                                    <div className="col-md-6"> { jobPosting.experience } </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6" style={{textAlign: "end"}}> Job type: </div>
                                    <div className="col-md-6"> { jobPosting.jobType } </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6" style={{textAlign: "end"}}> Work mode: </div>
                                    <div className="col-md-6"> { jobPosting.workMode } </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6" style={{textAlign: "end"}}> Number of applicants: </div>
                                    <div className="col-md-6"> { jobPosting.applicantsApplied } </div>
                                </div>
                                
                                <div className="row mt-3">
                                <div className='col-md-12 d-flex justify-content-center'> 
                                        <button className='btn btn-primary m-2 rounded-3' onClick={() => handleApply()}> Apply </button> 
                                        <button className='btn btn-success m-2 rounded-3'> Add to bookmarks </button> 
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3"></div>
                </div>
                
                

            </div> }
        </div>
    );
}

export default JobDetail;