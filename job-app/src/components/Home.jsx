import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { useAuth } from './auth'
import axios from 'axios';
import '../styles/jobposting.css';

const Home = () => {
    const navigate = useNavigate()
    const auth = useAuth()
    const [jobPostings, setJobPostings] = useState([]);
    const [companyNames, setCompanyNames] = useState([]);
    const [companyName, setCompany] = useState("All");
    const [experience, setExperience] = useState("All");
    const [workMode, setWorkMode] = useState('All');
    const [filteredJobPostings, setFilteredJobPostings] = useState([]);

    const fetchJobs = async () => {
        try {
            const res = await axios.get(
                "http://localhost:8080/api/v1/jobs/",
                {headers: {"Authorization" : `Bearer ${auth.user.token}`, "Content-Type": "application/json"}},
                {withCredentials : true}
            );
            setJobPostings(res.data);
            setFilteredJobPostings(res.data);
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
        const loadCompanyNames = async () => {
            try {
                const res = await axios.get(
                    "http://localhost:8080/api/v1/jobs/companies",
                    {headers: {"Authorization" : `Bearer ${auth.user.token}`, "Content-Type": "application/json"}},
                    {withCredentials : true}
                );
                if (res.data) {
                    setCompanyNames(res.data)
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
        loadCompanyNames();
    }, []);

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

    const handleApplyFilter = () => {
        let postings = jobPostings;
        if (companyName !== 'All') {
            postings = postings.filter(p => p.companyName === companyName);
        }  
        if (experience !== 'All') {
            postings = postings.filter(p => p.experience === experience);
        } 
        if (workMode !== 'All') {
            postings = postings.filter(p => p.workMode === workMode);
        }
        setFilteredJobPostings(postings);
    }

    const handleClearFilter = () => {
        setCompany('All');
        setExperience('All');
        setWorkMode('All');
        setFilteredJobPostings(jobPostings);
    }

    return (
    <div className="container-fluid mt-3">
        <div className="row">
                <div className="col-md-3">
                <div className="form-inline">
                            <label htmlFor="name" className="col-sm-2">Company:</label>
                            <div className="col-sm-10">
                            <select id="companyName" name="companyName" className='form-control' value = {companyName} onChange={e => setCompany(e.target.value)}>
                                    <option>All</option>
                                    {
                                        companyNames.length > 0 && 
                                        companyNames.map(company => <option value={company}> {company} </option>)
                                    }
                                </select>
                            </div>
                    </div>
                </div>
                <div className="col-md-3">
                <div className="form-inline">
                            <label htmlFor="genre" className="col-sm-2">Experience:</label>
                            <div className="col-sm-10">
                            <select id="experience" name="experience" className="form-control" value = {experience} onChange={e => setExperience(e.target.value)} >
                                            <option value='All'>All</option>
                                            <option value="0-2 years">0-2 years</option>
                                            <option value="2-4 years">2-4 years</option>
                                            <option value="5+ years">5+ years</option>
                                        </select>
                            </div>
                    </div>
                </div>
                <div className="col-md-3">
                <div className="form-inline">
                            <label htmlFor="rating" className="col-sm-4">Work mode:</label>
                            <div className="col-sm-8">
                            <select id="workMode" name="workMode" className="form-control" value = {workMode} onChange={e => setWorkMode(e.target.value)}>
                                <option value='All'>All</option>
                                <option value="Onsite">Onsite</option>
                                <option value="Hybrid">Hybrid</option>
                                <option value="Remote">Remote</option>
                            </select>
                            </div>
                    </div>
                </div> 
                <div className="col-md-3">
                    <button className='btn btn-primary m-3' onClick={handleApplyFilter}> Apply </button>
                    <button className='btn btn-secondary m-3' onClick={handleClearFilter}> Clear </button>
                </div>     
            </div>

        <div className="row d-flex flex-row mt-3">
                {filteredJobPostings.map(renderInfoCard)}
        </div>  
    </div>
    );
}
 
export default Home;