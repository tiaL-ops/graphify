// dfs.js

export const initializeDFS = (start) => {
  return {
    stack: [start],
    visited: new Set([`${start.x},${start.y}`]),
    backtrack: [],
    isFinished: false,
  };
};

export const dfsStep = (state, maze, directions, end) => {
  const { stack, visited, backtrack } = state;

  if (stack.length === 0) {
    return {
      ...state,
      decision: 'DFS completed.',
      isFinished: true,
    };
  }

  const currentPosition = stack.pop();
  const { x, y } = currentPosition;

  visited.add(`${x},${y}`);

  if (x === end.x && y === end.y) {
    return {
      ...state,
      decision: 'DFS completed. Reached the end!',
      isFinished: true,
      stack: [],
    };
  }

  let hasValidMove = false;
  for (const direction of directions) {
    const newX = x + direction.x;
    const newY = y + direction.y;

    if (isValidMove(newX, newY, maze, visited)) {
      stack.push({ x: newX, y: newY });
      hasValidMove = true;
    }
  }

  if (!hasValidMove) {
    backtrack.push({ x, y });
    return {
      ...state,
      decision: 'No valid moves, backtracking...',
    };
  }

  return {
    ...state,
    stack,
    visited,
    decision: `Visited (${x},${y})`,
    playerPosition: { x, y },
  };
};

const isValidMove = (x, y, maze, visited) => {
  return x >= 0 && x < maze[0].length && y >= 0 && y < maze.length && maze[y][x] === 0 && !visited.has(`${x},${y}`);
};
