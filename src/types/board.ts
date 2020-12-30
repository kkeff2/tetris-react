export type Tetromino = "I" | "J" | "L" | "O" | "S" | "T" | "Z";

export interface CellType {
  x: number;
  y: number;
  tetromino?: Tetromino;
}
