import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { colors } from '../../utils/colors';
import { MOVIE } from '../../utils/strings';

const Movie = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{MOVIE}</Text>
    </View>
  );
};

export default Movie;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: colors.appButton,
    fontSize: 20,
    letterSpacing: 2,
  },
});
