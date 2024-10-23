import React from 'react'
import '../Styles/Register.css'
import { MdOutlineAlternateEmail } from "react-icons/md";
import { FaRegUserCircle } from "react-icons/fa";
import { RiLockPasswordLine, RiLockPasswordFill } from "react-icons/ri";

const Register = () => {
  return (
    <>
    <div className='register-body'>
      <h1>Register</h1>

      <div className='input-container'>
        <input type="email" id='email' placeholder='Email'/>
        <MdOutlineAlternateEmail className='icon'/>
      </div>

      <div className='input-container'>
        <input type="text" id='username' placeholder='Username'/>
        <FaRegUserCircle className='icon'/>
      </div>

      <div className='input-container'>
        <input type="password" id='password' placeholder='Password'/>
        <RiLockPasswordLine className='icon'/>
      </div>

      <div className='input-container'>
        <input type="password" id='confirmPassword' placeholder='Confirm Password'/>
        <RiLockPasswordFill className='icon'/>
      </div>

      <button>Register</button>
    </div>
    </>
  )
}

export default Register
