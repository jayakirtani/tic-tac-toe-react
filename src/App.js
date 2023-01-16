import { useState } from "react";
import Board from "./Board.js";

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill("")]);
  const [currentMove, setCurrentMove] = useState(0);
  const isXNext = currentMove % 2 === 0;

  function handlePlay(squares) {
    const nextHistory = [...history.slice(0, currentMove + 1), squares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  return (
    <div className="game">
      <div className="game-board">
        <Board
          squares={history[currentMove]}
          isXNext={isXNext}
          onPlay={handlePlay}
        />
      </div>

      <div className="game-info">
        Moves
        {history.map((squares, move) => (
          <div>
            {move === currentMove ? (
              `You are at move ${move}`
            ) : (
              <button key={move} onClick={() => setCurrentMove(move)}>
                {move === 0 ? "Go to start" : `Jump To #${move}`}
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
