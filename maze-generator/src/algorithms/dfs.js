
export const dfsMazeSolver = (maze, start, end) => {
    const width = maze[0].length;
    const height = maze.length;
    const stack = [start]; 
    const visited = new Set(); 
    const path = []; 
    const backtrack = []; 
  
    const directions = [
      { x: 0, y: -1 }, // Up
      { x: 0, y: 1 },  // Down
      { x: -1, y: 0 }, // Left
      { x: 1, y: 0 },  // Right
    ];
  
    const isValidMove = (x, y) => {
      return x >= 0 && x < width && y >= 0 && y < height && maze[y][x] === 0;
    };
  
    while (stack.length > 0) {
      const { x, y } = stack.pop();
  
      if (visited.has(`${x},${y}`)) continue;
      visited.add(`${x},${y}`);
      path.push({ x, y });
  
      // Check if we reached the end
      if (x === end.x && y === end.y) {
        return { path, backtrack };
      }
  
      // Add valid neighboring nodes to the stack
      for (const direction of directions) {
        const newX = x + direction.x;
        const newY = y + direction.y;
  
        if (isValidMove(newX, newY) && !visited.has(`${newX},${newY}`)) {
          stack.push({ x: newX, y: newY });
        }
      }
  
      // Backtracking step for visualization
      if (stack.length === 0 || stack[stack.length - 1].x !== end.x || stack[stack.length - 1].y !== end.y) {
        backtrack.push({ x, y });
      }
    }
  
    return { path, backtrack }; // If no path is found, return empty arrays
  };
  