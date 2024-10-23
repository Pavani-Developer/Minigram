// EditProfile.js
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import '../Styles/EditProfile.css';

const EditProfile = () => {
  const location = useLocation(); // Access location to get state
  const { profileImg, name, email, bio } = location.state || {}; // Destructure user data

  // Initial state for form fields (could be pre-filled with user data)
  const [profileImage, setProfileImg] = useState(profileImg || "https://picsum.photos/200");
  const [userName, setUsername] = useState(name || "");
  const [userEmail, setEmail] = useState(email || "");
  const [userBio, setBio] = useState(bio || "");

  // Handle the form submission
  const handleSaveChanges = (e) => {
    e.preventDefault();
    console.log("Profile updated with:", { userName, userEmail, userBio });
    // Logic to handle profile update (API call, etc.)
  };

  const handleCancel = () => {
    // Logic to cancel changes (e.g., navigate back)
    console.log("Profile update canceled");
  };

  return (
    <div className='edit-profile-container'>
      <h2>Edit Profile</h2>
      <div className='edit-profile-img'>
        <img src={profileImage} alt="Profile" />
        <button className='change-photo-btn'>Change Profile Photo</button>
      </div>

      <form className='edit-profile-form' onSubmit={handleSaveChanges}>
        <div className='form-group'>
          <label>Username</label>
          <input
            type='text'
            value={userName}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        <div className='form-group'>
          <label>Email</label>
          <input
            type='email'
            value={userEmail}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className='form-group'>
          <label>Bio</label>
          <textarea
            value={userBio}
            onChange={(e) => setBio(e.target.value)}
            rows='3'
          />
        </div>

        <div className='edit-profile-buttons'>
          <button type='submit' className='save-btn'>Save Changes</button>
          <button type='button' className='cancel-btn' onClick={handleCancel}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProfile;
