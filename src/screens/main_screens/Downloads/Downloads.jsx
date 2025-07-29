import React, {
  useCallback,
  useRef,
  useLayoutEffect,
  useState,
} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppButton from '../../../components/AppButton';
import { DELETE, REDOWNLOAD, CLOSE, DOWNLOADS } from '../../../utils/strings';
import { useDispatch, useSelector } from 'react-redux';
import { removeDownload } from '../../../store/userSlice';
import { styles } from './Styles';

const Downloads = () => {
  const navigation = useNavigation();
  const bottomSheetRef = useRef(null);
  const dispatch = useDispatch();

  const downloads = useSelector(state => state.user.downloads);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      header: () => <DownloadHeader navigation={navigation} />,
    });
  }, [navigation]);

  const handleOpenBottomSheet = useCallback(id => {
    setSelectedMovie(id);
    bottomSheetRef.current?.expand();
  }, []);

  const closeBottomSheet = () => {
    bottomSheetRef.current?.close();
  };

  const [selectedMovie, setSelectedMovie] = useState(null);

  function onDeleteClick() {
    dispatch(removeDownload({ id: selectedMovie }));
    closeBottomSheet();
  }

  return (
    <View style={styles.container}>
      {!downloads.length ? (
        <NoDownloads />
      ) : (
        <View style={styles.downloadsList}>
          <FlatList
            data={downloads}
            keyExtractor={item => item.id}
            renderItem={({ item }) => {
              return (
                <View style={styles.renderItemViewContainer}>
                  <MovieItem
                    item={item}
                    onMenuClick={() => handleOpenBottomSheet(item.id)}
                  />
                  <View style={styles.divider} />
                </View>
              );
            }}
          />
        </View>
      )}

      <BottomSheet
        ref={bottomSheetRef}
        index={-1}
        snapPoints={['40%']}
        enablePanDownToClose
        backgroundStyle={styles.sheetBackground}
        onClose={() => setSelectedMovie(null)}
      >
        <BottomSheetView style={styles.sheetContent}>
          <View>
            <TouchableOpacity
              style={[styles.sheetButtons, styles.encapsulate]}
              activeOpacity={0.7}
              onPress={onDeleteClick}
            >
              <Text style={styles.text}>{DELETE}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.sheetButtons} activeOpacity={0.7}>
              <Text style={styles.text}>{REDOWNLOAD}</Text>
            </TouchableOpacity>
          </View>
          <AppButton title={CLOSE} onPress={closeBottomSheet} />
        </BottomSheetView>
      </BottomSheet>
    </View>
  );
};

const NoDownloads = () => {
  return (
    <View style={styles.noDownloadsContainer}>
      <Text style={styles.text}>No Downloads</Text>
    </View>
  );
};

const MovieItem = ({ item, onMenuClick }) => {
  return (
    <View style={styles.movieItemContainer}>
      <View style={styles.imageAndTitleContainer}>
        <Image
          source={require('../../../../assets/Intro1.png')}
          style={styles.movieImage}
          resizeMode="cover"
        />
        <View style={styles.titleAndDescription}>
          <Text style={styles.titleText}>{item.movieName}</Text>
          <Text style={styles.descriptionText}>{item.description}</Text>
        </View>
      </View>
      <TouchableOpacity activeOpacity={0.7} onPress={onMenuClick}>
        <Icon name="more-vert" style={styles.icon} />
      </TouchableOpacity>
    </View>
  );
};

const DownloadHeader = ({ navigation }) => {
  function onBackPress() {
    navigation.goBack();
  }
  return (
    <SafeAreaView edges={['top']} style={styles.header}>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={onBackPress}
        style={styles.headerIcon}
      >
        <Icon name="arrow-back" style={styles.headerIcon} />
      </TouchableOpacity>
      <Text style={styles.headerText}>{DOWNLOADS}</Text>
    </SafeAreaView>
  );
};

export default Downloads;
