import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './UserProfile.css';

function UserProfile() {
  const [user, setUser] = useState({
    username: '',
    email: '',
    bio: '',
  });
  const [quizScores, setQuizScores] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchUserData();
    fetchQuizScores();
  }, []);

  const fetchUserData = async () => {
    try {
      const response = await axios.get('/api/user/profile', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setUser(response.data);
    } catch (error) {
      console.error('Error fetching user data:', error);
      setError('Failed to fetch user data. Please try again later.');
    }
  };

  const fetchQuizScores = async () => {
    try {
      const response = await axios.get('/api/user/quiz-scores', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setQuizScores(response.data);
    } catch (error) {
      console.error('Error fetching quiz scores:', error);
      setError('Failed to fetch quiz scores. Please try again later.');
    }
  };

  const handleInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put('/api/user/profile', user, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setIsEditing(false);
      alert('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
      setError('Failed to update profile. Please try again.');
    }
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="user-profile-container">
      <div className="user-profile-content">
        <h1>Profile</h1>
        {isEditing ? (
          <form onSubmit={handleSubmit} className="profile-form">
            <div>
              <label>Email:</label>
              <input
                type="email"
                name="email"
                value={user.email || ''}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label>Bio:</label>
              <textarea
                name="bio"
                value={user.bio || ''}
                onChange={handleInputChange}
              />
            </div>
            <button type="submit" className="button save-button">Save</button>
            <button type="button" className="button cancel-button" onClick={() => setIsEditing(false)}>Cancel</button>
          </form>
        ) : (
          <div className="profile-info">
            <p><strong>Username:</strong> {user.username}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Bio:</strong> {user.bio}</p>
            <button onClick={() => setIsEditing(true)} className="button edit-button">Edit Profile</button>
          </div>
        )}

        <h2>Quiz Scores</h2>
        {quizScores.length > 0 ? (
          <ul className="quiz-scores-list">
            {quizScores.map((score, index) => (
              <li key={index}>
                {score.quiz_title}: {score.score}%
              </li>
            ))}
          </ul>
        ) : (
          <p>No quiz scores available.</p>
        )}
      </div>
    </div>
  );
}

export default UserProfile;
