import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './views/Home.jsx';
import Login from './views/Login.jsx';
import Register from './views/Register.jsx';
import Dashboard from './views/Dashboard.jsx';
import ReactionTimerPage from './views/ReactionTimer.jsx';
import ReactionTimesPage from './views/ReactionTimesPage.jsx';

function App() {
    return (
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/reaction-timer" element={<ReactionTimerPage />} />
          <Route path="/reaction-times" element={<ReactionTimesPage />} />
        </Routes>
    );
}

export default App;
