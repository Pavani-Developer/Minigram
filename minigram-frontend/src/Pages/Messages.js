// Messages.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ChatList from './Chatlist';
import ChatView from './ChatView';

const Messages = () => {
  return (
    <div className='messages-page'>
      <Routes>
        <Route path="/" element={<ChatList />} /> {/* Chat List Page */}
        <Route path="/:id" element={<ChatView />} /> {/* Chat View Page */}
      </Routes>
    </div>
  );
};

export default Messages;
