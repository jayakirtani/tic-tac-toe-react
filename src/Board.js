import { useState } from "react";
import Square from "./Square.js";

export default function Board() {
  const [isXNext, setIsXNext] = useState(true);
  const [squares, setSquares] = useState(Array(9).fill(""));

  function handleClick(position) {
    // Do nothing when position is already filled
    // or winner has been declared
    if (squares[position] || calculateWinner(squares)) {
      return;
    }

    const updatedSquares = [...squares];
    updatedSquares[position] = isXNext ? "X" : "O";
    setSquares(updatedSquares);
    setIsXNext((n) => !n);
  }

  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next player: " + (isXNext ? "X" : "O");
  }

  return (
    <>
      <div className="status">{status}</div>
      <div className="board-row">
        <Square value={squares[0]} onClick={() => handleClick(0)} />
        <Square value={squares[1]} onClick={() => handleClick(1)} />
        <Square value={squares[2]} onClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onClick={() => handleClick(3)} />
        <Square value={squares[4]} onClick={() => handleClick(4)} />
        <Square value={squares[5]} onClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onClick={() => handleClick(6)} />
        <Square value={squares[7]} onClick={() => handleClick(7)} />
        <Square value={squares[8]} onClick={() => handleClick(8)} />
      </div>
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
    [2, 4, 6]
  ];

  for (let possibility of winnerpossibilities) {
    const [pos1, pos2, pos3] = possibility;
    if (
      squares[pos1] &&
      squares[pos1] === squares[pos2] &&
      squares[pos1] === squares[pos3]
    ) {
      return squares[pos1];
    }
  }
  return null;
}
