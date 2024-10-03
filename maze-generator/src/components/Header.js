import React from 'react';
import '../styles/Header.css';

const Header = ({ mode }) => {
  return (
    <header className="header">
      <h1>{mode === null ? 'Welcome to Maze Generator' : mode === 'play' ? 'Play Mode' : 'Learn Mode'}</h1>
    </header>
  );
};

export default Header;
