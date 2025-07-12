import React, { useState } from 'react';
import { useWindowDimensions } from 'react-native';
import { TabBar, TabView } from 'react-native-tab-view';
import SignInScreen from './SignInScreen';
import SignUpScreen from './SignUpScreen';
import { colors } from '../../../utils/colors';

const routes = [
  { key: 'signIn', title: 'SIGNIN' },
  { key: 'signUp', title: 'SIGNUP' },
];

const SignInSignUpTabSlider = () => {
  const [index, setIndex] = useState(0);
  const layout = useWindowDimensions();

  const renderScene = ({ route }) => {
    switch (route.key) {
      case 'signIn':
        return <SignInScreen />;
      case 'signUp':
        return <SignUpScreen />;
      default:
        return null;
    }
  };

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
      renderTabBar={props => <CustomTabBar {...props} />}
    />
  );
};

const CustomTabBar = props => (
  <TabBar
    {...props}
    indicatorStyle={{
      backgroundColor: colors.appButton,
      width: '10%',
      marginLeft: 80,
    }}
    style={{ backgroundColor: colors.appBackground }}
    labelStyle={{
      fontWeight: 'bold',
      letterSpacing: 2,
    }}
  />
);

export default SignInSignUpTabSlider;
