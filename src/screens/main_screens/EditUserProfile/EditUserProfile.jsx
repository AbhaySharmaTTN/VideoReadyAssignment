import React, { useState } from 'react';
import CustomTextInput from '../../../components/CustomTextInput';
import AppButton from '../../../components/AppButton';
import { useDispatch, useSelector } from 'react-redux';
import { setProfileImage, updateUserDetails } from '../../../store/userSlice';
import { colors } from '../../../utils/colors';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { launchImageLibrary, launchCamera } from 'react-native-image-picker';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { isValidEmail } from '../../../utils/validators';
import {
  EDIT_PROFILE,
  PICK_IMAGE,
  NAME,
  NAME_PLACEHOLDER,
  EMAIL,
  EMAIL_PLACEHOLDER,
  PHONE_NUMBER,
  PHONE_NUMBER_PLACEHOLDER,
  SAVE_CHANGES,
  VALIDATION_NAME_EMAIL_REQUIRED,
  VALIDATION_EMAIL,
  CAMERA,
  GALLERY,
  CANCEL,
} from '../../../utils/strings';
import { styles } from './Styles';

const EditUserProfile = () => {
  const dispatch = useDispatch();
  const {
    name: userName,
    email,
    phoneNumber,
    profileImage,
  } = useSelector(state => state.user);

  const [name, setName] = useState(userName);
  const [userEmail, setEmail] = useState(email);
  const [image, setImage] = useState(profileImage);

  const navigation = useNavigation();

  const pickImage = () => {
    Alert.alert(PICK_IMAGE, 'Choose an image from gallery or open camera', [
      {
        text: CAMERA,
        onPress: () => {
          launchCamera({ mediaType: 'photo' }, result => {
            if (!result.didCancel && result.assets?.length > 0) {
              setImage(result.assets[0].uri);
            }
          });
        },
      },
      {
        text: GALLERY,
        onPress: () => {
          launchImageLibrary({ mediaType: 'photo' }, result => {
            if (!result.didCancel && result.assets?.length > 0) {
              setImage(result.assets[0].uri);
            }
          });
        },
      },
      { text: CANCEL, style: 'cancel' },
    ]);
  };

  const [error, setError] = useState('');

  const handleSave = () => {
    if (!name || !userEmail) {
      setError(VALIDATION_NAME_EMAIL_REQUIRED);
      return;
    }

    if (!isValidEmail(userEmail)) {
      Alert.alert('Validation', VALIDATION_EMAIL);
      return;
    }

    dispatch(setProfileImage({ image }));

    dispatch(updateUserDetails({ name, email: userEmail }));
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Icon name="arrow-back" size={24} color={colors.textColorWhite} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{EDIT_PROFILE}</Text>
        <View style={{ width: 24 }} />
      </View>

      <TouchableOpacity style={styles.imageContainer} onPress={pickImage}>
        {image ? (
          <Image source={{ uri: image }} style={styles.profileImage} />
        ) : (
          <View style={styles.placeholderImage}>
            <Text style={styles.imageText}>{PICK_IMAGE}</Text>
          </View>
        )}
      </TouchableOpacity>

      <CustomTextInput
        label={NAME}
        value={name}
        onChangeText={setName}
        textInputConfig={{ placeholder: NAME_PLACEHOLDER }}
        error={error}
      />

      <CustomTextInput
        label={EMAIL}
        value={userEmail}
        onChangeText={setEmail}
        textInputConfig={{
          placeholder: EMAIL_PLACEHOLDER,
          keyboardType: 'email-address',
        }}
        error={error}
      />

      <CustomTextInput
        label={PHONE_NUMBER}
        value={phoneNumber}
        editable={false}
        textInputConfig={{
          placeholder: PHONE_NUMBER_PLACEHOLDER,
          keyboardType: 'phone-pad',
        }}
      />

      <Text style={styles.errorText}>{error ? error + '*' : ''}</Text>
      <AppButton title={SAVE_CHANGES} onPress={handleSave} />
    </SafeAreaView>
  );
};

export default EditUserProfile;

