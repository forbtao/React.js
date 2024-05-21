import React, { useState } from "react";
import './App.css';

const App = () => {
  const [player, setPlayer] = useState("X");
  const [board, setBoard] = useState(Array(9).fill(""));
  const [winner, setWinner] = useState("");

  const handleClick = (index) => {
    if (winner || board[index] !== "") {
      return;
    }

    const newBoard = [...board];
    newBoard[index] = player;
    setBoard(newBoard);

    const newPlayer = player === "X" ? "O" : "X";
    setPlayer(newPlayer);

    checkWinner(newBoard);
  };

  const checkWinner = (board) => {
    const winningLines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < winningLines.length; i++) {
      const [a, b, c] = winningLines[i];
      if (board[a] && board[a] === board[b] && board[b] === board[c]) {
        setWinner(board[a]);
        return;
      }
    }
  };

  const resetGame = () => {
    setPlayer("X");
    setBoard(Array(9).fill(""));
    setWinner("");
  };

  const renderSquare = (index) => {
    return (
      <button className="square" onClick={() => handleClick(index)}>
        {board[index]}
      </button>
    );
  };

  const renderBoard = () => {
    return (
      <div className="board">
        {board.map((value, index) => {
          return <React.Fragment key={index}>{renderSquare(index)}</React.Fragment>;
        })}
      </div>
    );
  };

  const renderStatus = () => {
    if (winner) {
      return <div className="status">Победитель: {winner}</div>;
    } else {
      return <div className="status">Следующий ход: {player}</div>;
    }
  };

  return (
    <div className="game">
      <h1>Крестики-нолики</h1>
      {renderStatus()}
      {renderBoard()}
      {winner && <button onClick={resetGame}>Начать заново</button>}
    </div>
  );
};

export default App;