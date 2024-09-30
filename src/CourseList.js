import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'; // axios를 import 합니다.
import './CourseList.css';

const CourseList = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]); // 강의 목록 상태를 추가합니다.
  //파일 업로드
  const [file, setFile] = useState(null); // 업로드할 파일 상태를 추가합니다.
  const [title, setTitle] = useState(''); // 제목 상태를 추가합니다.
  const [description, setDescription] = useState(''); // 설명 상태를 추가합니다.


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

//추가
  // 파일 선택 핸들러
  const handleFileChange = (e) => {
    setFile(e.target.files[0]); // 선택한 파일을 상태에 저장합니다.
  };

  // 제목 입력 핸들러
  const handleTitleChange = (e) => {
    setTitle(e.target.value); // 제목을 상태에 저장합니다.
  };

  // 설명 입력 핸들러
  const handleDescriptionChange = (e) => {
    setDescription(e.target.value); // 설명을 상태에 저장합니다.
  };

    // 파일 업로드 함수
    const handleUpload = async () => {
      if (!file || !title || !description) {
        alert('파일, 제목, 설명을 모두 입력해주세요!');
        return;
      }
  
      const formData = new FormData();
      formData.append('file', file); // 파일을 FormData에 추가합니다.
      formData.append('title', title); // 제목을 FormData에 추가합니다.
      formData.append('description', description); // 설명을 FormData에 추가합니다.
  
      try {
        const response = await axios.post(
          'https://a482a88683a4a45a3b44e48a15741db4-1541872073.ap-northeast-3.elb.amazonaws.com/videos/',
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data', // 멀티파트 데이터로 요청을 보냅니다.
              Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
            },
          }
        );
        console.log('File uploaded successfully:', response.data);
        fetchCourses(); // 업로드 후 강의 목록을 다시 가져옵니다.
      } catch (error) {
        console.error('Error uploading file:', error);
        // 오류 처리
      }
    };
  



  return (
    <div className="course-container">
      <h2 className="course-title">강의 목록</h2>


      {/* 업로드 기능 */}
      <div className="upload-section">
        <input type="file" onChange={handleFileChange} />
        <input 
          type="text" 
          placeholder="제목" 
          value={title} 
          onChange={handleTitleChange} 
        />
        <textarea
          placeholder="설명"
          value={description}
          onChange={handleDescriptionChange}
        />
        <button onClick={handleUpload}>업로드</button>
      </div>

      <div className="course-list">
        {courses.map(course => (
          <div key={course.id} className="course-item">
            <img src={`https://via.placeholder.com/100`} alt={`${course.title} thumbnail`} className="course-thumbnail" />
            <div className="course-info">
              <Link to={`/courses/${course.id}`} className="course-link">
                <h3>{course.title}</h3>
              </Link>
              
              {/*<p>register: {course.register || 'Unknown'}</p>  register 정보가 없을 경우 기본값 설정 */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseList;