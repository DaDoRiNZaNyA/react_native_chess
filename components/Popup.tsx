import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import {Player} from '../models/Player';
import {Colors} from '../models/Color';

interface PopupProps {
  winPlayer: Player | null;
  restart: () => void;
  setWinPlayer: (winPlayer: Player | null) => void;
  setStart: (start: number) => void;
  gameTime: number;
  setGameTime: (gameTime: number) => void;
}

const Popup: React.FC<PopupProps> = ({
  winPlayer,
  setWinPlayer,
  setStart,
  gameTime,
  setGameTime,
}) => {
  const [inputTime, setInputTime] = useState(gameTime.toString());

  useEffect(() => {
    setInputTime(gameTime.toString());
  }, [gameTime]);

  const handleRestart = () => {
    const inputValue = parseInt(inputTime, 10);
    if (!isNaN(inputValue) && inputValue > 9) {
      setGameTime(inputValue);
      setInputTime(inputValue.toString());
      setWinPlayer(null);
      setStart(1);
    } else {
      Alert.alert('Ошибка', 'Введите корректное число больше 10');
    }
  };

  const handleInputChange = (text: string) => {
    setInputTime(text);
  };

  return (
    <View style={styles.popupContainer}>
      <View style={styles.popup}>
        {winPlayer && (
          <Text style={styles.winText}>
            Победа {winPlayer.color === Colors.BLACK ? 'чёрных' : 'белых'}
          </Text>
        )}
        <TextInput
          style={styles.timeInput}
          keyboardType="numeric"
          placeholder="Время игры"
          value={inputTime}
          onChangeText={handleInputChange}
        />
        <TouchableOpacity
          style={styles.popupRestartButton}
          onPress={handleRestart}>
          <Text style={styles.restartButtonText}>Start</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  popupContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1aaaaac6',
    zIndex: 2,
  },
  popup: {
    width: 300,
    height: 300,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  winText: {
    color: '#ffffff',
    fontSize: 40,
    marginBottom: 10,
    fontWeight: '700',
  },
  timeInput: {
    width: 220,
    height: 65,
    borderRadius: 10,
    marginBottom: 20,
    fontFamily: 'Teko',
    fontSize: 36,
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: '#ffffff',
  },
  popupRestartButton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 100,
    height: 100,
    borderRadius: 20,
    backgroundColor: 'darkblue',
    borderWidth: 4,
    borderColor: 'darkblue',
  },
  restartButtonText: {
    color: 'white',
    fontFamily: 'Teko',
    fontSize: 36,
    fontWeight: 'bold',
  },
});

export default Popup;
