import { useState, useEffect } from 'react'
import './App.css'
import AddStoryButton from './components/AddStoryButton';
import StoryBubble from './components/StoryBubble';
import StoryViewer from './components/StoryViewer';

function App() {
  const [stories, setStories] = useState(() => {
    
    const savedStories = localStorage.getItem('user_stories');
    if (savedStories) {
      try {
        const parsed = JSON.parse(savedStories);
        
        const NOW = Date.now();
        const TWENTY_FOUR_HOURS = 24 * 60 * 60 * 1000;
        return parsed.filter(story => (NOW - story.timestamp) < TWENTY_FOUR_HOURS);
      } catch (e) {
        console.error("Failed to parse stories", e);
      }
    }
    return [];
  });
  const [viewingIndex, setViewingIndex] = useState(null);

  
  useEffect(() => {
    localStorage.setItem('user_stories', JSON.stringify(stories));
  }, [stories]);

  

  const handleAddStory = (base64Image) => {
    const newStory = {
      id: crypto.randomUUID(),
      image: base64Image,
      timestamp: Date.now(),
      seen: false
    };


    setStories(prev => [...prev, newStory]);
  };

  const handleOpenStory = (index) => {
    setViewingIndex(index);
  };

  const handleCloseStory = () => {
    setViewingIndex(null);
  };

  const handleDeleteStory = (storyId) => {
    setStories(prev => {
      const newStories = prev.filter(s => s.id !== storyId);
      
      if (newStories.length === 0) {
        setViewingIndex(null);
      }
      return newStories;
    });
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1 className="logo-text">Stories</h1>
      </header>

      <section className="stories-section">
        <div className="story-tray">
          <AddStoryButton onUpload={handleAddStory} />
          {stories.map((story, index) => (
            <StoryBubble
              key={story.id}
              story={story}
              onClick={() => handleOpenStory(index)}
            />
          ))}
        </div>
      </section>


      <div className="empty-state">
        <p></p>
      </div>

      {viewingIndex !== null && (
        <StoryViewer
          stories={stories}
          initialIndex={viewingIndex}
          onClose={handleCloseStory}
          onDelete={handleDeleteStory}
        />
      )}
    </div>
  )
}

export default App




