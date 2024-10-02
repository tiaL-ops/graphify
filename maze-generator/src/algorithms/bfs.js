export const bfsMazeSolver = (maze, start, end) => {
    const width = maze[0].length;
    const height = maze.length;
    
    const isValidMove = (x, y) => {
        return x >= 0 && x < width && y >= 0 && y < height && maze[y][x] === 0;
      };
    // Edge case: check if start and end positions are valid
    if (!maze || !maze.length || !isValidMove(start.x, start.y) || !isValidMove(end.x, end.y)) {
      return null; // Invalid maze or start/end point
    }
  
    const queue = [{ ...start, path: [start] }]; 
    const visited = new Set();
    
    const directions = [
      { x: 0, y: -1 }, // Up
      { x: 0, y: 1 },  // Down
      { x: -1, y: 0 }, // Left
      { x: 1, y: 0 },  // Right
    ];
    
   
    
    while (queue.length > 0) {
      const { x, y, path } = queue.shift(); 
      
      if (visited.has(`${x},${y}`)) continue;
      visited.add(`${x},${y}`);
      
      // Check if we reached the end
      if (x === end.x && y === end.y) {
        return path; 
      }
      

      for (const direction of directions) {
        const newX = x + direction.x;
        const newY = y + direction.y;
        
        if (isValidMove(newX, newY) && !visited.has(`${newX},${newY}`)) {
          queue.push({ x: newX, y: newY, path: [...path, { x: newX, y: newY }] });
        }
      }
    }
    
    return null; 
  };
  