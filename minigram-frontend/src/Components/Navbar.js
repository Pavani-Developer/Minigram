import React from 'react';
import '../Styles/Navbar.css';
import { FaHome, FaSearch, FaRegCompass, FaRegHeart, FaUserAlt,FaPlusSquare, FaPaperPlane } from 'react-icons/fa';

import {Link} from 'react-router-dom';
import { useUser } from '../contexts/UserContext';
import { useUserProfile } from '../contexts/UserProfileContext';

const Navbar = () => {
  const [userProfile]= useUserProfile();
  const [userDetails] = useUser();
  if (!userProfile) {
    return null; // Or a loading indicator
  }
  return (
    <div className='sidenav'>
      <div className='logo'>
        {/* Display user's profile picture */}
        <Link to='/profile'><img src={userProfile.image || 'default-profile-pic-url.jpg'} alt="User Profile" className='profile-pic' /></Link>
      </div>

      <ul className='nav-items'>
        <li>
          <a href='#'>
          <Link to='/feed'><FaHome className='icon' /> <span className='nav-text'>Home</span></Link>
          </a>
        </li>
        <li>
          <a href='#'>
          <Link to='/search'><FaSearch className='icon' /> <span className='nav-text'>Search</span></Link>
          </a>
        </li>
        <li>
          <a href='#'>
          <Link to='/explore'><FaRegCompass className='icon' /> <span className='nav-text'>Explore</span> </Link>
          </a>
        </li>
        <li>
          <a href='#'>
          <Link to='/messages'> <FaPaperPlane className='icon' /> <span className='nav-text'>Messages</span></Link>
          </a>
        </li>
        <li>
            <a href='#'>
                {/*page for creating new posts*/}
                <Link to='/create'><FaPlusSquare className='icon' /> <span className='nav-text'>Create</span></Link>
                </a>
                </li>

        <li>
          <a href='#'>
          <Link to='/notifications'><FaRegHeart className='icon' /> <span className='nav-text'>Notifications</span></Link>
          </a>
        </li>
        <li>
          <a href='#'>
          <Link to='/profile'><FaUserAlt className='icon' /> <span className='nav-text'>Profile</span></Link>
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
