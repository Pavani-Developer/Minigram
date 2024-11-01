// UserProfile.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // For navigation
import '../Styles/UserProfile.css'; // Import the CSS
import { useUser } from '../contexts/UserContext';
import axios from 'axios';
import { ACCESS_TOKEN, REFRESH_TOKEN } from './../constants';


const UserProfile = () => {
  const navigate = useNavigate();

  const {userDetails} = useUser();
  const [biodata,setBiodata] = useState([])
  // Dummy user data

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/userdata/${userDetails.user.id}/`, {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`, // Use quotes for the key
          },
        });
        // Do something with the response, e.g., set user data to state
        setBiodata(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);
  const userData = {
    profileImg: biodata.image ? `http://127.0.0.1:8000${biodata.image}` : '',//Add profileImg property
    name: userDetails.user.username,
    email: userDetails.user.email, // Add email property
    bio: biodata.bio,
    website: 'https://example.com',
    posts: 48,
    followers: '1.2k',
    following: 326
  };

  const handleLogout = () => {
    console.log("User logged out");
  };

  const handleEditProfile = () => {
    // Pass the user data object to EditProfile page
    navigate('/edit-profile', { state: userData }); 
  };

  return (
    <div className='profile-container'>
      <div className='profile-header'>
        
        <img 
        src={userData.profileImg} 
        alt="user profile" 
        className='profile-img' 
        />
        <div className='user-info'>
          <div className='user-meta'>
            <h2>{userData.name}</h2>
            <div className='button-group'>
              <button className='edit-btn' onClick={handleEditProfile}>Edit</button>
              <button className='logout-btn' onClick={handleLogout}>Logout</button>
            </div>
          </div>
          <div className='stats'>
            <div className='stat'>
              <p className='stat-number'>{userData.posts}</p>
              <p>Posts</p>
            </div>
            <div className='stat'>
              <p className='stat-number'>{userData.followers}</p>
              <p>Followers</p>
            </div>
            <div className='stat'>
              <p className='stat-number'>{userData.following}</p>
              <p>Following</p>
            </div>
          </div>
        </div>
      </div>

      <div className='bio-section'>
        <p><strong>{userData.name}</strong></p>
        <p>{userData.bio}</p>
        {/* <a href={userData.website} target='_blank' rel='noopener noreferrer' className='website'>
          {userData.website}
        </a> */}
      </div>

      <div className='posts-grid'>
        <img src="https://picsum.photos/300" alt="Post" />
        <img src="https://picsum.photos/300" alt="Post" />
        <img src="https://picsum.photos/300" alt="Post" />
        <img src="https://picsum.photos/300" alt="Post" />
        <img src="https://picsum.photos/300" alt="Post" />
        <img src="https://picsum.photos/300" alt="Post" />
      </div>
    </div>
  );
};

export default UserProfile;
