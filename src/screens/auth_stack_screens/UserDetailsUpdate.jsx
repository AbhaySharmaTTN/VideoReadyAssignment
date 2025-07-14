import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomTextInput from '../../components/CustomTextInput';
import { colors } from '../../utils/colors';
import { useNavigation, useRoute } from '@react-navigation/native';
import AppButton from '../../components/AppButton';
import { useDispatch, useSelector } from 'react-redux';
import { signUp } from '../../store/userSlice';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { isValidEmail, isValidPassword } from '../../utils/validators';

const UserDetailsUpdate = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const route = useRoute();

  const phoneNumber = route.params?.phoneNumber;
  const errorMessageFromState = useSelector(state => state.user.error);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  function handleCreateAccount() {
    if (!email || !password || !name || !confirmPassword) {
      setError('All fields are required');
      return;
    }

    if (!isValidEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }

    if (!isValidPassword(password)) {
      setError('Password must be at least 6 characters long');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setError('');
    dispatch(signUp({ name, email, phoneNumber, password }));
  }

  return (
    <SafeAreaView style={styles.mainContainer}>
      <View style={styles.topHeader}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color={colors.textColorWhite} />
        </TouchableOpacity>
      </View>

      <View style={styles.header}>
        <Text style={styles.headerText}>UPDATE YOUR DETAILS</Text>
      </View>

      <View style={styles.EnterText}>
        <Text style={styles.enterTextContent}>
          Please enter your Name, Password and Email to create your profile
        </Text>
      </View>

      <View style={styles.inputContainer}>
        <CustomTextInput
          value={name}
          onChangeText={setName}
          textInputConfig={{
            placeholder: 'Name',
            placeholderTextColor: colors.placeholderTextColor,
          }}
          error={error}
        />
        <CustomTextInput
          value={email}
          onChangeText={setEmail}
          textInputConfig={{
            placeholder: 'Email',
            placeholderTextColor: colors.placeholderTextColor,
          }}
          error={error}
        />
        <CustomTextInput
          value={phoneNumber}
          editable={false}
          textInputConfig={{
            placeholder: 'Phone Number',
          }}
        />
        <CustomTextInput
          value={password}
          onChangeText={setPassword}
          textInputConfig={{
            placeholder: 'Password',
            placeholderTextColor: colors.placeholderTextColor,
            secureTextEntry: true,
          }}
          error={error}
        />
        <CustomTextInput
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          textInputConfig={{
            placeholder: 'Confirm Password',
            placeholderTextColor: colors.placeholderTextColor,
            secureTextEntry: true,
          }}
          error={error}
        />
      </View>

      {errorMessageFromState ? (
        <Text style={styles.errorText}>{errorMessageFromState}</Text>
      ) : null}

      <AppButton
        title="Create Account"
        onPress={handleCreateAccount}
        style={styles.createAccountButton}
      />

      {error && <Text style={styles.errorText}>{error}*</Text>}
    </SafeAreaView>
  );
};

export default UserDetailsUpdate;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: colors.appBackground,
  },
  topHeader: {
    paddingHorizontal: 16,
    paddingTop: 10,
  },
  header: {
    width: '100%',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 30,
  },
  headerText: {
    color: colors.textColorBlue,
    fontSize: 20,
    fontWeight: 'bold',
    letterSpacing: 2,
  },
  inputContainer: {
    marginTop: 20,
    padding: 20,
  },
  createAccountButton: {
    marginHorizontal: 20,
    marginTop: 10,
  },
  errorText: {
    color: colors.errorColor,
    width: '100%',
    paddingHorizontal: 20,
    fontSize: 12,
    marginTop: 4,
  },
  EnterText: {
    padding: 15,
  },
  enterTextContent: {
    fontSize: 15,
    color: colors.textColorWhite,
  },
});
