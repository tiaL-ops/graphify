import React, { useState, useEffect, useRef } from 'react';
import { generatePrimMaze } from '../algorithms/prims';
import { dfsMazeSolver } from '../algorithms/dfs';
import '../styles/MazeGrid.css';

const MazeGrid = () => {
  const width = 9;
  const height = 9;
  const [maze, setMaze] = useState([]);
  const [playerPosition, setPlayerPosition] = useState({ x: 0, y: 0 });
  const [showSidebar, setShowSidebar] = useState(true);
  const [dfsPath, setDfsPath] = useState([]);
  const [dfsBacktrack, setDfsBacktrack] = useState([]);
  const [solving, setSolving] = useState(false); // DFS animation control
  const [step, setStep] = useState(0); // Control current step in DFS
  const animationRef = useRef(null);

  // Generate a maze when the component mounts
  useEffect(() => {
    generateNewMaze();
  }, []);

  const generateNewMaze = () => {
    const newMaze = generatePrimMaze(width, height);
    setMaze(newMaze);
    setPlayerPosition({ x: 0, y: 0 });
    setDfsPath([]);
    setDfsBacktrack([]);
    setStep(0);
    setSolving(false);
    if (animationRef.current) cancelAnimationFrame(animationRef.current);
  };

  // DFS solve the maze
  const startDfs = () => {
    const result = dfsMazeSolver(maze, { x: 0, y: 0 }, { x: width - 1, y: height - 1 });
    setDfsPath(result.path);
    setDfsBacktrack(result.backtrack);
    setStep(0);
    setSolving(true);
  };

  // Play/Pause DFS animation
  const toggleSolving = () => {
    setSolving(!solving);
  };

  // DFS visualization with step-by-step animation
  useEffect(() => {
    if (solving && step < dfsPath.length) {
      const animateStep = () => {
        setPlayerPosition(dfsPath[step]);
        setStep((prevStep) => prevStep + 1);
        animationRef.current = requestAnimationFrame(animateStep);
      };
      animationRef.current = requestAnimationFrame(animateStep);
    } else if (solving && step >= dfsPath.length && step < dfsPath.length + dfsBacktrack.length) {
      const animateBacktrack = () => {
        setPlayerPosition(dfsBacktrack[step - dfsPath.length]);
        setStep((prevStep) => prevStep + 1);
        animationRef.current = requestAnimationFrame(animateBacktrack);
      };
      animationRef.current = requestAnimationFrame(animateBacktrack);
    } else {
      cancelAnimationFrame(animationRef.current);
    }
    return () => cancelAnimationFrame(animationRef.current);
  }, [solving, step, dfsPath, dfsBacktrack]);

  return (
    <div className="maze-container">
      {showSidebar && (
        <div className="sidebar">
          <h2>Learn DFS Algorithm</h2>
          <p>
            Depth-First Search (DFS) explores as far as possible along a branch before backtracking.
            It's useful for exploring all possible paths, but it doesn't guarantee the shortest path.
          </p>
          <button onClick={() => setShowSidebar(false)} className="close-sidebar">
            Close
          </button>
        </div>
      )}
      <div className="maze-wrapper">
        <button onClick={generateNewMaze} className="regenerate-button">
          Generate New Maze
        </button>
        <button onClick={startDfs} className="dfs-button">
          Start DFS
        </button>
        <button onClick={toggleSolving} className="play-pause-button">
          {solving ? 'Pause' : 'Play'}
        </button>
        <div className="maze-grid">
          {maze.map((row, rowIndex) => (
            <div key={rowIndex} className="maze-row">
              {row.map((cell, colIndex) => (
                <div
                  key={colIndex}
                  className={`maze-cell ${cell === 1 ? 'wall' : 'path'} ${
                    playerPosition.x === colIndex && playerPosition.y === rowIndex ? 'player' : ''
                  }`}
                >
                  {playerPosition.x === colIndex && playerPosition.y === rowIndex && (
                    <span className="player-icon">😊</span>
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MazeGrid;
