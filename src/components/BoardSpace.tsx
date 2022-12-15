import { BoardSpaceModel } from "../stores/models";
import { Piece } from "./Piece";

export interface BoardSpaceProps {
    onClick: () => void;
    boardSpaceModel: BoardSpaceModel;
}

export const BoardSpace = ({ boardSpaceModel, onClick }: BoardSpaceProps) => {
    return (
        <div
            onClick={onClick}
            className={`min-w-full border-black border-2 flex flex-col justify-center ${boardSpaceModel.highlighted ? 'bg-orange-100' : ''}`}
        >
            <Piece player={boardSpaceModel.piece?.player} piece={boardSpaceModel.piece?.type} />
        </div>)
};
