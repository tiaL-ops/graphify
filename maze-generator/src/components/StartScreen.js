import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/StartScreen.css';

const StartScreen = () => {
  return (
    <div className="start-screen">
      <h2>Choose a Topic</h2>
      <Link to="/dfs">
        <button className="mode-btn">Understanding DFS</button>
      </Link>
      <Link to="/cycle-detection">
        <button className="mode-btn">Detecting a Cycle</button>
      </Link>
    </div>
  );
};

export default StartScreen;
