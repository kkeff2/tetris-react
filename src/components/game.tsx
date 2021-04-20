import React, { useEffect, useState } from "react";
import { getInitialBoard } from "../backend-lol/getBoard";
import { BoardType, Tetromino, Direction } from "../types/board";
import { Board } from "./board";
import { getTetroCells, getUpdatedBoard, isChangeAvailible } from "./utils";

export const boardHeight = 20;
export const boardWidth = 10;

export type GameState = {
  x: number;
  y: number;
  tetro: Tetromino;
  direction: Direction;
  board: BoardType;
};

export const Game = () => {
  // TODO: Håll koll på state i en variabel. Som har en räknare av y. Vilken typ.
  // TODO: Borde bara finnas en counter som renderar om om när tiden går ut y timer
  // Hur göra med "sidoevents" knapptryck?

  const isGameActive = true; //State later
  const [state, setState] = useState<GameState>({
    x: 5,
    y: 0,
    tetro: "L",
    direction: "0",
    board: getInitialBoard(boardWidth, boardHeight),
  });

  useEffect(() => {
    // När aktiv uppdateras ska det bara göras med nya y kordinater
    // Board ska alltid uppdateras
    // Om aktiv har åkt "i botten" - ska nästa tetro triggas
    if (isGameActive) {
      setTimeout(() => {
        if (isChangeAvailible({ ...state, y: state.y + 1 })) {
          setState({ ...state, y: state.y + 1 });
        } else {
          setState({
            x: 5,
            y: 0,
            tetro: "L",
            direction: "0",
            board: getUpdatedBoard(state.board, getTetroCells(state)),
          });
        }
      }, 25);
    }
  }, [state]);

  return <Board board={getUpdatedBoard(state.board, getTetroCells(state))} />;
};
