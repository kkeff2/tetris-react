export type Tetromino = "I" | "J" | "L" | "O" | "S" | "T" | "Z";

export interface CellType {
  x: number;
  y: number;
  tetromino?: Tetromino;
}

export type BoardType = CellType[][];

export type Direction = "0" | "90" | "180" | "270";

export type ActiveTetromino = {
  type: Tetromino;
  direction: Direction;
};
