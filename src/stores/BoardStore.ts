import { canPromote, getValidSpaces, PieceType, Player } from "../utils/ChessLogic";
import { GameHistoryModel, BoardSpaceModel, PieceModel } from "./models";

export type Board = { [k: string]: BoardSpaceModel };

export class BoardStore {
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
    spaceClicked(board: Board, selectedSpaceKey: string | null, space: string, currentPlayer: Player): { board: Board, selectedSpaceKey: string, gameHistoryModel: GameHistoryModel | null } {
        const clickedSpace = board[space];
        if (clickedSpace?.piece && clickedSpace.piece.player === currentPlayer) {
            board = this.highlightSpaces(board, getValidSpaces(space, board));
            return { board: board, selectedSpaceKey: space, gameHistoryModel: null }
        } else if (clickedSpace?.highlighted) {
            const selectedSpace = board[selectedSpaceKey!];
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

                board = this.unhighlightSpaces(board);
                return { board: board, selectedSpaceKey: space, gameHistoryModel: gameHistory }
            }
        }
        board = this.unhighlightSpaces(board);
        return { board: board, selectedSpaceKey: space, gameHistoryModel: null };
    }
}