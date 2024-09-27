import React, { useState } from 'react';
import '../styles/App.css';  

const MazeGrid = () => {
  const gridSize = 10;
  const [grid] = useState(Array(gridSize).fill().map(() => Array(gridSize).fill(0)));

  return (
    <div className="grid">
      {grid.map((row, rowIndex) => (
        <div key={rowIndex} className="row">
          {row.map((cell, colIndex) => (
            <div key={colIndex} className="cell"></div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default MazeGrid;
