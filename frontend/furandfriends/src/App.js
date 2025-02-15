import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Signup from '../src/pages/Signup/Signup';
import ElderlyWelcome from '../src/pages/Welcome/Welcome';
import VolunteerForm from '../src/pages/Volunteer/VolunteerForm';
import VolunteerPlus from '../src/pages/Volunteer/VolunteerPlus';
import Connect from './pages/Connect/Connect';
import Navbar from './components/Navbar/Navbar';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<ElderlyWelcome />} /> 
        <Route path="/signup" element={<Signup />} />
        <Route path="/welcome-elderly" element={<ElderlyWelcome />} />
        <Route path="/volunteer-form" element={<VolunteerForm />} />
        <Route path="/volunteer-plus" element={<VolunteerPlus />} />
        <Route path="/connect" element={<Connect />} />
      </Routes>
    </Router>
  );
};

export default App;