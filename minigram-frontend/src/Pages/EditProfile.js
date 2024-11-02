import React, { useState, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../Styles/EditProfile.css';
import axios from 'axios';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../constants';
import { useUser } from '../contexts/UserContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EditProfile = () => {
  const {userDetails} = useUser();
  const fileInputRef = useRef(null);
  const location = useLocation(); 
  const navigate = useNavigate(); // Access location to get state
  const { profileImg, bio, name, userId } = location.state || {}; // Destructure user data including userId
  const [userName, setUsername] = useState(name || "");
  const [userBio, setBio] = useState(bio || "");
  const [profileImage, setProfileImg] = useState(profileImg || "https://picsum.photos/200");

  const handleBioChange = (e) => setBio(e.target.value);


  const notifySuccess = () => toast.success("Profile Updated successfully!");


  const handleChangePhotoClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setProfileImg(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('bio', userBio);
    formData.append('user_id', userDetails.user.id);  // Add the userId to the form data
    if (profileImage) {
      formData.append('image', profileImage);
    }

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/userprofile/update', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',  // For file upload
        },
      });
      console.log('Profile updated successfully:', formData);
      console.log(userDetails.user.id)
      notifySuccess();
      navigate('/profile'); 
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };
  const handleCancel = () => {
    navigate('/profile'); 
    console.log("Profile update canceled");
  };

  return (
    <div className='edit-profile-container'>
      <h1>{userName}</h1>
      <div className='edit-profile-img'>
        <img src={profileImage} alt="Profile" />
        <button className='change-photo-btn' onClick={handleChangePhotoClick}>
          Change Profile Photo
        </button>
        <input 
          type="file" 
          ref={fileInputRef}
          style={{ display: 'none' }} 
          onChange={handleFileChange} 
          accept="image/*" 
        />
      </div>
      <form className='edit-profile-form' onSubmit={handleSubmit}>
        <div className='form-group'>
          <label>Bio</label>
          <textarea value={userBio} onChange={handleBioChange} rows='3' />
        </div>
        <div className='edit-profile-buttons'>
        <button type='button' className='cancel-btn' onClick={handleCancel}>
            Cancel
          </button>
          <button type='submit' className='save-btn'>Save</button>
          
        </div>
      </form>
      <ToastContainer style={{ width: "100%" }} />
    </div>
    
  );
};

export default EditProfile;
