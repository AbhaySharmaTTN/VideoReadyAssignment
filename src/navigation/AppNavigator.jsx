import { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AuthNavigator from './AuthNavigator';
import MainStack from './main_navigator/MainStack';
import { useSelector } from 'react-redux';

const AppNavigator = () => {
  const loggedIn = useSelector(state => state.user.isLoggedIn);
//   const state = useSelector(state => {
//     console.log(state.user);
//     return state.user;
//   });
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <SafeAreaProvider>
          {loggedIn ? <MainStack /> : <AuthNavigator />}
        </SafeAreaProvider>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default AppNavigator;
