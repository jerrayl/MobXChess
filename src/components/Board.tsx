import { getBoardLayout, getInitialBoardState, Player } from "../utils/ChessLogic";
import { GameStore } from "../stores/GameStore";
import { BoardSpace } from "./BoardSpace";
import { useState } from "react";
import { GameHistoryModel } from "../stores/models";

export interface BoardProps {
    currentPlayer: Player;
    updateGameHistory: (gameHistory: GameHistoryModel | null) => void,
    gameStore: GameStore;
    classNames: string;
}

export const Board = ({ currentPlayer, gameStore, updateGameHistory, classNames }: BoardProps) => {

    const [selectedSpaceKey, setSelectedSpaceKey] = useState<string | null>(null);
    const [board, setBoard] = useState(getInitialBoardState);

    const onSpaceClicked = (space: string) => {
        const result = gameStore.board.spaceClicked(board, selectedSpaceKey, space, currentPlayer);
        setBoard(result.board);
        setSelectedSpaceKey(result.selectedSpaceKey);
        updateGameHistory(result.gameHistoryModel);
    }

    return <div className={`min-w-full grid grid-cols-8 ${classNames}`}>
        {getBoardLayout().map((coordinate) =>
            <BoardSpace key={coordinate} onClick={() => onSpaceClicked(coordinate)} boardSpaceModel={board[coordinate]} />
        )}
    </div>
};