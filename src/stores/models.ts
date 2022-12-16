import { makeObservable, observable } from "mobx";
import { PieceType, Player } from "../utils/ChessLogic";

export class GameHistoryModel {
  player!: Player;
  piece!: PieceType;
  space!: string;
  capturedPiece!: PieceType | null;

  constructor(values: object){
    Object.assign(this, values);
  }
}

export class PieceModel {
    constructor() {
        makeObservable(this);
    }

    @observable player: Player = Player.White;
    @observable type: PieceType = PieceType.Pawn;
}


export class BoardSpaceModel {
  constructor() {
      makeObservable(this);
  }

  @observable highlighted: boolean = false;
  @observable piece: PieceModel | null = null;
}