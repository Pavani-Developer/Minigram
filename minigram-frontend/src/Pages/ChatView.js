import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; 
import { FaPaperPlane, FaSmile, FaArrowLeft } from 'react-icons/fa'; 
import  EmojiPicker  from 'emoji-picker-react'; // Import the emoji picker
import '../Styles/ChatView.css';

const ChatView = () => {
  const { id } = useParams(); 
  const [message, setMessage] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false); // State to control emoji picker visibility
  const navigate = useNavigate(); 

  const handleSendMessage = () => {
    if (message.trim()) {
      console.log("Message sent:", message);
      setMessage(''); // Clear input after sending
    }
  };

  const handleGoBack = () => {
    navigate('/messages'); 
  };

  // Placeholder for message data
  const messages = [
    { from: 'User', text: 'Hello! How are you?' },
    { from: 'Me', text: "I'm good, thanks! What about you?" },
    // More messages as needed
  ];

  // Function to handle emoji selection
  const handleEmojiClick = (emojiObject) => {
    setMessage((prev) => prev + emojiObject.emoji); // Append selected emoji to message
    setShowEmojiPicker(false); // Close the emoji picker after selection
  };

  return (
    <div className='messages-page'>
      <div className='messages-header'>
        <FaArrowLeft className='back-icon' onClick={handleGoBack} />
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
        <FaSmile className='icon' onClick={() => setShowEmojiPicker((prev) => !prev)} /> {/* Toggle emoji picker */}
        <input
          type='text'
          placeholder='Type a message...'
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <FaPaperPlane className='icon send-icon' onClick={handleSendMessage} />
      </div>
      {showEmojiPicker && (
        <div className='emoji-picker'>
          <EmojiPicker onEmojiClick={handleEmojiClick} />
        </div>
      )}
    </div>
  );
};

export default ChatView;
