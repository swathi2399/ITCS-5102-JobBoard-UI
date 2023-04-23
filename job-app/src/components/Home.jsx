import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { useAuth } from './auth'
import axios from 'axios';
import '../styles/jobposting.css';

const Home = () => {
    const navigate = useNavigate()
    const auth = useAuth()
    const [jobPostings, setJobPostings] = useState([]);
    
    const fetchJobs = async () => {
        try {
            const res = await axios.get(
                "http://localhost:8080/api/v1/jobs/",
                {headers: {"Authorization" : `Bearer ${auth.user.token}`, "Content-Type": "application/json"}},
                {withCredentials : true}
            );
            setJobPostings(res.data);
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

    useEffect(() => {
        fetchJobs();
    }, []);

    const renderInfoCard = (card,index) => {
        return (
            // onClick={() => navigate("/trade/" + id, { state: { id, image } })
        <div className="card job-card" onClick={() => navigate("/job/" + card.jobId, { state : { id : card.jobId } })}>
                <div className="card-body">
                    <p className="card-text">{card.title}</p> 
                    <p className="card-text">Company Name: {card.companyName}</p>
                    <p className="card-text">Location: {card.location}</p>
                </div>   
           </div>
        
    ) };

    return (
    <div className="container-fluid mt-3">
        <div className="row d-flex flex-row">
                {jobPostings.map(renderInfoCard)}
        </div>  
    </div>
    );
}
 
export default Home;