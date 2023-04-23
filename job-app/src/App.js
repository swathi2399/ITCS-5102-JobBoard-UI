import React from 'react'
import api from './api/users';


import { Routes, Route } from 'react-router-dom';
import Registration from './components/Registration';
import Login from './components/Login';
import NavBar from './components/NavBar';
import Home from './components/Home';
import ErrorPage from './components/ErrorPage';
import JobDetail from './components/JobDetail';
import EditJob from './components/EditJob';
import { RequireAuth } from './components/RequireAuth';


import { AuthProvider } from './components/auth';
import CreateJob from './components/CreateJob';
import "./App.css";
import BookMark from './components/BookMark';


function App() {
return (
    <AuthProvider>
      <NavBar />
      <div className="page-container">
      <Routes>
        <Route exact path='/login' element={<Login />} />
        <Route exact path='/register' element={<Registration />} />
        <Route path="/" element={
          <RequireAuth>
            <Home />
          </RequireAuth>
        } />
        <Route exact path="/create" element={
          <RequireAuth>
            <CreateJob />
          </RequireAuth>
        } />
        <Route exact path="/job/:id" element={
          <RequireAuth>
            <JobDetail />
          </RequireAuth>
        } />
        <Route exact path="/edit/:id" element={
          <RequireAuth>
            <EditJob />
          </RequireAuth>
        } />
        <Route exact path="/bookMark" element={
          <RequireAuth>
            <BookMark />
          </RequireAuth>
        } />
        <Route exact path="/error" element={<ErrorPage/>} />
        <Route path="*" element={<ErrorPage error={{status: 404, message: "Page Not Found"}}/>} />
      </Routes>
      </div>
    </AuthProvider>
  );
}

export default App;
