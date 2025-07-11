import { View, Text } from 'react-native';
import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AuthNavigator from './AuthNavigator';
import MainStack from './main_navigator/MainStack';

const AppNavigator = () => {
  const [loggedIn, setLoginStatus] = useState(false);

  return (
    <NavigationContainer>
      <SafeAreaProvider>
        {!loggedIn ? <MainStack /> : <AuthNavigator />}
      </SafeAreaProvider>
    </NavigationContainer>
  );
};

export default AppNavigator;
