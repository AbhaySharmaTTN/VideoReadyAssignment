import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useDispatch } from 'react-redux';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../../utils/colors';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useEffect, useState } from 'react';
import AppButton from '../../components/AppButton';
import { setGenre, setOnboarding } from '../../store/userSlice';
import {
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import { MainRoutes } from '../../utils/Routes';
import { GENRE, CONFIRM } from '../../utils/strings';

const genres = [
  {
    title: 'Action',
    image: require('../../../assets/genre.png'),
    isChecked: false,
  },
  {
    title: 'Comedy',
    image: require('../../../assets/genre.png'),
    isChecked: false,
  },
  {
    title: 'Drama',
    image: require('../../../assets/genre.png'),
    isChecked: false,
  },
  {
    title: 'Horror',
    image: require('../../../assets/genre.png'),
    isChecked: false,
  },
  {
    title: 'Romance',
    image: require('../../../assets/genre.png'),
    isChecked: false,
  },
  {
    title: 'Sci-Fi',
    image: require('../../../assets/genre.png'),
    isChecked: false,
  },
  {
    title: 'Thriller',
    image: require('../../../assets/genre.png'),
    isChecked: false,
  },
  {
    title: 'Fantasy',
    image: require('../../../assets/genre.png'),
    isChecked: false,
  },
  {
    title: 'Documentary',
    image: require('../../../assets/genre.png'),
    isChecked: false,
  },
  {
    title: 'Animation',
    image: require('../../../assets/genre.png'),
    isChecked: false,
  },
  {
    title: 'Mystery',
    image: require('../../../assets/genre.png'),
    isChecked: false,
  },
  {
    title: 'Crime',
    image: require('../../../assets/genre.png'),
    isChecked: false,
  },
  {
    title: 'Adventure',
    image: require('../../../assets/genre.png'),
    isChecked: false,
  },
  {
    title: 'Music',
    image: require('../../../assets/genre.png'),
    isChecked: false,
  },
  {
    title: 'Music',
    image: require('../../../assets/genre.png'),
    isChecked: false,
  },
];

const Genre = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const route = useRoute();

  const [genreList, setGenreList] = useState(genres);

  useEffect(() => {
    console.log(route.params);
    if (route.params?.genres) {
      const incomingGenres = route.params.genres;

      const updatedGenres = genres.map(g => ({
        ...g,
        isChecked: incomingGenres.some(incoming => incoming.title === g.title),
      }));

      setGenreList(updatedGenres);
    } else {
      setGenreList(genres);
    }
  }, []);

  const toggleChecked = index => {
    const updatedGenres = [...genreList];
    updatedGenres[index].isChecked = !updatedGenres[index].isChecked;
    setGenreList(updatedGenres);
  };

  const handleConfirmButton = () => {
    const checkedGenres = genreList.filter(gen => gen.isChecked);
    dispatch(setOnboarding());
    dispatch(setGenre({ genre: checkedGenres }));
    if (route.params?.genres) {
      navigation.goBack();
    } else {
      navigation.replace(MainRoutes.MAIN_DRAWER);
    }
  };

  function goBack() {
    if (route.params?.genres) {
      navigation.goBack();
    } else {
      navigation.replace(MainRoutes.MAIN_DRAWER);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={goBack}>
          <Icon name="arrow-back" size={30} style={styles.icon} />
        </TouchableOpacity>
        <Text style={styles.headerText}>{GENRE}</Text>
      </View>

      <FlatList
        data={genreList}
        keyExtractor={(item, index) => item.title + index}
        renderItem={({ item, index }) => (
          <GenreItem item={item} onPress={() => toggleChecked(index)} />
        )}
        numColumns={3}
        contentContainerStyle={styles.grid}
        columnWrapperStyle={styles.column}
        showsVerticalScrollIndicator={false}
      />
      <AppButton
        title={CONFIRM}
        style={styles.confirmButton}
        onPress={handleConfirmButton}
      />
    </SafeAreaView>
  );
};

const GenreItem = ({ item, onPress }) => {
  return (
    <TouchableOpacity
      style={styles.gridItem}
      activeOpacity={0.8}
      onPress={onPress}
    >
      <Image source={item.image} style={styles.image} resizeMode="cover" />
      <View style={styles.textRow}>
        <Text style={styles.title}>{item.title}</Text>
        <Icon
          name={item.isChecked ? 'check-box' : 'check-box-outline-blank'}
          size={18}
          color={colors.appButton}
        />
      </View>
    </TouchableOpacity>
  );
};

export default Genre;

const screenWidth = Dimensions.get('window').width;
const gridItemSize = screenWidth / 3 - 14;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.appBackground,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: colors.appBackground,
  },
  icon: {
    color: colors.textColorWhite,
    paddingRight: 10,
  },
  headerText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  grid: {
    paddingHorizontal: 12,
    paddingTop: 16,
  },
  column: {
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  gridItem: {
    width: gridItemSize,
    alignItems: 'center',
    backgroundColor: '#001C37',
    padding: 3,
    borderRadius: 8,
  },
  image: {
    width: '100%',
    height: gridItemSize,
    borderRadius: 8,
  },
  textRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 6,
    paddingVertical: 3,
    width: '100%',
  },
  title: {
    color: 'white',
    fontSize: 13,
    flexShrink: 1,
  },
  confirmButton: {
    marginHorizontal: 20,
    marginVertical: 10,
  },
});
