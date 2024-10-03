import React, { useState } from 'react';
import ButtonGroup from './ButtonGroup'; 
import UndirectedGraph from './UndirectedGraph'; 
import DirectedGraph from './DirectedGraph'; 
import '../styles/CycleDetection.css'; 

const CycleDetection = () => {
  const [graphType, setGraphType] = useState('undirected'); 

  const handleGraphToggle = (type) => {
    setGraphType(type);
  };

  return (
    <div className="cycle-detection">
      <h1>Cycle Detection Algorithm</h1>
      <p>Select the type of graph to visualize the cycle detection algorithm:</p>

      <ButtonGroup onToggle={handleGraphToggle} />

      <div className="graph-visualization">
        {graphType === 'undirected' ? (
          <UndirectedGraph />
        ) : (
          <DirectedGraph />
        )}
      </div>
    </div>
  );
};

export default CycleDetection;
