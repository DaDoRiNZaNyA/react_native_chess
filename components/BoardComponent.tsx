import React, {useState, useEffect} from 'react';
import {View, StyleSheet, TouchableWithoutFeedback} from 'react-native';
import {Board} from '../models/Board';
import CellComponent from './CellComponent';
import {Cell} from '../models/Cell';
import {Player} from '../models/Player';

interface BoardProps {
  board: Board;
  currentPlayer: Player | null;
  setBoard: (board: Board) => void;
  swapPlayer: () => void;
}

const BoardComponent: React.FC<BoardProps> = ({
  board,
  currentPlayer,
  swapPlayer,
  setBoard,
}) => {
  const [selectedCell, setSelectedCell] = useState<Cell | null>(null);

  function highlightCells() {
    board.highlightCells(selectedCell, currentPlayer?.color);
    const newBoard = board.getCopyBoard();
    setBoard(newBoard);
  }

  function click(cell: Cell) {
    if (
      selectedCell &&
      selectedCell !== cell &&
      selectedCell.figure?.canMove(cell)
    ) {
      selectedCell.moveFigure(cell);
      swapPlayer();
      setSelectedCell(null);
      highlightCells();
    } else {
      if (cell.figure?.color === currentPlayer?.color) {
        setSelectedCell(cell);
      }
    }
  }

  useEffect(() => {
    if (selectedCell) {
      highlightCells();
    }
  }, [selectedCell]);

  return (
    <TouchableWithoutFeedback onPress={() => setSelectedCell(null)}>
      <View style={styles.container}>
        <View style={styles.board}>
          {board.cells.map((row, rowIndex) => (
            <React.Fragment key={rowIndex}>
              {row.map(cell => (
                <CellComponent
                  click={click}
                  cell={cell}
                  key={cell.id}
                  selected={
                    cell.x === selectedCell?.x && cell.y === selectedCell?.y
                  }
                />
              ))}
            </React.Fragment>
          ))}
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  board: {
    width: 48 * 8,
    height: 48 * 8,
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: -60,
  },
});

export default BoardComponent;
