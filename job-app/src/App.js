import api from './api/users';
// import './App.css';
import {Link} from 'react-router-dom';
import { BrowserRouter as Router, Switch, Route,useParams } from 'react-router-dom';
import Registration from './components/Registration';
import Login from './components/Login';
import NavBar from './components/NavBar';
import Home from './components/Home';
import CreateJob from './components/CreateJob';
import JobDetails from './components/JobDetails';
import EditJob from './components/EditJob';
import DeleteJob from './components/DeleteJob';

// import 'bootstrap/dist/css/bootstrap.min.css';

import { useState,useEffect } from 'react';


function App() {
  const [jobs,setJobs] = useState([]);
  console.log("getjobs is executing here")
  
  useEffect(() => {
    const getJobs = async() => {
    const get_jobs = await api.get("jobs");
    setJobs(get_jobs.data)
    }
    getJobs()
  },[]);
 


    
  return (
    <Router>
    <NavBar />
    <div >
        <Switch>
          <Route exact path = "/">
            <Registration />
          </Route>
          <Route exact path ="/login">
            <Login/>
          </Route>
          <Route exact path="/home"
          render = {(props) => (
            <Home
            {...props}
              jobs = {jobs} /> 
            )}>
           
          </Route>
          <Route exact path = "/create"
           render = {(props) => (
            <CreateJob
            {...props}
            jobs = {jobs}
            setJobs = {setJobs} /> 
            )}>
          </Route>

          <Route exact path = "/job/:id"  component={JobDetails} />
          <Route exact path = "/delete/:id"
            render = {(props) => (
              <DeleteJob
              {...props}
              jobs = {jobs}
              setJobs = {setJobs} /> 
            )}>
            </Route>
          <Route exact path = "/edit/:id"  component={EditJob} />
          
        </Switch>
        </div>
    </Router>
  );
}

export default App;
