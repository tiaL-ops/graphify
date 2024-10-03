// cycleDetection.js

export const hasCycleUndirectedGraph = (graph) => {
    const visited = new Set();
  
    const dfs = (node, parent) => {
      visited.add(node);
  
      for (let neighbor of graph[node]) {
        if (!visited.has(neighbor)) {
          if (dfs(neighbor, node)) {
            return true;
          }
        } else if (neighbor !== parent) {
          return true; // Cycle detected
        }
      }
  
      return false;
    };
  
    for (let node in graph) {
      if (!visited.has(node)) {
        if (dfs(node, -1)) {
          return true;
        }
      }
    }
  
    return false;
  };
  
  export const hasCycleDirectedGraph = (graph) => {
    const visited = new Set();
    const recursionStack = new Set();
  
    const dfs = (node) => {
      if (recursionStack.has(node)) return true; // Cycle detected
      if (visited.has(node)) return false;
  
      visited.add(node);
      recursionStack.add(node);
  
      for (let neighbor of graph[node]) {
        if (dfs(neighbor)) {
          return true;
        }
      }
  
      recursionStack.delete(node);
      return false;
    };
  
    for (let node in graph) {
      if (dfs(node)) {
        return true; // Cycle detected
      }
    }
  
    return false;
  };
  