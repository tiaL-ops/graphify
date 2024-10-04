import React, { useState } from 'react';
import GraphVisualization from './GraphVisualization';

const UndirectedGraph = () => {
  const [graphData, setGraphData] = useState(generateGraph(5));

  function generateGraph(numNodes) {
    const nodes = Array.from({ length: numNodes }, (_, i) => ({ id: i }));
    const edges = [];

   
    for (let i = 0; i < numNodes - 1; i++) {
      edges.push({ source: i, target: i + 1 });
    }

    edges.push({ source: 0, target: Math.floor(Math.random() * (numNodes - 1)) + 1 });

    return { nodes, edges };
  }

  return (
    <div>
      <h2>Undirected Graph Cycle Detection</h2>
      <GraphVisualization graphData={graphData} />
      <button onClick={() => setGraphData(generateGraph(5))}>Regenerate Graph</button>
    </div>
  );
};

export default UndirectedGraph;
