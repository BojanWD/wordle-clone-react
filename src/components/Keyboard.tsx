import React, { useEffect, useState } from "react";
import { BsBackspace } from "react-icons/bs";

const topRowKeys = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"];
const middleRowKeys = ["A", "S", "D", "F", "G", "H", "J", "K", "L"];
const bottomRowKeys = ["Z", "X", "C", "V", "B", "N", "M"];

function Keyboard({
  board,
  boardTiles,
  row,
  handleKey,
}: {
  board: string[][];
  boardTiles: string[][];
  row: number;
  handleKey: Function;
}) {
  const [keyColors, setKeyColors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    let tempColors = { ...keyColors };
    for (let i = 0; i < 5; i++) {
      for (let i2 = 0; i2 < 6; i2++) {
        if (board[i][i2]) {
          if (board[i][i2] in tempColors) {
            if (boardTiles[i][i2] === "correct") {
              tempColors[board[i][i2]] = "correct";
            } else if (boardTiles[i][i2] === "present") {
              if (tempColors[board[i][i2]] === "correct") {
                continue;
              } else {
                tempColors[board[i][i2]] = "present";
              }
            } else if (boardTiles[i][i2] === "not-present") {
              tempColors[board[i][i2]] = "not-present";
            }
          } else {
            tempColors[board[i][i2]] = boardTiles[i][i2];
          }
        }
      }
    }
    setKeyColors(tempColors);
  }, [row]);

  return (
    <section className="keyboard">
      <div className="keyboard-row">
        {topRowKeys.map((el: string) => {
          return (
            <div
              className={
                el.toLowerCase() in keyColors
                  ? `key ${keyColors[el.toLowerCase()]} `
                  : "key"
              }
              key={el}
              onClick={() => handleKey(el)}
            >
              {el}
            </div>
          );
        })}
      </div>
      <div className="keyboard-row">
        <div className="key-half"></div>
        {middleRowKeys.map((el: string) => {
          return (
            <div
              className={
                el.toLowerCase() in keyColors
                  ? `key ${keyColors[el.toLowerCase()]} `
                  : "key"
              }
              key={el}
              onClick={() => handleKey(el)}
            >
              {el}
            </div>
          );
        })}
        <div className="key-half"></div>
      </div>
      <div className="keyboard-row">
        <div className="enter-backspace key" onClick={() => handleKey("Enter")}>
          ENTER
        </div>
        {bottomRowKeys.map((el: string) => {
          return (
            <div
              className={
                el.toLowerCase() in keyColors
                  ? `key ${keyColors[el.toLowerCase()]} `
                  : "key"
              }
              key={el}
              onClick={() => handleKey(el)}
            >
              {el}
            </div>
          );
        })}
        <div
          className="enter-backspace key"
          onClick={() => handleKey("Backspace")}
        >
          <BsBackspace className="bs-icon" />
        </div>
      </div>
    </section>
  );
}

export default Keyboard;
