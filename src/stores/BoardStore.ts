import { action, makeObservable, observable, ObservableMap } from "mobx";
import { canPromote, getInitialBoardState, getValidSpaces, PieceType, Player } from "../utils/ChessLogic";
import { GameHistoryModel, BoardSpaceModel, PieceModel } from "./models";

export class BoardStore {
    constructor() {
        makeObservable(this);
    }

    @observable selectedSpaceKey: string | null = null;
    @observable board: ObservableMap<string, BoardSpaceModel> = observable.map(getInitialBoardState());

    @action.bound
    highlightSpaces(spaces: string[]) {
        this.board.forEach((space, key) => space.highlighted = spaces.includes(key));
    }

    @action.bound
    unhighlightSpaces() {
        this.board.forEach(space => space.highlighted = false);
    }

    @action.bound
    promotePiece(piece: PieceModel) {
        piece.type = PieceType.Queen;
    }

    @action.bound
    spaceClicked(space: string, currentPlayer: Player): GameHistoryModel | null {
        const clickedSpace = this.board.get(space);
        if (clickedSpace?.piece && clickedSpace.piece.player === currentPlayer) {
            this.selectedSpaceKey = space;
            this.highlightSpaces(getValidSpaces(space, Object.fromEntries(this.board)));
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

                this.unhighlightSpaces();
                return gameHistory;
            }
        }
        this.unhighlightSpaces();
        return null;
    }
}