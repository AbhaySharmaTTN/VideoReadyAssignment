import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { ACCOUNT_DETAILS } from '../../utils/strings';

const AccountDetails = () => {
  return (
    <View>
      <Text>{ACCOUNT_DETAILS}</Text>
    </View>
  );
};

export default AccountDetails;

const styles = StyleSheet.create({});
