import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem('token');
  const isAdmin = localStorage.getItem('isAdmin') === 'true';
  const username = localStorage.getItem('username');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('isAdmin');
    localStorage.removeItem('username');
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">Quiz App</Link>
      </div>
      <div className="navbar-links">
        {isLoggedIn && (
          <>
            <Link to={isAdmin ? "/admin" : "/user"}>Dashboard</Link>
            {isAdmin && <Link to="/admin/create-quiz">Create Quiz</Link>}
          </>
        )}
        {isLoggedIn ? (
          <>
            <Link to="/profile">Profile ({username})</Link>
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
