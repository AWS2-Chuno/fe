import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CognitoUser, AuthenticationDetails } from 'amazon-cognito-identity-js';
import { userPool } from './SignUp'; // Import the Cognito user pool from SignUp.js
import './Login.css';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // AWS Cognito 로그인 로직
    const authenticationData = {
      Username: email,
      Password: password,
    };
    const authenticationDetails = new AuthenticationDetails(authenticationData);

    const userData = {
      Username: email,
      Pool: userPool,
    };
    const cognitoUser = new CognitoUser(userData);

    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: (result) => {
        alert('로그인 성공!');

        // JWT 토큰 추출
        const accessToken = result.getAccessToken().getJwtToken();
        // const idToken = result.getIdToken().getJwtToken();
        // const refreshToken = result.getRefreshToken().getToken();

        // JWT 토큰을 콘솔에 출력
        // console.log('Access Token:', accessToken);
        // console.log('ID Token:', idToken);
        // console.log('Refresh Token:', refreshToken);

        // JWT 토큰을 localStorage에 저장
        localStorage.setItem('accessToken', accessToken);
        // localStorage.setItem('idToken', idToken);
        // localStorage.setItem('refreshToken', refreshToken);

        // 코스 목록으로 이동
        navigate('/CourseList');
        window.location.reload();
      },
      onFailure: (err) => {
        console.error('Login failed:', err);
        setErrorMessage('로그인 실패: ' + err.message); // 오류 메시지 출력
      },
    });
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Login</h2>
        {errorMessage && <p className="error-message">{errorMessage}</p>} {/* Error message */}
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="login-btn">Login</button>
        <p className="signup-link">
          Don't have an account? <a href="/signup">Sign up</a>
        </p>
      </form>
    </div>
  );
};

export default Login;