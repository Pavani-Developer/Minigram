import React, { useState } from 'react';
import '../Styles/Register.css';
import { MdOutlineAlternateEmail } from "react-icons/md";
import { FaRegUserCircle } from "react-icons/fa";
import { RiLockPasswordLine, RiLockPasswordFill } from "react-icons/ri";
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

  const notifySuccess = () => toast.success("Registration is successfull!");
  const notifyError = () => toast.error("Registration failed!");
  const notifypasswordIncorrect = () => toast.error("Passwords do not match!");
  const notifyIncompleteDetails = () =>toast.error("Please fill in all the details!");

  function handleInputChange(e) {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value
    });
  }

  const handleSubmit = async () => {
    if (!data.email || !data.username || !data.password || !data.confirmPassword){
      notifyIncompleteDetails();
      return;
    }
    if (data.password !== data.confirmPassword) {
      notifypasswordIncorrect();
      return;
    }else{
      try {
        const response = await axios.post('http://127.0.0.1:8000/registeruser/', data);
        console.log('Registered Successfully ');
        notifySuccess();
        window.location.href = '/';
        
      } catch (error) {
        console.error('Registration failed:', error.response ? error.response.data : error.message);
        notifyError();
      }
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
            type="password" 
            id='password' 
            name='password'
            placeholder='Password'
            onChange={handleInputChange}
            required
          />
          
        </div>

        <div className='input-container'>
          <input 
            type="password" 
            id='confirmPassword' 
            name='confirmPassword'
            placeholder='Confirm Password'
            onChange={handleInputChange}
            required
          />
         
        </div>

        <button type='button' onClick={handleSubmit}>Register</button>
      </div>
      <ToastContainer        // Position the toast
  style={{ width: "100%" }}     // Ensure full width on smaller devices
/>

    </>
  );
}

export default Register;
