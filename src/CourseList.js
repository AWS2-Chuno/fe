import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './CourseList.css';

const CourseList = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // JWT 토큰 확인
    const token = localStorage.getItem('accessToken');
    if (!token) {
      navigate('/login');
    }

  }, []);
    

  const courses = [
    { id: 1, title: 'React Basics', register: 'John Doe', thumbnail: 'https://via.placeholder.com/100' },
    { id: 2, title: 'Advanced JavaScript', register: 'Jane Smith', thumbnail: 'https://via.placeholder.com/100' },
    { id: 3, title: 'Node.js for Beginners', register: 'Tom Brown', thumbnail: 'https://via.placeholder.com/100' },
    { id: 4, title: 'CSS Flexbox and Grid', register: 'Emily White', thumbnail: 'https://via.placeholder.com/100' },
    { id: 5, title: 'Python for Data Science', register: 'Michael Green', thumbnail: 'https://via.placeholder.com/100' },
    { id: 6, title: 'Java for Beginners', register: 'Sarah Johnson', thumbnail: 'https://via.placeholder.com/100' },
    { id: 7, title: 'Data Structures', register: 'Chris Evans', thumbnail: 'https://via.placeholder.com/100' },
    { id: 8, title: 'Machine Learning', register: 'Anna Taylor', thumbnail: 'https://via.placeholder.com/100' },
  ];

  return (
    <div className="course-container">
      <h2 className="course-title">강의 목록</h2>
      <div className="course-list">
        {courses.map(course => (
          <div key={course.id} className="course-item">
            <img src={course.thumbnail} alt={`${course.title} thumbnail`} className="course-thumbnail" />
            <div className="course-info">
              <Link to={`/courses/${course.id}`} className="course-link">
                <h3>{course.title}</h3>
              </Link>
              <p>register: {course.register}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseList;