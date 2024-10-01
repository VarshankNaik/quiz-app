import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

function Home() {
  return (
    <div className="home">
      <h1>Welcome to the Quiz App</h1>
      <p>Are you a new user or do you already have an account?</p>
      <div className="home-buttons">
        <Link to="/login">
          <button>I already have an account</button>
        </Link>
        <Link to="/register">
          <button>I'm a new user</button>
        </Link>
      </div>
    </div>
  );
}

export default Home;
