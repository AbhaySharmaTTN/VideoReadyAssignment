import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  Dimensions,
} from 'react-native';
import React, { useLayoutEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { colors } from '../../utils/colors';
import { MainRoutes } from '../../utils/Routes';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Profiles = () => {
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
    });
  }, [navigation]);

  const genre = useSelector(state => state.user.genre);
  const profileNames = useSelector(state => state.user.profiles);

  function onEditProfilePress() {}

  function onProfileClick() {
    navigation.navigate(MainRoutes.MAIN_BOTTOM_TABS);
  }

  function onBackIconPress() {
    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.headerIconContainer}
          activeOpacity={0.6}
          onPress={onBackIconPress}
        >
          <Icon name="arrow-back" size={20} color={colors.textColorWhite} />
        </TouchableOpacity>
        <Text style={styles.headerText}>My Profiles</Text>
      </View>
      <View style={styles.profileRow}>
        {profileNames.map((name, index) => (
          <TouchableOpacity
            key={index}
            style={styles.itemContainer}
            onPress={onProfileClick}
          >
            <Image
              source={require('../../../assets/profileIcon.png')}
              style={styles.avatar}
              resizeMode="contain"
            />
            <Text style={styles.nameText}>{name}</Text>
          </TouchableOpacity>
        ))}

        <TouchableOpacity style={styles.itemContainer}>
          <Image
            source={require('../../../assets/add.png')}
            style={styles.avatar}
          />
          <Text style={styles.addText}>Add New</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={onEditProfilePress} style={styles.editProfile}>
        <Text style={styles.editProfile}>Edit Profile</Text>
      </TouchableOpacity>

      <View style={styles.divider} />

      <Text style={styles.genreHeader}>Favourite Genres</Text>
      <FlatList
        data={genre}
        keyExtractor={(item, index) => item + index}
        numColumns={3}
        contentContainerStyle={styles.genreGrid}
        renderItem={({ item }) => (
          <View style={styles.genreCard}>
            <Image
              source={item.image}
              style={styles.genreImage}
              resizeMode="cover"
            />
            <Text style={styles.genreText}>{item.title}</Text>
          </View>
        )}
        columnWrapperStyle={{ gap: 10 }}
        ListFooterComponent={
          <TouchableOpacity style={styles.genreAddBox}>
            <Text style={styles.addIcon}>+</Text>
          </TouchableOpacity>
        }
      />
    </View>
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
    flexWrap: 'wrap',
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
    padding: 10,
    gap: 10,
  },
  genreCard: {
    width: gridItemSize,
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
    height: gridItemSize,
    backgroundColor: '#101820',
    borderRadius: 8,
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
