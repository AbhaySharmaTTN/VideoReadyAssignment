import { Button, StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch } from 'react-redux';
import { addProfile } from '../../store/userSlice';

const HomePage = () => {
  const dispatch = useDispatch();
  const [index, setIndex] = useState(0);
  return (
    <SafeAreaView>
      <Text>HomePage</Text>
      <Button
        title="Add"
        onPress={() => {
          dispatch(addProfile({ profileName: `Abhay${index}` }));
          setIndex(prev => prev + 1);
        }}
      />
    </SafeAreaView>
  );
};

export default HomePage;

const styles = StyleSheet.create({});
