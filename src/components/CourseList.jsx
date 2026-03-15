import React from 'react';
import CourseCard from './CourseCard';
import IncredibleTitle from './IncredibleTitle';

function CourseList({ courses, onSelectCourse }) {
  if (courses.length === 0) {
    return (
      <div className="no-courses">
        <h3>No Courses Available</h3>
        <p>Check back later for new courses!</p>
      </div>
    );
  }

  return (
    <div className="course-list">
      <IncredibleTitle />
      <div className="course-grid">
        {courses.map((course) => (
          <CourseCard
            key={course.id}
            course={course}
            onSelectCourse={onSelectCourse}
          />
        ))}
      </div>
    </div>
  );
}

export default CourseList;
