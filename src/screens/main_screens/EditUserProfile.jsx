import React, { useState } from 'react';
import CustomTextInput from '../../components/CustomTextInput';
import AppButton from '../../components/AppButton';
import { useDispatch, useSelector } from 'react-redux';
import { setProfileImage, updateUserDetails } from '../../store/userSlice';
import { colors } from '../../utils/colors';
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

const EditUserProfile = () => {
  const dispatch = useDispatch();
  const {
    name: userName,
    email: userEmail,
    phoneNumber,
  } = useSelector(state => state.user);

  const [name, setName] = useState(userName);
  const [email, setEmail] = useState(userEmail);
  const [image, setImage] = useState(null);

  const navigation = useNavigation();

  const pickImage = () => {
    Alert.alert('Select Image', 'Choose an image from gallery or open camera', [
      {
        text: 'Camera',
        onPress: () => {
          launchCamera({ mediaType: 'photo' }, result => {
            if (!result.didCancel && result.assets?.length > 0) {
              setImage(result.assets[0].uri);
            }
          });
        },
      },
      {
        text: 'Gallery',
        onPress: () => {
          launchImageLibrary({ mediaType: 'photo' }, result => {
            if (!result.didCancel && result.assets?.length > 0) {
              setImage(result.assets[0].uri);
            }
          });
        },
      },
      { text: 'Cancel', style: 'cancel' },
    ]);
  };

  const handleSave = () => {
    if (!name || !email) {
      Alert.alert('Validation', 'Name and Email are required');
      return;
    }
    dispatch(updateUserDetails({ name, email }));
    dispatch(setProfileImage({ image: image }));
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.imageContainer} onPress={pickImage}>
        {image ? (
          <Image source={{ uri: image }} style={styles.profileImage} />
        ) : (
          <View style={styles.placeholderImage}>
            <Text style={styles.imageText}>Pick Image</Text>
          </View>
        )}
      </TouchableOpacity>

      <CustomTextInput
        label="Name"
        value={name}
        onChangeText={setName}
        textInputConfig={{ placeholder: 'Enter your name' }}
      />

      <CustomTextInput
        label="Email"
        value={email}
        onChangeText={setEmail}
        textInputConfig={{
          placeholder: 'Enter your email',
          keyboardType: 'email-address',
        }}
      />

      <CustomTextInput
        label="Phone Number"
        value={phoneNumber}
        editable={false}
        textInputConfig={{
          placeholder: 'Phone Number',
          keyboardType: 'phone-pad',
        }}
      />

      <AppButton title="Save Changes" onPress={handleSave} />
    </SafeAreaView>
  );
};

export default EditUserProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: colors.appBackground,
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  placeholderImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#2c2c2e',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageText: {
    color: colors.textColorWhite,
  },
});
