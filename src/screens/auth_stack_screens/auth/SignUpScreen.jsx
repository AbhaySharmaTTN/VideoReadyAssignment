import React, { useState } from 'react';
import { Alert, Platform, StyleSheet, View } from 'react-native';
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
  const [phoneError, setPhoneError] = useState('');
  const [otpError, setOtpError] = useState(false);

  const navigation = useNavigation();

  const sendOTP = async () => {
    setPhoneError('');
    if (!phone) {
      setPhoneError('Phone number cannot be empty');
      return;
    }
    try {
      setLoading(true);
      //   if (Platform.OS == 'ios') {
      auth().settings.appVerificationDisabledForTesting = true;
      //   }
      const phoneNumber = phone.startsWith('+91') ? phone : '+91' + phone;
      const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
      //   console.log(confirmation);
      setConfirm(confirmation);
      Alert.alert('OTP sent');
    } catch (err) {
      Alert.alert('Error sending OTP');
      setPhoneError('Make sure the number you entered is correct');
    } finally {
      setLoading(false);
    }
  };

  const verifyCode = async () => {
    setOtpError('');
    if (!code) {
      setOtpError('Otp cannot be empty');
      return;
    }
    try {
      setLoading(true);
      await confirm.confirm(code);
      navigation.navigate(AuthRoutes.USER_DETAILS_UPDATE, {
        phoneNumber: phone,
      });
    } catch (err) {
      setOtpError('Invalid code');
      console.log(err.message);
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
        showErrorText={true}
        error={phoneError}
      />
      {confirm && (
        <CustomTextInput
          label="OTP Code"
          value={code}
          onChangeText={setCode}
          keyboardType="number-pad"
          showErrorText={true}
          error={otpError}
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
    padding: 20,
    paddingTop: 50,
  },
});
