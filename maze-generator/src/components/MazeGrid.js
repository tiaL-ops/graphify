import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import '../styles/MazeGrid.css';

const MazeGrid = () => {
  const initialMaze = [
    [0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 0, 1, 1, 1, 1, 1, 1, 0],
    [0, 1, 0, 0, 0, 0, 0, 0, 1, 0],
    [0, 1, 1, 1, 1, 1, 1, 0, 1, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
    [1, 1, 1, 1, 1, 1, 1, 0, 1, 0],
    [0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
    [0, 1, 1, 1, 1, 0, 1, 1, 1, 1],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  ];

  const [playerPosition, setPlayerPosition] = useState({ x: 0, y: 0 });

  const handleKeyDown = (e) => {
    let { x, y } = playerPosition;
    if (e.key === 'ArrowUp' && x > 0 && initialMaze[x - 1][y] === 0) {
      x -= 1;
    } else if (e.key === 'ArrowDown' && x < initialMaze.length - 1 && initialMaze[x + 1][y] === 0) {
      x += 1;
    } else if (e.key === 'ArrowLeft' && y > 0 && initialMaze[x][y - 1] === 0) {
      y -= 1;
    } else if (e.key === 'ArrowRight' && y < initialMaze[0].length - 1 && initialMaze[x][y + 1] === 0) {
      y += 1;
    }

    setPlayerPosition({ x, y });
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [playerPosition]);

  return (
    <div className="maze-grid">
      {initialMaze.map((row, rowIndex) => (
        row.map((cell, colIndex) => {
          const isPlayerHere = playerPosition.x === rowIndex && playerPosition.y === colIndex;
          return (
            <div
              key={`${rowIndex}-${colIndex}`}
              className={`maze-cell ${cell === 1 ? 'wall' : 'path'}`}
            >
              {isPlayerHere && (
                <motion.div
                  className="player"
                  initial={false}
                  animate={{
                    x: 0,
                    y: 0,
                  }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  P
                </motion.div>
              )}
            </div>
          );
        })
      ))}
    </div>
  );
};

export default MazeGrid;
