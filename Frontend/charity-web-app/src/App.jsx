import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/HomePage";
import Login from "./pages/Login";
import Explore from "./pages/Explore";
import Create from "./pages/Create";
import Verify from "./pages/Verify";
import CampaignDetail from "./pages/CampaignDetail";
import Donate from "./pages/Donate";
import Dashboard from "./pages/Dashboard";
import Admin from "./pages/Admin";
import About from "./pages/About";

function App() {
  return (
    <Router>
      <nav style={{padding: "1em", background: "#eee"}}>
        <Link to="/">Home</Link> | <Link to="/explore">Explore</Link> | <Link to="/create">Create</Link> | <Link to="/dashboard">Dashboard</Link> | <Link to="/about">About</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/create" element={<Create />} />
        <Route path="/verify" element={<Verify />} />
        <Route path="/campaign/:id" element={<CampaignDetail />} />
        <Route path="/donate/:id" element={<Donate />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
  );
}

export default App;
