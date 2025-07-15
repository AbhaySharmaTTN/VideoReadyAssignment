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
import { colors } from '../../utils/colors';
import { MainRoutes } from '../../utils/Routes';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { setProfileImage } from '../../store/userSlice';
import {
  MY_PROFILES,
  ADD_NEW,
  EDIT_PROFILE_BTN,
  FAVOURITE_GENRES,
  ADD_GENRE,
} from '../../utils/strings';

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

  function giveGenreList() {
    return genre.filter(g => g !== 'Add Genre');
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
          keyExtractor={(item, index) => index.toString()}
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
                    source={require('../../../assets/add.png')}
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
                        : require('../../../assets/profileIcon.png')
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
              <TouchableOpacity
                key={index}
                style={styles.genreAddBox}
                onPress={() => {
                //   const list = giveGenreList();
                  navigation.navigate(MainRoutes.GENRE, {
                    genres: userGenre,
                  });
                }}
              >
                <Text style={styles.addIcon}>+</Text>
              </TouchableOpacity>
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
            </View>
          );
        })}
      </View>
    </ScrollView>
  );
};

export default Profiles;

const screenWidth = Dimensions.get('window').width;
const gridItemSize = screenWidth / 3 - 14;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  profileRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  itemContainer: {
    alignItems: 'center',
    marginRight: 14,
    marginBottom: 12,
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
  },
  nameText: {
    color: colors.textColorWhite,
    fontSize: 13,
    marginTop: 4,
  },
  addText: {
    color: colors.textColorBlue,
    fontSize: 13,
    marginTop: 4,
  },
  addIcon: {
    fontSize: 24,
    color: colors.textColorBlue,
  },
  editProfile: {
    color: colors.textColorBlue,
    fontSize: 14,
    marginTop: 10,
    marginBottom: 10,
  },
  divider: {
    height: 1,
    backgroundColor: colors.labelColor,
    marginVertical: 12,
  },
  genreHeader: {
    color: colors.textColorWhite,
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  genreGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    gap: 10,
    paddingBottom: 20,
    marginTop: 10,
  },
  genreCard: {
    width: gridItemSize - 5,
    alignItems: 'center',
    backgroundColor: '#001C37',
    padding: 3,
    borderRadius: 8,
  },
  genreImage: {
    width: '100%',
    height: gridItemSize - 10,
    borderRadius: 8,
  },
  genreText: {
    color: colors.textColorWhite,
    padding: 6,
    fontSize: 13,
    textAlign: 'left',
  },
  genreAddBox: {
    width: gridItemSize,
    height: gridItemSize + 20,
    backgroundColor: '#122436',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  editProfile: {
    textAlign: 'center',
    paddingTop: 12,
    paddingBottom: 8,
    color: colors.appButton,
  },
  header: {
    flexDirection: 'row',
    width: '100%',
    marginBottom: 10,
  },
  headerIconContainer: {
    width: '40%',
  },
  headerText: {
    color: colors.textColorWhite,
  },
});
