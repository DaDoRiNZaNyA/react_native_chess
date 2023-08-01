import React from 'react';
import {View, Image, StyleSheet} from 'react-native';
import {Figure} from '../models/figures/Figure';

interface LostFigureProps {
  figures: Figure[];
}

const LostFigures: React.FC<LostFigureProps> = ({figures}) => {
  return (
    <View style={styles.lost}>
      {figures.map(({id, logo}) => (
        <View key={id} style={styles.figureContainer}>
          {logo && (
            <Image
              source={logo}
              style={styles.figureImage}
              resizeMode="contain"
            />
          )}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  lost: {
    flexDirection: 'row-reverse',
    flexWrap: 'wrap',
    width: 384,
    height: 90,
    backgroundColor: '#1aa9aa87',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginTop: 0,
    marginBottom: 60,
  },
  figureContainer: {
    marginVertical: 10,
    marginHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  figureImage: {
    width: 25,
    height: 25,
  },
});

export default LostFigures;
