import React, { useState } from 'react';
import { generatePrimMaze } from '../algorithms/prims'; // Maze generation logic
import '../styles/MazeGrid.css';

const MazeGrid = () => {
  const width = 9; // Maze width
  const height = 9; // Maze height
  const [maze, setMaze] = useState([]);
  const [showSidebar, setShowSidebar] = useState(true);

  // Generate a maze when the component mounts
  const generateNewMaze = (seed = null) => {
    const newMaze = generatePrimMaze(width, height); 
    setMaze(newMaze);
  };

  // Regenerate the maze on button click
  const handleRegenerate = () => {
    generateNewMaze();
  };

  return (
    <div className="maze-container">
      {showSidebar && (
        <div className="sidebar">
          <h2>Learn Prim's Algorithm</h2>
          <p>
            Prim's Algorithm generates a maze by starting from a random cell,
            adding adjacent walls to a frontier list, and selectively removing
            walls to carve a path through the maze. It ensures every cell is
            reachable from any other cell with no loops.
          </p>
          <button onClick={() => setShowSidebar(false)} className="close-sidebar">
            Close
          </button>
        </div>
      )}
      <div className="maze-wrapper">
        <button onClick={handleRegenerate} className="regenerate-button">
          Generate New Maze
        </button>
        <div className="maze-grid">
          {maze.map((row, rowIndex) => (
            <div key={rowIndex} className="maze-row">
              {row.map((cell, colIndex) => (
                <div
                  key={colIndex}
                  className={`maze-cell ${cell === 1 ? 'wall' : 'path'}`}
                >
                  {cell === 0 && ' '} {/* Optional: Render paths */}
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
