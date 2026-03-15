// Course Data - Centralized course information
export const courses = [
    {
        id: "course-1",
        name: 'Complete React Tutorial',
        description: 'Learn React from scratch with comprehensive coverage of all fundamental concepts.',
        days: [
            {
                id: "c1-d1",
                dayNumber: 1,
                title: 'Day 1 - Introduction to React',
                links: [
                    {
                        id: "c1-d1-v1",
                        name: 'What is React? - Complete Overview',
                        url: 'https://www.youtube.com/watch?v=SqcY0GlETPk',
                        notesUrl: "https://excalidraw.com/#json=0usZk_4FQhkOX_-sMIGLx,U3l8nIq0jPbKUH8XPbPn6w"
                    },
                    {
                        id: "c1-d1-v2",
                        name: 'Setting Up Development Environment',
                        url: 'https://www.youtube.com/watch?v=Ke90Tje7VS0'
                    }
                ]
            },
            {
                id: "c1-d2",
                dayNumber: 2,
                title: 'Day 2 - JSX and Components',
                links: [
                    {
                        id: "c1-d2-v1",
                        name: 'Understanding JSX',
                        url: 'https://www.youtube.com/watch?v=qCAdg7h-8ao'
                    },
                    {
                        id: "c1-d2-v2",
                        name: 'Functional Components',
                        url: 'https://www.youtube.com/watch?v=MLU5ZEp9YDo'
                    }
                ]
            },
        ]
    },
    {
        id: "course-2",
        name: 'JavaScript Mastery Course',
        description: 'Master modern JavaScript with practical examples and real-world projects.',
        days: [
            {
                id: "c2-d1",
                dayNumber: 1,
                title: 'Day 1 - JavaScript Fundamentals',
                links: [
                    {
                        id: "c2-d1-v1",
                        name: 'Variables and Data Types',
                        url: 'https://www.youtube.com/watch?v=W6NZfCO5SIk',
                        notesUrl: "https://excalidraw.com/#json=0usZk_4FQhkOX_-sMIGLx,U3l8nIq0jPbKUH8XPbPn6w"
                    }
                ]
            }
        ]
    },
    {
        id: "course-3",
        name: 'CSS Complete Guide',
        description: 'From CSS basics to advanced layouts with Flexbox and Grid.',
        days: [
            {
                id: "c3-d1",
                dayNumber: 1,
                title: 'Day 1 - CSS Basics',
                links: [
                    {
                        id: "c3-d1-v1",
                        name: 'Introduction to CSS',
                        url: 'https://www.youtube.com/watch?v=MLU5ZEp9YDo'
                    }
                ]
            },
            {
                id: "c3-d2",
                dayNumber: 2,
                title: 'Day 2 - Flexbox',
                links: [
                    {
                        id: "c3-d2-v1",
                        name: 'Flexbox Full Course',
                        url: 'https://www.youtube.com/watch?v=MLU5ZEp9YDo'
                    }
                ]
            }
        ]
    },
];

// Helper function to get a course by ID
export const getCourseById = (id) => {
    return courses.find(course => course.id === id);
};

// Helper function to get all courses
export const getAllCourses = () => {
    return courses;
};

// Helper function to search courses
export const searchCourses = (searchTerm) => {
    const term = searchTerm.toLowerCase();
    return courses.filter(course =>
        course.name.toLowerCase().includes(term) ||
        course.description.toLowerCase().includes(term)
    );
};
