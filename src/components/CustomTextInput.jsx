import React from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TextInputProps,
} from 'react-native';
import { colors } from '../utils/colors';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const CustomTextInput = ({
  label,
  value,
  onChangeText,
  error,
  style,
  textInputConfig,
}) => {
  return (
    <View style={[styles.container, style]}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TextInput
        style={[styles.input, error && styles.inputError]}
        value={value}
        onChangeText={onChangeText}
        {...textInputConfig}
      />
      
      {error && <Text style={styles.errorText}>{error}</Text>}
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
  input: {
    backgroundColor: colors.inputBackground,
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderRadius: 6,
    color: colors.textColorWhite,
    fontSize: 16,
  },
  inputError: {
    borderColor: 'red',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 4,
  },
});
