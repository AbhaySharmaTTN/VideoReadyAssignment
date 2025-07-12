import { createStackNavigator } from '@react-navigation/stack';
import { MainRoutes } from '../../utils/Routes';
import { colors } from '../../utils/colors';
import DrawerNavigator from './DrawerNavigator';
import VideoReadyHeader from '../../components/VideoReadyHeader';
import MainGateScreen from '../../screens/main_screens/MainGateScreen';
import Genre from '../../screens/main_screens/Genre';
import WhoIsWatching from '../../screens/main_screens/WhoIsWatching';

const Stack = createStackNavigator();

const MainStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
        cardStyle: {
          backgroundColor: colors.appBackground,
        },
        headerStyle: {
          backgroundColor: colors.appBackground,
        },
        header: () => <VideoReadyHeader />,
      }}
    >
      <Stack.Screen
        name={MainRoutes.MAIN_GATE}
        component={MainGateScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen name={MainRoutes.MAIN_DRAWER} component={DrawerNavigator} />
      <Stack.Screen
        name={MainRoutes.GENRE}
        component={Genre}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={MainRoutes.WHO_IS_WATCHING}
        component={WhoIsWatching}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default MainStack;
