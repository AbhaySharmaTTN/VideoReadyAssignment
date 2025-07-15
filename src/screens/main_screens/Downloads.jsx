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
import { colors } from '../../utils/colors';
import AppButton from '../../components/AppButton';
import { DELETE, REDOWNLOAD, CLOSE, DOWNLOADS } from '../../utils/strings';
import { useDispatch, useSelector } from 'react-redux';
import { removeDownload } from '../../store/userSlice';

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
          source={require('../../../assets/Intro1.png')}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: colors.appBackground,
    padding: 12,
  },
  sheetBackground: {
    backgroundColor: colors.bottomSheetBackgroundColor,
  },
  sheetContent: {
    height: '100%',
    justifyContent: 'space-between',
    padding: 24,
  },
  sheetTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  sheetSubtitle: {
    color: '#ccc',
    fontSize: 16,
    marginTop: 8,
  },
  downloadsList: {
    flex: 1,
  },
  movieItemContainer: {
    flexDirection: 'row',
    width: '100%',
    marginVertical: 10,
    alignItems: 'center',
  },
  icon: {
    fontSize: 20,
    color: colors.textColorWhite,
  },
  movieImage: {
    width: 130,
    height: 80,
    borderRadius: 8,
  },
  imageAndTitleContainer: {
    flexDirection: 'row',
    flex: 1,
  },
  titleAndDescription: {
    justifyContent: 'center',
    paddingLeft: 6,
  },
  titleText: {
    color: colors.textColorWhite,
    fontSize: 14,
  },
  descriptionText: {
    color: colors.labelColor,
    fontSize: 12,
  },
  divider: {
    width: '90%',
    height: 1,
    backgroundColor: '#242930',
  },
  renderItemViewContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  sheetButtons: {
    width: '100%',
    padding: 15,
    marginVertical: 5,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  text: {
    color: colors.textColorWhite,
  },
  encapsulate: {
    borderBottomColor: colors.labelColor,
    borderTopColor: colors.labelColor,
  },
  header: {
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerText: {
    color: colors.textColorWhite,
    fontSize: 20,
  },
  headerIcon: {
    width: '35%',
    fontSize: 20,
    color: colors.textColorWhite,
  },
  noDownloadsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
