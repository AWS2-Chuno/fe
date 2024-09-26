import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Header.css';
import logoImage from './assets/images/logo.png';

const Header = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  

  useEffect(() => {
    // JWT 토큰 확인
    const token = localStorage.getItem('accessToken');
    if (token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('idToken');
    localStorage.removeItem('refreshToken');
    setIsAuthenticated(false); // 로그아웃 시 인증 상태 업데이트
    navigate('/login'); // 홈 페이지로 리디렉션
  };

  return (
    <header className="header">
      <div className="logo">
        <a href="/">
          <img src={logoImage} alt="Logo" style={{ width: '50px', height: 'auto', marginLeft: '20px' }} />
        </a>
      </div>
      <nav className="nav-links">
        <ul>
          <li><a href="/">Home</a></li>
          {!isAuthenticated && ( // 로그인 안된 상태에서만 표시
            <>
              <li><a href="/login">Login</a></li>
              <li><a href="/signup">Sign Up</a></li>
            </>
          )}
          {isAuthenticated && ( // 로그인 된 상태에서만 표시
            <>
            <li><a href="/courseList">courseList</a></li>
            <li><button onClick={handleLogout} className="logout-button">Logout</button></li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;