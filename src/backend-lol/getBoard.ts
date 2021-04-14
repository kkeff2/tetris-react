import { CellType } from "../types/board";

export const getInitialBoard = (
  width: number,
  height: number
): CellType[][] => {
  const board: CellType[][] = [];
  for (let y = 0; y < height; y++) {
    const row: CellType[] = [];
    for (let x = 0; x < width; x++) {
      row.push({ x, y });
    }
    board.push(row);
  }
  return board;
};
