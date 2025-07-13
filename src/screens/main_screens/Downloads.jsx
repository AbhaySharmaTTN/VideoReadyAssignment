import { StyleSheet, Text, View } from 'react-native';
import React, { useLayoutEffect } from 'react';
import { useNavigation } from '@react-navigation/native';

const Downloads = () => {
  const navigation = useNavigation();

  useLayoutEffect(() => {}, [navigation]);
  return (
    <View>
      <Text>Downloads</Text>
    </View>
  );
};

export default Downloads;

const styles = StyleSheet.create({});
