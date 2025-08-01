import React, { useEffect, useState } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import AppButton from '../../../components/AppButton';
import {
  removeProfile,
  setProfileImage,
} from '../../../store/userSlice';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import { MainRoutes } from '../../../utils/Routes';
import {
  WHO_IS_WATCHING_TITLE,
  ADD_NEW,
  EDIT_PROFILE,
  DONE,
} from '../../../utils/strings';
import { styles } from './Styles';

const WhoIsWatching = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const profiles = useSelector(state => state.user.profiles);
  const [editMode, setEditMode] = useState(false);
  const [displayData, setDisplayData] = useState([]);

  useEffect(() => {
    if (profiles.length == 4) {
      setDisplayData(profiles);
    } else {
      setDisplayData([...profiles, { isAddNew: true }]);
    }
  }, [profiles]);

  const handleDeleteProfile = profileName => {
    dispatch(removeProfile({ profileName }));
  };

  const addProfileHandler = () => {
    navigation.navigate(MainRoutes.ADD_PROFILE);
  };

  const openProfile = profileImage => {
    dispatch(setProfileImage({ image: profileImage }));
    navigation.navigate(MainRoutes.MAIN_DRAWER);
  };

  const renderItem = ({ item }) => {
    if (item.isAddNew) {
      return (
        <TouchableOpacity
          style={styles.itemContainer}
          onPress={addProfileHandler}
        >
          <Image
            source={require('../../../../assets/add.png')}
            style={styles.avatar}
          />
          <Text style={styles.addText}>{ADD_NEW}</Text>
        </TouchableOpacity>
      );
    }

    return (
      <ProfileItem
        item={item}
        onDelete={() => handleDeleteProfile(item.name)}
        editMode={editMode}
        onClick={() => openProfile(item.image)}
      />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>{WHO_IS_WATCHING_TITLE}</Text>

      <FlatList
        data={displayData}
        renderItem={renderItem}
        keyExtractor={(item, index) => item + index}
        numColumns={2}
        contentContainerStyle={styles.grid}
        showsVerticalScrollIndicator={false}
      />

      <AppButton
        title={editMode ? DONE : EDIT_PROFILE}
        onPress={() => setEditMode(prev => !prev)}
      />
    </SafeAreaView>
  );
};

export default WhoIsWatching;

const ProfileItem = React.memo(({ item, editMode, onDelete, onClick }) => {
  return (
    <View style={styles.itemContainer}>
      <TouchableOpacity onPress={onClick}>
        <Image
          source={
            item.image && item.image !== ''
              ? { uri: item.image }
              : require('../../../../assets/profileIcon.png')
          }
          style={styles.avatar}
        />

        {editMode && (
          <TouchableOpacity
            style={styles.deleteIconContainer}
            onPress={onDelete}
            activeOpacity={0.9}
          >
            <Icon name="delete" size={50} style={styles.deleteIcon} />
          </TouchableOpacity>
        )}
      </TouchableOpacity>
      <Text style={styles.nameText}>{item.name}</Text>
    </View>
  );
});
