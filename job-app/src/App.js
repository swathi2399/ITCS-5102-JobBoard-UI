import React from 'react'
import api from './api/users';


import { Routes, Route } from 'react-router-dom';
import Registration from './components/Registration';
import Login from './components/Login';
import NavBar from './components/NavBar';
import Home from './components/Home';
import { RequireAuth } from './components/RequireAuth';


import { AuthProvider } from './components/auth';


function App() {
return (
    <AuthProvider>
      <NavBar />
      <Routes>
        <Route path="/" element={
          <RequireAuth>
            <Home />
          </RequireAuth>
        } />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Registration />} />
       
      </Routes>
    </AuthProvider>
  );
}

export default App;
