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
import React, { useLayoutEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { colors } from '../../utils/colors';
import VideoReadyLogoHeader from '../../components/VideoReadyLogoHeader';
import Video from 'react-native-video';
import { MainRoutes } from '../../utils/Routes';
import MediaTile from '../../components/MediaTile';
import {
  S1_E1_AVATAR,
  ACTION_ADVENTURE_FANTASY,
  MORE_ELLIPSIS,
  ADD_TO_PLAYLIST_VIDEO,
  CAST,
  RECOMMENDED,
  SEASON,
  MORE,
} from '../../utils/strings';
import { useDispatch } from 'react-redux';
import { addDownload } from '../../store/userSlice';

const loremText =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi. Integer sit amet dui leo. Sed interdum sapien ac felis malesuada, at tincidunt purus hendrerit. Aliquam erat volutpat. Proin tempus metus a turpis suscipit, non gravida arcu interdum. Cras ultricies, ligula eget fermentum pharetra.';

const VideoDetails = () => {
  const CASTLIST = [
    { name: 'HoYeon Jung', image: require('../../../assets/profileIcon.png') },
    { name: 'Lee Jung-jae', image: require('../../../assets/profileIcon.png') },
    { name: 'Gong Yoo', image: require('../../../assets/profileIcon.png') },
    { name: 'Lee Yoo-Mi', image: require('../../../assets/profileIcon.png') },
    { name: 'Park Hae-soo', image: require('../../../assets/profileIcon.png') },
  ];

  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [selectedSeason, setSelectedSeason] = useState(1);

  const seasons = [1, 2, 3, 4, 5, 6, 7];

  const [downloadText, setDownloadText] = useState('Download');

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      header: () => {
        return <VideoReadyLogoHeader />;
      },
    });
  }, []);

  function navigateBack() {
    navigation.pop();
  }

  function goToDownloadsOrDownload() {
    if (downloadText !== 'Downloaded') {
      download();
      return;
    }
    navigation.navigate(MainRoutes.DOWNLOADS);
  }

  function onMediaTilePress() {
    navigation.push(MainRoutes.VIDEO_DETAILS);
  }

  function download() {
    setDownloadText('Downloading...');
    setTimeout(() => {
      setDownloadText('Downloaded');
      dispatch(
        addDownload({
          movieName: 'Dr. Strange',
        }),
      );
    }, 5000);
  }

  const [isPaused, setisPaused] = useState(true);

  return (
    <ScrollView
      style={styles.mainContainer}
      contentContainerStyle={{ paddingBottom: 150 }}
    >
      <View style={styles.imageContainer}>
        <Video
          source={{ uri: require('../../../assets/vids.mp4') }}
          style={styles.movieImage}
          resizeMode="cover"
          paused={isPaused}
          repeat
        />

        <TouchableOpacity
          style={styles.backIconContainer}
          onPress={navigateBack}
        >
          <Icon name="arrow-back" size={30} color={colors.textColorWhite} />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.centerPlaybutton}
          onPress={() => setisPaused(prev => !prev)}
        >
          <Icon
            name={isPaused ? 'play-arrow' : 'pause'}
            size={50}
            color={colors.textColorWhite}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.movieNameContainer}>
        <Text style={styles.movieName}>{S1_E1_AVATAR}</Text>
        <View style={styles.shareAndLikeButtons}>
          <Icon name="share" size={20} color={colors.descriptionTextColor} />
          <Icon name="favorite" size={20} color={colors.descriptionTextColor} />
        </View>
      </View>

      <View style={styles.ratingSectionContainer}>
        <View style={styles.ratingIMDB}>
          <Text style={styles.text}>8.6</Text>
          <Image source={require('../../../assets/imdb.png')} />
          <Text style={styles.text}> | 2h 38m</Text>
        </View>
      </View>

      <Text style={styles.textGenre}>{ACTION_ADVENTURE_FANTASY}</Text>

      <Text style={[styles.text, styles.description]}>
        {loremText}
        <Text style={[styles.text, { color: colors.appButton }]}>
          {MORE_ELLIPSIS}
        </Text>
      </Text>

      <View style={styles.directorCountryRelease}>
        <Text style={styles.metaText}>
          Director: <Text style={styles.meta}>Dennis</Text>
        </Text>
        <Text style={styles.metaText}>
          Country: <Text style={styles.meta}>UK , USA</Text>
        </Text>
        <Text style={styles.metaText}>
          Release: <Text style={styles.meta}>2021</Text>
        </Text>
      </View>

      <View style={styles.playlistDownload}>
        <View style={styles.playlistDownloadButtonStyle}>
          <Icon name="playlist-add" size={20} color={colors.textColorWhite} />
          <Text style={styles.playlistDownloadButtonText}>
            {ADD_TO_PLAYLIST_VIDEO}
          </Text>
        </View>
        <View style={styles.playlistDownloadButtonStyle}>
          <Icon
            name={
              downloadText === 'Download' ? 'download' : 'incomplete-circle'
            }
            size={20}
            color={colors.textColorWhite}
          />
          <TouchableOpacity onPress={goToDownloadsOrDownload}>
            <Text style={styles.playlistDownloadButtonText}>
              {downloadText}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.castList}>
        <Text style={styles.listHeading}>{CAST}</Text>
        <View style={styles.listContainer}>
          <FlatList
            data={CASTLIST}
            keyExtractor={(item, index) => item + index}
            renderItem={({ item }) => <CastListItem item={item} />}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
        </View>
      </View>

      <View style={styles.seasonSelectorContainer}>
        <FlatList
          data={seasons}
          horizontal
          keyExtractor={item => item}
          contentContainerStyle={styles.seasonListContent}
          renderItem={({ item }) => {
            const isSelected = item === selectedSeason;
            return (
              <Text
                onPress={() => setSelectedSeason(item)}
                style={[
                  styles.seasonItem,
                  isSelected && styles.selectedSeasonItem,
                ]}
              >
                {SEASON} {item}
              </Text>
            );
          }}
          showsHorizontalScrollIndicator={false}
        />
      </View>

      <View style={styles.episodeListContainer}>
        <FlatList
          data={seasons}
          keyExtractor={item => item}
          renderItem={({ item }) => (
            <MediaTile
              onPress={onMediaTilePress}
              showEpisodeNumber={true}
              episodeNumber={item}
              style={styles.episodeMediaTile}
            />
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      </View>

      <View style={styles.recommendedContainer}>
        <View style={styles.recommendedHeader}>
          <Text style={styles.recommendedHeaderText}>{RECOMMENDED}</Text>
          <Text style={styles.recommendedHeaderMore}>{MORE}</Text>
        </View>
        <FlatList
          data={seasons}
          keyExtractor={item => item}
          renderItem={() => <RecommendedItem onPress={onMediaTilePress} />}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      </View>
    </ScrollView>
  );
};

