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

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  function handleCreateAccount() {
    const newErrors = {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    };

    let hasError = false;

    if (!name) {
      newErrors.name = 'Name is required';
      hasError = true;
    }

    if (!email) {
      newErrors.email = 'Email is required';
      hasError = true;
    } else if (!isValidEmail(email)) {
      newErrors.email = 'Please enter a valid email address';
      hasError = true;
    }

    if (!password) {
      newErrors.password = 'Password is required';
      hasError = true;
    } else if (!isValidPassword(password)) {
      newErrors.password = 'Password must be at least 6 characters, contain a uppercase, lowercase, number and a special character';
      hasError = true;
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = 'Confirm Password is required';
      hasError = true;
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
      hasError = true;
    }

    setErrors(newErrors);

    if (!hasError) {
      dispatch(signUp({ name, email, phoneNumber, password }));
    }
  }

  return (
    <View style={styles.mainContainer}>
      <SafeAreaView edges={['top']} style={styles.topHeader}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backIconContainer}
        >
          <Icon name="arrow-back" style={styles.arrowBackIcon} />
        </TouchableOpacity>
        <View style={styles.header}>
          <Text style={styles.headerText}>You are almost done</Text>
        </View>
      </SafeAreaView>

      <View style={styles.EnterText}>
        <Text style={styles.enterTextContent}>
          Please enter your Name, Password and Email to create your profile
        </Text>
      </View>

      <View style={styles.inputContainer}>
        <CustomTextInput
          value={name}
          onChangeText={text => {
            setName(text);
            if (errors.name) setErrors(prev => ({ ...prev, name: '' }));
          }}
          textInputConfig={{
            placeholder: 'Name',
            placeholderTextColor: colors.placeholderTextColor,
          }}
          error={errors.name}
          showErrorText={true}
        />
        <CustomTextInput
          value={email}
          onChangeText={text => {
            setEmail(text);
            if (errors.email) setErrors(prev => ({ ...prev, email: '' }));
          }}
          textInputConfig={{
            placeholder: 'Email',
            placeholderTextColor: colors.placeholderTextColor,
          }}
          error={errors.email}
          showErrorText={true}
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
          onChangeText={text => {
            setPassword(text);
            if (errors.password) setErrors(prev => ({ ...prev, password: '' }));
          }}
          textInputConfig={{
            placeholder: 'Password',
            placeholderTextColor: colors.placeholderTextColor,
            secureTextEntry: true,
          }}
          error={errors.password}
          showErrorText={true}
        />
        <CustomTextInput
          value={confirmPassword}
          onChangeText={text => {
            setConfirmPassword(text);
            if (errors.confirmPassword)
              setErrors(prev => ({ ...prev, confirmPassword: '' }));
          }}
          textInputConfig={{
            placeholder: 'Confirm Password',
            placeholderTextColor: colors.placeholderTextColor,
            secureTextEntry: true,
          }}
          error={errors.confirmPassword}
          showErrorText={true}
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
    </View>
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
    backgroundColor: colors.appHeaderColor,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
  },
  header: {
    width: '100%',
    alignItems: 'center',
  },
  headerText: {
    color: colors.textColorWhite,
    fontSize: 20,
    fontWeight: 'bold',
    letterSpacing: 2,
  },
  inputContainer: {
    // marginTop: 10,
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
    padding: 20,
    borderWidth: 1,
    alignItems: 'center'
  },
  enterTextContent: {
    fontSize: 16,
    color: colors.textColorWhite,
    fontWeight: 'bold'
  },
  arrowBackIcon: {
    color: colors.textColorWhite,
    fontSize: 24,
  },
  backIconContainer: {
    alignItems: 'center',
    position: 'absolute',
    left: 10,
    bottom: 10,
  },
});
