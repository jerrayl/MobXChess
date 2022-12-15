import { observer } from 'mobx-react';
import { Board } from './Board';
import { useStores } from '../stores/GameStore';
import { GameHistory } from './GameHistory';
import { CapturedPieces } from './CapturedPieces';

export const Game = observer(() => {
  const store = useStores();
  return (
    <div className='w-full max-h-screen my-4 grid grid-flow-row md:grid-cols-12 grid-cols-6 gap-4'>
      <CapturedPieces classNames='md:order-1 order-2  col-span-3' gameStore={store} />
      <Board classNames='md:order-2 order-1 px-4 col-span-6' gameStore={store} />
      <GameHistory classNames='order-3 col-span-3' gameHistory={store.gameHistory} />
    </div>
  );
});