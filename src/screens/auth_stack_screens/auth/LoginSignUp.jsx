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
      <SignInSignUpTabSlider />
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
});
