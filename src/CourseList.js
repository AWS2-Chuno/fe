import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'; // axios를 import 합니다.
import './CourseList.css';

const CourseList = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]); // 강의 목록 상태를 추가합니다.

  useEffect(() => {
    // JWT 토큰 확인
    const token = localStorage.getItem('accessToken');
    if (!token) {
      navigate('/login');
    } else {
      fetchCourses(); // 강의 목록을 가져옵니다.
    }
  }, []);

  // 강의 목록을 가져오는 함수
  const fetchCourses = async () => {
    try {
      const response = await axios.get('https://a482a88683a4a45a3b44e48a15741db4-1541872073.ap-northeast-3.elb.amazonaws.com/videos', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`, // JWT 토큰을 헤더에 추가합니다.
        },
      });
      setCourses(response.data.items); // API 응답의 items 배열을 courses 상태에 저장합니다.
      console.log(response);
    } catch (error) {
      console.error('Error fetching courses:', error);
      // 오류 처리: 예를 들어, 사용자에게 오류 메시지를 표시할 수 있습니다.
    }
  };

  return (
    <div className="course-container">
      <h2 className="course-title">강의 목록</h2>
      <div className="course-list">
        {courses.map(course => (
          <div key={course.id} className="course-item">
            <img src={`https://via.placeholder.com/100`} alt={`${course.title} thumbnail`} className="course-thumbnail" />
            <div className="course-info">
              <Link to={`/courses/${course.id}`} className="course-link">
                <h3>{course.title}</h3>
              </Link>
              <p>register: {course.register || 'Unknown'}</p> {/* register 정보가 없을 경우 기본값 설정 */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseList;