import React, { useState } from 'react';
import { FaCircleUser, FaEye, FaEyeSlash } from "react-icons/fa6"; 
import { Link } from 'react-router-dom';
import '../Styles/Login.css';

const Login = ({ handleLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); 
  const [error, setError] = useState("");

  const dummyCredentials = {
    username: "testUser",
    password: "testPass"
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (username === dummyCredentials.username && password === dummyCredentials.password) {
      handleLogin({ username });
    } else {
      setError("Invalid username or password");
    }
  };

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
              placeholder='Username'
              onChange={(e) => setUsername(e.target.value)}
              required 
            />
            <FaCircleUser className='icon' />
          </div>

          <div className='input-container'>
            <input 
              type={showPassword ? 'text' : 'password'} 
              placeholder='Password'
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="off"  // Added
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

          <button type='submit'><Link to='/feed'>Login</Link></button>
        </form>

        <div className='register-link'>
          <p>Don't have an account? <Link to='/register'>Register</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Login;
