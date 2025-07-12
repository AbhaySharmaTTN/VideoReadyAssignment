import React, { useState } from 'react';
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
import AppButton from '../../components/AppButton';
import { colors } from '../../utils/colors';
import { addProfile, removeProfile } from '../../store/userSlice';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';

const screenWidth = Dimensions.get('window').width;
const itemSize = screenWidth / 2 - 20;

const WhoIsWatching = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const profiles = useSelector(state => state.user.profiles);
  const [editMode, setEditMode] = useState(false);

  const handleDeleteProfile = profileName => {
    dispatch(removeProfile({ profileName }));
  };

  const addProfileHandler = () => {
    dispatch(addProfile({ profileName: 'Abhay' }));
  };

  const renderItem = ({ item }) => {
    if (item.isAddNew) {
      return (
        <TouchableOpacity
          style={styles.itemContainer}
          onPress={addProfileHandler}
        >
          <Image
            source={require('../../../assets/add.png')}
            style={styles.avatar}
          />
          <Text style={styles.addText}>Add New</Text>
        </TouchableOpacity>
      );
    }

    return (
      <ProfileItem
        item={item}
        onDelete={() => handleDeleteProfile(item)}
        editMode={editMode}
      />
    );
  };

  const displayData = [...profiles, { isAddNew: true }];

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Who is Watching?</Text>

      <FlatList
        data={displayData}
        renderItem={renderItem}
        keyExtractor={(item, index) => item + index}
        numColumns={2}
        contentContainerStyle={styles.grid}
        showsVerticalScrollIndicator={false}
      />

      <AppButton
        title={editMode ? 'Done' : 'Edit Profile'}
        onPress={() => setEditMode(prev => !prev)}
      />
    </SafeAreaView>
  );
};

export default WhoIsWatching;

const ProfileItem = React.memo(({ item, editMode, onDelete }) => {
  return (
    <View style={styles.itemContainer}>
      <TouchableOpacity>
        <Image
          source={require('../../../assets/profileIcon.png')}
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
      <Text style={styles.nameText}>{item}</Text>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.appBackground,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  title: {
    fontSize: 24,
    color: 'white',
    fontWeight: 'bold',
    alignSelf: 'center',
    marginBottom: 20,
  },
  grid: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 40,
  },
  itemContainer: {
    width: itemSize,
    alignItems: 'center',
    marginVertical: 16,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  nameText: {
    color: 'white',
    fontSize: 16,
    marginTop: 8,
  },
  addText: {
    color: '#1E90FF',
    fontSize: 16,
    marginTop: 8,
  },
  deleteIconContainer: {
    position: 'absolute',
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgb(1,1,1,0.6)',
    justifyContent: 'center',
  },
  deleteIcon: {
    color: colors.appButton,
    alignSelf: 'center',
  },
});
