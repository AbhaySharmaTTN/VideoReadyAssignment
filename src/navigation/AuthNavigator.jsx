import { createStackNavigator } from '@react-navigation/stack';
import { AuthRoutes } from '../utils/Routes';
import Carousel from '../screens/auth_stack_screens/Carousel';
import LoginSignUp from '../screens/auth_stack_screens/auth/LoginSignUp';
import EmailPasswordUpdate from '../screens/auth_stack_screens/EmailPasswordUpdate';
import WhoIsWatching from '../screens/auth_stack_screens/WhoIsWatching';
import Genre from '../screens/auth_stack_screens/Genre';
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
      <AuthStack.Screen
        name={AuthRoutes.LOGIN_SIGNUP}
        component={LoginSignUp}
      />
      <AuthStack.Screen name={AuthRoutes.CAROUSEL} component={Carousel} />
      <AuthStack.Screen
        name={AuthRoutes.EMAIL_PASSWORD}
        component={EmailPasswordUpdate}
      />
      <AuthStack.Screen
        name={AuthRoutes.WHO_IS_WATCHING}
        component={WhoIsWatching}
      />
      <AuthStack.Screen name={AuthRoutes.GENRE} component={Genre} />
    </AuthStack.Navigator>
  );
};

export default AuthNavigator;
