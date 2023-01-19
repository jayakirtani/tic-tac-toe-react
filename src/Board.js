import Square from "./Square.js";

export default function Board({ squares, onPlay, isXNext }) {
  function handleClick(position) {
    // Do nothing when position is already filled
    // or winner has been declared
    if (squares[position] || calculateWinner(squares)) {
      return;
    }
    const updatedSquares = [...squares];
    updatedSquares[position] = isXNext ? "X" : "O";
    onPlay(updatedSquares);
  }

  const winner = calculateWinner(squares);
  const allFilled = checkifAllFilled(squares);
  let status;
  if (winner) {
    status = "Winner: " + winner.player;
  } else if (allFilled) {
    status = "Game Draw";
  } else {
    status = "Next player: " + (isXNext ? "X" : "O");
  }

  return (
    <>
      <div className="status">{status}</div>
      {Array(3)
        .fill("")
        .map((c, i) => {
          return (
            <div className="board-row" key={i}>
              {Array(3)
                .fill()
                .map((c, j) => {
                  const pos = i * 3 + j;
                  return (
                    <Square
                      key={pos}
                      highlight={winner?.pos.includes(pos)}
                      value={squares[pos]}
                      onClick={() => handleClick(pos)}
                    />
                  );
                })}
            </div>
          );
        })}
    </>
  );
}

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
