import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import '../Styles/Feed.css'; // Import the CSS file
import axios from 'axios';
import { useUserProfile } from '../contexts/UserProfileContext';
import { useUser } from '../contexts/UserContext';

const Feed = () => {
  const navigate = useNavigate(); // Initialize useNavigate
  const [commentsVisible, setCommentsVisible] = useState({});
  const [comments, setComments] = useState({});
  const [posts, setPosts] = useState([]);
  const [userDetails] = useUser();
  const [userProfile] = useUserProfile();
  

  const postss = [
    {
      id: 1,
      user: 'user1',
      userImage: 'https://picsum.photos/40?random=1',
      image: 'https://picsum.photos/400/300?random=1',
      caption: 'Enjoying the beautiful sunset!',
      likes: 120,
      comments: [],
    },
    {
      id: 2,
      user: 'user2',
      userImage: 'https://picsum.photos/40?random=2',
      image: 'https://picsum.photos/400/300?random=2',
      caption: 'Just another day in paradise!',
      likes: 98,
      comments: [],
    },
    {
      id: 3,
      user: 'user3',
      userImage: 'https://picsum.photos/40?random=3',
      image: 'https://picsum.photos/400/300?random=3',
      caption: 'Living my best life!',
      likes: 300,
      comments: [],
    },
  ];


  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/get-posts');
        setPosts(response.data);
        console.log(posts);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };
  
    fetchPosts();
  }, []); // Add an empty dependency array to run once on component mount
  
  const toggleComments = (postId) => {
    setCommentsVisible((prev) => ({
      ...prev,
      [postId]: !prev[postId],
    }));
  };

  const handleCommentSubmit = (postId, event) => {
    event.preventDefault();
    const commentInput = event.target.comment.value;

    if (commentInput) {
      setComments((prev) => ({
        ...prev,
        [postId]: [...(prev[postId] || []), commentInput],
      }));
      event.target.reset(); // Reset the form
    }
  };

  const handleImageClick = (post) => {
    navigate('/post-detail', { state: { post } }); // Navigate to post detail page with post data
  };

  return (
    <div className='feed-container'>
      {posts.map((post) => (
        <div key={post.id} className='post'>
          <div className='post-header'>
            <img
              src ={userProfile.image ? `http://127.0.0.1:8000${userProfile.image}` : 'default-profile-pic-url'}
              alt={userDetails.username}
              className='post-user-img'
            />
            <span className='post-username'>{post.user}</span>
          </div>
          {/* Only make the image clickable to navigate to post detail */}
          <img 
            src={post.image ? `http://127.0.0.1:8000${post.image}` : 'default-profile-pic-url'}
            alt={post.caption} 
            className='post-image' 
            onClick={() => handleImageClick(post)} 
          />
          <div className='post-actions'>
            <button className='like-button'>❤️ {post.likes}</button>
            <button 
              className='comment-button' 
              onClick={(e) => { e.stopPropagation(); toggleComments(post.id); }}
            >
              💬 {comments[post.id] ? comments[post.id].length : 0}
            </button>
          </div>
          <div className='post-caption'>
            <strong>{post.user}</strong> {post.caption}
          </div>

          {/* Comment Section */}
          {commentsVisible[post.id] && (
            <div className='comment-section'>
              <form onSubmit={(event) => handleCommentSubmit(post.id, event)} className='comment-form'>
                <input
                  type='text'
                  name='comment'
                  placeholder='Add a comment...'
                  className='comment-input'
                  required
                />
                <button type='submit' className='comment-submit'>Post</button>
              </form>
              <div className='comments-list'>
                {(comments[post.id] || []).map((comment, index) => (
                  <div key={index} className='comment'>
                    <strong>{post.user}</strong>: {comment}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Feed;
