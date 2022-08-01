import React, { useEffect, useState } from "react";
import "./App.css";
import Board from "./components/Board";
import Keyboard from "./components/Keyboard";
import ModalMessage from "./components/ModalMessage";
import words from "./data/words";

const letters = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
];

function App() {
  const [col, setCol] = useState(0);
  const [row, setRow] = useState(0);
  const [solution, setSolution] = useState("");
  const [gameWon, setGameWon] = useState(false);
  const [gameLost, setGameLost] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [board, setBoard] = useState([
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
  ]);

  const [boardTiles, setBoardTiles] = useState([
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
  ]);

  const gameEnded = () => {
    if (gameWon || gameLost) {
      return true;
    }
    return false;
  };

  const handleLetter = (letter: string) => {
    let tempBoard = [...board];
    if (col === 5) {
      return;
    }

    tempBoard[row][col] = letter;
    setBoard(tempBoard);

    setCol(col + 1);
  };

  const handleEnter = () => {
    if (col === 5) {
      let answer = board[row].join("");
      let tempBoardTiles = boardTiles;

      if (!words.includes(answer)) {
        setModalMessage((pS) => {
          return "Not in word list";
        });
        return;
      }

      for (let i = 0; i < 5; i++) {
        if (answer[i] === solution[i]) {
          tempBoardTiles[row][i] = "correct";
        } else if (solution.includes(answer[i])) {
          tempBoardTiles[row][i] = "present";
        } else {
          tempBoardTiles[row][i] = "not-present";
        }
      }
      setBoardTiles(tempBoardTiles);

      if (answer === solution) {
        if (row === 0) {
          setModalMessage(
            `Well played, you guessed the word on 1<sup>st</sup> try!`
          );
        } else {
          setModalMessage(
            `Well played, you guessed the word in ${row + 1} tries!`
          );
        }

        setGameWon(true);
      }

      if (row === 5 && answer !== solution) {
        setModalMessage("Unfortunately, you lose. Try again!");
        setGameLost(true);
      }

      setRow(row + 1);
      setCol(0);
    }
    if (col < 5) {
      setModalMessage("Not enough letters");
    }
  };

  const handleBackspace = () => {
    let tempBoard = [...board];
    if (col === 0) {
      return;
    } else {
      tempBoard[row][col - 1] = "";
      setBoard(tempBoard);
      setCol(col - 1);
    }
  };

  const onKeyDown = (event: any) => {
    const key = event.key;
    handleKey(key);
  };

  const handleKey = (key: string) => {
    if (gameEnded()) {
      return;
    }
    if (letters.includes(key.toUpperCase())) {
      handleLetter(key.toLowerCase());
    }
    if (key === "Enter") {
      handleEnter();
    }
    if (key === "Backspace") {
      handleBackspace();
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [row, col]);

  useEffect(() => {
    setSolution(words[Math.floor(Math.random() * words.length)]);
  }, []);

  return (
    <>
      <nav>
        <h1>WORDLE</h1>
      </nav>
      <main>
        <Board board={board} boardTiles={boardTiles}></Board>
        <Keyboard
          board={board}
          boardTiles={boardTiles}
          row={row}
          handleKey={handleKey}
        ></Keyboard>
        <ModalMessage
          message={modalMessage}
          setMessage={setModalMessage}
          guess={row}
        ></ModalMessage>
      </main>
      {console.log(solution)}
    </>
  );
}

export default App;
