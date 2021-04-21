import React from "react";
import styled from "styled-components";
import { BoardType } from "../types/board";
import { Cell } from "./cell";

type Props = {
  board: BoardType;
};

export const BoardComponent = ({ board }: Props) => {
  return (
    <Wrapper>
      {board.map((cellRow, index) => (
        <CellRow key={index} index={index}>
          {cellRow.map(({ x, y, tetro }) => (
            <Cell key={`${x}${y}`} x={x} y={y} tetro={tetro} />
          ))}
        </CellRow>
      ))}
    </Wrapper>
  );
};

const propsAreEqual = (prevProps: Props, nextProps: Props) => {
  return prevProps.board === nextProps.board;
};

export const Board = React.memo(BoardComponent, propsAreEqual);

const Wrapper = styled.div`
  margin: 10px;
  border: green 1px solid;
`;

const CellRow = styled.div`
  display: ${(props: { index: number }) =>
    props.index < 5 ? "none" : "flex"}; ;
`;
