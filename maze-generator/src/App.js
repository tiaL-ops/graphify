import React, { useState } from 'react';
import MazeGrid from './components/MazeGrid';  
import CycleDetection from './components/CycleDetection'; // New component
import './styles/App.css';                    

const App = () => {
  const [mode, setMode] = useState(null);

  // Display start screen if no mode is selected
  if (mode === null) {
    return (
      <div className="App">
        <h1>Choose a topic</h1>
        <div className="start-screen">
          <button onClick={() => setMode('play')}>Understand DFS</button>
          <button onClick={() => setMode('learn')}>Cycle Detection</button>
        </div>
      </div>
    );
  }

  // Conditionally render different components based on the mode
  return (
    <div className="App">
      <h1>{mode === 'play' ? 'Understanding DFS' : 'Cycle Detection'}</h1>
      {mode === 'play' ? <MazeGrid /> : <CycleDetection />}
    </div>
  );
};

export default App;
