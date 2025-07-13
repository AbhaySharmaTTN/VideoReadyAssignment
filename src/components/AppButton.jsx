import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { colors } from '../utils/colors';
import Icon from 'react-native-vector-icons/MaterialIcons';

const AppButton = ({
  title,
  onPress,
  style,
  textStyle,
  disabled,
  icon,
  iconSize,
  iconColor,
  iconStyle,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.button, disabled && styles.disabled, style]}
      activeOpacity={0.7}
      disabled={disabled}
    >
      <View style={styles.iconAndTextContainer}>
        {icon && (
          <Icon
            name={icon}
            size={iconSize}
            color={iconColor}
            style={iconStyle}
          />
        )}
        <Text style={[styles.buttonText, textStyle]}>{title}</Text>
      </View>
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
  iconAndTextContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
