import { GameStore } from "../stores/GameStore";
import { GameHistoryModel } from "../stores/models";
import { Player } from "../utils/ChessLogic";
import { Piece } from "./Piece";

export interface CapturedPiecesProps {
  gameStore: GameStore;
  gameHistory: GameHistoryModel[];
  currentPlayer: Player;
  classNames: string;
}

export const CapturedPieces = ({ gameStore, gameHistory, currentPlayer, classNames }: CapturedPiecesProps) => {
  return (
    <div className={`flex flex-col pl-4 justify-between max-h-screen gap-2 ${classNames}`}>
      <div className="w-full bg-white rounded border shadow shadow-lg rounded-b p-4 grid grid-cols-8 flex items-center gap-1">
        {gameStore.piecesCapturedByBlack(gameHistory).map(piece => <Piece player={Player.White} piece={piece} />)}
      </div>
      <div className='flex justify-center'>
          <h2 className='text-lg'>{Player[currentPlayer]}'s turn</h2>
        </div>

      <div className="w-full bg-white rounded border shadow shadow-lg rounded-b p-4 grid grid-cols-8 flex items-center gap-1">
        {gameStore.piecesCapturedByWhite(gameHistory).map(piece => <Piece player={Player.Black} piece={piece} />)}
      </div>
    </div >)
};