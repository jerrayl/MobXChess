import { observer } from "mobx-react";
import { getBoardLayout } from "../utils/ChessLogic";
import { GameStore } from "../stores/GameStore";
import { BoardSpace } from "./BoardSpace";

export interface BoardProps {
    gameStore: GameStore;
    classNames: string;
}

export const Board = observer(({ gameStore, classNames }: BoardProps) => {
    return <div className={`min-w-full grid grid-cols-8 ${classNames}`}>
        {getBoardLayout().map((coordinate) =>
            <BoardSpace key={coordinate} onClick={() => gameStore.spaceClicked(coordinate)} boardSpaceModel={gameStore.board.board.get(coordinate)!} />
        )}
    </div>
});