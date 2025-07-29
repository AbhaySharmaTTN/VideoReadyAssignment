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
import { colors } from '../../../utils/colors';
import VideoReadyLogoHeader from '../../../components/VideoReadyLogoHeader';
import Video from 'react-native-video';
import { MainRoutes } from '../../../utils/Routes';
import MediaTile from '../../../components/MediaTile';
import {
  S1_E1_AVATAR,
  ACTION_ADVENTURE_FANTASY,
  MORE_ELLIPSIS,
  ADD_TO_PLAYLIST_VIDEO,
  CAST,
  RECOMMENDED,
  SEASON,
  MORE,
} from '../../../utils/strings';
import { useDispatch } from 'react-redux';
import { addDownload } from '../../../store/userSlice';
import { styles } from './Styles';

const loremText =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi. Integer sit amet dui leo. Sed interdum sapien ac felis malesuada, at tincidunt purus hendrerit. Aliquam erat volutpat. Proin tempus metus a turpis suscipit, non gravida arcu interdum. Cras ultricies, ligula eget fermentum pharetra.';

const VideoDetails = () => {
  const CASTLIST = [
    { name: 'HoYeon Jung', image: require('../../../../assets/profileIcon.png') },
    { name: 'Lee Jung-jae', image: require('../../../../assets/profileIcon.png') },
    { name: 'Gong Yoo', image: require('../../../../assets/profileIcon.png') },
    { name: 'Lee Yoo-Mi', image: require('../../../../assets/profileIcon.png') },
    { name: 'Park Hae-soo', image: require('../../../../assets/profileIcon.png') },
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


  return (
    <ScrollView
      style={styles.mainContainer}
      contentContainerStyle={{ paddingBottom: 150 }}
    >
      <View style={styles.imageContainer}>
        <Video
          source={{ uri: require('../../../../assets/vids.mp4') }}
          style={styles.movieImage}
          resizeMode="cover"
          paused={true}
          repeat
          controls
        />

        {/* {isPaused && (
          <TouchableOpacity
            style={styles.backIconContainer}
            onPress={navigateBack}
          >
            <Icon name="arrow-back" size={30} color={colors.textColorWhite} />
          </TouchableOpacity>
        )} */}
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
          <Image source={require('../../../../assets/imdb.png')} />
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
          source={require('../../../../assets/movieImage.png')}
          style={styles.recomImage}
          resizeMode="cover"
        />
      </View>
    </TouchableOpacity>
  );
};

export default VideoDetails;
