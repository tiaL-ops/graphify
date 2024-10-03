import React, { useState, useEffect } from 'react';
import { generatePrimMaze } from '../algorithms/prims';
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
  const [maze, setMaze] = useState([]);
  const [playerPosition, setPlayerPosition] = useState({ x: 0, y: 0 });
  const [visited, setVisited] = useState(new Set());
  const [stack, setStack] = useState([]);
  const [backtrack, setBacktrack] = useState([]);
  const [decision, setDecision] = useState('');
  const [isFinished, setIsFinished] = useState(false);

  const start = { x: 0, y: 0 };
  const end = { x: width - 1, y: height - 1 };

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
    setPlayerPosition(start);
    setVisited(new Set([`${start.x},${start.y}`]));
    setStack([start]);
    setBacktrack([]);
    setDecision('');
    setIsFinished(false);
  };

  const handleKeyPress = (event) => {
    if (event.code === 'KeyD' && !isFinished) {
      dfsStep();
    }
  };

  const dfsStep = () => {
    setStack((prevStack) => {
      const currentStack = [...prevStack];
      if (currentStack.length === 0) {
        setDecision('DFS completed.');
        setIsFinished(true);
        return [];
      }

      const currentPosition = currentStack.pop();
      const { x, y } = currentPosition;

      setVisited((prev) => new Set([...prev, `${x},${y}`]));
      setPlayerPosition({ x, y });
      setDecision(`Visited (${x},${y})`);

      if (x === end.x && y === end.y) {
        setDecision('DFS completed. Reached the end!');
        setIsFinished(true);
        return [];
      }

      let hasValidMove = false;
      for (const direction of directions) {
        const newX = x + direction.x;
        const newY = y + direction.y;

        if (isValidMove(newX, newY) && !visited.has(`${newX},${newY}`)) {
          currentStack.push({ x: newX, y: newY });
          hasValidMove = true;
        }
      }

      if (!hasValidMove) {
        setBacktrack((prevBacktrack) => [...prevBacktrack, { x, y }]);
        setDecision('No valid moves, backtracking...');
      }

      return currentStack;
    });
  };

  const isValidMove = (x, y) => {
    return x >= 0 && x < width && y >= 0 && y < height && maze[y][x] === 0;
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
          {maze.flatMap((row, rowIndex) =>
            row.map((cell, colIndex) => (
              <div
                key={`${rowIndex}-${colIndex}`}
                className={`maze-cell ${cell === 1 ? 'wall' : 'path'} ${
                  start.x === colIndex && start.y === rowIndex ? 'start-point' : ''
                } ${end.x === colIndex && end.y === rowIndex ? 'end-point' : ''} ${
                  playerPosition.x === colIndex && playerPosition.y === rowIndex ? 'player' : ''
                } ${
                  visited.has(`${colIndex},${rowIndex}`) ? 'visited' : ''
                } ${
                  backtrack.some((pos) => pos.x === colIndex && pos.y === rowIndex)
                    ? 'backtrack'
                    : ''
                }`}
              >
                {start.x === colIndex && start.y === rowIndex && (
                  <span className="start-icon">S</span>
                )}
                {end.x === colIndex && end.y === rowIndex && (
                  <span className="end-icon">E</span>
                )}
                {playerPosition.x === colIndex && playerPosition.y === rowIndex && (
                  <span className="player-icon">😊</span>
                )}
              </div>
            ))
          )}
        </div>
        <button onClick={dfsStep} className="next-step-button" disabled={isFinished}>
          Next Step
        </button>
      </div>
    </div>
  );
};

export default MazeGrid;
