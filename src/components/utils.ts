import { getInitialBoard } from "../backend-lol/getBoard";
import { BoardType, CellType, Direction, Tetromino } from "../types/board";
import { boardHeight, boardWidth, GameState } from "./game";

const isYOutOfBounds = (y: number) => {
  return boardHeight <= y + 1;
};
const isCellOccupied = (board: BoardType, cell: CellType) => {
  return Boolean(board[cell.y][cell.x].tetromino);
};

export const isChangeAvailible = ({ board, direction, x, y }: GameState) => {
  const nextCells = tetroFunctionMap["I"](x, y, direction);
  return !nextCells.find((cell) => {
    return isYOutOfBounds(y) || isCellOccupied(board, cell);
  });
};

const getNextLCells = (
  x: number,
  y: number,
  direction: Direction
): CellType[] => {
  if (direction === "0" || direction === "270") {
    return [
      { y: y + 1, x: x - 2 },
      { y: y + 1, x: x - 1 },
      { y: y + 1, x: x },
      { y: y + 1, x: x + 1 },
    ];
  }
  return [
    { x, y: y - 1 },
    { x, y },
    { x, y: y + 1 },
    { x, y: y + 2 },
  ];
};

export const getTetroCells = ({ tetro, direction, x, y }: GameState) => {
  return tetroFunctionMap[tetro](x, y, direction).map((cell) => ({
    ...cell,
    tetromino: tetro,
  }));
};

export const tetroFunctionMap: Record<
  Tetromino,
  (x: number, y: number, direction: Direction) => CellType[] | CellType[]
> = {
  I: getNextLCells,
  J: getNextLCells,
  L: getNextLCells,
  O: getNextLCells,
  S: getNextLCells,
  T: getNextLCells,
  Z: getNextLCells,
};

export const getUpdatedBoard = (board: BoardType, tetroCells: CellType[]) => {
  const newBoard = copyBoard(board);
  tetroCells.forEach((cell) => (newBoard[cell.y][cell.x] = cell));
  return newBoard;
};

const copyBoard = (board: BoardType) => {
  const newBoard: BoardType = getInitialBoard(boardWidth, boardHeight);
  board.forEach((bordRow, rowIndex) =>
    bordRow.forEach((cell, cellIndex) => (newBoard[rowIndex][cellIndex] = cell))
  );
  return newBoard;
};
