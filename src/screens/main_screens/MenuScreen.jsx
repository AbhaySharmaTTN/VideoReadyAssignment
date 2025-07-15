import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { colors } from '../../utils/colors';

const MenuScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>MenuScreen</Text>
    </View>
  );
};

export default MenuScreen;

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
