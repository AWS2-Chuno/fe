import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CognitoUserPool, CognitoUserAttribute } from 'amazon-cognito-identity-js';
import './SignUp.css';

// AWS Cognito 설정 정보
const poolData = {
  UserPoolId: process.env.REACT_APP_USER_POOL_ID, // 사용자 풀 ID
  ClientId: process.env.REACT_APP_CLIENT_ID,       // 앱 클라이언트 ID
};

export const userPool = new CognitoUserPool(poolData);  // Export userPool

const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const attributeList = [];
    const dataEmail = {
      Name: 'email',
      Value: formData.email,
    };
    const attributeEmail = new CognitoUserAttribute(dataEmail);
    attributeList.push(attributeEmail);

    // Sign up using AWS Cognito
    userPool.signUp(formData.email, formData.password, attributeList, null, (err, result) => {
      if (err) {
        alert('회원가입 실패: ' + err.message);
        return;
      }
      alert('회원가입 성공, 이메일 확인 코드를 입력해주세요!');
      navigate('/confirm-signup'); // Navigate to the confirmation page
    });
  };

  return (
    <div className="signup-container">
      <form className="signup-form" onSubmit={handleSubmit}>
        <h2>Sign Up</h2>
        <div className="form-row">
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={formData.firstName}
            onChange={handleChange}
          />
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={handleChange}
          />
        </div>
        <div className="form-row">
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div className="form-row">
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="signup-btn">Sign up</button>
      </form>
    </div>
  );
};

export default SignUp;