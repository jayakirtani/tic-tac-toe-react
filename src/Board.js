import Square from "./Square.js";
import { calculateWinner, checkifAllFilled } from "./utils.js";

export default function Board({ squares, onPlay, isXNext }) {
  function handleClick(position) {
    // Do nothing when position is already filled
    // or winner has been declared
    if (squares[position] || calculateWinner(squares)) {
      return;
    }
    const updatedSquares = [...squares];
    updatedSquares[position] = isXNext ? "X" : "O";
    onPlay(updatedSquares, position);
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
