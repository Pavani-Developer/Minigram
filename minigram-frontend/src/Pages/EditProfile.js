// EditProfile.js
import React, { useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import '../Styles/EditProfile.css';
import axios from 'axios';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../constants';


const EditProfile = () => {
  const fileInputRef = useRef(null);
  const location = useLocation(); // Access location to get state
  const { profileImg, bio ,name} = location.state || {}; // Destructure user data
  const [userName, setUsername] = useState(name || "");
  const [userBio, setBio] = useState(bio || "");
  const [profileImage, setProfileImg] = useState(profileImg || "https://picsum.photos/200");
  


  const handleBioChange = (e) => setBio(e.target.value);

  const handleChangePhotoClick = () => {
    // Trigger a click event on the hidden file input
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    
    console.log(file);
    
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('bio', bio);
    if (profileImage) {
      formData.append('image', profileImage);
    }// Logic to handle profile update (API call, etc.)
    try {
      const response = await axios.patch('http://127.0.0.1:8000/user/profileupdate/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`, // Include access token if required
        },
      });
      console.log('Profile updated successfully:', response.data);
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };
  

  const handleCancel = () => {
    // Logic to cancel changes (e.g., navigate back)
    console.log("Profile update canceled");
  };

  return (
    <div className='edit-profile-container'>
      <h1>{userName}</h1>
      
      <div className='edit-profile-img'>
        <img 
        src={profileImage} 
        alt="Profile"
        />

        <button 
        className='change-photo-btn'
        onClick={handleChangePhotoClick}>
          Change Profile Photo
        </button>
          {/* Hidden file input */}
      <input 
        type="file" 
        ref={fileInputRef}
        style={{ display: 'none' }} // Hide the file input
        onChange={handleFileChange} // Handle file selection
        accept="image/*" // Accept image files only
      />
      </div>

      <form className='edit-profile-form'>
        <div className='form-group'>

          {/* <label>Username</label>
          <input
            type='text'
            value={userName}
            required
          /> */}

        </div>

        <div className='form-group'>
          {/* <label>Email</label>
          <input
            type='email'
            value={userEmail}
            onChange={(e) => setEmail(e.target.value)}
            required
          /> */}
        </div>

        <div className='form-group'>
          <label>Bio</label>
          <textarea
            value={userBio}
            onChange={handleBioChange}
            rows='3'
          />
        </div>

        <div className='edit-profile-buttons'>
          <button type='submit' className='save-btn' onClick={handleSubmit}>Save Changes</button>
          <button type='button' className='cancel-btn' onClick={handleCancel}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProfile;
