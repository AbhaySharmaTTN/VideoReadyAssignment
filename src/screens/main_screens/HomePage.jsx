import {
  Dimensions,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { colors } from '../../utils/colors';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AppButton from '../../components/AppButton';
import { useNavigation } from '@react-navigation/native';
import { MainRoutes } from '../../utils/Routes';

const movieTitlesForList = [
  {
    id: 1,
    image: require('../../../assets/movieImage.png'),
  },
  {
    id: 2,
    image: require('../../../assets/movieImage.png'),
  },
  {
    id: 3,
    image: require('../../../assets/movieImage.png'),
  },
  {
    id: 4,
    image: require('../../../assets/movieImage.png'),
  },
];

const HomePage = () => {
  const navigation = useNavigation();

  function onMovieTilePress() {
    navigation.navigate(MainRoutes.VIDEO_DETAILS);
  }

  return (
    <ScrollView style={styles.mainContainer}>
      <View style={styles.imageContainer}>
        <Image
          source={require('../../../assets/Intro1.png')}
          style={styles.image}
          resizeMode="cover"
        />
        <View style={styles.movieDetailsContainer}>
          <Text style={styles.movieTitle}>DR. STRANGE</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.iconButton}>
              <Icon name="info" style={styles.icon} />
              <Text style={styles.iconText}>More Details</Text>
            </TouchableOpacity>

            <AppButton
              title="Watch Now"
              style={styles.watchNow}
              icon="play-arrow"
              iconColor={colors.textColorWhite}
              iconSize={20}
              onPress={onMovieTilePress}
            />

            <TouchableOpacity style={styles.iconButton}>
              <Icon name="playlist-add" style={styles.icon} />
              <Text style={styles.iconText}>Add to Playlist</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.descriptionText}>
            Action | Thriller | Suspense
          </Text>
        </View>
      </View>
      <View style={styles.listContainer}>
        <View>
          <View style={styles.listHeader}>
            <Text style={styles.listHeaderText}>Flash Channel</Text>
            <TouchableOpacity>
              <Text style={styles.moreTextButton}>More</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={movieTitlesForList}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <MovieTile item={item} onPress={onMovieTilePress} />
            )}
            horizontal
            contentContainerStyle={{ padding: 8 }}
          />
        </View>
        <View>
          <View style={styles.listHeader}>
            <Text style={styles.listHeaderText}>Stay at Home</Text>
            <TouchableOpacity>
              <Text style={styles.moreTextButton}>More</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={movieTitlesForList}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <MovieTile item={item} onPress={onMovieTilePress} />
            )}
            horizontal
            contentContainerStyle={{ padding: 8 }}
          />
        </View>
        <View>
          <View style={styles.listHeader}>
            <Text style={styles.listHeaderText}>Explore</Text>
            <TouchableOpacity>
              <Text style={styles.moreTextButton}>More</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={movieTitlesForList}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <MovieTile item={item} onPress={onMovieTilePress} />
            )}
            horizontal
            contentContainerStyle={{ padding: 8 }}
          />
        </View>
      </View>
    </ScrollView>
  );
};

const MovieTile = ({ item, onPress }) => {
  return (
    <TouchableOpacity activeOpacity={0.8} onPress={onPress}>
      <View style={styles.movieImageTile}>
        <Image
          source={item.image}
          style={{ width: '100%', height: '100%' }}
          resizeMode="cover"
        />
      </View>
    </TouchableOpacity>
  );
};

export default HomePage;

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  imageContainer: {
    width: width,
    height: height * 0.45,
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: height * 0.45,
  },
  movieDetailsContainer: {
    position: 'absolute',
    bottom: 0,
    justifyContent: 'center',
    width: width,
    height: 200,
  },
  movieTitle: {
    textAlign: 'center',
    color: colors.textColorWhite,
    fontSize: 25,
    letterSpacing: 2,
    fontWeight: 'bold',
  },
  buttonContainer: {
    flexDirection: 'row',
    width: width,
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 22,
  },
  iconButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  icon: {
    color: colors.textColorWhite,
    fontSize: 20,
    marginRight: 4,
  },
  iconText: {
    color: colors.textColorWhite,
    fontSize: 13,
  },
  moreDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  watchNow: {
    paddingHorizontal: 10,
    marginBottom: 0,
  },
  descriptionText: {
    color: colors.descriptionTextColor,
    textAlign: 'center',
  },
  listContainer: {
    width: width,
    gap: 5,
  },
  listHeader: {
    flexDirection: 'row',
    width: width,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  listHeaderText: {
    color: colors.textColorWhite,
    fontSize: 18,
    fontWeight: 'bold',
  },
  moreTextButton: {
    color: colors.appButton,
    fontSize: 12,
  },
  movieImageTile: {
    width: width * 0.3,
    height: 180,
    marginVertical: 4,
    marginHorizontal: 6,
    borderRadius: 6,
    overflow: 'hidden',
  },
});