const CastListItem = ({ item }) => {
  return (
    <View style={styles.castListItemContainer}>
      <Image
        source={item.image}
        resizeMode="cover"
        style={styles.castListImage}
      />
      <Text style={styles.castLISTName}>{item.name}</Text>
    </View>
  );
};

const RecommendedItem = ({ onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
      <View>
        <Image
          source={require('../../../assets/movieImage.png')}
          style={styles.recomImage}
          resizeMode="cover"
        />
      </View>
    </TouchableOpacity>
  );
};

export default VideoDetails;

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  imageContainer: {
    width: width,
    height: height * 0.25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  movieImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  backIconContainer: {
    position: 'absolute',
    top: 10,
    left: 10,
    zIndex: 2,
  },
  centerPlaybutton: {
    zIndex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  movieNameContainer: {
    width: width,
    padding: 10,
    flexDirection: 'row',
  },
  movieName: {
    fontSize: 20,
    color: colors.textColorWhite,
    fontWeight: 'bold',
    letterSpacing: 1,
    flex: 1,
  },
  shareAndLikeButtons: {
    flexDirection: 'row',
    gap: 10,
  },
  ratingSectionContainer: {
    flexDirection: 'row',
    paddingHorizontal: 10,
  },
  ratingIMDB: {
    flexDirection: 'row',
  },
  text: {
    color: colors.descriptionTextColor,
    paddingRight: 3,
  },
  textGenre: {
    color: colors.descriptionTextColor,
    paddingVertical: 15,
    paddingHorizontal: 10,
  },
  description: {
    paddingVertical: 15,
    paddingHorizontal: 10,
  },
  directorCountryRelease: {
    paddingHorizontal: 10,
    paddingBottom: 20,
  },
  metaText: {
    color: colors.descriptionTextColor,
    marginRight: 15,
    paddingVertical: 4,
  },
  meta: {
    color: colors.textColorWhite,
  },
  playlistDownload: {
    flexDirection: 'row',
    marginLeft: 10,
  },
  playlistDownloadButtonStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
    marginRight: 30,
  },
  playlistDownloadButtonText: {
    color: colors.textColorWhite,
  },
  listHeading: {
    color: colors.textColorWhite,
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  castList: {
    paddingHorizontal: 10,
    marginVertical: 15,
  },
  listContainer: {
    width: '100%',
    backgroundColor: colors.bottomSheetBackgroundColor,
    borderRadius: 6,
    padding: 4,
  },
  castListItemContainer: {
    margin: 4,
    width: 80,
    alignItems: 'center',
  },

  castListImage: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginBottom: 6,
  },

  castLISTName: {
    color: colors.textColorWhite,
    fontSize: 12,
    textAlign: 'center',
    flexWrap: 'wrap',
  },
  seasonSelectorContainer: {
    paddingHorizontal: 10,
    marginTop: 5,
  },

  seasonListContent: {
    gap: 10,
  },

  seasonItem: {
    backgroundColor: '#052c52',
    color: colors.textColorWhite,
    borderRadius: 20,
    fontSize: 14,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 5,
    paddingHorizontal: 16,
  },
  episodeListContainer: {
    paddingHorizontal: 10,
    marginVertical: 10,
  },
  selectedSeasonItem: {
    backgroundColor: colors.appButton,
    color: colors.textColorWhite,
    fontWeight: 'bold',
  },
  episodeNumber: {
    position: 'absolute',
    top: 5,
    left: 5,
    backgroundColor: colors.textColorWhite,
    paddingHorizontal: 5,
    paddingVertical: 2,
    borderRadius: 3,
    fontWeight: '600',
  },
  recommendedContainer: {
    padding: 10,
  },
  recommendedHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },
  recommendedHeaderText: {
    color: colors.textColorWhite,
    fontSize: 14,
    fontWeight: 'bold',
  },
  recommendedHeaderMore: {
    color: colors.appButton,
    fontSize: 13,
    fontWeight: 'bold',
  },
  recomImage: {
    width: 149,
    height: 84,
    borderRadius: 5,
    marginRight: 10,
  },
  episodeMediaTile: {
    width: 100,
    height: 150,
  },
});
