import { StyleSheet } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { MainRoutes } from '../../utils/Routes';
import { colors } from '../../utils/colors';
import BottomNavigator from './BottomNavigator';
import { drawerRef } from './drawerRef';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
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

export default DrawerNavigator;

const styles = StyleSheet.create({});
