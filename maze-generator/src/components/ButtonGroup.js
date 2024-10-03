import React from 'react';
//import './ButtonGroup.css'; // Optional styles for the buttons

const ButtonGroup = ({ onToggle }) => {
  return (
    <div className="button-group">
      <button onClick={() => onToggle('undirected')}>Undirected Graph</button>
      <button onClick={() => onToggle('directed')}>Directed Graph</button>
    </div>
  );
};

export default ButtonGroup;
