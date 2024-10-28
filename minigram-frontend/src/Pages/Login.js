import React, { useState } from 'react';
import { FaCircleUser, FaEye, FaEyeSlash } from "react-icons/fa6"; 
import { Link } from 'react-router-dom';
import '../Styles/Login.css';
import axios from 'axios';
import { ACCESS_TOKEN, REFRESH_TOKEN } from './../constants';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';
import ForgotPasswordModal from '../Components/ForgotPasswordModal';



const Login = () => {
  const navigate = useNavigate();

  const {userDetails,setUserDetails} = useUser();

  const notifyError = () => toast.error('Invalid username or password');
  const notifyIncompleteDetails = () => toast.error('Please fill in all the details');
  const notifySuccess = () => toast.success('Login successful!');
  const[showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  
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
    
    e.preventDefault();
    if (!data.username || !data.password) {
      notifyIncompleteDetails();
      return;
    } else {
      try {
          const res = await axios.post('http://127.0.0.1:8000/api/token/',data);
          localStorage.setItem(ACCESS_TOKEN, res.data.access);
          localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
          notifySuccess();
          navigate('/feed'); 

          //fetch user details
          const user = await axios.get(`http://127.0.0.1:8000/user/${data.username}/`,{
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`, // Include access token if required
          },
      });
          setUserDetails(user.data);
          console.log(userDetails)
          
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
            
          <a href='#' onClick={() => setModalOpen(true)}>Forgot Password?</a>
          </div>

          <button type='submit' onSubmit={handleSubmit}>Login</button>
        </form>

        <div className='register-link'>
          <p>Don't have an account? <Link to='/register'>Register</Link></p>
        </div>
      </div>
      <ToastContainer/>
      <ForgotPasswordModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </div>

  );
};

export default Login;
