import React from "react";
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Signup from "../src/pages/Signup/Signup";
import ElderlyWelcome from "../src/pages/Welcome/Welcome";
import VolunteerForm from "../src/pages/Volunteer/VolunteerForm";
import VolunteerPlus from "../src/pages/Volunteer/VolunteerPlus";
import Connect from "./pages/Connect/Connect";
import Navbar from "./components/Navbar/Navbar";
import Login from "./pages/Login/Login";
import Contact from "./pages/Contact/Contact";
import "./App.css"; 

const pageVariants = {
  initial: { opacity: 0, y: 50 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.45 } },
  exit: { opacity: -50, y: -50, transition: { duration: 0.45 } }
};

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit"><ElderlyWelcome /></motion.div>} />
        <Route path="/signup" element={<motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit"><Signup /></motion.div>} />
        <Route path="/login" element={<motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit"><Login /></motion.div>} />
        <Route path="/welcome-elderly" element={<motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit"><ElderlyWelcome /></motion.div>} />
        <Route path="/volunteer-form" element={<motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit"><VolunteerForm /></motion.div>} />
        <Route path="/volunteer-plus" element={<motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit"><VolunteerPlus /></motion.div>} />
        <Route path="/connect" element={<motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit"><Connect /></motion.div>} />
        <Route path="/contact" element={<motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit"><Contact /></motion.div>} />
      </Routes>
    </AnimatePresence>
  );
};

const App = () => {
  return (
    <Router>
      <div className="app-container">
        <Navbar />
        <AnimatedRoutes />
      </div>
    </Router>
  );
};

export default App;
