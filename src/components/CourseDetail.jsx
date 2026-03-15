import React, { useState } from 'react';

function CourseDetail({ course, onBack }) {
  const [expandedDayId, setExpandedDayId] = useState(null);
  const [selectedVideoId, setSelectedVideoId] = useState(null);

  const getVideoId = (url) => {
    if (!url || url.trim() === '') return null;
    // Extract YouTube video ID from URL
    const match = url.match(/(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?/\s]{11})/i);
    return match ? match[1] : null;
  };

  const isRecordingAvailable = (url) => {
    const videoId = getVideoId(url);
    if (!videoId) {
      console.warn(`[LMS DEBUG] No valid YouTube ID found for URL: "${url}"`);
      return false;
    }
    return true;
  };

  const handleDayClick = (dayId) => {
    setExpandedDayId(expandedDayId === dayId ? null : dayId);
  };

  const handleWatchClick = (video, dayId) => {
    setSelectedVideoId(video.id);
    setExpandedDayId(dayId); // Ensure day stays expanded when playing
  };

  const selectedVideo = course.days
    .flatMap(d => d.links)
    .find(l => l.id === selectedVideoId);

  return (
    <div className="course-detail-view">
      <div className="detail-top-bar">
        <button className="back-btn" onClick={onBack}>
          ← Back to Courses
        </button>
        <h2 className="detail-course-name">{course.name}</h2>
      </div>

      <div className="dual-pane-container">
        {/* Sidebar: Course Content / Modules */}
        <aside className="content-sidebar">
          <div className="sidebar-header">
            <h4>Curriculum</h4>
            <div className="sidebar-stats">
              <span>{course.days.length} Day{course.days.length !== 1 ? 's' : ''}</span>
              <span className="stats-divider">•</span>
              <span>{course.days.reduce((t, d) => t + d.links.length, 0)} Video{course.days.reduce((t, d) => t + d.links.length, 0) !== 1 ? 's' : ''}</span>
            </div>
          </div>

          <div className="days-accordion">
            {course.days.map((day) => {
              const isDayActive = day.links.some(link => selectedVideoId === link.id);
              const isExpanded = expandedDayId === day.id;

              return (
                <div key={day.id} className="day-item">
                  <div
                    className={`day-header ${isExpanded ? 'expanded' : ''} ${isDayActive ? 'active-module' : ''}`}
                    onClick={() => handleDayClick(day.id)}
                  >
                    <div className="day-title-container">
                      <span className="day-title">{day.title}</span>
                      {isDayActive && (
                        <span className="active-dot-indicator">Playing</span>
                      )}
                    </div>
                    <span className={`expand-icon ${isExpanded ? 'expanded' : ''}`}>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="6 9 12 15 18 9"></polyline>
                      </svg>
                    </span>
                  </div>

                  {isExpanded && (
                    <div className="day-content expanded">
                      <ul className="links-list">
                        {day.links.map((link) => {
                          const hasRecording = isRecordingAvailable(link.url);
                          const isPlaying = selectedVideoId === link.id;
                          return (
                            <li
                              key={link.id}
                              className={`link-item ${isPlaying ? 'playing' : ''}`}
                              onClick={() => hasRecording && handleWatchClick(link, day.id)}
                            >
                              <div className="link-content">
                                <span className="link-name">
                                  <svg className="link-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <polygon points="23 7 16 12 23 17 23 7"></polygon>
                                    <rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect>
                                  </svg>
                                  {link.name}
                                </span>
                                {isPlaying && <span className="playing-indicator">NOW PLAYING</span>}
                                {!hasRecording && <span className="offline-badge">No Recording</span>}
                              </div>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </aside>

        {/* Main Area: Video Player & Description */}
        <main className="video-main-area">
          {selectedVideo && isRecordingAvailable(selectedVideo.url) ? (
            <>
              <div className="now-playing-label">
                <svg className="now-playing-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="23 7 16 12 23 17 23 7"></polygon>
                  <rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect>
                </svg>
                <span>Now Playing: {selectedVideo.name}</span>
              </div>
              <div className="featured-video">
                <div className="video-player">
                  <iframe
                    src={`https://www.youtube.com/embed/${getVideoId(selectedVideo.url)}?modestbranding=1&rel=0&iv_load_policy=3&showinfo=0&controls=1&autohide=1&disablekb=1&loop=1&playlist=${getVideoId(selectedVideo.url)}`}
                    title={selectedVideo.name}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
            </>
          ) : (
            <div className="video-placeholder">
              <div className="placeholder-content">
                <div className="placeholder-icon-container">
                  <svg className="placeholder-icon-svg" width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                    <line x1="8" y1="21" x2="16" y2="21"></line>
                    <line x1="12" y1="17" x2="12" y2="21"></line>
                  </svg>
                </div>
                <h3>Select a video to start learning</h3>
                <p>Pick a module from the sidebar to begin your journey.</p>
              </div>
            </div>
          )}

          <div className="course-info-section">
            <div className="info-cards-grid">
              <div className="description-card">
                <h4>About this course</h4>
                <p className="course-description">{course.description}</p>
              </div>

              {selectedVideo?.notesUrl && (
                <div className="notes-btn-wrapper">
                  <a 
                    href={selectedVideo.notesUrl} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="view-notes-btn"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                      <polyline points="15 3 21 3 21 9"></polyline>
                      <line x1="10" y1="14" x2="21" y2="3"></line>
                    </svg>
                    View Class Notes
                  </a>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default CourseDetail;
