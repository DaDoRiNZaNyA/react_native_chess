import React from 'react';
import {View, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {Cell} from '../models/Cell';
import {Colors} from '../models/Color';

interface CellProps {
  cell: Cell;
  selected: boolean;
  click: (cell: Cell) => void;
}

const CellComponent: React.FC<CellProps> = ({cell, selected, click}) => {
  const cellBackgroundColor =
    cell.color === Colors.BLACK ? '#190f8f' : '#d3d3d3';

  return (
    <TouchableOpacity
      style={[
        styles.cell,
        {backgroundColor: cellBackgroundColor},
        selected && styles.selected,
        cell.available && cell.figure && styles.availableFigure,
      ]}
      onPress={() => click(cell)}>
      {cell.available && !cell.figure && <View style={styles.available} />}
      {cell.figure?.logo && (
        <Image source={cell.figure?.logo} style={styles.figureImage} />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cell: {
    width: 48,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selected: {
    backgroundColor: '#3abeab',
  },
  available: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#3abeab',
  },
  availableFigure: {
    backgroundColor: '#3abeab',
  },
  figureImage: {
    width: 36,
    height: 36,
  },
});

export default CellComponent;
