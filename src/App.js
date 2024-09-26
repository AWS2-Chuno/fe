import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignUp from './SignUp';
import ConfirmSignUp from './ConfirmSignUp';
import Login from './Login';
import CourseList from './CourseList';
import Header from './Header'; // Header 컴포넌트 추가
import Home from './Home';     // Home 컴포넌트 추가
import CourseDetail from './CourseDetail';



function App() {

  
  return (
    <Router>
      <Header /> {/* 모든 페이지에 헤더를 추가 */}

      <Routes>
        {/* 기본 경로 */}
        <Route path="/" element={<Home />} />
        {/* /signup 경로 */}
        <Route path="/signup" element={<SignUp />} />
        <Route path="/confirm-signup" element={<ConfirmSignUp />} />
        <Route path="/login" element={<Login />} />

        <Route path="/courselist" element={<CourseList />} />
        <Route path="/courses/:courseId" component={CourseDetail} /> {/* 상세 페이지 라우트 */}
      </Routes>
    </Router>
  );
}

export default App;