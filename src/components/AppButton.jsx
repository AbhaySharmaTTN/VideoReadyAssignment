import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { colors } from '../utils/colors';

const AppButton = ({ title, onPress, style, textStyle, disabled }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.button, disabled && styles.disabled, style]}
      activeOpacity={0.7}
      disabled={disabled}
    >
      <Text style={[styles.buttonText, textStyle]}>{title}</Text>
    </TouchableOpacity>
  );
};

export default AppButton;

const styles = StyleSheet.create({
  button: {
    width: 'auto',
    backgroundColor: colors.appButton,
    paddingVertical: 10,
    borderRadius: 6,
    alignItems: 'center',
    marginBottom: 12,
  },
  buttonText: {
    color: colors.textColorWhite,
    fontWeight: 'bold',
    fontSize: 16,
  },
  disabled: {
    backgroundColor: colors.appButtonDisabled,
  },
});
