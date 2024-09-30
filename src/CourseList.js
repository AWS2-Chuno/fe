// CourseList.js
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import UploadModal from './UploadModal'; // Import the UploadModal component
import './CourseList.css';

const CourseList = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 열기 상태

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      navigate('/login');
    } else {
      fetchCourses();
    }
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await axios.get('https://a482a88683a4a45a3b44e48a15741db4-1541872073.ap-northeast-3.elb.amazonaws.com/videos', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      });
      setCourses(response.data.items);
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  };

  const handleDelete = async (videoId) => {
    const confirmDelete = window.confirm('정말로 이 비디오를 삭제하시겠습니까?');
    if (!confirmDelete) return;

    try {
      await axios.delete(`https://a482a88683a4a45a3b44e48a15741db4-1541872073.ap-northeast-3.elb.amazonaws.com/videos/${videoId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      });
      fetchCourses();
    } catch (error) {
      console.error('Error deleting video:', error);
    }
  };

  const toggleModal = () => {
    setIsModalOpen((prev) => !prev); // 모달 열기/닫기
  };

  return (
    <div className="course-container">
      <h2 className="course-title">강의 목록</h2>

      {/* 업로드 모달 열기 버튼 */}
      <button className="upload-button" onClick={toggleModal}>강의 업로드</button>

      {/* 모달 컴포넌트 */}
      <UploadModal isOpen={isModalOpen} onClose={toggleModal} fetchCourses={fetchCourses} />

      <div className="course-list">
        {courses.map(course => (
          <div key={course.id} className="course-item">
            <img src={`https://via.placeholder.com/100`} alt={`${course.title} thumbnail`} className="course-thumbnail" />
            <div className="course-info">
              <Link to={`/courses/${course.id}`} className="course-link">
                <h3>{course.title}</h3>
              </Link>
              <button onClick={() => handleDelete(course.id)}>삭제</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseList;