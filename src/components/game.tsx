import React from "react";
import styled from "styled-components";
import { Board } from "./board";
import { useOnMount } from "../utils/useOnMount";

export const Game = () => {
  const onKeyDown = ({ code }: KeyboardEvent) => {
    switch (code) {
      case "Space":
        console.log("Space");
        break;
      case "ArrowRight":
        console.log("ArrowRight");
        break;
      case "ArrowLeft":
        console.log("ArrowLeft");
        break;
      case "ArrowUp":
        console.log("ArrowUp");
        break;
    }
  };
  useOnMount(() => {
    window.addEventListener<"keydown">("keydown", onKeyDown);
  });
  return (
    <Wrapper>
      <h1>Tetris</h1>
      <Board />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;
