import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Signup from '../src/pages/Signup/Signup';
import ElderlyWelcome from '../src/pages/WelcomeElder';
import VolunteerWelcome from '../src/pages/WelcomeVolunteer';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ElderlyWelcome />} /> 
        <Route path="/signup" element={<Signup />} />
        <Route path="/welcome-elderly" element={<ElderlyWelcome />} />
        <Route path="/welcome-volunteer" element={<VolunteerWelcome />} />
      </Routes>
    </Router>
  );
};

export default App;