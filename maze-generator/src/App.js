import React, { useState } from 'react';
import MazeGrid from './components/MazeGrid';  
import './styles/App.css';                    

const App = () => {
  const [mode, setMode] = useState(null);

  // Display start screen if no mode is selected
  if (mode === null) {
    return (
      <div className="App">
        <h1>Welcome to Maze Generator</h1>
        <div className="start-screen">
          <button onClick={() => setMode('play')}>Play Mode</button>
          <button onClick={() => setMode('learn')}>Learn Mode</button>
        </div>
      </div>
    );
  }

  // Once a mode is selected, display the MazeGrid component
  return (
    <div className="App">
      <h1>{mode === 'play' ? 'Play Mode' : 'Learn Mode'}</h1>
      <MazeGrid />
    </div>
  );
};

export default App;
