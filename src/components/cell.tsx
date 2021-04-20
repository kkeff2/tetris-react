import React from "react";
import styled from "styled-components";
import { Tetromino } from "../types/board";

interface Props {
  x: number;
  y: number;
  tetronimo?: Tetromino;
}

const CellComponent = ({ x, y, tetronimo }: Props) => {
  // useEffect(() => {
  //   console.log("updated: ", `x: ${x} y:${y} tetro: ${tetronimo}`);
  // });
  return <Wrapper tetronimo={tetronimo}>{`x: ${x} y:${y}`}</Wrapper>;
};

const propsAreEqual = (prevProps: Props, nextProps: Props) => {
  return prevProps.tetronimo === nextProps.tetronimo;
};

export const Cell = React.memo(CellComponent, propsAreEqual);

const Wrapper = styled.div`
  font-size: 12px;
  border: 1px solid black;
  background: ${({ tetronimo }: { tetronimo?: Tetromino }) =>
    tetronimo ? "red" : "white"};
  height: 30px;
  width: 30px;
  color: rgba(0, 0, 0, 0.2);
`;
