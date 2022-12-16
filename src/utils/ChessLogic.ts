import { iconMap } from "../icons/PieceIcons";
import { BoardSpaceModel, PieceModel } from "../stores/models";

export enum Player {
  Black,
  White
}

export enum PieceType {
  King,
  Queen,
  Rook,
  Bishop,
  Knight,
  Pawn
}

export const getOpposingPlayer = (player: Player) => {
  return (player === Player.White) ? Player.Black : Player.White;
}

export const getDescription = (player: Player | undefined, piece: PieceType | undefined) => {
  return (player !== undefined && piece !== undefined) ? Player[player] + ' ' + PieceType[piece] : '';
}

export const getIcon = (player: Player | undefined, piece: PieceType | undefined) => {
  return iconMap[getDescription(player, piece)];
}


export const initialState: { [key: string]: [player: Player, piece: PieceType] } = {
  'A2': [Player.White, PieceType.Pawn],
  'B2': [Player.White, PieceType.Pawn],
  'C2': [Player.White, PieceType.Pawn],
  'D2': [Player.White, PieceType.Pawn],
  'E2': [Player.White, PieceType.Pawn],
  'F2': [Player.White, PieceType.Pawn],
  'G2': [Player.White, PieceType.Pawn],
  'H2': [Player.White, PieceType.Pawn],

  'A1': [Player.White, PieceType.Rook],
  'B1': [Player.White, PieceType.Knight],
  'C1': [Player.White, PieceType.Bishop],
  'D1': [Player.White, PieceType.Queen],
  'E1': [Player.White, PieceType.King],
  'F1': [Player.White, PieceType.Bishop],
  'G1': [Player.White, PieceType.Knight],
  'H1': [Player.White, PieceType.Rook],

  'A7': [Player.Black, PieceType.Pawn],
  'B7': [Player.Black, PieceType.Pawn],
  'C7': [Player.Black, PieceType.Pawn],
  'D7': [Player.Black, PieceType.Pawn],
  'E7': [Player.Black, PieceType.Pawn],
  'F7': [Player.Black, PieceType.Pawn],
  'G7': [Player.Black, PieceType.Pawn],
  'H7': [Player.Black, PieceType.Pawn],

  'A8': [Player.Black, PieceType.Rook],
  'B8': [Player.Black, PieceType.Knight],
  'C8': [Player.Black, PieceType.Bishop],
  'D8': [Player.Black, PieceType.Queen],
  'E8': [Player.Black, PieceType.King],
  'F8': [Player.Black, PieceType.Bishop],
  'G8': [Player.Black, PieceType.Knight],
  'H8': [Player.Black, PieceType.Rook],
}

const pawnAtStart = (player: Player, space: string) => {
  return (player === Player.Black && space[1] === '7') ||
    (player === Player.White && space[1] === '2')
}

const pawnAtEnd = (player: Player, space: string) => {
  return (player === Player.Black && space[1] === '1') ||
    (player === Player.White && space[1] === '8')
}

export const canPromote = (piece: PieceType, player: Player, space: string) => {
  return piece === PieceType.Pawn && pawnAtEnd(player, space);
}

const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
const numbers = ['8', '7', '6', '5', '4', '3', '2', '1'];

export const getBoardLayout = () => {
  return numbers.flatMap(number => letters.map(letter => letter + number));
}

export const getInitialBoardState = () => {
  return Object.fromEntries(getBoardLayout().map(x => {
    const space = new BoardSpaceModel();
    if (initialState[x]) {
      const piece = new PieceModel();
      piece.player = initialState[x][0];
      piece.type = initialState[x][1];
      space.piece = piece;
    }
    return [x, space];
  }
  ));
}

const getTransformedSpace = (currSpace: string, x: number, y: number): string | null => {
  const transformedX = letters[letters.indexOf(currSpace[0]) + x];
  const transformedY = numbers[numbers.indexOf(currSpace[1]) + y];
  return (transformedX && transformedY) ? transformedX + transformedY : null;
}

export const getValidSpaces = (currSpace: string, board: {[key:string]: BoardSpaceModel}): string[] => {
  const getSpacePiece = (space: string) => board[space]?.piece ?? null;   

  const piece = getSpacePiece(currSpace)!;
  const opposingPlayer = getOpposingPlayer(piece.player);

  const spaceHasOpposingPlayer = (space: string) =>  getSpacePiece(space)?.player === opposingPlayer;
  const spaceHasCurrentPlayer = (space: string) =>  getSpacePiece(space)?.player === piece.player;

  const spaces: string[] = [];

  const addSpace = (x: number, y: number, requiresOpposingPlayer: boolean | null = null) => {
    const transformedSpace = getTransformedSpace(currSpace, x, y);
    if ( transformedSpace !== null &&
         !spaceHasCurrentPlayer(transformedSpace) &&
         (requiresOpposingPlayer === null || spaceHasOpposingPlayer(transformedSpace) === requiresOpposingPlayer)
       ) 
    {
      spaces.push(transformedSpace);
    }
  }

  const advanceSpaces = (x: number, y: number) => {
    const spacesToAdd: string[] = [];
    for (const i of [...Array(8).keys()].slice(1)) {
      const transformedSpace = getTransformedSpace(currSpace, x * i, y * i);
      if (transformedSpace === null)
        break;
      if (spaceHasCurrentPlayer(transformedSpace))
        break;
      spaces.push(transformedSpace);
      if (spaceHasOpposingPlayer(transformedSpace))
        break;
    }
    return spaces.concat(spacesToAdd);
  }

  switch (piece.type) {
    case (PieceType.King):
      addSpace(0, 1)
      addSpace(0, -1)
      addSpace(1, 0)
      addSpace(-1, 0)
      addSpace(1, 1)
      addSpace(1, -1);
      addSpace(-1, 1)
      addSpace(-1, -1)
      break;
    case (PieceType.Queen):
      advanceSpaces(0, 1)
      advanceSpaces(0, -1)
      advanceSpaces(1, 0)
      advanceSpaces(-1, 0)
      advanceSpaces(1, 1)
      advanceSpaces(1, -1);
      advanceSpaces(-1, 1)
      advanceSpaces(-1, -1)
      break;
    case (PieceType.Rook):
      advanceSpaces(0, 1)
      advanceSpaces(0, -1)
      advanceSpaces(1, 0)
      advanceSpaces(-1, 0)
      break;
    case (PieceType.Bishop):
      advanceSpaces(1, 1)
      advanceSpaces(1, -1);
      advanceSpaces(-1, 1)
      advanceSpaces(-1, -1)
      break;
    case (PieceType.Knight):
      addSpace(2, 1)
      addSpace(2, -1)
      addSpace(-2, 1)
      addSpace(-2, -1)
      addSpace(1, 2)
      addSpace(1, -2)
      addSpace(-1, 2)
      addSpace(-1, -2)
      break;
    default:
      const direction = (piece.player === Player.White) ? -1 : 1;
      addSpace(0, direction, false)
      addSpace(-1, direction, true)
      addSpace(1, direction, true)

      if (pawnAtStart(piece.player, currSpace) && 
          getSpacePiece(getTransformedSpace(currSpace, 0, direction)!) === null)
      {
        addSpace(0, direction * 2, false);
      }

      break;
  }

  return spaces;
}