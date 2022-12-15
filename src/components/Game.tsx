import { useState } from 'react';
import { Board } from './Board';
import { useStores } from '../stores/GameStore';
import { GameHistory } from './GameHistory';
import { CapturedPieces } from './CapturedPieces';
import { Player } from '../utils/ChessLogic';
import { GameHistoryModel } from '../stores/models';

export const Game = () => {
  const store = useStores();
  const [currentPlayer, setCurrentPlayer] = useState(Player.White);
  const [gameHistory, setGameHistory] = useState<GameHistoryModel[]>([]);

  const updateGameHistory = (gameHistoryModel: GameHistoryModel | null) => {
    const result = store.spaceClicked(gameHistory, currentPlayer, gameHistoryModel);
    setCurrentPlayer(result.currentPlayer);
    setGameHistory(result.gameHistory);
  }

  return (
    <div className='w-full max-h-screen my-4 grid grid-flow-row md:grid-cols-12 grid-cols-6 gap-4'>
      <CapturedPieces classNames='md:order-1 order-2  col-span-3' gameStore={store} gameHistory={gameHistory} currentPlayer={currentPlayer}/>
      <Board classNames='md:order-2 order-1 px-4 col-span-6' gameStore={store} currentPlayer={currentPlayer} updateGameHistory={updateGameHistory} />
      <GameHistory classNames='order-3 col-span-3' gameHistory={gameHistory} />
    </div>
  );
};