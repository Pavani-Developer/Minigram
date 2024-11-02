import React, { useState } from 'react';
import '../Styles/CreatePost.css';
import { FaImage } from 'react-icons/fa';
import axios from 'axios';

const CreatePost = () => {
  const [caption, setCaption] = useState('');
  const [image, setImage] = useState(null);

  const handleImageChange =  (e) => {
    if (e.target.files && e.target.files[0]) {
      setImage(URL.createObjectURL(e.target.files[0]));
    }
  };



  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle post submission logic here
    const response = await axios.post() 
    console.log('Post submitted:', { caption, image });
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
