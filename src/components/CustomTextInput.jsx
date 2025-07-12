import React from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TextInputProps,
} from 'react-native';
import { colors } from '../utils/colors';

const CustomTextInput = ({
  label,
  value,
  onChangeText,
  error,
  style,
  textInputConfig,
  showErrorText = false,
  editable = true,
}) => {
  return (
    <View style={[styles.container, style]}>
      {label && (
        <Text style={[styles.label, error && styles.labelError]}>{label}</Text>
      )}
      <TextInput
        style={[
          styles.input,
          error && styles.inputError,
          !editable && styles.disabledInput,
        ]}
        value={value}
        onChangeText={onChangeText}
        {...textInputConfig}
        editable={editable}
      />

      {error && showErrorText && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

export default CustomTextInput;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    color: colors.labelColor,
    marginBottom: 6,
    letterSpacing: 1,
  },
  labelError: {
    color: 'red',
  },
  input: {
    backgroundColor: colors.inputBackground,
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderRadius: 6,
    color: colors.textColorWhite,
    fontSize: 16,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  inputError: {
    borderColor: 'red',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 4,
  },
  disabledInput: {
    color: '#889dc0',
  },
});
