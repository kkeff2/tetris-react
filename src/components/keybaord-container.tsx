import React from "react";
import styled from "styled-components";
import { Game } from "./game";
import { useOnMount } from "../utils/useOnMount";

export const KeyboardContainer = () => {
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
      <Game />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;
