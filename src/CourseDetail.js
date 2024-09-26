import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; // useParams 임포트
import './CourseDetail.css';

const CourseDetail = () => {
  const { courseId } = useParams(); // URL에서 courseId 가져오기
  const [course, setCourse] = useState(null);

  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        const response = await fetch(`/api/courses/${courseId}`); // API 호출
        const data = await response.json();
        setCourse(data); // 강의 정보 상태 업데이트
      } catch (error) {
        console.error('Failed to fetch course details:', error);
      }
    };

    fetchCourseDetails();
  }, [courseId]);

  if (!course) {
    return <div>Loading...</div>; // 데이터가 로드 중일 때 로딩 표시
  }

  return (
    <div className="course-detail-container">
      <h2>{course.title}</h2>
      <img src={course.thumbnail} alt={`${course.title} thumbnail`} className="course-detail-thumbnail" />
      <p><strong>Instructor:</strong> {course.instructor}</p>
      <p><strong>Description:</strong> {course.description}</p> {/* 설명 추가 */}
      <button className="enroll-btn">Enroll Now</button> {/* 수강신청 버튼 */}
    </div>
  );
};

export default CourseDetail;