import React, { useState, useEffect } from 'react';

function WelcomeScreen({ onComplete }) {
  const [showWelcome, setShowWelcome] = useState(true);
  const [showName, setShowName] = useState(false);
  const [showLoading, setShowLoading] = useState(false);

  useEffect(() => {
    // Phase 1: Welcome Animation (Starts immediately)
    // We'll use CSS to handle the staggered word animation.

    // Phase 2: Transition to Main App after animation finishes
    const timer = setTimeout(() => {
      sessionStorage.setItem('hasSeenWelcomeSession', 'true');
      onComplete();
    }, 4500); // Slowed down from 2s to 4.5s

    return () => clearTimeout(timer);
  }, [onComplete]);

  const words = "Welcome to Incredible learning".split(" ");

  return (
    <div className="welcome-screen clean-theme">
      <div className="welcome-content-bubble">
        <h1 className="bubble-text">
          {words.map((word, i) => (
            <span key={i} className="word-bubble" style={{ animationDelay: `${i * 0.4}s` }}>
              {word}
            </span>
          ))}
        </h1>

        <div className="bubble-name-tag" style={{ animationDelay: '2.5s' }}>
          By SHAKTHI SRAVANTH
        </div>
      </div>

      <div className="bubble-bg">
        <div className="bubble b1"></div>
        <div className="bubble b2"></div>
        <div className="bubble b3"></div>
      </div>
    </div>
  );
}

export default WelcomeScreen;
