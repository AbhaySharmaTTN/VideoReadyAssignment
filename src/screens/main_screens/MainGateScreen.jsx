import { ActivityIndicator, StyleSheet, View } from 'react-native';
import React, { useEffect } from 'react';
import { colors } from '../../utils/colors';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { MainRoutes } from '../../utils/Routes';

const MainGateScreen = () => {
  const navigation = useNavigation();
  const { genre, profiles } = useSelector(state => state.user);

  useEffect(() => {
    setTimeout(() => {
      if (genre.length === 0) {
        navigation.replace(MainRoutes.GENRE);
      } else if (profiles.length > 1) {
        navigation.replace(MainRoutes.WHO_IS_WATCHING);
      } else {
        navigation.navigate(MainRoutes.MAIN_DRAWER);
      }
    }, 100);
  }, [genre, profiles]);

  return (
    <View style={styles.container}>
      <ActivityIndicator
        size={50}
        color={colors.appButton}
        style={styles.loadingIndicator}
      />
    </View>
  );
};

export default MainGateScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingIndicator: {
    color: colors.appButton,
  },
});
