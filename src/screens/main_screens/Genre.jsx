import {
  Alert,
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
import { useState } from 'react';
import AppButton from '../../components/AppButton';
import { setGenre } from '../../store/userSlice';

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

  const [genreList, setGenreList] = useState(genres);

  const toggleChecked = index => {
    const updatedGenres = [...genreList];
    genres[index].isChecked = !genres[index].isChecked;
    setGenreList(updatedGenres);
  };

  const handleConfirmButton = () => {
    const checkedGenres = genreList.filter(gen => gen.isChecked);
    dispatch(setGenre({ genre: checkedGenres }));
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity>
          <Icon name="arrow-back" size={30} style={styles.icon} />
        </TouchableOpacity>
        <Text style={styles.headerText}>Genre</Text>
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
        title="Confirm"
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
