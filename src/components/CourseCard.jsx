import React from 'react';

function CourseCard({ course, onSelectCourse }) {

  return (
    <div className="course-card">
      <div className="course-card-header">
        <h3>{course.name}</h3>
      </div>
      
      <p className="course-description">{course.description}</p>

      <div className="course-stats">
        <span className="stat-badge">
          <svg className="stat-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
            <line x1="16" y1="2" x2="16" y2="6"></line>
            <line x1="8" y1="2" x2="8" y2="6"></line>
            <line x1="3" y1="10" x2="21" y2="10"></line>
          </svg>
          {course.days.length} Days
        </span>
        <span className="stat-badge">
          <svg className="stat-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="23 7 16 12 23 17 23 7"></polygon>
            <rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect>
          </svg>
          {course.days.reduce((total, day) => total + day.links.length, 0)} Videos
        </span>
      </div>

      <button className="start-learning-btn" onClick={() => onSelectCourse(course.id)}>
        Start Learning
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          <line x1="5" y1="12" x2="19" y2="12"></line>
          <polyline points="12 5 19 12 12 19"></polyline>
        </svg>
      </button>
    </div>
  );
}

export default CourseCard;
