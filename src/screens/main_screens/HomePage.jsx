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
import MediaTile from '../../components/MediaTile';
import {
  DR_STRANGE,
  MORE_DETAILS,
  WATCH_NOW,
  ADD_TO_PLAYLIST,
  ACTION_THRILLER_SUSPENSE,
  FLASH_CHANNEL,
  STAY_AT_HOME,
  MORE,
  EXPLORE,
} from '../../utils/strings';

const movieTitlesForList = [1, 2, 3, 4, 5];

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
          <Text style={styles.movieTitle}>{DR_STRANGE}</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.iconButton}>
              <Icon name="info" style={styles.icon} />
              <Text style={styles.iconText}>{MORE_DETAILS}</Text>
            </TouchableOpacity>

            <AppButton
              title={WATCH_NOW}
              style={styles.watchNow}
              icon="play-arrow"
              iconColor={colors.textColorWhite}
              iconSize={20}
              onPress={onMovieTilePress}
            />

            <TouchableOpacity style={styles.iconButton}>
              <Icon name="playlist-add" style={styles.icon} />
              <Text style={styles.iconText}>{ADD_TO_PLAYLIST}</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.descriptionText}>{ACTION_THRILLER_SUSPENSE}</Text>
        </View>
      </View>
      <View style={styles.listContainer}>
        <View>
          <View style={styles.listHeader}>
            <Text style={styles.listHeaderText}>{FLASH_CHANNEL}</Text>
            <TouchableOpacity>
              <Text style={styles.moreTextButton}>{MORE}</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={movieTitlesForList}
            keyExtractor={item => item}
            renderItem={() => (
              <MediaTile
                onPress={onMovieTilePress}
                style={{ height: 84, width: 149 }}
              />
            )}
            horizontal
            contentContainerStyle={{ padding: 8 }}
            showsHorizontalScrollIndicator={false}
          />
        </View>
        <View>
          <View style={styles.listHeader}>
            <Text style={styles.listHeaderText}>{STAY_AT_HOME}</Text>
            <TouchableOpacity>
              <Text style={styles.moreTextButton}>{MORE}</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={movieTitlesForList}
            keyExtractor={item => item}
            renderItem={() => (
              <MediaTile
                onPress={onMovieTilePress}
                style={{ width: 100, height: 150 }}
              />
            )}
            horizontal
            contentContainerStyle={{ padding: 8 }}
            showsHorizontalScrollIndicator={false}
          />
        </View>
        <View>
          <View style={styles.listHeader}>
            <Text style={styles.listHeaderText}>{EXPLORE}</Text>
            <TouchableOpacity>
              <Text style={styles.moreTextButton}>{MORE}</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={movieTitlesForList}
            keyExtractor={item => item}
            renderItem={() => (
              <MediaTile
                onPress={onMovieTilePress}
                style={{ width: 149, height: 84 }}
              />
            )}
            horizontal
            contentContainerStyle={{ padding: 8 }}
            showsHorizontalScrollIndicator={false}
          />
        </View>
      </View>
    </ScrollView>
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
    fontSize: 24,
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
    fontSize: 18,
    marginRight: 4,
  },
  iconText: {
    color: colors.textColorWhite,
    fontSize: 10,
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
    fontSize: 13
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
    paddingTop: 10,
  },
  listHeaderText: {
    color: colors.textColorWhite,
    fontSize: 16,
    fontWeight: 'bold',
  },
  moreTextButton: {
    color: colors.appButton,
    fontSize: 12,
    fontWeight: 'bold'
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
