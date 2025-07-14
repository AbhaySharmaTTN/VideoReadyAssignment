import { ActivityIndicator, StyleSheet, View } from 'react-native';
import React, { useEffect } from 'react';
import { colors } from '../../utils/colors';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { MainRoutes } from '../../utils/Routes';

const MainGateScreen = () => {
  const navigation = useNavigation();
  const { isOnboarded, profiles } = useSelector(state => state.user);

  useEffect(() => {
    setTimeout(() => {
      if (!isOnboarded) {
        navigation.navigate(MainRoutes.GENRE);
      } else if (profiles.length > 1) {
        navigation.navigate(MainRoutes.WHO_IS_WATCHING);
      } else {
        navigation.replace(MainRoutes.MAIN_DRAWER);
      }
    }, 0);
  }, []);

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
