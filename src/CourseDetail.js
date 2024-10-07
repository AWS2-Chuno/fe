import React, { useEffect, useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Hls from 'hls.js';
import 'video.js/dist/video-js.css'; // video.js 기본 스타일
import './CourseDetail.css';

const CourseDetail = () => {
  const { id } = useParams(); // URL에서 강의 ID를 가져옴
  const [course, setCourse] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false); // 비디오 재생 상태 관리
  const navigate = useNavigate();
  const videoRef = useRef(null); // 비디오 요소를 참조하는 변수

  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        const response = await axios.get(`https://api.chuno.store/videos/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          },
        });
        setCourse(response.data);
      } catch (error) {
        console.error('Error fetching course details:', error);
        navigate('/'); // 오류 발생 시 강의 목록으로 이동
      }
    };

    fetchCourseDetails();

    return () => {
      if (videoRef.current) {
        videoRef.current.src = ''; // 비디오 소스 제거
      }
    };
  }, [id, navigate]);

  useEffect(() => {
    if (course && videoRef.current) {
      const video = videoRef.current;

      // HLS.js를 사용하여 브라우저에서 HLS가 지원되지 않을 때도 m3u8 파일 재생
      if (Hls.isSupported()) {
        const hls = new Hls();
        hls.loadSource(course.file_url);
        hls.attachMedia(video);
        hls.on(Hls.Events.MANIFEST_PARSED, () => {
          // HLS가 준비되면 play() 호출을 위한 준비
        });
      } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
        // HLS를 네이티브로 지원하는 경우
        video.src = course.file_url;
      }
    }
  }, [course]);

  const handlePlay = () => {
    const video = videoRef.current;
    if (video) {
      video.play();
      setIsPlaying(true); // 재생 상태 업데이트
    }
  };

  if (!course) {
    return <div>Loading...</div>; // 데이터가 로드되지 않았을 때 로딩 메시지 표시
  }

  return (
    <div className="course-detail-container">
      <h2 className="course-detail-title">{course.title}</h2>
      <img src={course.thumbnail_path} alt={`${course.title} thumbnail`} className="course-detail-thumbnail" />
      <p className="course-detail-description">{course.description}</p>
      <div className="course-detail-info">
        <span>Uploader: {course.uploader}</span>
        <span>Date: {new Date(course.timestamp).toLocaleDateString()}</span>
      </div>

      {/* 파일 URL 링크 표시 */}
      <div className="course-detail-file">
        <a href={course.file_url} target="_blank" rel="noopener noreferrer">
          Download/Stream File
        </a>
      </div>

      {/* 비디오.js 플레이어 */}
      <div className="video-player-container">
        <video
          ref={videoRef}
          className="video-js vjs-default-skin"
          controls
          width="560"
          height="360"
        />
        {!isPlaying && (
          <button onClick={handlePlay} className="play-button">
            Play Video
          </button>
        )}
      </div>
    </div>
  );
};

export default CourseDetail;