import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { getInitialBoard } from "../backend-lol/getBoard";
import { CellType, BoardType, Tetromino } from "../types/board";
import { Cell } from "./cell";

export const boardHeight = 20;
export const boardWidth = 10;

type ActiveTetromino = { type: Tetromino; listOfCells: CellType[] };

export const Board = () => {
  const isGameActive = true; //State later
  const [activeTetromino, setActiveTetromino] = useState<ActiveTetromino>({
    type: "I",
    listOfCells: [{ y: 0, x: 5 }],
  });
  const [board, setBoard] = useState(
    getUpdatedBoard(getInitialBoard(boardWidth, boardHeight), activeTetromino)
  );

  // const onTeterinoTimeout = useCallback();

  const onBoardUpdate = useCallback((newBoard: BoardType) => {
    debugger;
    setBoard([...newBoard]);
  }, []);

  useEffect(() => {
    // När aktiv uppdateras ska det bara göras med nya y kordinater
    // Board ska alltid uppdateras
    // Om aktiv har åkt "i botten" - ska nästa tetro triggas
    if (isGameActive) {
      setTimeout(() => {
        debugger;
        if (isNextAvailible(board, activeTetromino)) {
          const newTetromino = getUpdatedActiveTetromino(activeTetromino);
          setActiveTetromino(newTetromino);
          onBoardUpdate(getUpdatedBoard(board, activeTetromino, newTetromino));
        } else {
          // Trigger new tetro
        }
      }, 500);
    }
  });

  console.log("+++++ THE BAORD", board);
  return (
    <Wrapper>
      {board.map((cellRow) => (
        <CellRow>
          {cellRow.map(({ x, y, tetromino }) => (
            <Cell key={`${x}${y}`} x={x} y={y} tetronimo={tetromino} />
          ))}
        </CellRow>
      ))}
    </Wrapper>
  );
};

const isNextAvailible = (
  board: BoardType,
  activeTetromino: ActiveTetromino
) => {
  return activeTetromino.listOfCells.some(
    (t) => !board[t.y + 1][t.x].tetromino || t.y > boardHeight
  );
};

const getUpdatedBoard = (
  board: BoardType,
  newActiveTetromino: ActiveTetromino,
  oldActiveTetromino?: ActiveTetromino
) => {
  const newBoard = [...board];
  if (oldActiveTetromino) {
    oldActiveTetromino.listOfCells.forEach(
      ({ y, x }) => (newBoard[y][x] = { x, y })
    );
  }
  newActiveTetromino.listOfCells.forEach(
    ({ y, x }) =>
      (newBoard[y][x] = { x, y, tetromino: newActiveTetromino.type })
  );
  return newBoard;
};

const getUpdatedActiveTetromino = (activeTetromino: ActiveTetromino) => {
  return {
    ...activeTetromino,
    listOfCells: activeTetromino.listOfCells.map((t) => ({
      ...t,
      y: t.y + 1,
    })),
  };
};

const Wrapper = styled.div`
  margin: 10px;
  border: green 1px solid;
`;

const CellRow = styled.div`
  display: flex;
`;
