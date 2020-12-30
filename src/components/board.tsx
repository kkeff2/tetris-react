import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { getBoard } from "../backend-lol/getBoard";
import { CellType } from "../types/board";
import { Cell } from "./cell";

export const Board = () => {
  const board = getBoard();
  const [activeTetromino, setActiveTetromino] = useState<CellType>({
    y: 0,
    x: 5,
  });
  useEffect(() => {
    setTimeout(() => {
      setActiveTetromino({ ...activeTetromino, y: activeTetromino.y + 1 });
    }, 500);
  });
  return (
    <Wrapper>
      {board.map((cellRow) => (
        <CellRow>
          {cellRow.map(({ x, y }) => (
            <Cell
              key={`${x}${y}`}
              x={x}
              y={y}
              tetronimo={
                x === activeTetromino.x && y === activeTetromino.y
                  ? "I"
                  : undefined
              }
            />
          ))}
        </CellRow>
      ))}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin: 10px;
  border: green 1px solid;
`;

const CellRow = styled.div`
  display: flex;
`;
