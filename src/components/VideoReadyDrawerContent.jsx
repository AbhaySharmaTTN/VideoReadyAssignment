import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../utils/colors';
import { FlatList } from 'react-native-gesture-handler';
import { useNavigationState } from '@react-navigation/native';
import { MainRoutes } from '../utils/Routes';
import { useDispatch } from 'react-redux';
import { logOut } from '../store/userSlice';

const drawerItems = [
  {
    title: 'Dashboard',
    icon: require('../../assets/home.png'),
    route: MainRoutes.MAIN_BOTTOM_TABS,
  },
  {
    title: 'My Account',
    icon: require('../../assets/my_account_icon.png'),
    route: null,
    showDivider: true,
  },
  {
    title: 'Setttings',
    icon: require('../../assets/settings_icon.png'),
    route: null,
  },
  {
    title: 'Profiles',
    icon: require('../../assets/my_profiles_icon.png'),
    route: MainRoutes.PROFILES,
  },
  {
    title: 'My Devices',
    icon: require('../../assets/my_profiles_icon.png'),
    route: null,
  },
  {
    title: 'Gift Code / Voucher',
    icon: require('../../assets/giftcode_voucher_icon.png'),
    route: null,
    showDivider: true,
  },
  {
    title: 'My Transactions',
    icon: require('../../assets/my_transaction_icon.png'),
    route: null,
  },
  {
    title: 'My Playlist',
    icon: require('../../assets/my_playlist.png'),
    route: null,
    showDivider: true,
  },
  {
    title: 'Watch History',
    icon: require('../../assets/watch_history_icon.png'),
    route: null,
  },
  {
    title: 'Downloaded Videos',
    icon: require('../../assets/download_icon.png'),
    route: MainRoutes.DOWNLOADS,
  },
  {
    title: 'Smart TV Quick Login',
    icon: require('../../assets/smart_tv_quick_login_icon.png'),
    route: null,
    showDivider: true,
  },
  {
    title: 'Sign Out',
    icon: require('../../assets/sign_out_icon.png'),
    route: 'Sign Out',
    showDivider: true,
  },
];

const VideoReadyDrawerContent = ({ navigation }) => {
  const currentRoute = useNavigationState(state => {
    const route = state.routes[state.index];
    return route.name;
  });

  const dispatch = useDispatch();

  function handleMenuItemClick(route) {
    if (!route) return;
    if (route === 'Sign Out') {
      Alert.alert(
        'Confirm Sign Out',
        'Are you sure you want to sign out?',
        [
          {
            text: 'No',
            onPress: () => {},
            style: 'cancel',
          },
          {
            text: 'Yes',
            onPress: () => {
              dispatch(logOut());
            },
            style: 'destructive',
          },
        ],
        { cancelable: true },
      );
      return;
    }
    navigation.navigate(route);
  }

  return (
    <SafeAreaView style={styles.mainContainer}>
      <View style={styles.profileIconContainer}>
        <Image
          source={require('../../assets/profileIcon.png')}
          style={styles.profileIcon}
        />
        <Text style={styles.profileText}> Abhay </Text>
      </View>
      <View style={styles.divider} />
      <FlatList
        data={drawerItems}
        keyExtractor={item => item.title}
        renderItem={({ item }) => {
          const isActive = item.route === currentRoute;
          return (
            <View>
              {item.showDivider && <View style={styles.divider} />}
              <MenuItem
                item={item}
                onPress={() => handleMenuItemClick(item.route)}
                isActive={isActive}
              />
            </View>
          );
        }}
      />
    </SafeAreaView>
  );
};

const MenuItem = ({ item, onPress, isActive }) => {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
      <View style={styles.menuItem}>
        <Image
          source={item.icon}
          style={[styles.menuIcon, isActive && { tintColor: colors.appButton }]}
        />
        <Text
          style={[styles.menuText, isActive && { color: colors.appButton }]}
        >
          {item.title}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default VideoReadyDrawerContent;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    padding: 10,
    backgroundColor: colors.appBackground,
  },
  profileIconContainer: {
    marginBottom: 10,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileIcon: {
    width: 80,
    height: 80,
  },
  profileText: {
    color: colors.textColorWhite,
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 20,
  },
  divider: {
    width: '85%',
    height: 1,
    backgroundColor: colors.labelColor,
    marginVertical: 5,
  },
  menuItem: {
    width: '100%',
    flexDirection: 'row',
    gap: 10,
    paddingHorizontal: 10,
    marginBottom: 15,
    alignItems: 'center',
    margin: 10,
  },
  menuIcon: {
    width: 25,
    height: 25,
    marginRight: 10,
    tintColor: colors.textColorWhite,
  },
  menuText: {
    color: colors.textColorWhite,
    fontSize: 14,
  },
});
