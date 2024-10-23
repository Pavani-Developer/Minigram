import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'; // Import necessary hooks
import '../Styles/PostDetails.css'; // Import your CSS for styling

const PostDetail = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { post } = location.state || {}; // Get post data passed from the Feed component
  const [comments, setComments] = useState(post ? post.comments : []); // Initialize comments state

  const handleBack = () => {
    navigate(-1); // Navigate back to the previous page
  };

  const handleCommentSubmit = (event) => {
    event.preventDefault();
    const commentInput = event.target.comment.value.trim(); // Get comment input

    if (commentInput) {
      setComments((prevComments) => [...prevComments, commentInput]); // Add new comment
      event.target.reset(); // Reset the form
    }
  };

  return (
    <div className="post-detail-container">
      <button className="back-button" onClick={handleBack}>← Back</button>
      {post ? (
        <div className="post-detail">
          <div className="post-header">
            <img src={post.userImage} alt={post.user} className="post-user-img" />
            <span className="post-username">{post.user}</span>
          </div>
          <img src={post.image} alt={post.caption} className="post-detail-image" />
          <div className="post-caption">
            <strong>{post.user}</strong> {post.caption}
          </div>
          <div className="post-actions">
            <button className="like-button">❤️ {post.likes}</button>
            <button className="comment-button">
              💬 {comments.length}
            </button>
          </div>

          {/* Comments Section */}
          <div className="comments-section">
            <form onSubmit={handleCommentSubmit} className="comment-form">
              <input
                type="text"
                name="comment"
                placeholder="Add a comment..."
                className="comment-input"
                required
              />
              <button type="submit" className="comment-submit">Post</button>
            </form>
            <div className="comments-list">
              {comments.map((comment, index) => (
                <div key={index} className="comment">
                  <strong>{post.user}</strong>: {comment}
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <p>No post data available.</p>
      )}
    </div>
  );
};

export default PostDetail;
