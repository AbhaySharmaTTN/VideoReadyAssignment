import React, {
  useCallback,
  useMemo,
  useRef,
  useLayoutEffect,
  useState,
} from 'react';
import {
  View,
  Text,
  Button,
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
import { MainRoutes } from '../../utils/Routes';

const movieTitles = [
  {
    id: 1,
    title: 'Dr. Strange',
    image: require('../../../assets/Intro1.png'),
    description: 'Action, Adventure, Superhero',
  },
  {
    id: 2,
    title: 'Avatar',
    image: require('../../../assets/Intro2.png'),
    description: 'Action, Adventure',
  },
  {
    id: 3,
    title: 'Us',
    image: require('../../../assets/Intro3.png'),
    description: 'Horror',
  },
];

const Downloads = () => {
  const navigation = useNavigation();
  const bottomSheetRef = useRef(null);

  const [movieList, setMovieList] = useState(movieTitles);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      header: () => <DownloadHeader />,
    });
  }, [navigation]);

  function onBackPress() {
    navigation.goBack();
  }

  const DownloadHeader = () => {
    return (
      <SafeAreaView edges={['top']} style={styles.header}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={onBackPress}
          style={styles.headerIcon}
        >
          <Icon name="arrow-back" style={styles.headerIcon} />
        </TouchableOpacity>
        <Text style={styles.headerText}>Downloaded</Text>
      </SafeAreaView>
    );
  };

  const handleOpenBottomSheet = useCallback(id => {
    setSelectedMovie(id);
    bottomSheetRef.current?.expand();
  }, []);

  const closeBottomSheet = () => {
    bottomSheetRef.current?.close();
  };

  const [selectedMovie, setSelectedMovie] = useState(null);

  function onDeleteClick() {
    const newList = movieList.filter(movie => movie.id !== selectedMovie);
    setMovieList(newList);
    setSelectedMovie(null);
    closeBottomSheet();
  }

  return (
    <View style={styles.container}>
      <View style={styles.downloadsList}>
        <FlatList
          data={movieList}
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
              <Text style={styles.text}>Delete</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.sheetButtons} activeOpacity={0.7}>
              <Text style={styles.text}>Re-Download</Text>
            </TouchableOpacity>
          </View>
          <AppButton title="Close" onPress={closeBottomSheet} />
        </BottomSheetView>
      </BottomSheet>
    </View>
  );
};

const MovieItem = ({ item, onMenuClick }) => {
  return (
    <View style={styles.movieItemContainer}>
      <View style={styles.imageAndTitleContainer}>
        <Image
          source={item.image}
          style={styles.movieImage}
          resizeMode="cover"
        />
        <View style={styles.titleAndDescription}>
          <Text style={styles.titleText}>{item.title}</Text>
          <Text style={styles.descriptionText}>{item.description}</Text>
        </View>
      </View>
      <TouchableOpacity activeOpacity={0.7} onPress={onMenuClick}>
        <Icon name="more-vert" style={styles.icon} />
      </TouchableOpacity>
    </View>
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
});
