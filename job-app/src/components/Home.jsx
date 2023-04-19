import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import { useAuth } from './auth'
import axios from 'axios';

const Home = () => {
    const navigate = useNavigate()
    const auth = useAuth()
    
    const handleLogout = async () => {
        try {
            const res = await axios.get(
                "http://localhost:8080/api/v1/auth/logout",
                {headers: {"Authorization" : `Bearer ${auth.user.token}`}},
                {withCredentials : true}
            );
            auth.logout();
            navigate('/');
        } catch (err) {
            console.log(err);
        }
    }

    const fetchJobs = async () => {
        try {
            const res = await axios.get(
                "http://localhost:8080/api/v1/jobs/",
                {headers: {"Authorization" : `Bearer ${auth.user.token}`, "Content-Type": "application/json"}},
                {withCredentials : true}
            );
            console.data(res.data);
        } catch (err) {

        }
    }

    useEffect(() => {
        fetchJobs();
    }, []);

    return (
    <div>
        <div>
            <button onClick={() => handleLogout()}>Log out</button>
        </div>
        <h1> {JSON.stringify(auth.user)} </h1>
    </div>
    );
}
 
export default Home;