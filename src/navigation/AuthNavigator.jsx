import { createStackNavigator } from '@react-navigation/stack';
import { AuthRoutes } from '../utils/Routes';
import Carousel from '../screens/auth_stack_screens/Carousel';
import LoginSignUp from '../screens/auth_stack_screens/auth/LoginSignUp';
import UserDetailsUpdate from '../screens/auth_stack_screens/UserDetailsUpdate';
import { colors } from '../utils/colors';

const AuthStack = createStackNavigator();

const AuthNavigator = () => {
  return (
    <AuthStack.Navigator
      screenOptions={{
        cardStyle: {
          backgroundColor: colors.appBackground,
        },
        headerShown: false,
      }}
    >
      <AuthStack.Screen name={AuthRoutes.CAROUSEL} component={Carousel} />
      <AuthStack.Screen
        name={AuthRoutes.LOGIN_SIGNUP}
        component={LoginSignUp}
      />
      <AuthStack.Screen
        name={AuthRoutes.USER_DETAILS_UPDATE}
        component={UserDetailsUpdate}
      />
    </AuthStack.Navigator>
  );
};

export default AuthNavigator;
