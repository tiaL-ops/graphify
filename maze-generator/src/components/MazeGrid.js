import React, { useState, useEffect } from 'react';
import { generatePrimMaze } from '../algorithms/prims';
import { initializeDFS, dfsStep } from '../algorithms/dfs'; 
import '../styles/MazeGrid.css';

const directions = [
  { x: 0, y: -1, name: 'Up' },
  { x: 0, y: 1, name: 'Down' },
  { x: -1, y: 0, name: 'Left' },
  { x: 1, y: 0, name: 'Right' },
];

const MazeGrid = () => {
  const width = 9;
  const height = 9;
  const start = { x: 0, y: 0 };
  const end = { x: width - 1, y: height - 1 };

  const [maze, setMaze] = useState([]);
  const [dfsState, setDfsState] = useState(null); 
  const [decision, setDecision] = useState('');

  useEffect(() => {
    generateNewMaze();
    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, []);

  const generateNewMaze = () => {
    const newMaze = generatePrimMaze(width, height);
    setMaze(newMaze);
    setDfsState(initializeDFS(start)); // Initialize DFS state
    setDecision('');
  };

  const handleKeyPress = (event) => {
    if (event.code === 'KeyD' && dfsState && !dfsState.isFinished) {
      takeDfsStep();
    }
  };

  const takeDfsStep = () => {
    if (dfsState && !dfsState.isFinished) {
      const newState = dfsStep(dfsState, maze, directions, end);
      setDfsState(newState);
      setDecision(newState.decision);
    }
  };

  return (
    <div className="maze-container">
      <div className="maze-wrapper">
        <button onClick={generateNewMaze} className="regenerate-button">
          Generate New Maze
        </button>
        <div className="decision-display">
          <h4>{decision}</h4>
        </div>
        <div className="maze-grid">
          {maze.length > 0 &&
            maze.flatMap((row, rowIndex) =>
              row.map((cell, colIndex) => (
                <div
                  key={`${rowIndex}-${colIndex}`}
                  className={`maze-cell ${cell === 1 ? 'wall' : 'path'} ${
                    dfsState && dfsState.playerPosition && dfsState.playerPosition.x === colIndex && dfsState.playerPosition.y === rowIndex
                      ? 'player'
                      : ''
                  } ${start.x === colIndex && start.y === rowIndex ? 'start-point' : ''} ${
                    end.x === colIndex && end.y === rowIndex ? 'end-point' : ''
                  } ${dfsState && dfsState.visited.has(`${colIndex},${rowIndex}`) ? 'visited' : ''} ${
                    dfsState && dfsState.backtrack.some((pos) => pos.x === colIndex && pos.y === rowIndex) ? 'backtrack' : ''
                  }`}
                >
                  {start.x === colIndex && start.y === rowIndex && <span className="start-icon">S</span>}
                  {end.x === colIndex && end.y === rowIndex && <span className="end-icon">E</span>}
                  {dfsState && dfsState.playerPosition && dfsState.playerPosition.x === colIndex && dfsState.playerPosition.y === rowIndex && (
                    <span className="player-icon">😊</span>
                  )}
                </div>
              ))
            )}
        </div>
        <button onClick={takeDfsStep} className="next-step-button" disabled={dfsState?.isFinished}>
          Next Step
        </button>
      </div>
    </div>
  );
};

export default MazeGrid;
