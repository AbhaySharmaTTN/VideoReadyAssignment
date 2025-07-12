import React, { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import auth from '@react-native-firebase/auth';
import AppButton from '../../../components/AppButton';
import CustomTextInput from '../../../components/CustomTextInput';
import { useNavigation } from '@react-navigation/native';
import { AuthRoutes } from '../../../utils/Routes';

const SignUpScreen = () => {
  const [phone, setPhone] = useState('');
  const [code, setCode] = useState('');
  const [confirm, setConfirm] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();

  const sendOTP = async () => {
    try {
      setLoading(true);
      auth().settings.appVerificationDisabledForTesting = true;
      const confirmation = await auth().signInWithPhoneNumber(phone);
      setConfirm(confirmation);
      Alert.alert('OTP sent');
    } catch (err) {
      Alert.alert('Error sending OTP', err.message);
    } finally {
      setLoading(false);
    }
  };

  const verifyCode = async () => {
    try {
      setLoading(true);
      await confirm.confirm(code);
      Alert.alert('Phone Verified!');
      navigation.navigate(AuthRoutes.EMAIL_PASSWORD);
    } catch (err) {
      Alert.alert('Invalid code');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.page}>
      <CustomTextInput
        label="Phone Number"
        value={phone}
        onChangeText={setPhone}
        keyboardType="phone-pad"
      />
      {confirm && (
        <CustomTextInput
          label="OTP Code"
          value={code}
          onChangeText={setCode}
          keyboardType="number-pad"
        />
      )}
      <AppButton
        title={confirm ? 'Verify Code' : 'Send OTP'}
        onPress={confirm ? verifyCode : sendOTP}
        disabled={loading}
      />
    </View>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
    paddingTop: 50,
  },
});
