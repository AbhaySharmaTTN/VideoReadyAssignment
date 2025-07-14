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
import Icon from 'react-native-vector-icons/MaterialIcons';
import { isValidEmail } from '../../utils/validators';

const EditUserProfile = () => {
  const dispatch = useDispatch();
  const {
    name: userName,
    email: userEmail,
    phoneNumber,
    profileImage,
  } = useSelector(state => state.user);

  const [name, setName] = useState(userName);
  const [email, setEmail] = useState(userEmail);
  const [image, setImage] = useState(profileImage);

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

    if (!isValidEmail(email)) {
      Alert.alert('Validation', 'Please enter a valid email address');
      return;
    }
    dispatch(setProfileImage({ image: image }));

    dispatch(updateUserDetails({ name, email }));
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
        <Text style={styles.headerTitle}>Edit Profile</Text>
        <View style={{ width: 24 }} />
      </View>

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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.textColorWhite,
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
    backgroundColor: '#2780EA4D',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageText: {
    color: colors.textColorWhite,
  },
});
