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
    const [allowEditDelete, setAllowEditDelete] = useState(false);
    const [bookMark,setBookMark] = useState(false);

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
                if (res.data) {
                    setBookMark(res.data.bookmarkedBy.includes(auth.user.email))
                    setJobPosting(res.data);
                    setAllowEditDelete(res.data.createdBy === auth.user.email);
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
        fetchJobDetail();
    }, []);

    const handleApply = async () => {
        
        const reqBody = {
            "title": jobPosting.title,
            "companyName": jobPosting.companyName,
            "description": jobPosting.description,
            "location": jobPosting.location,
            "experience": jobPosting.experience,
            "jobType": jobPosting.jobType,
            "workMode": jobPosting.workMode,
            "applicantsApplied" : parseInt(jobPosting.applicantsApplied) + 1,
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
                setJobPosting(res.data);
                window.open(jobPosting.applicationLink, "_blank");
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

    const handleBookMark = async() => {
        const reqBody = {
            "title": jobPosting.title,
            "companyName": jobPosting.companyName,
            "description": jobPosting.description,
            "location": jobPosting.location,
            "experience": jobPosting.experience,
            "jobType": jobPosting.jobType,
            "workMode": jobPosting.workMode,
            "applicantsApplied" : parseInt(jobPosting.applicantsApplied) + 1,
            "createdBy": jobPosting.createdBy,
            "bookmarkedBy": jobPosting.bookmarkedBy,
            "applicationLink": jobPosting.applicationLink
        };
        try {
            if (bookMark == true){
                const res = await axios.post(
                    "http://localhost:8080/api/v1/bookmarks/remove/" + jobPosting.jobId, reqBody,
                        {headers: {"Authorization" : `Bearer ${auth.user.token}`, "Content-Type": "application/json"}},
                        {withCredentials : true}
                    );
                console.log(res.data);
                if (res.data) {
                    setBookMark(false);
            }}
            else{
                const res = await axios.post(
                    "http://localhost:8080/api/v1/bookmarks/add/" + jobPosting.jobId, reqBody,
                        {headers: {"Authorization" : `Bearer ${auth.user.token}`, "Content-Type": "application/json"}},
                        {withCredentials : true}
                    );
                console.log(res.data);
                if (res.data) {
                    // setJobPosting(res.data);
                    setBookMark(true);
            }}
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
                                    {allowEditDelete === true && <div className="col-md-2">
                                        <ModeEditOutlineIcon className='mx-1' style={{cursor : "pointer"}} onClick={handleEditJob}/>
                                        <DeleteIcon className='mx-1' style={{cursor : "pointer"}} sx={{ color: pink[500] }} onClick={handleDeleteJob} />
                                    </div>}
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
                                        {bookMark === true && auth?.user?.role.toLowerCase() !== "admin" && <button className='btn btn-danger m-2 rounded-3'onClick= {() => handleBookMark()}>Remove BookMark</button> }
                                        {bookMark === false && auth?.user?.role.toLowerCase() !== "admin" && <button className='btn btn-success m-2 rounded-3' onClick= {() => handleBookMark()}> Add to bookmarks </button> }
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