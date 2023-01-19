function calculateWinner(squares) {
  const winnerpossibilities = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let possibility of winnerpossibilities) {
    const [pos1, pos2, pos3] = possibility;
    if (
      squares[pos1] &&
      squares[pos1] === squares[pos2] &&
      squares[pos1] === squares[pos3]
    ) {
      return {
        player: squares[pos1],
        pos: possibility,
      };
    }
  }
  return null;
}

function checkifAllFilled(squares) {
  for (let square of squares) {
    if (square === "") {
      return false;
    }
  }
  return true;
}

export { calculateWinner, checkifAllFilled };
