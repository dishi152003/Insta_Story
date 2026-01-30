import React from 'react';

const StoryBubble = ({ story, onClick, isSeen }) => {
  return (
    <div className="story-bubble-container" onClick={onClick}>
      <div className={`story-ring ${isSeen ? 'seen' : ''}`}>
        <div className="story-image-wrapper">
          <img src={story.image} alt="Story" className="story-thumbnail" />
        </div>
      </div>
      <span className="story-username">User </span>

    </div>
  );
};

export default StoryBubble;











