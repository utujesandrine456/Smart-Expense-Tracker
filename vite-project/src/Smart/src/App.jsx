import React from 'react';
import './App.css';
import './index.css';
import Footer from './Footer/Footer.jsx'
import Home from './Home/Home.jsx'
import Signup from './SignUp/Signup.jsx'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Table from './Table/Table.jsx';
import Login from './Login/Login.jsx';
import Dashboard from './User Dashboard/Dashboard.jsx';
import NotFound from './Not found/Notfound.jsx';
import StyledForm from './form/form.jsx';
import Verify from './verify/VerifyEmail.jsx';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/table" element={<Table />} />
          <Route path="/login" element={<Login />} />
          <Route path="/user" element={<Dashboard />} />
          <Route path="/form" element={<StyledForm />} />
          <Route path="/email" element={<Verify />} />
          <Route path="/notfound" element={<NotFound />} />
          <Route path="*" element={<Navigate to="/notfound" />} />
        </Routes>
      </Router>
    </>
  )
}

export default App;
