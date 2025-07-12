import { createStackNavigator } from '@react-navigation/stack';
import { MainRoutes } from '../../utils/Routes';
import { colors } from '../../utils/colors';
import DrawerNavigator from './DrawerNavigator';
import VideoReadyHeader from '../../components/VideoReadyHeader';

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
      <Stack.Screen name={MainRoutes.MAIN_DRAWER} component={DrawerNavigator} />
    </Stack.Navigator>
  );
};

export default MainStack;
