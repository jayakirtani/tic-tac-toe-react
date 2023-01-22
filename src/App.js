import { useState } from "react";
import Board from "./Board.js";

export default function Game() {
  const [history, setHistory] = useState([
    {
      data: Array(9).fill(""),
      pos: "",
    },
  ]);
  const [currentMove, setCurrentMove] = useState(0);
  const [toggle, setToggle] = useState(false);
  const isXNext = currentMove % 2 === 0;

  function toggleMoves() {
    setToggle((t) => !t);
  }

  function handlePlay(squares, position) {
    const nextHistory = [
      ...history.slice(0, currentMove + 1),
      { data: squares, pos: position },
    ];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  return (
    <div className="game">
      <div className="game-board">
        <Board
          squares={history[currentMove].data}
          isXNext={isXNext}
          onPlay={handlePlay}
        />
      </div>

      <div className="game-info">
        Moves
        <button onClick={toggleMoves}>Toggle Moves </button>
        <hr />
        {history.map((squares, originalMove) => {
          const move = toggle
            ? history.length - 1 - originalMove
            : originalMove;
          const colRow = `${parseInt(squares.pos / 3)}, ${squares.pos % 3}`;
          return (
            <div>
              {move === currentMove ? (
                `You are at move #${move} (${colRow})`
              ) : (
                <button
                  key={`move${move}`}
                  onClick={() => setCurrentMove(move)}
                >
                  {move === 0 ? "Go to start" : `Jump To #${move} (${colRow})`}
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
