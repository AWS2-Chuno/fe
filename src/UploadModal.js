// UploadModal.js
import React, { useState } from 'react';
import axios from 'axios';

const UploadModal = ({ isOpen, onClose, fetchCourses }) => {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  // 파일 선택 핸들러
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  // 제목 입력 핸들러
  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  // 설명 입력 핸들러
  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  // 파일 업로드 함수
  const handleUpload = async () => {
    if (!file || !title || !description) {
      alert('파일, 제목, 설명을 모두 입력해주세요!');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('title', title);
    formData.append('description', description);

    try {
      await axios.post(
        'http://k8s-ekschunogroup-be2f0b00cc-439757005.ap-northeast-3.elb.amazonaws.com/videos/',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          },
        }
      );
      fetchCourses(); // 업로드 후 강의 목록을 다시 가져옵니다.
      onClose(); // 모달 닫기
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  return (
    isOpen && (
      <div className="modal-overlay">
        <div className="modal-content">
          <h2>강의 업로드</h2>
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
          <button onClick={onClose}>닫기</button>
        </div>
      </div>
    )
  );
};

export default UploadModal;