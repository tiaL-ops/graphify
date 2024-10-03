export const BFSIslandTreasure = (width, height) => {
    const INF = 2147483647;
  
    // Initialize the grid
    let grid = Array.from({ length: height }, () =>
      Array.from({ length: width }, () => INF)
    );
  
    // Example setup with treasure chests (0) and water cells (-1)
    const treasureLocations = [];
  
    // Example grid configuration
    grid[0][2] = 0; // Treasure chest at (0, 2)
    grid[3][0] = 0; // Treasure chest at (3, 0)
    grid[1][3] = -1; // Water cell at (1, 3)
    grid[2][1] = -1; // Water cell at (2, 1)
    grid[2][3] = -1; // Water cell at (2, 3)
  
    // Collect treasure chest locations for BFS initialization
    treasureLocations.push({ x: 2, y: 0 });
    treasureLocations.push({ x: 0, y: 3 });
  
    return { grid, treasureLocations };
  };
  