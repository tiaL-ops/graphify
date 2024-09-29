export function generatePrimMaze(width, height) {
    // Initialize the grid with walls (1 = wall, 0 = path)
    const maze = [];
    for (let i = 0; i < height; i++) {
      maze[i] = [];
      for (let j = 0; j < width; j++) {
        maze[i][j] = 1; // Initially, fill the maze with walls
      }
    }
  
    // Helper functions
    const getRandomElement = (arr) => arr[Math.floor(Math.random() * arr.length)];
    const isValid = (x, y) => x >= 0 && y >= 0 && x < height && y < width;
  
    // Directions: up, down, left, right (2-cell steps to skip walls)
    const directions = [
      { x: -2, y: 0 }, // Up
      { x: 2, y: 0 },  // Down
      { x: 0, y: -2 }, // Left
      { x: 0, y: 2 },  // Right
    ];
  
    // Pick a random starting cell
    let startX = Math.floor(Math.random() * Math.floor(height / 2)) * 2;
    let startY = Math.floor(Math.random() * Math.floor(width / 2)) * 2;
    maze[startX][startY] = 0; // Mark as path (0)
  
    // Frontier walls list
    let frontier = [];
  
    // Add adjacent walls of the start position to the frontier
    directions.forEach((dir) => {
      const nx = startX + dir.x;
      const ny = startY + dir.y;
      if (isValid(nx, ny)) {
        frontier.push({ x: nx, y: ny, px: startX, py: startY });
      }
    });
  
    // Main loop: process frontier walls
    while (frontier.length > 0) {
      // Pick a random frontier wall
      const wall = getRandomElement(frontier);
      frontier = frontier.filter((w) => w !== wall); // Remove wall from frontier list
  
      const { x, y, px, py } = wall;
  
      // Ensure the wall connects a visited cell with an unvisited cell
      if (maze[x][y] === 1) {
        const midX = (x + px) / 2;
        const midY = (y + py) / 2;
  
        // Convert the wall and adjacent unvisited cell to paths
        maze[x][y] = 0;     // New path
        maze[midX][midY] = 0; // Remove the wall between
  
        // Add the new neighboring walls to the frontier list
        directions.forEach((dir) => {
          const nx = x + dir.x;
          const ny = y + dir.y;
          if (isValid(nx, ny) && maze[nx][ny] === 1) {
            frontier.push({ x: nx, y: ny, px: x, py: y });
          }
        });
      }
    }
  
    return maze;
  }
  