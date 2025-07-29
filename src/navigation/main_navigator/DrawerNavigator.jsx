import { StyleSheet } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { MainRoutes } from '../../utils/Routes';
import { colors } from '../../utils/colors';
import BottomNavigator from './BottomNavigator';
import VideoReadyDrawerContent from '../../components/VideoReadyDrawerContent';
import VideoReadyHeader from '../../components/VideoReadyHeader';
import Downloads from '../../screens/main_screens/Downloads/Downloads';
import Profiles from '../../screens/main_screens/Profiles/Profiles';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        sceneStyle: {
          backgroundColor: colors.appBackground,
        },
        header: () => <VideoReadyHeader />,
      }}
      drawerContent={props => <VideoReadyDrawerContent {...props} />}
    >
      <Drawer.Screen
        name={MainRoutes.MAIN_BOTTOM_TABS}
        component={BottomNavigator}
      />
      <Drawer.Screen name={MainRoutes.PROFILES} component={Profiles} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;

const styles = StyleSheet.create({});
