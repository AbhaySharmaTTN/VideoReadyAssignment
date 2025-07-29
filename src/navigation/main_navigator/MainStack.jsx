import { createStackNavigator } from '@react-navigation/stack';
import { MainRoutes } from '../../utils/Routes';
import { colors } from '../../utils/colors';
import DrawerNavigator from './DrawerNavigator';
import { useSelector } from 'react-redux';
import MainGateScreen from '../../screens/main_screens/MainGateScreen/MainGateScreen'
import Genre from '../../screens/main_screens/Genre/Genre'
import WhoIsWatching from '../../screens/main_screens/WhoIsWatching/WhoIsWatching'
import AddProfile from '../../screens/main_screens/AddProfile/AddProfile'
import Downloads from '../../screens/main_screens/Downloads/Downloads'
import EditUserProfile from '../../screens/main_screens/EditUserProfile/EditUserProfile'
import VideoDetails from '../../screens/main_screens/VideoDetails/VideoDetails'

const Stack = createStackNavigator();

const MainStack = () => {
    

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: {
          backgroundColor: colors.appBackground,
        },
        headerStyle: {
          backgroundColor: colors.appBackground,
        },
      }}
    >
      <Stack.Screen name={MainRoutes.MAIN_GATE} component={MainGateScreen} />
      <Stack.Screen name={MainRoutes.MAIN_DRAWER} component={DrawerNavigator} />
      <Stack.Screen name={MainRoutes.GENRE} component={Genre} />
      <Stack.Screen
        name={MainRoutes.WHO_IS_WATCHING}
        component={WhoIsWatching}
      />
        <Stack.Screen name={MainRoutes.ADD_PROFILE} component={AddProfile} />
      <Stack.Screen name={MainRoutes.DOWNLOADS} component={Downloads} />
      <Stack.Screen
        name={MainRoutes.EDIT_USER_DETAILS}
        component={EditUserProfile}
      />
      <Stack.Screen name={MainRoutes.VIDEO_DETAILS} component={VideoDetails} />
    </Stack.Navigator>
  );
};

export default MainStack;
