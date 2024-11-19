import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Styles/Feed.css';
import axios from 'axios';
import { useUserProfile } from '../contexts/UserProfileContext';
import { useUser } from '../contexts/UserContext';
import { ACCESS_TOKEN } from './../constants';

const Feed = () => {
  const navigate = useNavigate();
  const [commentsVisible, setCommentsVisible] = useState({});
  const [comments, setComments] = useState({});
  const [posts, setPosts] = useState([]);
  const { userDetails } = useUser();
  const [userProfile, setUserProfile] = useUserProfile();

  useEffect(() => {
    if (userDetails && userDetails.user && !userProfile.image) {
      const fetchUserData = async () => {
        try {
          const response = await axios.get(`http://127.0.0.1:8000/userdata/${userDetails.user.id}/`, {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`,
            },
          });
          setUserProfile(response.data);
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      };

      fetchUserData();
    }
  }, [userDetails, userProfile, setUserProfile]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/get-posts');
        setPosts(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, []);
//REACT_APP_BATCH_ATTENDANCE_API
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
      event.target.reset();
    }
  };

  const handleImageClick = (post) => {
    navigate('/post-detail', { state: { post } });
  };

  // Check if userDetails or userDetails.user is null
  if (!userDetails || !userDetails.user) {
    return <div>Loading...</div>; // Display loading state or spinner
  }

  return (
    <div className='feed-container'>
      {posts.map((post) => (
        <div key={post.id} className='post'>
          <div className='post-header'>
            <img
              src={userProfile.image ? `http://127.0.0.1:8000${userProfile.image}` : 'default-profile-pic-url'}
              alt={userDetails.user.username || 'Profile'}
              className='post-user-img'
            />
            <span className='post-username'>{userDetails.user.username}</span>
          </div>
          <img
            src={post.image ? `http://127.0.0.1:8000${post.image}` : 'default-image-url'}
            alt={post.caption}
            className='post-image'
            onClick={() => handleImageClick(post)}
          />
          <div className='post-actions'>
            <button className='like-button'>❤️ {post.likes}</button>
            <button
              className='comment-button'
              onClick={(e) => {
                e.stopPropagation();
                toggleComments(post.id);
              }}
            >
              💬 {comments[post.id] ? comments[post.id].length : 0}
            </button>
          </div>
          <div className='post-caption'>
            <strong>{post.user}</strong> {post.caption}
          </div>
          {commentsVisible[post.id] && (
            <div className='comment-section'>
              <form onSubmit={(event) => handleCommentSubmit(post.id, event)} className='comment-form'>
                <input type='text' name='comment' placeholder='Add a comment...' className='comment-input' required />
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
