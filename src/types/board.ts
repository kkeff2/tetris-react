export type TetroType = "I" | "J" | "L" | "O" | "S" | "T" | "Z";

export interface CellType {
  x: number;
  y: number;
  tetro?: TetroType;
}

export type BoardType = CellType[][];

export type Direction = "0" | "90" | "180" | "270";

export type Tetro = {
  type: TetroType;
  direction: Direction;
  cells: CellType[];
};
