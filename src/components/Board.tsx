import { observer } from "mobx-react";
import { getBoardLayout, Player } from "../utils/ChessLogic";
import { GameStore } from "../stores/GameStore";
import { BoardSpace } from "./BoardSpace";
import { GameHistoryModel } from "../stores/models";

export interface BoardProps {
    currentPlayer: Player;
    updateGameHistory: (gameHistory: GameHistoryModel | null) => void,
    gameStore: GameStore;
    classNames: string;
}

export const Board = observer(({ gameStore, currentPlayer, updateGameHistory, classNames }: BoardProps) => {
    
    const onSpaceClicked = (space: string) => {
        const gameHistoryModel = gameStore.board.spaceClicked(space, currentPlayer);
        updateGameHistory(gameHistoryModel);
    }

    return <div className={`min-w-full grid grid-cols-8 ${classNames}`}>
        {getBoardLayout().map((coordinate) =>
            <BoardSpace key={coordinate} onClick={() => onSpaceClicked(coordinate)} boardSpaceModel={gameStore.board.board.get(coordinate)!} />
        )}
    </div>
});