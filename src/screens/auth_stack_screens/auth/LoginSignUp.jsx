import { Image, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import SignInSignUpTabSlider from './SignInSignUpTabSlider';

const LoginSignUp = () => {
  return (
    <SafeAreaView style={styles.mainContainer}>
      <View style={styles.logoContainer}>
        <Image
          source={require('../../../../assets/video_ready_text.png')}
          style={styles.videoReadyTextImage}
          resizeMode="contain"
        />
      </View>

      <SignInSignUpTabSlider
        onSignInPress={() => {}}
        onSignUpPress={() => {}}
      />
    </SafeAreaView>
  );
};

export default LoginSignUp;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  logoContainer: {
    marginVertical: 25,
    alignItems: 'center',
  },
  videoReadyTextImage: {
    width: 220,
    height: 60,
  },
  SignInSignUpTabContainer: {},
});

// const LoginSignUp = () => {
//   const [phoneNumber, setPhoneNumber] = useState('');
//   const [code, setCode] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [confirmation, setConfirm] = useState(null);

//   const signInWithPhoneNumber = async () => {
//     try {
//       setLoading(true);
//       auth().settings.appVerificationDisabledForTesting = true;
//       const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
//       console.log(confirmation);
//       setConfirm(confirmation);
//       Alert.alert('OTP Sent');
//     } catch (error) {
//       Alert.alert('Error sending OTP', error.message);
//       console.error(error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const confirmCode = async () => {
//     try {
//       setLoading(true);
//       await confirmation.confirm(code);
//       Alert.alert('Success', 'Phone authentication successful!');
//       console.log('Phone authentication successful');
//     } catch (error) {
//       Alert.alert('Invalid code');
//       console.error('Invalid code.', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <View style={styles.mainContainer}>
//       <TextInput value={phoneNumber} onChangeText={setPhoneNumber} />
//       <TextInput value={code} onChangeText={setCode} />
//       <Button title="Send OTP" onPress={signInWithPhoneNumber} />
//       <Button title="Verify Code" onPress={confirmCode} />
//       {loading && <ActivityIndicator style={{ marginTop: 20 }} />}
//     </View>
//   );
// };
