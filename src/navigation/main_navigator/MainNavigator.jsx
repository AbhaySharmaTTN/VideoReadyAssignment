import { StyleSheet } from 'react-native';
import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { MainRoutes } from '../../utils/Routes';
import { colors } from '../../utils/colors';
import BottomNavigator from './BottomNavigator';

const Drawer = createDrawerNavigator();

const MainNavigator = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        sceneStyle: {
          backgroundColor: colors.appBackground,
        },
      }}
    >
      <Drawer.Screen
        name={MainRoutes.MAIN_BOTTOM_TABS}
        component={BottomNavigator}
      />
    </Drawer.Navigator>
  );
};

export default MainNavigator;

const styles = StyleSheet.create({});
