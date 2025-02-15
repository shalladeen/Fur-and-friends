import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Signup from './pages/Signup';
import ElderlyWelcome from '../src/pages/WelcomeElder';
import VolunteerWelcome from '../src/pages/WelcomeVolunteer';
import Navbar from '../src/components/Navbar/Navbar'

const App = () => {
  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/" element={<ElderlyWelcome />} />  {/* ✅ Elderly page is now the default */}
        <Route path="/signup" element={<Signup />} />
        <Route path="/welcome-elderly" element={<ElderlyWelcome />} />
        <Route path="/welcome-volunteer" element={<VolunteerWelcome />} />
      </Routes>
    </Router>
  );
};

export default App;