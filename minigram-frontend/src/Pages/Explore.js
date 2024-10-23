import React from 'react';
import '../Styles/Explore.css';

const posts = [
  'https://picsum.photos/300/300?random=1',
  'https://picsum.photos/300/400?random=2',
  'https://picsum.photos/400/300?random=3',
  'https://picsum.photos/300/300?random=4',
  'https://picsum.photos/500/400?random=5',
  'https://picsum.photos/300/300?random=6',
  'https://picsum.photos/400/400?random=7',
  'https://picsum.photos/300/400?random=8',
  'https://picsum.photos/400/300?random=9',
];

const Explore = () => {
  return (
    <div className="explore-container">
      <div className="explore-grid">
        {posts.map((post, index) => (
          <div key={index} className={`explore-post post-${index + 1}`}>
            <img src={post} alt={`Post ${index + 1}`} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Explore;
