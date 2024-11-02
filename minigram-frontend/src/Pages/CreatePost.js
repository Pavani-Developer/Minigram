import React, { useState } from 'react';
import '../Styles/CreatePost.css';
import { FaImage } from 'react-icons/fa';
import { useUser } from '../contexts/UserContext';
import axios from 'axios';

const CreatePost = () => {
  const [caption, setCaption] = useState('');
  const [image, setImage] = useState(null);
  const { userDetails } = useUser(); // Use object destructuring to get userDetails

const handleImageChange = (e) => {
  const file = e.target.files[0];
  setImage(file);
    }
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('caption', caption);
    formData.append('user_id', userDetails.user.id); // Add the userId to the form data
    if (image) {
      formData.append('image', image);
    }
    try {
      const response = await axios.post('http://127.0.0.1:8000/create-post', formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // For file upload
        },
      });
      console.log('Post created successfully:', response.data);
      console.log(userDetails.user.id);
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  return (
    <div className='create-post-page'>
      <h1>Create a Post</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          rows='5'
          placeholder='What’s on your mind?'
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          required
        ></textarea>
        <label className='image-upload'>
          <FaImage className='icon' />
          <input type='file' accept='image/*' onChange={handleImageChange} />
          {image && <img src={image} alt='Preview' className='image-preview' />}
        </label>
        <button type='submit'>Post</button>
      </form>
    </div>
  );
};

export default CreatePost;
