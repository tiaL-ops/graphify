import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { hasCycleUndirectedGraph } from '../algorithms/cycleDetection';
const UndirectedGraph = () => {
  const svgRef = useRef();

  useEffect(() => {
    const width = 500;
    const height = 400;

    const graphData = generateGraph(5);

    // Clear previous SVG content
    d3.select(svgRef.current).selectAll("*").remove();

    // Create an SVG container
    const svg = d3.select(svgRef.current)
      .attr("width", width)
      .attr("height", height);

    // Set up the force simulation
    const simulation = d3.forceSimulation(graphData.nodes)
      .force("link", d3.forceLink(graphData.edges).distance(100).strength(1))
      .force("charge", d3.forceManyBody().strength(-400))
      .force("center", d3.forceCenter(width / 2, height / 2));

    // Add links (edges)
    const link = svg.append("g")
      .selectAll("line")
      .data(graphData.edges)
      .enter().append("line")
      .attr("stroke", "#999")
      .attr("stroke-width", 2);

    // Add nodes
    const node = svg.append("g")
      .selectAll("circle")
      .data(graphData.nodes)
      .enter().append("circle")
      .attr("r", 10)
      .attr("fill", "#69b3a2");

    // Add node labels
    const label = svg.append("g")
      .selectAll("text")
      .data(graphData.nodes)
      .enter().append("text")
      .attr("dy", ".35em")
      .attr("text-anchor", "middle")
      .text(d => d.id);

    // Update simulation on every tick
    simulation.on("tick", () => {
      link
        .attr("x1", d => d.source.x)
        .attr("y1", d => d.source.y)
        .attr("x2", d => d.target.x)
        .attr("y2", d => d.target.y);

      node
        .attr("cx", d => d.x)
        .attr("cy", d => d.y);

      label
        .attr("x", d => d.x)
        .attr("y", d => d.y);
    });

    // Run cycle detection and color back edges
    if (hasCycleUndirectedGraph(createAdjacencyList(graphData.edges))) {
      // Identify back edges and color them red
      graphData.edges.forEach(edge => {
        if (isBackEdge(graphData, edge)) {
          svg.selectAll("line")
            .filter(d => d === edge)
            .attr("stroke", "red");
        }
      });
    }

  }, []);

  const generateGraph = (numNodes) => {
    // Generate nodes
    const nodes = Array.from({ length: numNodes }, (_, i) => ({ id: i }));

    // Randomly generate edges
    const edges = [];
    for (let i = 0; i < numNodes - 1; i++) {
      edges.push({ source: i, target: i + 1 }); 
    }
    // Add a random back edge to introduce a cycle
    edges.push({ source: 0, target: Math.floor(Math.random() * (numNodes - 1)) + 1 });

    return { nodes, edges };
  };

  const createAdjacencyList = (edges) => {
    const adjList = {};
    edges.forEach(({ source, target }) => {
      if (!adjList[source]) adjList[source] = [];
      if (!adjList[target]) adjList[target] = [];
      adjList[source].push(target);
      adjList[target].push(source);
    });
    return adjList;
  };

  const isBackEdge = (graphData, edge) => {
    const { source, target } = edge;
    // In cycle detection, back edges are detected when you revisit a node
    // that has already been visited, but is not the parent node.
    return true; 
  };

  return (
    <div>
      <h2>Undirected Graph</h2>
      <svg ref={svgRef}></svg>
    </div>
  );
};

export default UndirectedGraph;
