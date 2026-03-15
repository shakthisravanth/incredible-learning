import React, { useState, useEffect } from 'react';
import CourseList from './components/CourseList';
import CourseDetail from './components/CourseDetail';
import WelcomeScreen from './components/WelcomeScreen';
import SecurityGuard from './components/SecurityGuard';
import { getAllCourses } from './data/courses';
import './App.css';

function App() {
  const [showWelcome, setShowWelcome] = useState(() => {
    const hasSeenWelcome = sessionStorage.getItem('hasSeenWelcomeSession');
    return !hasSeenWelcome;
  });
  
  const [selectedCourseId, setSelectedCourseId] = useState(() => {
    const hash = window.location.hash;
    const match = hash.match(/^#course\/([^/]+)$/);
    return match ? match[1] : null;
  });
  
  const courses = getAllCourses();

  useEffect(() => {
    const handlePopState = () => {
      const hash = window.location.hash;
      const match = hash.match(/^#course\/([^/]+)$/);
      setSelectedCourseId(match ? match[1] : null);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleSelectCourse = (courseId) => {
    setSelectedCourseId(courseId);
    window.history.pushState({ courseId }, '', `#course/${courseId}`);
  };

  const handleBackToCourses = () => {
    setSelectedCourseId(null);
    window.history.pushState({}, '', '#');
  };

  const selectedCourse = courses.find(course => course.id === selectedCourseId);

  if (showWelcome) {
    return <WelcomeScreen onComplete={() => setShowWelcome(false)} />;
  }

  return (
    <SecurityGuard>
      <div className="app">
        <main className="app-main" key={selectedCourseId || 'list'}>
          <div className="container">
            {selectedCourseId && selectedCourse ? (
              <CourseDetail 
                course={selectedCourse} 
                onBack={handleBackToCourses}
              />
            ) : (
              <CourseList 
                courses={courses} 
                onSelectCourse={handleSelectCourse}
              />
            )}
          </div>
        </main>

        <footer className="app-footer">
          <div className="footer-content">
            <p>Happy Learning! 🚀</p>
          </div>
        </footer>
      </div>
    </SecurityGuard>
  );
}

export default App;
