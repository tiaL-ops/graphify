import React, { useState, useEffect } from 'react';
import { generatePrimMaze } from '../algorithms/prims'; 
import '../styles/MazeGrid.css';

const MazeGrid = () => {
  const width = 9; 
  const height = 9; 
  const [maze, setMaze] = useState([]);
  const [playerPosition, setPlayerPosition] = useState({ x: 0, y: 0 }); 
  const [showSidebar, setShowSidebar] = useState(true);

  // Generate a maze when the component mounts
  useEffect(() => {
    generateNewMaze();
  }, []);

  const generateNewMaze = (seed = null) => {
    const newMaze = generatePrimMaze(width, height); 
    setMaze(newMaze);
    setPlayerPosition({ x: 0, y: 0 }); 
  };

 
  // Handle player movement
const handleKeyPress = (event) => {
  const { x, y } = playerPosition;
  let newPosition = { x, y };

  if (event.key === 'ArrowUp' || event.key === 'w') {
    newPosition = { x, y: y - 1 }; 
    console.log('up', newPosition);
  } else if (event.key === 'ArrowDown' || event.key === 's') {
    newPosition = { x, y: y + 1 }; 
    console.log('down', newPosition);
  } else if (event.key === 'ArrowLeft' || event.key === 'a') {
    newPosition = { x: x - 1, y }; 
    console.log('left', newPosition);
  } else if (event.key === 'ArrowRight' || event.key === 'd') {
    newPosition = { x: x + 1, y };
    console.log('right', newPosition);
  }

  // Check if the new position is valid (not a wall and within bounds)
  if (
    newPosition.x >= 0 &&
    newPosition.x < width &&
    newPosition.y >= 0 &&
    newPosition.y < height &&
    maze[newPosition.y][newPosition.x] === 0 
  ) {
    setPlayerPosition(newPosition); 
  }
};


  
  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);

   
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [playerPosition, maze]);

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
        <button onClick={generateNewMaze} className="regenerate-button">
          Generate New Maze
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
                  {/* Optional: Render the player */}
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
