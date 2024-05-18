import React, { useState } from 'react';
import { Navigate } from 'react-router-dom'; 
import './../css/LoginForm.css'; 

const LoginForm = () => {
  const [studentId, setStudentId] = useState('');
  const [password, setPassword] = useState('');
  const [loggedIn, setLoggedIn] = useState(false); 

  const handleSubmit = (e) => {
    e.preventDefault();
    if (studentId === 'admin' && password === 'admin') {
      setLoggedIn(true);
    } else {
      alert('Mã sinh viên hoặc mật khẩu không đúng!');
    }
  };

  if (loggedIn) {
    return <Navigate to="/Home" />;
  }

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="studentId">Mã sinh viên:</label>
        <input
          type="text"
          id="studentId"
          placeholder="Nhập mã sinh viên"
          value={studentId}
          onChange={(e) => setStudentId(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="password">Mật khẩu:</label>
        <input
          type="password"
          id="password"
          placeholder="Nhập mật khẩu"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button type="submit" className="login-button">Đăng nhập</button>
    </form>
  );
};

export default LoginForm;
