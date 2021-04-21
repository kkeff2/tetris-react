import { BoardType, CellType, Tetro, TetroType } from "../types/board";
import { boardHeight, GameState } from "./game";

const isYOutOfBounds = (y: number) => {
  return boardHeight <= y;
};
const isCellOccupied = (board: BoardType, cell: CellType) => {
  return Boolean(board[cell.y][cell.x].tetro);
};

export const isCellsAvailible = (board: BoardType, cells: CellType[]) => {
  return !cells.find((cell) => {
    return isYOutOfBounds(cell.y) || isCellOccupied(board, cell);
  });
};

export const startCells: Record<TetroType, CellType[]> = {
  I: [
    { x: 3, y: 5, tetro: "I" },
    { x: 4, y: 5, tetro: "I" },
    { x: 5, y: 5, tetro: "I" },
    { x: 6, y: 5, tetro: "I" },
  ],
  J: [{ x: 3, y: 5, tetro: "J" }],
  L: [{ x: 3, y: 5, tetro: "L" }],
  O: [{ x: 3, y: 5, tetro: "O" }],
  S: [{ x: 3, y: 5, tetro: "S" }],
  T: [{ x: 3, y: 5, tetro: "T" }],
  Z: [{ x: 3, y: 5, tetro: "Z" }],
};

const getValidStartPostion = (
  board: BoardType,
  cells: CellType[]
): CellType[] => {
  if (isCellsAvailible(board, cells)) {
    return cells;
  }
  return getValidStartPostion(
    board,
    cells.map((cell) => ({ ...cell, y: cell.y - 1 }))
  );
};

export const getNewTetro = (type: TetroType, board?: BoardType): Tetro => {
  const cells = startCells[type];
  if (!board) {
    return { type, cells, direction: "0" };
  }
  return {
    type,
    direction: "0",
    cells: !board ? cells : getValidStartPostion(board, cells),
  };
};

export const getNextYCells = (cells: CellType[]): CellType[] =>
  cells.map((cell) => ({ ...cell, y: cell.y + 1 }));

export const isNextYPossible = (state: GameState) => {
  return isCellsAvailible(state.board, getNextYCells(state.activeTetro.cells));
};

export const getUpdatedBoard = (board: BoardType, tetroCells: CellType[]) => {
  console.log("getUpdatedBoard");
  // debugger;
  const newBoard = copyBoard(board);
  tetroCells.forEach((cell) => (newBoard[cell.y][cell.x] = cell));
  return newBoard;
};

// const getBoardTetros = () =>

const copyBoard = (board: BoardType) => {
  const newBoardRows = board.map((row) => row.map((cell) => ({ ...cell })));
  // debugger;
  // board.forEach((bordRow, rowIndex) =>
  //   bordRow.forEach(
  //     (cell, cellIndex) => (newBoard[rowIndex][cellIndex] = { ...cell })
  //   )
  // );
  return newBoardRows;
};

export const getRandomTetroType = (): TetroType => "I";

// export const getNewTetro = (board: BoardType, type: TetroType): Tetro => {
//   const cells = [{x: }];
//   return {
//     type,
//     direction: "0",
//   };
// };

export const isGameOver = (board: BoardType) =>
  !!board[4].find(({ tetro }) => tetro);
