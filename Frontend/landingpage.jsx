// src/pages/Home.js
import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => (
  <div>
    <h1>Welcome to CharityChain</h1>
    <p>Transparent, blockchain-powered crowdfunding for social good.</p>
    <Link to="/explore"><button>Explore Campaigns</button></Link>
    <Link to="/create"><button>Start a Campaign</button></Link>
  </div>
);

export default Home;
