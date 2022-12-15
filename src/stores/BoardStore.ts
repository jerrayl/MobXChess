import { makeObservable, observable, ObservableMap } from "mobx";
import { canPromote, getInitialBoardState, getValidSpaces, PieceType, Player } from "../utils/ChessLogic";
import { GameHistoryModel, BoardSpaceModel, PieceModel } from "./models";

export type Board = { [k: string]: BoardSpaceModel };

export class BoardStore {

    constructor() {
        makeObservable(this);
    }

    @observable selectedSpaceKey: string | null = null;
    @observable board: ObservableMap<string, BoardSpaceModel> = observable.map(getInitialBoardState());

    //action
    highlightSpaces(board: Board, spaces: string[]) {
        Object.keys(board).forEach(key => board[key].highlighted = spaces.includes(key));
        return board;
    }

    //action
    unhighlightSpaces(board: Board) {
        Object.keys(board).forEach(key => board[key].highlighted = false);
        return board;
    }

    //action
    promotePiece(piece: PieceModel) {
        piece.type = PieceType.Queen;
    }

    //action
    spaceClicked(space: string, currentPlayer: Player): GameHistoryModel | null  {
        // This is purely so that other functions do not need to be reworked, and is unnecessary
        const boardObject = Object.fromEntries(this.board);

        const clickedSpace = this.board.get(space);
        if (clickedSpace?.piece && clickedSpace.piece.player === currentPlayer) {
            this.highlightSpaces(boardObject, getValidSpaces(space, boardObject));
            this.selectedSpaceKey = space;
            return null;
        } else if (clickedSpace?.highlighted) {
            const selectedSpace = this.board.get(this.selectedSpaceKey!);
            if (selectedSpace && selectedSpace?.piece) {
                const gameHistory = new GameHistoryModel(
                    {
                        player: currentPlayer,
                        piece: selectedSpace.piece.type,
                        space: space,
                        capturedPiece: clickedSpace.piece?.type
                    });

                clickedSpace.piece = selectedSpace.piece;
                selectedSpace.piece = null;

                if (canPromote(clickedSpace.piece.type, currentPlayer, space))
                    this.promotePiece(clickedSpace.piece);

                this.unhighlightSpaces(boardObject);
                return gameHistory;
            }
        }
        this.unhighlightSpaces(boardObject);
        return null;
    }
}