import React, { useEffect, useState } from "react";
import { getInitialBoard } from "../backend-lol/getBoard";
import { BoardType, TetroType, Tetro } from "../types/board";
import { Board } from "./board";
import {
  getNewTetro,
  getNextYCells,
  getRandomTetroType,
  getUpdatedBoard,
  isGameOver,
  isNextYPossible,
} from "./utils";

export const boardHeight = 25;
export const boardWidth = 10;

export type GameState = {
  // Add current tetro
  // Next tetro
  activeTetro: Tetro;
  nextTetroType: TetroType;
  board: BoardType;
  isTetroComplete: boolean;
};

export const Game = () => {
  // TODO: Håll koll på state i en variabel. Som har en räknare av y. Vilken typ.
  // TODO: Borde bara finnas en counter som renderar om om när tiden går ut y timer
  // Hur göra med "sidoevents" knapptryck?

  const [isGameActive, setIsGameActive] = useState(true); //State later
  const [state, setState] = useState<GameState>({
    activeTetro: getNewTetro(getRandomTetroType()),
    nextTetroType: getRandomTetroType(),
    isTetroComplete: false,
    board: getInitialBoard(boardWidth, boardHeight),
  });

  useEffect(() => {
    // När aktiv uppdateras ska det bara göras med nya y kordinater
    // Board ska alltid uppdateras
    // Om aktiv har åkt "i botten" - ska nästa tetro triggas
    if (isGameActive) {
      setTimeout(() => {
        if (state.isTetroComplete) {
          // if() {

          // }
          setState({
            ...state,
            isTetroComplete: false,
            activeTetro: getNewTetro(state.nextTetroType, state.board),
          });
        } else if (isNextYPossible(state)) {
          setState({
            ...state,
            activeTetro: {
              ...state.activeTetro,
              cells: getNextYCells(state.activeTetro.cells),
            },
          });
        } else {
          // Next tetro
          const updatedBoard = getUpdatedBoard(
            state.board,
            state.activeTetro.cells
          );
          if (isGameOver(updatedBoard)) {
            setIsGameActive(false);
          }
          setState({
            ...state,
            isTetroComplete: true,
            board: updatedBoard,
          });
        }
      }, 25);
    }
  }, [state]);

  return (
    <>
      {!isGameActive && <div>GAME OVER</div>}
      <Board board={getUpdatedBoard(state.board, state.activeTetro.cells)} />
    </>
  );
};
