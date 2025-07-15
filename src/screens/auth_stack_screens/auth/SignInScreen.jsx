import { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import CustomTextInput from '../../../components/CustomTextInput';
import AppButton from '../../../components/AppButton';
import { colors } from '../../../utils/colors';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { signIn } from '../../../store/userSlice';

const SignInScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const errorFromStateMessage = useSelector(state => state.user.error);

  const handleSignIn = () => {
    setError(null);
    if (!email || !password) {
      setError('Email and Password are required !');
      return;
    }
    dispatch(
      signIn({
        email,
        password,
      }),
    );
  };

  return (
    <View style={styles.page}>
      <CustomTextInput
        label="Email / Mobile Number"
        value={email}
        onChangeText={text => {
          setError('');
          setEmail(text);
        }}
        error={error}
      />
      <CustomTextInput
        label="Password"
        value={password}
        onChangeText={text => {
          setError('');
          setPassword(text);
        }}
        error={error}
        textInputConfig={{
          secureTextEntry: true,
        }}
      />
      <Text style={styles.errorText}>
        {errorFromStateMessage ? errorFromStateMessage : ''}
      </Text>
      <Text style={styles.errorText}>{error ? error : ''}</Text>
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
    alignSelf: 'center',
    marginTop: 10,
  },
  errorText: {
    color: colors.errorColor,
    fontSize: 12,
    paddingVertical: 4,
  },
});
