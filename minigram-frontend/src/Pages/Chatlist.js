// ChatList.js
import React from 'react';
import { Link } from 'react-router-dom';
import { FiSearch } from 'react-icons/fi';
import '../Styles/Chatlist.css';


const Chatlist = () => {
  const users = [
    { id: 1, name: 'User 1', lastMessage: 'Hey, how are you?', imgSrc: 'https://picsum.photos/50' },
    { id: 2, name: 'User 2', lastMessage: "Let's catch up soon!", imgSrc: 'https://picsum.photos/50?random=1' },
    // Add more users as needed
  ];

  return (
    <div className='chat-list'>
      <div className='search-bar'>
        <FiSearch className='search-icon' />
        <input type='text' placeholder='Search' />
      </div>
      <div className='conversations'>
        {users.map(user => (
          <Link to={`/messages/${user.id}`} key={user.id} className='conversation'>
            <img src={user.imgSrc} alt={user.name} className='user-img' />
            <div>
              <p className='username'>{user.name}</p>
              <p className='last-message'>{user.lastMessage}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Chatlist;
