import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import UploadModal from './UploadModal'; // Import the UploadModal component
import './CourseList.css';

const CourseList = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]); // 필터된 강의 목록
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 열기 상태
  const [viewMode, setViewMode] = useState('all'); // 'all' or 'mine' to toggle view

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
      setFilteredCourses(response.data.items); // 초기에는 전체 목록을 보여줌
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
      alert('삭제가 완료되었습니다.');
      fetchCourses();
    } catch (error) {
      console.error('Error deleting video:', error);
      alert('본인의 비디오만 삭제할 수 있습니다.');
    }
  };

  const toggleModal = () => {
    setIsModalOpen((prev) => !prev); // 모달 열기/닫기
  };

  const handleViewAllCourses = () => {
    setViewMode('all');
    setFilteredCourses(courses); // 전체 강의 목록 보여주기
  };
  
  const handleViewMyCourses = () => {
    const username = localStorage.getItem('username'); // localStorage에서 사용자 이름 가져오기
    const myCourses = courses.filter(course => course.uploader === username); // uploader와 username을 비교하여 필터링
    setViewMode('mine');
    setFilteredCourses(myCourses); // 자신의 강의만 보여주기
  };

  return (
    <div className="course-container">
      <h2 className="course-title">🔎 강의 목록</h2>

      {/* 업로드 모달 열기 버튼 */}
      <button className="upload-button" onClick={toggleModal}>강의 업로드</button>

      {/* 강의 목록 전체보기 버튼 */}
      <button className="view-all-button" onClick={handleViewAllCourses}>강의 목록 전체보기</button>

      {/* 내 강의 목록 보기 버튼 */}
      <button className="view-my-button" onClick={handleViewMyCourses}>내 강의 목록 보기</button>

      {/* 모달 컴포넌트 */}
      <UploadModal isOpen={isModalOpen} onClose={toggleModal} fetchCourses={fetchCourses} />

      <div className="course-list">
        {filteredCourses.map(course => (
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