import React, { useEffect } from "react";
import styled from "styled-components";
import { Tetromino } from "../types/board";

interface Props {
  x: number;
  y: number;
  tetronimo?: Tetromino;
}

export const Cell = ({ x, y, tetronimo }: Props) => {
  useEffect(() => {
    console.log("updated: ", `x: ${x} y:${y}`);
  });
  return <Wrapper tetronimo={tetronimo}>{`x: ${x} y:${y}`}</Wrapper>;
};

const Wrapper = styled.div`
  border: 1px solid black;
  background: ${({ tetronimo }: { tetronimo?: Tetromino }) =>
    tetronimo ? "red" : "white"};
  height: 50px;
  width: 50px;
  color: rgba(0, 0, 0, 0.2);
`;
