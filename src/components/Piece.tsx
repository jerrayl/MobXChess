import { getDescription, getIcon, PieceType, Player } from "../utils/ChessLogic";

export interface PieceProps {
    player: Player | undefined;
    piece: PieceType | undefined;
}

export const Piece = ({ player, piece }: PieceProps) => {
    return <img src={getIcon(player, piece)} alt={getDescription(player, piece)} />;
};