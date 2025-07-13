import { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AuthNavigator from './AuthNavigator';
import MainStack from './main_navigator/MainStack';
import { useSelector } from 'react-redux';
import { containerRef } from './main_navigator/drawerRef';
import { colors } from '../utils/colors';

const AppNavigator = () => {
  const loggedIn = useSelector(state => state.user.isLoggedIn);
  return (
    <SafeAreaProvider
      style={{ backgroundColor: colors.appBackground, flex: 1 }}
    >
      <NavigationContainer ref={containerRef}>
        <SafeAreaProvider>
          {loggedIn ? <MainStack /> : <AuthNavigator />}
        </SafeAreaProvider>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default AppNavigator;
