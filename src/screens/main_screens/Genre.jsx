import { Button, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { useDispatch } from 'react-redux';
import { addProfile } from '../../store/userSlice';
import { SafeAreaView } from 'react-native-safe-area-context';

const Genre = () => {
  const dispatch = useDispatch();


  return (
    <SafeAreaView>
      <Text>Genre</Text>
    </SafeAreaView>
  );
};

export default Genre;

const styles = StyleSheet.create({});
