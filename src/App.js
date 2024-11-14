// src/App.js
import React from 'react';
import './App.css'; // CSS 파일을 임포트합니다.
import BookList from './BookList.tsx';

function App() {
  return (
    <div className='App'>
      <BookList />
    </div>
  );
}

export default App;
