import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import AppButton from '../../../components/AppButton';
import CustomTextInput from '../../../components/CustomTextInput';
import { useNavigation } from '@react-navigation/native';
import { AuthRoutes } from '../../../utils/Routes';
import { sendOTPRequest, verifyOtp } from '../../../utils/firebase';

const SignUpScreen = () => {
  const [phone, setPhone] = useState('');
  const [code, setCode] = useState('');
  const [confirm, setConfirm] = useState(null);
  const [loading, setLoading] = useState(false);
  const [phoneError, setPhoneError] = useState('');
  const [otpError, setOtpError] = useState(false);

  const navigation = useNavigation();

  const sendOTP = async () => {
    sendOTPRequest(phone, setLoading, setConfirm, setPhoneError);
  };

  const verifyCode = async () => {
    function navigateAfterSuccess() {
      navigation.navigate(AuthRoutes.USER_DETAILS_UPDATE, {
        phoneNumber: phone,
      });
    }
    verifyOtp(setOtpError, setLoading, navigateAfterSuccess, confirm, code);
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
