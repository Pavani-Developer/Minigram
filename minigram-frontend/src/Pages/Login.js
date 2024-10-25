import React, { useState } from 'react';
import { FaCircleUser, FaEye, FaEyeSlash } from "react-icons/fa6"; 
import { Link } from 'react-router-dom';
import '../Styles/Login.css';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';


const Login = () => {

  const notifyError = () => toast.error('Invalid username or password');
  const notifyIncompleteDetails = () => toast.error('Please fill in all the details');
  const notifySuccess = () => toast.success('Login successful!');
  const[showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  
  const [data,setData] = useState({
    username: '',
    password: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value
    })

  }

  const handleSubmit = async(e) => {
    console.log(data)
    e.preventDefault();
    if (!data.username || !data.password) {
      notifyIncompleteDetails();
      return;
    } else {
      try {
          const response = await axios.post('http://127.0.0.1:8000/api/token/',data);
          localStorage.setItem('access_token', response.data.access);
          localStorage.setItem('refresh_token', response.data.refresh);
          console.log('Login Successful')
          window.location.href = '/feed';
          notifySuccess();
        }catch(error){
          console.log(error)
          notifyError();
          
    
          }
    }
    
  }
    
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className='login-container'>
      <div className='login-body'>
        <h1>Login</h1>
        {error && <p className='error-message'>{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className='input-container'>
            <input 
              type='text' 
              id='username'
              placeholder='Username'
              onChange={handleInputChange}
              name='username'
              required 
            />
            <FaCircleUser className='icon' />
          </div>

          <div className='input-container'>
            <input 
              type={showPassword ? 'text' : 'password'} 
              placeholder='Password'
              onChange={handleInputChange}
              autoComplete="off"  // Added
              name='password'
              id='password'
              required 
            />
            <span className='icon' onClick={togglePasswordVisibility}> 
              {showPassword ? <FaEyeSlash /> : <FaEye />} 
            </span>
          </div>

          <div className='remember-forgot'>
            <label>
              <input type='checkbox' /> Remember me
            </label>
            <a href='#'>Forgot Password?</a>
          </div>

          <button type='submit' onSubmit={handleSubmit}>Login</button>
        </form>

        <div className='register-link'>
          <p>Don't have an account? <Link to='/register'>Register</Link></p>
        </div>
      </div>
      <ToastContainer/>
    </div>

  );
};

export default Login;
