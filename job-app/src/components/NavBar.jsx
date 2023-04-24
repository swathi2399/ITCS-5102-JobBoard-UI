import React, { useState } from 'react'
import '../styles/navbar.css';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from './auth';
import axios from 'axios';

const NavBar = () => {
  const navigate = useNavigate();
  const auth = useAuth();
  const [toggleNavbar, setToggleNavBar] = useState(false);

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
        auth.logout();
        navigate('/');
    }
}



  return (
    <React.Fragment>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid" id="primary-nav">
                <Link className="navbar-brand" to="/">
                    <h2> Job board </h2>
                </Link>
                <button className="navbar-toggler" type="button" onClick={() => setToggleNavBar(!toggleNavbar)} data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className={toggleNavbar ? "collapse navbar-collapse showSupportedContent" : "collapse navbar-collapse hideSupportedContent"} id="navbarSupportedContent">
                    { auth && auth.user != null && <ul className="navbar-nav mr-auto">
                        {auth?.user?.role.toLowerCase() == "admin" && <li className="nav-item">
                            <Link className="nav-link" to="/create">Create Job Posting</Link>
                        </li>}
                        <li className="nav-item">
                            <Link className="nav-link" onClick={() => handleLogout()}>Log out</Link>
                        </li>
                    </ul>}
                </div>
                </div>
            </nav>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid" id="secondary-nav">
                  {auth && auth.user != null  && <ul className="navbar-nav mr-auto">
                    <li className="nav-item"> 
                      <Link className="nav-link" to="/">Job Postings</Link>
                    </li>
                    {auth?.user?.role.toLowerCase() !== "admin" && <li>
                    <Link className="nav-link" to="/bookMark">Bookmarks</Link>
                    </li>}
                  </ul>}
                  </div>
            </nav>
        </React.Fragment>
  )
}

export default NavBar;

