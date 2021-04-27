import React, { useEffect, useMemo, useState } from "react";
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
const level = 1;

export type GameState = {
  // Add current tetro
  // Next tetro
  nextYCount: number;
  activeTetro: Tetro;
  nextTetroType: TetroType;
  board: BoardType;
  isTetroComplete: boolean;
};

const test = getInitialBoard(boardWidth, boardHeight);

export const Game = () => {
  // TODO: Håll koll på state i en variabel. Som har en räknare av y. Vilken typ.
  // TODO: Borde bara finnas en counter som renderar om om när tiden går ut y timer
  // Hur göra med "sidoevents" knapptryck?

  const [isGameActive, setIsGameActive] = useState(true); //State later
  const [count, setCount] = useState(0);

  const [state, setState] = useState<GameState>({
    nextYCount: levels[level],
    activeTetro: getNewTetro(getRandomTetroType()),
    nextTetroType: getRandomTetroType(),
    isTetroComplete: false,
    board: test,
  });

  useEffect(() => {
    console.log("in useeffect");
    if (count === state.nextYCount) {
      if (state.isTetroComplete) {
        setState({
          ...state,
          isTetroComplete: false,
          activeTetro: getNewTetro(state.nextTetroType, state.board),
        });
      } else if (isNextYPossible(state)) {
        console.log("isNextYPossible(state)");
        setState({
          ...state,
          activeTetro: {
            ...state.activeTetro,
            cells: getNextYCells(state.activeTetro.cells),
          },
        });
      } else {
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
    }
  }, [count]);

  const tick = 60;

  useEffect(() => {
    if (isGameActive) {
      sleep(1000 / tick).then(() => {
        const newCount = tick > count ? count + 1 : 0;
        setCount(newCount);
      });
    }
  }, [count]);

  const updatedBoard = useMemo(
    () => getUpdatedBoard(state.board, state.activeTetro.cells),
    [state]
  );

  return (
    <>
      {!isGameActive && <div>GAME OVER</div>}
      <Board board={updatedBoard} />
    </>
  );
};

/**
 * Tick updates state. These states always returnes +1 tick
 */
const sleep = (time: number) =>
  new Promise((resolve) => setTimeout(resolve, time));

const levels: Record<number, number> = {
  1: 5,
};
