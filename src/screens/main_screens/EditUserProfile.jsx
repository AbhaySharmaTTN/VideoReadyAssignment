// import React, { useState } from 'react';
// import { StyleSheet, Text, View, Image, TouchableOpacity, Alert } from 'react-native';
// import CustomTextInput from '../../components/CustomTextInput';
// import AppButton from '../../components/AppButton';
// import ImagePicker from 'react-native-image-crop-picker';
// import { useDispatch, useSelector } from 'react-redux';
// import { updateUserDetails } from '../../store/userSlice';
// import { colors } from '../../utils/colors';
// import { SafeAreaView } from 'react-native-safe-area-context';

// const EditUserProfile = () => {
//   const dispatch = useDispatch();
//   const { name: userName, email: userEmail, phoneNumber } = useSelector(state => state.user);

//   const [name, setName] = useState(userName);
//   const [email, setEmail] = useState(userEmail);
//   const [image, setImage] = useState(null);

//   const handleImagePick = async () => {
//     try {
//       const result = await ImagePicker.openPicker({
//         width: 300,
//         height: 300,
//         cropping: true,
//         mediaType: 'photo',
//       });
//       setImage(result.path);
//     } catch (error) {
//       if (error?.message !== 'User cancelled image selection') {
//         Alert.alert('Error', 'Failed to pick image.');
//       }
//     }
//   };

//   const handleSave = () => {
//     if (!name || !email) {
//       Alert.alert('Validation', 'Name and Email are required');
//       return;
//     }
//     dispatch(updateUserDetails({ name, email }));
//     Alert.alert('Success', 'Profile updated');
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       <TouchableOpacity style={styles.imageContainer} onPress={handleImagePick}>
//         {image ? (
//           <Image source={{ uri: image }} style={styles.profileImage} />
//         ) : (
//           <View style={styles.placeholderImage}>
//             <Text style={styles.imageText}>Pick Image</Text>
//           </View>
//         )}
//       </TouchableOpacity>

//       <CustomTextInput
//         label="Name"
//         value={name}
//         onChangeText={setName}
//         textInputConfig={{ placeholder: 'Enter your name' }}
//       />

//       <CustomTextInput
//         label="Email"
//         value={email}
//         onChangeText={setEmail}
//         textInputConfig={{ placeholder: 'Enter your email', keyboardType: 'email-address' }}
//       />

//       <CustomTextInput
//         label="Phone Number"
//         value={phoneNumber}
//         editable={false}
//         textInputConfig={{ placeholder: 'Phone Number', keyboardType: 'phone-pad' }}
//       />

//       <AppButton title="Save Changes" onPress={handleSave} />
//     </SafeAreaView>
//   );
// };

// export default EditUserProfile;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 16,
//     backgroundColor: colors.appBackground,
//   },
//   imageContainer: {
//     alignItems: 'center',
//     marginBottom: 20,
//   },
//   profileImage: {
//     width: 120,
//     height: 120,
//     borderRadius: 60,
//   },
//   placeholderImage: {
//     width: 120,
//     height: 120,
//     borderRadius: 60,
//     backgroundColor: '#2c2c2e',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   imageText: {
//     color: colors.textColorWhite,
//   },
// });

import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

const EditUserProfile = () => {
  return (
    <View>
      <Text>EditUserProfile</Text>
    </View>
  );
};

export default EditUserProfile;

const styles = StyleSheet.create({});
