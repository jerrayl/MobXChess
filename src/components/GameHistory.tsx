import { observer } from "mobx-react";
import { GameHistoryModel } from "../stores/models";
import { Piece } from "./Piece";
import { getOpposingPlayer } from "../utils/ChessLogic";
import arrow from "../icons/arrow.svg";
import x from "../icons/x.svg";

export interface GameHistoryProps {
  gameHistory: GameHistoryModel[];
  classNames: string;
}

export const GameHistory = observer(({ gameHistory, classNames }: GameHistoryProps) => {

  return (
    <div className={`flex flex-col pr-4 max-h-screen overflow-y-auto gap-2 ${classNames}`}>

      {gameHistory.map(history =>
        <div className="w-full bg-white rounded border shadow shadow-lg rounded-b p-4 grid grid-cols-9 flex items-center gap-2">

          <div className="col-span-2"><Piece player={history.player} piece={history.piece} /></div>
          <img src={arrow} />
          <div className="col-span-2"><p className="text-2xl font-bold">{history.space}</p></div>

          {history.capturedPiece && <p className="text-2xl">|</p>}
          {history.capturedPiece && <img src={x} />}
          {history.capturedPiece && <div className="col-span-2"><Piece player={getOpposingPlayer(history.player)} piece={history.capturedPiece} /></div>}
        </div>
      )}

    </div>)
});