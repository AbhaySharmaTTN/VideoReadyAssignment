import {
  Text,
  View,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import React, { useState } from 'react';
import { colors } from '../../../utils/colors';
import AppButton from '../../../components/AppButton';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { launchImageLibrary, launchCamera } from 'react-native-image-picker';
import CustomTextInput from '../../../components/CustomTextInput';
import { useDispatch } from 'react-redux';
import { addProfile } from '../../../store/userSlice';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  ADD_PROFILE,
  ENTER_PROFILE_NAME_PLACEHOLDER,
  SAVE_PROFILE,
  PLEASE_ENTER_A_NAME,
  CAMERA,
  GALLERY,
  CANCEL
} from '../../../utils/strings';
import { styles } from './Styles';

const AddProfile = () => {
  const [profileImage, setProfileImage] = useState(null);
  const [name, setName] = useState('');
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const pickImage = () => {
    Alert.alert(
      ADD_PROFILE,
      'Choose an image from gallery or open camera', [
        { text: CAMERA,
          onPress: () => {
            launchCamera({ mediaType: 'photo' }, result => {
              if (!result.didCancel && result.assets?.length > 0) {
                setProfileImage(result.assets[0].uri);
              }
            });
          },
        },
        { text: GALLERY,
          onPress: () => {
            launchImageLibrary({ mediaType: 'photo' }, result => {
              if (!result.didCancel && result.assets?.length > 0) {
                setProfileImage(result.assets[0].uri);
              }
            });
          },
        },
        { text: CANCEL, style: 'cancel' },
      ]);
  };

  const handleSave = () => {
    if (!name.trim()) {
      alert(PLEASE_ENTER_A_NAME);
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
          <Text style={styles.headerText}>{ADD_PROFILE}</Text>
        </View>
      </SafeAreaView>

      <View style={styles.innerContainer}>
        <View style={styles.imageAndTextContainer}>
          <TouchableOpacity style={styles.imageContainer} onPress={pickImage}>
            <Image
              source={
                profileImage
                  ? { uri: profileImage }
                  : require('../../../../assets/profileIcon.png')
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
            placeholder: ENTER_PROFILE_NAME_PLACEHOLDER,
          }}
        />

        <AppButton title={SAVE_PROFILE} onPress={handleSave} />
      </View>
    </View>
  );
};

export default AddProfile;

