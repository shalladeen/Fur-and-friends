import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Signup from '../src/pages/Signup/Signup';
import ElderlyWelcome from '../src/pages/Welcome/Welcome';
import VolunteerForm from '../src/pages/Volunteer/VolunteerForm';
import VolunteerPlus from '../src/pages/Volunteer/VolunteerPlus';
import Connect from './pages/Connect/Connect';
import VolunteerRecommendations from "./pages/Recommendations/VolunteerRecommendations"; 
import Navbar from './components/Navbar/Navbar';
import Login from './pages/Login/Login';
import Contact from './pages/Contact/Contact';
import PetRecommendation from './pages/Recommendations/PetRecommendation';
import ProtectedRoute from './components/ProtectedRoute'; // ✅ Import Protected Route
import './App.css'; 
import { AnimatePresence, motion } from "framer-motion";

const pageVariants = {
  initial: { opacity: 0, y: 50 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.45 } },
  exit: { opacity: -50, y: -50, transition: { duration: 0.45 } }
};

const AnimatedRoutes = () => {
  return (
    <AnimatePresence mode="wait">
      <Routes>
        <Route path="/" element={<motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit"><ElderlyWelcome /></motion.div>} />
        <Route path="/signup" element={<motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit"><Signup /></motion.div>} />
        <Route path="/login" element={<motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit"><Login /></motion.div>} />
        <Route path="/contact" element={<motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit"><Contact /></motion.div>} />

        {/* ✅ Wrap Protected Routes Only */}
        <Route path="/connect" element={<ProtectedRoute><Connect /></ProtectedRoute>} />
        <Route path="/volunteer-form" element={<ProtectedRoute><VolunteerForm /></ProtectedRoute>} />
        <Route path="/volunteer-plus" element={<ProtectedRoute><VolunteerPlus /></ProtectedRoute>} />
        <Route path="/volunteer-recommendations" element={<ProtectedRoute><VolunteerRecommendations /></ProtectedRoute>} />
        <Route path="/pet-recommendation" element={<ProtectedRoute><PetRecommendation /></ProtectedRoute>} />
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
