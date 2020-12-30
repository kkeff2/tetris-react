import { CellType } from "../types/board";

export const getBoard = (): CellType[][] => {
  const board: CellType[][] = [];
  for (let y = 0; y < 20; y++) {
    const row: CellType[] = [];
    for (let x = 0; x < 10; x++) {
      row.push({ x, y });
    }
    board.push(row);
  }
  return board;
};
