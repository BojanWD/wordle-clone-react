import React from "react";

function Board({
  board,
  boardTiles,
}: {
  board: string[][];
  boardTiles: string[][];
}) {
  //   const board = [
  //     ["", "", "", "", ""],
  //     ["", "", "", "", ""],
  //     ["", "", "", "", ""],
  //     ["", "", "", "", ""],
  //     ["", "", "", "", ""],
  //     ["", "", "", "", ""],
  //   ];
  return (
    <section className="board-container">
      <div className="board">
        {board.map((row: string[], i) => {
          return (
            <div className="row" key={i}>
              {row.map((letter: string, i2) => {
                return (
                  <div className={`${boardTiles[i][i2]} tile`} key={i2}>
                    {letter}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default Board;
