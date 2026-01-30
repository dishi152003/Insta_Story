import React, { useState, useEffect, useRef } from 'react';

const StoryViewer = ({ stories, initialIndex, onClose, onDelete }) => {
    const [currentIndex, setCurrentIndex] = useState(initialIndex);
    const [progress, setProgress] = useState(0);
    const STORY_DURATION = 5000;
    const touchStart = useRef(null);
    const touchEnd = useRef(null);


    useEffect(() => {
        if (currentIndex >= stories.length && stories.length > 0) {
            setCurrentIndex(stories.length - 1);
        }
    }, [stories.length]);

    useEffect(() => {

        if (stories.length === 0) {
            onClose();
            return;
        }

        setProgress(0);
        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    goNext();
                    return 0;
                }
                return prev + (100 / (STORY_DURATION / 100));
            });
        }, 100);

        return () => clearInterval(interval);
    }, [currentIndex, stories.length]);

    const goNext = () => {
        if (currentIndex < stories.length - 1) {
            setCurrentIndex(currentIndex + 1);
        } else {
            onClose();
        }
    };

    const goPrev = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
        } else {

        }
    };

    const handleDelete = (e) => {
        e.stopPropagation();
        if (stories[currentIndex]) {
            onDelete(stories[currentIndex].id);

        }
    };


    const onTouchStart = (e) => {
        touchEnd.current = null;
        touchStart.current = e.targetTouches[0].clientX;
    }

    const onTouchMove = (e) => {
        touchEnd.current = e.targetTouches[0].clientX;
    }

    const onTouchEnd = () => {
        if (!touchStart.current || !touchEnd.current) return;
        const distance = touchStart.current - touchEnd.current;
        const isLeftSwipe = distance > 50;
        const isRightSwipe = distance < -50;

        if (isLeftSwipe) {
            goNext();
        }
        if (isRightSwipe) {
            goPrev();
        }
    }


    const handleScreenClick = (e) => {


        const width = window.innerWidth;
        const x = e.clientX;
        if (x < width * 0.3) {
            goPrev();
        } else {
            goNext();
        }
    };

    const currentStory = stories[currentIndex];

    if (!currentStory) return null;

    return (
        <div className="story-viewer-overlay">
            <div className="story-progress-container">
                {stories.map((story, idx) => (
                    <div key={story.id} className="progress-bar-bg">
                        <div
                            className="progress-bar-fill"
                            style={{
                                width: idx < currentIndex ? '100%' : idx === currentIndex ? `${progress}%` : '0%'
                            }}
                        />
                    </div>
                ))}
            </div>

            <div className="story-header">
                <div className="user-info">
                    <div className="user-avatar-small"></div>
                    <span className="user-name">User {currentStory.id.slice(0, 4)}</span>
                    <span className="story-time">{getTimeAgo(currentStory.timestamp)}</span>
                </div>
                <div className="header-actions">
                    <button className="delete-btn" onClick={handleDelete} title="Delete Story">🗑️</button>
                    <button className="close-btn" onClick={(e) => { e.stopPropagation(); onClose(); }}>✕</button>
                </div>
            </div>

            <div
                className="story-content"
                onClick={handleScreenClick}
                onTouchStart={onTouchStart}
                onTouchMove={onTouchMove}
                onTouchEnd={onTouchEnd}
            >
                <img src={currentStory.image} alt="Story" className="story-image-full" />
            </div>

            <style>{`
        .story-viewer-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: #000;
          z-index: 9999;
          display: flex;
          flex-direction: column;
        }
        .story-progress-container {
          display: flex;
          gap: 4px;
          padding: 10px 10px 0;
          z-index: 1002;
        }
        .progress-bar-bg {
          flex: 1;
          height: 2px;
          background: rgba(255,255,255,0.3);
          border-radius: 2px;
          overflow: hidden;
        }
        .progress-bar-fill {
          height: 100%;
          background: #fff;
          transition: width 0.1s linear;
        }
        .story-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 10px 15px;
          z-index: 1002;
          color: #ffffff;
        }
        .user-info {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .user-avatar-small {
          width: 32px;
          height: 32px;
          background: #333;
          border-radius: 50%;
        }
        .user-name {
          font-weight: 600;
          font-size: 14px;
        }
        .story-time {
          font-size: 12px;
          opacity: 0.7;
        }
        .header-actions {
            display: flex;
            align-items: center;
            gap: 15px;
        }
        .close-btn {
          font-size: 24px;
          color: #fff;
          padding: 5px;
        }
        .delete-btn {
            font-size: 18px;
            color: #fff;
            padding: 5px;
        }
        .story-content {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
        }
        .story-image-full {
          max-width: 100%;
          max-height: 80vh; 
          object-fit: contain;
        }
      `}</style>
        </div>
    );
};

function getTimeAgo(timestamp) {
    const seconds = Math.floor((Date.now() - timestamp) / 1000);
    if (seconds < 60) return `${seconds}s`;
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m`;
    const hours = Math.floor(minutes / 60);
    return `${hours}h`;
}

export default StoryViewer;































