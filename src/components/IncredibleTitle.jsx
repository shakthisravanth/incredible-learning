import React, { useState } from 'react';

function IncredibleTitle() {
  const [animationKey, setAnimationKey] = useState(0);
  const words = "Incredible Learning".split(" ");
  
  const handleReplay = () => {
    setAnimationKey(prev => prev + 1);
  };
  
  return (
    <div 
      className="incredible-title-container" 
      onClick={handleReplay}
      key={animationKey}
      title="Click to replay animation"
    >
      <h1 className="incredible-title">
        {words.map((word, i) => (
          <span 
            key={i} 
            className="incredible-word" 
            style={{ animationDelay: `${i * 0.2}s` }}
          >
            {word}
          </span>
        ))}
      </h1>
      <div className="incredible-underline"></div>
    </div>
  );
}

export default IncredibleTitle;
