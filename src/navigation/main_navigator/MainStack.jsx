import { View, Text } from 'react-native';
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { MainRoutes } from '../../utils/Routes';
import { colors } from '../../utils/colors';
import MainNavigator from './MainNavigator';

const Stack = createStackNavigator();

const MainStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: {
          backgroundColor: colors.appBackground,
        },
      }}
    >
      <Stack.Screen name={MainRoutes.MAIN_DRAWER} component={MainNavigator} />
    </Stack.Navigator>
  );
};

export default MainStack;
