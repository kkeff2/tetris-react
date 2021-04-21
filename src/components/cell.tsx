import React from "react";
import styled from "styled-components";
import { TetroType } from "../types/board";

interface Props {
  x: number;
  y: number;
  tetro?: TetroType;
}

const CellComponent = ({ x, y, tetro }: Props) => {
  // useEffect(() => {
  //   console.log("updated: ", `x: ${x} y:${y} tetro: ${tetronimo}`);
  // });
  return <Wrapper tetronimo={tetro}>{`x: ${x} y:${y}`}</Wrapper>;
};

const propsAreEqual = (prevProps: Props, nextProps: Props) => {
  return prevProps.tetro === nextProps.tetro;
};

export const Cell = React.memo(CellComponent, propsAreEqual);

const Wrapper = styled.div`
  font-size: 12px;
  border: 1px solid black;
  background: ${({ tetronimo }: { tetronimo?: TetroType }) =>
    tetronimo ? "red" : "white"};
  height: 30px;
  width: 30px;
  color: rgba(0, 0, 0, 0.2);
`;
