import React from 'react';
import { hasCycleDirectedGraph } from '../algorithms/cycleDetection'; // Import the cycle detection logic

const DirectedGraph = () => {
  // Example graph data for directed graph
  const graph = {
    0: [1],
    1: [2],
    2: [0],
    3: [4],
    4: []
  };

  const cycleExists = hasCycleDirectedGraph(graph);

  return (
    <div className="directed-graph">
      <h2>Directed Graph</h2>
      <p>{cycleExists ? 'Cycle Detected!' : 'No Cycle Detected.'}</p>
      {/* Render graph visualization here */}
    </div>
  );
};

export default DirectedGraph;
