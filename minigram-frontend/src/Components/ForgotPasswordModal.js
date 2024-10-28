// ForgotPasswordModal.js
import React, { useState } from 'react';
import '../Styles/ForgotPasswordModal.css'; // Import CSS for styling

const ForgotPasswordModal = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      setError('Please enter your email');
      return;
    }

    try {
      // Replace with your API call to send the password reset email
      await fakeApiCall(email);
      setSuccess('Password reset link sent! Check your email.');
      setEmail(''); // Clear the email input
      setError(''); // Clear any previous errors
    } catch (err) {
      setError('Failed to send password reset link. Try again.');
    }
  };

  const fakeApiCall = (email) => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(`Email sent to ${email}`), 1000);
    });
  };

  if (!isOpen) return null;

  return (
    <div className='modal-overlay'>
      <div className='modal-content'>
        <h2>Forgot Password</h2>
        {error && <p className='error-message'>{error}</p>}
        {success && <p className='success-message'>{success}</p>}
        <form onSubmit={handleSubmit}>
          <input
            type='email'
            placeholder='Enter your email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type='submit'>Send Reset Link</button>
          <button type='button' onClick={onClose} className='close-btn'>Close</button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPasswordModal;
