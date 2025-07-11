import { Image, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomePage from '../../screens/main_screens/HomePage';
import Movie from '../../screens/main_screens/Movie';
import Kids from '../../screens/main_screens/Kids';
import LiveTV from '../../screens/main_screens/LiveTV';
import { colors } from '../../utils/colors';

const Tab = createBottomTabNavigator();

const BottomNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        sceneStyle: {
          backgroundColor: colors.appBackground,
        },
        tabBarStyle: {
          backgroundColor: colors.tabBarColor,
          paddingTop: 5,
        },
        tabBarActiveTintColor: colors.tabBarActiveTintColor,
        tabBarInactiveTintColor: colors.tabBarInactiveTintColor,
      }}
    >
      <Tab.Screen
        name="HomePage"
        component={HomePage}
        options={{
          tabBarIcon: ({ color, size }) => {
            return (
              <Image
                source={require('../../../assests/home.png')}
                tintColor={color}
                width={20}
                height={20}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="Movie"
        component={Movie}
        options={{
          tabBarIcon: ({ color, size }) => {
            return (
              <Image
                source={require('../../../assests/movie.png')}
                tintColor={color}
                width={20}
                height={20}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="Kids"
        component={Kids}
        options={{
          tabBarIcon: ({ color, size }) => {
            return (
              <Image
                source={require('../../../assests/kids.png')}
                tintColor={color}
                width={20}
                height={20}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="LiveTV"
        component={LiveTV}
        options={{
          tabBarIcon: ({ color, size }) => {
            return (
              <Image
                source={require('../../../assests/live_tv.png')}
                tintColor={color}
                width={20}
                height={20}
              />
            );
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomNavigator;
