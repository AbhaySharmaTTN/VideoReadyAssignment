import { Image, StyleSheet, Text, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomePage from '../../screens/main_screens/HomePage';
import Movie from '../../screens/main_screens/Movie';
import Kids from '../../screens/main_screens/Kids';
import LiveTV from '../../screens/main_screens/LiveTV';
import { colors } from '../../utils/colors';
import { MainRoutes } from '../../utils/Routes';
import VideoReadyHeader from '../../components/VideoReadyHeader';

const Tab = createBottomTabNavigator();

const BottomNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        sceneStyle: {
          backgroundColor: colors.appBackground,
        },
        tabBarStyle: {
          backgroundColor: colors.tabBarColor,
          paddingTop: 5,
        },
        tabBarActiveTintColor: colors.tabBarActiveTintColor,
        tabBarInactiveTintColor: colors.tabBarInactiveTintColor,
        header: () => <VideoReadyHeader />,
      }}
    >
      <Tab.Screen
        name={MainRoutes.HOME}
        component={HomePage}
        options={{
          tabBarIcon: ({ color, size }) => {
            return (
              <Image
                source={require('../../../assets/home.png')}
                tintColor={color}
                width={20}
                height={20}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name={MainRoutes.MOVIE}
        component={Movie}
        options={{
          tabBarIcon: ({ color, size }) => {
            return (
              <Image
                source={require('../../../assets/movie.png')}
                tintColor={color}
                width={20}
                height={20}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name={MainRoutes.KIDS}
        component={Kids}
        options={{
          tabBarIcon: ({ color, size }) => {
            return (
              <Image
                source={require('../../../assets/kids.png')}
                tintColor={color}
                width={20}
                height={20}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name={MainRoutes.LIVE_TV}
        component={LiveTV}
        options={{
          tabBarIcon: ({ color, size }) => {
            return (
              <Image
                source={require('../../../assets/live_tv.png')}
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
