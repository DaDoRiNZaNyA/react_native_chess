import React, {useEffect, useState, useMemo, useCallback} from 'react';
import {View, StyleSheet} from 'react-native';
import {Board} from './models/Board';
import BoardComponent from './components/BoardComponent';
import {Player} from './models/Player';
import {Colors} from './models/Color';
import LostFigures from './components/LostFigures';
import Timer from './components/Timer';
import Popup from './components/Popup';

function App() {
  const whitePlayer = useMemo(() => new Player(Colors.WHITE), []);
  const blackPlayer = useMemo(() => new Player(Colors.BLACK), []);
  const [board, setBoard] = useState(new Board());
  const [currentPlayer, setCurrentPlayer] = useState<Player | null>(
    whitePlayer,
  );
  const [winPlayer, setWinPlayer] = useState<Player | null>(null);
  const [gameTime, setGameTime] = useState<number>(10);
  const [start, setStart] = useState<number>(0);
  const [isCheckmate, setIsCheckmate] = useState(false);

  useEffect(() => {
    restart();
  }, []);

  function restart() {
    const newBoard = new Board();
    newBoard.initCells();
    newBoard.addFigures();
    setBoard(newBoard);
    setIsCheckmate(false);
  }

  const swapPlayer = useCallback(() => {
    setCurrentPlayer(prevPlayer =>
      prevPlayer === whitePlayer ? blackPlayer : whitePlayer,
    );
  }, [whitePlayer, blackPlayer]);

  useEffect(() => {
    const checkmateInterval = setInterval(() => {
      if (currentPlayer) {
        board.isCheckmate(currentPlayer.color);
        setIsCheckmate(board.checkmate);
        if (isCheckmate) {
          setWinPlayer(
            currentPlayer.color === Colors.WHITE
              ? new Player(Colors.BLACK)
              : new Player(Colors.WHITE),
          );
          setCurrentPlayer(null);
          restart();
        }
      }
    }, 500);

    return () => {
      clearInterval(checkmateInterval);
    };
  }, [currentPlayer, board, isCheckmate]);

  return (
    <View style={styles.container}>
      <Timer
        restart={restart}
        currentPlayer={currentPlayer}
        setCurrentPlayer={setCurrentPlayer}
        setWinPlayer={setWinPlayer}
        winPlayer={winPlayer}
        gameTime={gameTime}
        start={start}
      />
      {winPlayer || start === 0 ? (
        <Popup
          winPlayer={winPlayer}
          restart={restart}
          setWinPlayer={setWinPlayer}
          setStart={setStart}
          gameTime={gameTime}
          setGameTime={setGameTime}
        />
      ) : null}
      <LostFigures key="lostWhite" figures={board.lostWhiteFigures} />
      <BoardComponent
        key="board"
        board={board}
        setBoard={setBoard}
        currentPlayer={currentPlayer}
        swapPlayer={swapPlayer}
      />
      <LostFigures key="lostBlack" figures={board.lostBlackFigures} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1aa9aa87',
    justifyContent: 'center',
    alignItems: 'center',
  },
  game: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
  },
});

export default App;
