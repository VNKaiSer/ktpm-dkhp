import React from 'react';
import LoginForm from './LoginForm';

const Login = () => {
  const handleLogin = (credentials) => {
    console.log('Logging in with:', credentials);
  };

  return (
    <div>
      <h1>Login Page</h1>
      <LoginForm onSubmit={handleLogin} />
    </div>
  );
};

export default Login;
