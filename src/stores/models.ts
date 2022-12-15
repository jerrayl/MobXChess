import { PieceType, Player } from "../utils/ChessLogic";

export class GameHistoryModel {
  player!: Player;
  piece!: PieceType;
  space!: string;
  capturedPiece!: PieceType | null;

  constructor(values: object) {
    Object.assign(this, values);
  }
}

export class PieceModel {
  player: Player = Player.White;
  type: PieceType = PieceType.Pawn;
}


export class BoardSpaceModel {
  highlighted: boolean = false;
  piece: PieceModel | null = null;
}