import React, { useState } from 'react';
import '../Styles/Register.css';
import { MdOutlineAlternateEmail } from "react-icons/md";
import { FaRegUserCircle } from "react-icons/fa";
import { RiLockPasswordLine, RiLockPasswordFill } from "react-icons/ri";
import axios from 'axios';

const Register = () => {
  const [data, setData] = useState({
    email: '',
    username: '',
    password: '',
    confirmPassword: ''
  });

  function handleInputChange(e) {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value
    });
  }

  const handleSubmit = async () => {
    try {
      const response = await axios.post('http://127.0.0.1:8000/registeruser/', data);
      console.log('Successfully registered:', response.data);
    } catch (error) {
      console.error('Registration failed:', error.response ? error.response.data : error.message);
    }
  };

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
          />
          <FaRegUserCircle className='icon' />
        </div>

        <div className='input-container'>
          <input 
            type="password" 
            id='password' 
            name='password'
            placeholder='Password'
            onChange={handleInputChange}
          />
          <RiLockPasswordLine className='icon' />
        </div>

        <div className='input-container'>
          <input 
            type="password" 
            id='confirmPassword' 
            name='confirmPassword'
            placeholder='Confirm Password'
            onChange={handleInputChange}
          />
          <RiLockPasswordFill className='icon' />
        </div>

        <button type='button' onClick={handleSubmit}>Register</button>
      </div>
    </>
  );
}

export default Register;
