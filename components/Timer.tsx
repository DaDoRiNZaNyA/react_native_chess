import React, {useState, useEffect, useRef, useCallback} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {Colors} from '../models/Color';
import {Player} from '../models/Player';

interface TimerProps {
  currentPlayer: Player | null;
  restart: () => void;
  setCurrentPlayer: (currentPlayer: Player | null) => void;
  setWinPlayer: (winPlayer: Player | null) => void;
  winPlayer: Player | null;
  gameTime: number;
  start: number;
}

const Timer: React.FC<TimerProps> = React.memo(
  ({
    currentPlayer,
    restart,
    setCurrentPlayer,
    setWinPlayer,
    winPlayer,
    gameTime,
    start,
  }) => {
    const [blackTime, setBlackTime] = useState(gameTime);
    const [whiteTime, setWhiteTime] = useState(gameTime);
    const timer = useRef<ReturnType<typeof setInterval> | null>(null);

    const decrementBlackTime = useCallback(() => {
      setBlackTime(prev => Math.max(0, prev - 1));
    }, []);

    const decrementWhiteTime = useCallback(() => {
      setWhiteTime(prev => Math.max(0, prev - 1));
    }, []);

    useEffect(() => {
      const startTimer = () => {
        if (timer.current) {
          clearInterval(timer.current);
          if (whiteTime === 0 || blackTime === 0) {
            setBlackTime(gameTime);
            setWhiteTime(gameTime);
          }
        }
        const callback =
          currentPlayer?.color === Colors.WHITE
            ? decrementWhiteTime
            : decrementBlackTime;
        timer.current = setInterval(callback, 1000);
      };

      if (winPlayer === null && start === 1) {
        startTimer();
      }

      return () => {
        if (timer.current) {
          clearInterval(timer.current);
        }
      };
    }, [
      currentPlayer,
      winPlayer,
      start,
      gameTime,
      whiteTime,
      blackTime,
      decrementWhiteTime,
      decrementBlackTime,
    ]);

    useEffect(() => {
      setBlackTime(gameTime);
      setWhiteTime(gameTime);
    }, [gameTime, winPlayer]);

    useEffect(() => {
      if (winPlayer) {
        if (timer.current) {
          clearInterval(timer.current);
          setCurrentPlayer(new Player(Colors.WHITE));
        }
      }
      if (whiteTime === 0 && start === 1) {
        setWinPlayer(new Player(Colors.BLACK));
        if (timer.current) {
          clearInterval(timer.current);
          setCurrentPlayer(new Player(Colors.WHITE));
        }
      } else if (blackTime === 0 && start === 1) {
        setWinPlayer(new Player(Colors.WHITE));
        if (timer.current) {
          clearInterval(timer.current);
          setCurrentPlayer(new Player(Colors.WHITE));
        }
      }
    }, [
      whiteTime,
      blackTime,
      start,
      winPlayer,
      setCurrentPlayer,
      setWinPlayer,
    ]);

    const handleRestart = () => {
      setBlackTime(gameTime);
      setWhiteTime(gameTime);
      setCurrentPlayer(new Player(Colors.WHITE));
      restart();
    };

    return (
      <View style={styles.timer}>
        <Text
          style={[
            styles.time,
            currentPlayer?.color === Colors.BLACK && styles.activeTime,
          ]}>
          {blackTime}
        </Text>
        <TouchableOpacity style={styles.restartButton} onPress={handleRestart}>
          <Text style={styles.buttonText}>Restart</Text>
        </TouchableOpacity>
        <Text
          style={[
            styles.time,
            currentPlayer?.color === Colors.WHITE && styles.activeTime,
          ]}>
          {whiteTime}
        </Text>
      </View>
    );
  },
);

const styles = StyleSheet.create({
  timer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 30,
  },
  time: {
    marginHorizontal: 30,
    fontSize: 20,
    borderWidth: 4,
    borderColor: '#190f8f',
    borderRadius: 20,
    width: 56,
    height: 56,
    textAlign: 'center',
    textAlignVertical: 'center',
    fontWeight: 'bold',
    color: 'white',
  },
  activeTime: {
    borderColor: '#ffffff',
  },
  restartButton: {
    backgroundColor: 'darkblue',
    width: 64,
    height: 64,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontFamily: 'Teko',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Timer;
