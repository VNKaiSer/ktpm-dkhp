import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import LoginForm from './components/LoginForm';
import Course from './components/Course';
import StudyProgram from './components/StudyProgram';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<LoginForm />} /> 
          <Route path="/home" element={<Home />} /> 
          <Route path="/course" element={<Course />} /> 
          <Route path="/StudyProgram" element={<StudyProgram />} /> 

        </Routes>
      </div>
    </Router>
  );
}

export default App;
