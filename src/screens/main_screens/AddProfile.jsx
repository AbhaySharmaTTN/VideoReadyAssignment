import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  TextInput,
  Alert,
} from 'react-native';
import React, { useState } from 'react';
import { colors } from '../../utils/colors';
import AppButton from '../../components/AppButton';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { launchImageLibrary, launchCamera } from 'react-native-image-picker';
import CustomTextInput from '../../components/CustomTextInput';
import { useDispatch } from 'react-redux';
import { addProfile } from '../../store/userSlice';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

const AddProfile = () => {
  const [profileImage, setProfileImage] = useState(null);
  const [name, setName] = useState('');
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const pickImage = () => {
    Alert.alert('Select Image', 'Choose an image from gallery or open camera', [
      {
        text: 'Camera',
        onPress: () => {
          launchCamera({ mediaType: 'photo' }, result => {
            if (!result.didCancel && result.assets?.length > 0) {
              setProfileImage(result.assets[0].uri);
            }
          });
        },
      },
      {
        text: 'Gallery',
        onPress: () => {
          launchImageLibrary({ mediaType: 'photo' }, result => {
            if (!result.didCancel && result.assets?.length > 0) {
              setProfileImage(result.assets[0].uri);
            }
          });
        },
      },
      { text: 'Cancel', style: 'cancel' },
    ]);
  };

  const handleSave = () => {
    if (!name.trim()) {
      alert('Please enter a name');
      return;
    }

    dispatch(addProfile({ profileName: name, profileImage: profileImage }));
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <SafeAreaView edges={['top']} style={styles.header}>
        <View style={styles.headerContent}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="arrow-back" size={24} color={colors.textColorWhite} />
          </TouchableOpacity>
          <Text style={styles.headerText}>Add Profile</Text>
        </View>
      </SafeAreaView>

      <View style={styles.innerContainer}>
        <View style={styles.imageAndTextContainer}>
          <TouchableOpacity style={styles.imageContainer} onPress={pickImage}>
            <Image
              source={
                profileImage
                  ? { uri: profileImage }
                  : require('../../../assets/profileIcon.png')
              }
              style={styles.profileImage}
            />
          </TouchableOpacity>
          <Text style={styles.nameText}>{name}</Text>
        </View>

        <CustomTextInput
          value={name}
          onChangeText={setName}
          textInputConfig={{
            placeholderTextColor: colors.placeholderTextColor,
            placeholder: 'Enter Profile Name',
          }}
        />

        <AppButton title="Save Profile" onPress={handleSave} />
      </View>
    </View>
  );
};

export default AddProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.appBackground,
  },
  innerContainer: {
    padding: 20,
  },
  imageContainer: {
    marginBottom: 20,
    alignSelf: 'center',
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  placeholder: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#2c2c2c',
    justifyContent: 'center',
    alignItems: 'center',
  },
  pickImageText: {
    color: colors.placeholderTextColor,
    fontSize: 12,
    marginTop: 6,
  },
  input: {
    width: '80%',
    borderBottomWidth: 1,
    borderBottomColor: colors.placeholderTextColor,
    fontSize: 16,
    color: colors.textColorWhite,
    paddingVertical: 8,
    marginBottom: 24,
    textAlign: 'center',
  },
  nameText: {
    color: colors.textColorWhite,
    textAlign: 'center',
    marginBottom: 25,
    fontWeight: 'bold',
  },
  imageAndTextContainer: {
    width: '100%',
    justifyContent: 'center',
  },
  header: {
    backgroundColor: colors.appHeaderColor,
    width: '100%',
    paddingVertical: 16,
    paddingHorizontal: 20,
  },

  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  headerText: {
    color: colors.textColorWhite,
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 12,
  },
});
