import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  Dimensions,
  ScrollView,
} from 'react-native';
import React, { useEffect, useLayoutEffect, useMemo, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { colors } from '../../../utils/colors';
import { MainRoutes } from '../../../utils/Routes';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { setProfileImage } from '../../../store/userSlice';
import {
  MY_PROFILES,
  ADD_NEW,
  EDIT_PROFILE_BTN,
  FAVOURITE_GENRES,
  ADD_GENRE,
} from '../../../utils/strings';
import { styles } from './Styles';

const Profiles = () => {
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
    });
  }, [navigation]);

  const userGenre = useSelector(state => state.user.genre);
  const genre = useMemo(() => {
    return [...userGenre, 'Add Genre'];
  }, [userGenre]);

  const dispatch = useDispatch();

  const [profileNames, setProfileNames] = useState([]);
  const profileNamesFromState = useSelector(state => state.user.profiles);

  useEffect(() => {
    if (profileNamesFromState.length < 4) {
      setProfileNames([...profileNamesFromState, 'Add new']);
    } else {
      setProfileNames(profileNamesFromState);
    }
  }, [profileNamesFromState]);

  function onEditProfilePress() {
    navigation.navigate(MainRoutes.EDIT_USER_DETAILS);
  }

  function onProfileClick(profileImage) {
    dispatch(setProfileImage({ image: profileImage }));
    navigation.navigate(MainRoutes.MAIN_BOTTOM_TABS);
  }

  function onBackIconPress() {
    navigation.goBack();
  }

  function onAddProfile() {
    navigation.navigate(MainRoutes.ADD_PROFILE);
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.headerIconContainer}
          activeOpacity={0.6}
          onPress={onBackIconPress}
        >
          <Icon name="arrow-back" size={20} color={colors.textColorWhite} />
        </TouchableOpacity>
        <Text style={styles.headerText}>{MY_PROFILES}</Text>
      </View>
      <View style={styles.profileRow}>
        <FlatList
          data={profileNames}
          keyExtractor={(item, index) => item + index}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.profileRow}
          renderItem={({ item }) => (
            <View>
              {item === 'Add new' ? (
                <TouchableOpacity
                  style={styles.itemContainer}
                  onPress={onAddProfile}
                >
                  <Image
                    source={require('../../../../assets/add.png')}
                    style={styles.avatar}
                  />
                  <Text style={styles.addText}>{ADD_NEW}</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  style={styles.itemContainer}
                  onPress={() => onProfileClick(item.image)}
                >
                  <Image
                    source={
                      item.image
                        ? { uri: item.image }
                        : require('../../../../assets/profileIcon.png')
                    }
                    style={styles.avatar}
                    resizeMode="contain"
                  />
                  <Text style={styles.nameText}>{item.name}</Text>
                </TouchableOpacity>
              )}
            </View>
          )}
        />
      </View>

      <TouchableOpacity onPress={onEditProfilePress} style={styles.editProfile}>
        <Text style={styles.editProfile}>{EDIT_PROFILE_BTN}</Text>
      </TouchableOpacity>

      <View style={styles.divider} />

      <Text style={styles.genreHeader}>{FAVOURITE_GENRES}</Text>

      <View style={styles.genreGrid}>
        {genre.map((item, index) => {
          if (item === 'Add Genre') {
            return (
              <View key={index}>
                <TouchableOpacity
                  key={index}
                  style={styles.genreAddBox}
                  onPress={() => {
                    navigation.navigate(MainRoutes.GENRE, {
                      genres: userGenre,
                    });
                  }}
                >
                  <Text style={styles.addIcon}>+</Text>
                </TouchableOpacity>
              </View>
            );
          }

          return (
            <View key={index} style={styles.genreCard}>
              <Image
                source={item.image}
                style={styles.genreImage}
                resizeMode="cover"
              />
              <Text style={styles.genreText}>{item.title}</Text>
              <View style={styles.closeIconContainer}>
                <Icon name="close" style={styles.closeIcon} />
              </View>
            </View>
          );
        })}
      </View>
    </ScrollView>
  );
};

export default Profiles;


