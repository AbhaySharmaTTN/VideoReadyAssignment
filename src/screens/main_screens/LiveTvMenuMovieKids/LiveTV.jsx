import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../../../utils/colors';
import { LIVETV } from '../../../utils/strings';

const LiveTV = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{LIVETV}</Text>
    </View>
  );
};

export default LiveTV;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: colors.appButton,
    fontSize: 20,
    letterSpacing: 2,
  },
});
