import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Import useNavigate
import { FaPaperPlane, FaSmile, FaArrowLeft } from 'react-icons/fa'; // Import FaArrowLeft for back icon
import '../Styles/ChatView.css';

const ChatView = () => {
  const { id } = useParams(); // Get the user ID from the URL
  const [message, setMessage] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate

  const handleSendMessage = () => {
    if (message.trim()) {
      console.log("Message sent:", message);
      setMessage(''); // Clear input after sending
    }
  };

  // Function to handle back button click
  const handleGoBack = () => {
    navigate('/messages'); // Navigate back to the chat list
  };

  // Placeholder for message data
  const messages = [
    { from: 'User', text: 'Hello! How are you?' },
    { from: 'Me', text: "I'm good, thanks! What about you?" },
    // More messages as needed
  ];

  return (
    <div className='messages-page'>
      <div className='messages-header'>
        <FaArrowLeft className='back-icon' onClick={handleGoBack} /> {/* Back button */}
        <h2>Chat with {id === '1' ? 'User 1' : 'User 2'}</h2>
      </div>
      <div className='messages-content'>
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.from === 'Me' ? 'sent' : 'received'}`}>
            <p>{msg.text}</p>
          </div>
        ))}
      </div>
      <div className='message-input'>
        <FaSmile className='icon' />
        <input
          type='text'
          placeholder='Type a message...'
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <FaPaperPlane className='icon send-icon' onClick={handleSendMessage} />
      </div>
    </div>
  );
};

export default ChatView;
