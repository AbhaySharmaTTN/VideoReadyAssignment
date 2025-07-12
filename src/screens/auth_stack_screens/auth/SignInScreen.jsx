import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import CustomTextInput from '../../../components/CustomTextInput';
import AppButton from '../../../components/AppButton';
import { colors } from '../../../utils/colors';
import { useNavigation } from '@react-navigation/native';

const SignInScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();
  const [error, setError] = useState(false);

  const handleSignIn = () => {
    if (!email || !password) {
      setError(true);
      return;
    }
  };

  // use useEffect to check for error from state

  return (
    <View style={styles.page}>
      <CustomTextInput
        label="Email / Mobile Number"
        value={email}
        onChangeText={setEmail}
        error={error}
      />
      <CustomTextInput
        label="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        error={error}
      />
      <AppButton title="Sign In" onPress={handleSignIn} />
      <TouchableOpacity>
        <Text style={styles.forgotPasswordText}>Forgot Password ?</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SignInScreen;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    padding: 20,
    paddingTop: 50,
  },
  forgotPasswordText: {
    color: colors.textColorBlue,
    paddingVertical: 12,
    alignSelf: 'center',
  },
});
