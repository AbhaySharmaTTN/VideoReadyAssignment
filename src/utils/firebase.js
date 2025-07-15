import auth from '@react-native-firebase/auth';

export const  sendOTPRequest = async (phone, setLoading, setConfirm, setPhoneError) => {
  setPhoneError('');
  if (!phone) {
    setPhoneError('Phone number cannot be empty');
    return;
  }
  try {
    setLoading(true);
    auth().settings.appVerificationDisabledForTesting = true;
    const phoneNumber = phone.startsWith('+91') ? phone : '+91' + phone;
    const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
    setConfirm(confirmation);
    Alert.alert('OTP sent');
  } catch (err) {
    Alert.alert('Error sending OTP');
    setPhoneError('Make sure the number you entered is correct');
  } finally {
    setLoading(false);
  }
}

export const verifyOtp = async (setOtpError, setLoading, navigateAfterSuccess, confirm, code) => {
    setOtpError('');
    if (!code) {
      setOtpError('Otp cannot be empty');
      return;
    }
    try {
      setLoading(true);
      await confirm.confirm(code);
      navigateAfterSuccess();
    } catch (err) {
      setOtpError('Invalid code');
      console.log(err.message);
    } finally {
      setLoading(false);
    }
  };
