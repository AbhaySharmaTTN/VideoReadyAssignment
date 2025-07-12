import { StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomTextInput from '../../components/CustomTextInput';
import { colors } from '../../utils/colors';
import { useNavigation, useRoute } from '@react-navigation/native';
import AppButton from '../../components/AppButton';
import { useDispatch } from 'react-redux';

const UserDetailsUpdate = () => {
  const route = useRoute();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  //   const dispatch = useDispatch();
  const navigation = useNavigation();

  function handleCreateAccount() {
    if (!email || !password || !name) {
      setError('Name, Email Password fields are required');
      return;
    }
  }

  return (
    <SafeAreaView style={styles.mainContainer}>
      <View style={styles.header}>
        <Text style={styles.headerText}>UPDATE YOUR DETAILS</Text>
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
        <CustomTextInput value={route.params?.phoneNumber} editable={false} />
        <CustomTextInput
          value={password}
          onChangeText={setPassword}
          textInputConfig={{
            placeholder: 'Password',
            placeholderTextColor: colors.placeholderTextColor,
          }}
          error={error}
        />
      </View>
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
  },
  header: {
    width: '100%',
    alignItems: 'center',
    marginTop: 60,
    marginBottom: 30,
  },
  headerText: {
    color: colors.textColorBlue,
    fontSize: 20,
    fontWeight: 'bold',
    letterSpacing: 2,
  },
  inputContainer: {
    marginTop: 40,
    padding: 20,
  },
  createAccountButton: {
    marginHorizontal: 20,
  },
  errorText: {
    color: colors.errorColor,
    width: '100%',
    paddingHorizontal: 20,
    fontSize: 12,
  },
});
