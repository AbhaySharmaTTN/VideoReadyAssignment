import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../utils/colors';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { containerRef } from '../navigation/main_navigator/drawerRef';
import { DrawerActions } from '@react-navigation/native';

const VideoReadyLogoHeader = ({ disableDrawer = false }) => {
  return (
    <SafeAreaView edges={['top']} style={styles.safeArea}>
      <View style={styles.headerContainer}>
        <Image
          source={require('../../assets/logo.png')}
          resizeMode="contain"
          style={styles.logo}
        />
      </View>
    </SafeAreaView>
  );
};

export default VideoReadyLogoHeader;

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: colors.appHeaderColor,
  },
  headerContainer: {
    flexDirection: 'row',
    padding: 4,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.appHeaderColor,
  },
  logo: {
    width: 50,
    height: 50,
    marginLeft: 10,
  },
  iconContainer: {
    flexDirection: 'row',
  },
  icon: {
    color: colors.textColorWhite,
    fontSize: 30,
    marginHorizontal: 5,
  },
  profileIcon: {
    width: 30,
    height: 30,
    marginHorizontal: 5,
  },
});
