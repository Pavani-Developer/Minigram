import React from 'react';
import '../Styles/Notifications.css';
import { FaRegHeart, FaUserPlus, FaRegCommentDots } from 'react-icons/fa';

const Notifications = () => {
  return (
    <div className='notifications-page'>
      <h1>Notifications</h1>
      <div className='notifications-list'>
        <div className='notification-item'>
          <FaRegHeart className='icon' />
          <div className='notification-text'>
            <p><strong>User1</strong> liked your post.</p>
            <span className='time'>2 hours ago</span>
          </div>
        </div>
        <div className='notification-item'>
          <FaUserPlus className='icon' />
          <div className='notification-text'>
            <p><strong>User2</strong> started following you.</p>
            <span className='time'>5 hours ago</span>
          </div>
        </div>
        <div className='notification-item'>
          <FaRegCommentDots className='icon' />
          <div className='notification-text'>
            <p><strong>User3</strong> commented on your photo: "Nice shot!"</p>
            <span className='time'>1 day ago</span>
          </div>
        </div>
        {/* Add more notification items as needed */}
      </div>
    </div>
  );
};

export default Notifications;
