import React from "react";
import { action, computed, makeObservable, observable } from "mobx";
import { getOpposingPlayer, PieceType, Player } from "../utils/ChessLogic";
import { GameHistoryModel } from "./models";
import { BoardStore } from "./BoardStore";

export class GameStore {
  constructor() {
    makeObservable(this);

    /* Illustration of how a reaction can be used, is not the best practice for this
    reaction(() => this.gameHistory[0], h => { 
      if (canPromote(h.piece, h.player, h.space) && this.board.board.get(h.space)?.piece?.type)
        this.board.board.get(h.space)!.piece!.type = PieceType.Queen;
    })*/
  }

  @observable currentPlayer: Player = Player.White;
  @observable board: BoardStore = new BoardStore();
  @observable gameHistory = observable.array<GameHistoryModel>([]);

  @computed
  get opposingPlayer(): Player {
    return getOpposingPlayer(this.currentPlayer);
  }

  @computed
  get piecesCapturedByBlack(): PieceType[] {
    return this.gameHistory.filter(h => h.player === Player.Black && h.capturedPiece != null).map(h => h.capturedPiece!);
  }

  @computed
  get piecesCapturedByWhite(): PieceType[] {
    return this.gameHistory.filter(h => h.player === Player.White && h.capturedPiece != null).map(h => h.capturedPiece!);
  }

  @action.bound
  spaceClicked(space: string) {
    const gameHistoryModel = this.board.spaceClicked(space, this.currentPlayer);

    if (gameHistoryModel) {
      this.gameHistory.unshift(gameHistoryModel);
      this.currentPlayer = this.opposingPlayer;
    }
  }
}

const storeContext = React.createContext(new GameStore());
export const useStores = () => React.useContext(storeContext);