import React, { useState } from 'react';
import '../Styles/Register.css';
import { MdOutlineAlternateEmail } from "react-icons/md";
import { FaRegUserCircle } from "react-icons/fa";
import { FaEye, FaEyeSlash } from "react-icons/fa6"; // Import eye icons
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {
  const [data, setData] = useState({
    email: '',
    username: '',
    password: '',
    confirmPassword: ''
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const notifySuccess = () => toast.success("Registration is successful!");
  const notifyError = () => toast.error("Registration failed!");
  const notifyPasswordIncorrect = () => toast.error("Passwords do not match!");
  const notifyIncompleteDetails = () => toast.error("Please fill in all the details!");

  function handleInputChange(e) {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value
    });
  }

  const handleSubmit = async () => {
    if (!data.email || !data.username || !data.password || !data.confirmPassword) {
      notifyIncompleteDetails();
      return;
    }
    if (data.password !== data.confirmPassword) {
      notifyPasswordIncorrect();
      return;
    } else {
      try {
        const response = await axios.post('https://pavanipampana.pythonanywhere.com/registeruser/', data);
        console.log('Registered Successfully');
        notifySuccess();
        window.location.href = '/';
      } catch (error) {
        console.error('Registration failed:', error.response ? error.response.data : error.message);
        notifyError();
      }
    }
  };

  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleConfirmPasswordVisibility = () => setShowConfirmPassword(!showConfirmPassword);

  return (
    <>
      <div className='register-body'>
        <h1>Register</h1>

        <div className='input-container'>
          <input
            type="email"
            id='email'
            name='email'
            placeholder='Email'
            onChange={handleInputChange}
            required
          />
          <MdOutlineAlternateEmail className='icon' />
        </div>

        <div className='input-container'>
          <input
            type="text"
            id='username'
            name='username'
            placeholder='Username'
            onChange={handleInputChange}
            required
          />
          <FaRegUserCircle className='icon' />
        </div>

        <div className='input-container'>
          <input
            type={showPassword ? "text" : "password"}
            id='password'
            name='password'
            placeholder='Password'
            onChange={handleInputChange}
            required
          />
          <span className='icon' onClick={togglePasswordVisibility}>
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>

        <div className='input-container'>
          <input
            type={showConfirmPassword ? "text" : "password"}
            id='confirmPassword'
            name='confirmPassword'
            placeholder='Confirm Password'
            onChange={handleInputChange}
            required
          />
          <span className='icon' onClick={toggleConfirmPasswordVisibility}>
            {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>

        <button type='button' onClick={handleSubmit}>Register</button>
      </div>
      <ToastContainer style={{ width: "100%" }} />
    </>
  );
}

export default Register;
