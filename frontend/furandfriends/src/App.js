import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation, Navigate } from 'react-router-dom';
import { AnimatePresence, motion } from "framer-motion";
import ProtectedRoute from "./components/ProtectedRoute";
import Signup from './pages/Signup/Signup';
import ElderlyWelcome from './pages/Welcome/Welcome';
import VolunteerForm from './pages/Volunteer/VolunteerForm';
import VolunteerPlus from './pages/Volunteer/VolunteerPlus';
import Connect from './pages/Connect/Connect';
import VolunteerRecommendations from "./pages/Recommendations/VolunteerRecommendations"; 
import Navbar from './components/Navbar/Navbar';
import Login from './pages/Login/Login';
import Contact from './pages/Contact/Contact';
import PetRecommendation from './pages/Recommendations/PetRecommendation';
import './App.css'; 

const pageVariants = {
  initial: { opacity: 0, y: 50 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.45 } },
  exit: { opacity: 0, y: -50, transition: { duration: 0.45 } }
};

const AnimatedRoutes = () => {
  const location = useLocation();
  const userRole = localStorage.getItem("userRole"); // Check role to handle redirects after signup

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit"><ElderlyWelcome /></motion.div>} />
        <Route path="/signup" element={<motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit"><Signup /></motion.div>} />
        <Route path="/login" element={<motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit"><Login /></motion.div>} />
        <Route path="/contact" element={<motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit"><Contact /></motion.div>} />

        {/* Redirect users after signup */}
        {userRole === 'volunteer' && <Route path="/signup" element={<Navigate to="/volunteer-form" replace />} />}
        {userRole === 'elderly' && <Route path="/signup" element={<Navigate to="/connect" replace />} />}

        {/* Protected Pages (Only accessible if logged in or signed up) */}
        <Route path="/welcome-elderly" element={
          <ProtectedRoute allowIfSignedUp={true}>
            <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit"><ElderlyWelcome /></motion.div>
          </ProtectedRoute>
        } />

        <Route path="/volunteer-form" element={
          <ProtectedRoute allowIfSignedUp={true}>
            <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit"><VolunteerForm /></motion.div>
          </ProtectedRoute>
        } />

        <Route path="/volunteer-plus" element={
          <ProtectedRoute allowIfSignedUp={true}>
            <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit"><VolunteerPlus /></motion.div>
          </ProtectedRoute>
        } />

        <Route path="/connect" element={
          <ProtectedRoute allowIfSignedUp={true}>
            <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit"><Connect /></motion.div>
          </ProtectedRoute>
        } />

        <Route path="/volunteer-recommendations" element={
          <ProtectedRoute>
            <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit"><VolunteerRecommendations /></motion.div>
          </ProtectedRoute>
        } />

        <Route path="/pet-recommendations" element={
          <ProtectedRoute>
            <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit"><PetRecommendation /></motion.div>
          </ProtectedRoute>
        } />
      </Routes>
    </AnimatePresence>
  );
};

const App = () => {
  return (
    <Router>
      <Navbar />
      <AnimatedRoutes />
    </Router>
  );
};

export default App;
