import React from "react";
import { getOpposingPlayer, PieceType, Player } from "../utils/ChessLogic";
import { GameHistoryModel } from "./models";
import { BoardStore } from "./BoardStore";

export class GameStore {
  board = new BoardStore();

  //get
  opposingPlayer = (currentPlayer: Player): Player => {
    return getOpposingPlayer(currentPlayer);
  }

  //get
  piecesCapturedByBlack = (gameHistory: GameHistoryModel[]): PieceType[] => {
    return gameHistory.filter(h => h.player === Player.Black && h.capturedPiece != null).map(h => h.capturedPiece!);
  }
  
  //get
  piecesCapturedByWhite = (gameHistory: GameHistoryModel[]): PieceType[] => {
    return gameHistory.filter(h => h.player === Player.White && h.capturedPiece != null).map(h => h.capturedPiece!);
  }

  //action
  spaceClicked(gameHistory: GameHistoryModel[], currentPlayer: Player, gameHistoryModel: GameHistoryModel | null): 
    {gameHistory:GameHistoryModel[], currentPlayer:Player} {
    if (gameHistoryModel) {
      gameHistory.unshift(gameHistoryModel);
      currentPlayer = this.opposingPlayer(currentPlayer);
    }
    return {gameHistory, currentPlayer}
  }
}

const storeContext = React.createContext(new GameStore());
export const useStores = () => React.useContext(storeContext);