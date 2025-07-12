import { useState } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import { TabBar, TabView } from 'react-native-tab-view';
import { colors } from '../../../utils/colors';
import CustomTextInput from '../../../components/CustomTextInput';
import AppButton from '../../../components/AppButton';

const SignIn = ({ onSignInPress }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <View style={styles.page}>
      <CustomTextInput
        label="Email / Mobile Number"
        value={email}
        onChangeText={setEmail}
        textInputConfig={{
          autoCapitalize: false,
        }}
      />
      <CustomTextInput
        label="Password"
        value={password}
        onChangeText={setPassword}
        textInputConfig={{
          autoCapitalize: false,
          secureTextEntry: true,
        }}
      />
      <AppButton title="Sign In" onPress={onSignInPress} />
      <TouchableOpacity>
        <Text style={styles.forgotPasswordText}>Forgot Password ?</Text>
      </TouchableOpacity>
    </View>
  );
};

const SignUp = ({ onSignUpPress }) => (
  <View style={styles.page}>
    <CustomTextInput label="Mobile Number" />
    <AppButton title="Sign Up" onPress={onSignUpPress} />
  </View>
);

const routes = [
  { key: 'signIn', title: 'SIGNIN' },
  { key: 'signUp', title: 'SIGNUP' },
];

const SignInSignUpTabSlider = ({ onSignInPress, onSignUpPress }) => {
  const [index, setIndex] = useState(0);
  const layout = useWindowDimensions();

  const renderScene = ({ route }) => {
    switch (route.key) {
      case 'signIn':
        return <SignIn onSignInPress={onSignInPress} />;
      case 'signUp':
        return <SignUp onSignUpPress={onSignUpPress} />;
      default:
        return null;
    }
  };

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width, height: layout.height }}
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

const styles = StyleSheet.create({
  page: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
    paddingTop: 50,
  },
  forgotPasswordText: {
    color: colors.textColorBlue,
    paddingVertical: 12,
  },
});

export default SignInSignUpTabSlider;
