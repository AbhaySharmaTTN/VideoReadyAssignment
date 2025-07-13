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
import VideoReadyHeader from '../../components/VideoReadyHeader';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { colors } from '../../utils/colors';
import LinearGradient from 'react-native-linear-gradient';
import VideoReadyLogoHeader from '../../components/VideoReadyLogoHeader';

const loremText =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi. Integer sit amet dui leo. Sed interdum sapien ac felis malesuada, at tincidunt purus hendrerit. Aliquam erat volutpat. Proin tempus metus a turpis suscipit, non gravida arcu interdum. Cras ultricies, ligula eget fermentum pharetra.';

const VideoDetails = () => {
  const CAST = [
    { name: 'HoYeon Jung', image: require('../../../assets/profileIcon.png') },
    { name: 'Lee Jung-jae', image: require('../../../assets/profileIcon.png') },
    { name: 'Gong Yoo', image: require('../../../assets/profileIcon.png') },
    { name: 'Lee Yoo-Mi', image: require('../../../assets/profileIcon.png') },
    { name: 'Park Hae-soo', image: require('../../../assets/profileIcon.png') },
  ];

  const navigation = useNavigation();

  const [selectedSeason, setSelectedSeason] = useState(1);

  const seasons = [1, 2, 3, 4, 5, 6, 7];

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      header: () => {
        return <VideoReadyLogoHeader />;
      },
    });
  }, []);

  function navigateBack() {
    navigation.goBack();
  }

  return (
    <ScrollView
      style={styles.mainContainer}
      contentContainerStyle={{ paddingBottom: 150 }}
    >
      <View style={styles.imageContainer}>
        <Image
          source={require('../../../assets/Intro2.png')}
          style={styles.movieImage}
          resizeMode="cover"
        />

        <TouchableOpacity
          style={styles.backIconContainer}
          onPress={navigateBack}
        >
          <Icon name="arrow-back" size={30} color={colors.textColorWhite} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.centerPlaybutton}>
          <Icon name="play-arrow" size={30} color={colors.textColorWhite} />
        </TouchableOpacity>

        <View style={styles.gradientContainer} pointerEvents="none">
          <LinearGradient
            colors={[colors.appBackground, 'transparent']}
            style={styles.topGradient}
          />
          <LinearGradient
            colors={['transparent', colors.appBackground]}
            style={styles.bottomGradient}
          />
        </View>
      </View>

      <View style={styles.movieNameContainer}>
        <Text style={styles.movieName}>S1:E1:Avatar</Text>
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

      <Text style={styles.textGenre}>Action, Adventure, Fantasy</Text>

      <Text style={[styles.text, styles.description]}>
        {loremText}
        <Text style={[styles.text, { color: colors.appButton }]}> ...more</Text>
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
          <Text style={styles.playlistDownloadButtonText}>Add to playlist</Text>
        </View>
        <View style={styles.playlistDownloadButtonStyle}>
          <Icon
            name="incomplete-circle"
            size={20}
            color={colors.textColorWhite}
          />
          <Text style={styles.playlistDownloadButtonText}>Downloading...</Text>
        </View>
      </View>

      <View style={styles.castList}>
        <Text style={styles.listHeading}>Cast</Text>
        <View style={styles.listContainer}>
          <FlatList
            data={CAST}
            keyExtractor={(item, index) => item + index}
            renderItem={({ item }) => <CastItem item={item} />}
            horizontal
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
                Season {item}
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
          renderItem={({ item }) => <EpisodeItem item={item} />}
          horizontal
        />
      </View>

      <View style={styles.recommendedContainer}>
        <View style={styles.recommendedHeader}>
          <Text style={styles.recommendedHeaderText}>Recommended</Text>
          <Text style={styles.recommendedHeaderMore}>More</Text>
        </View>
        <FlatList
          data={seasons}
          keyExtractor={item => item}
          renderItem={() => <RecommendedItem />}
          horizontal
        />
      </View>
    </ScrollView>
  );
};

const CastItem = ({ item }) => {
  return (
    <View style={styles.castItemContainer}>
      <Image source={item.image} resizeMode="cover" style={styles.castImage} />
      <Text style={styles.castName}>{item.name}</Text>
    </View>
  );
};

const EpisodeItem = ({ item }) => {
  return (
    <View style={styles.episodeContainer}>
      <Image
        source={require('../../../assets/movieImage.png')}
        style={styles.episodeImage}
      />
      <Text style={styles.episodeNumber}>E{item}</Text>
    </View>
  );
};

const RecommendedItem = () => {
  return (
    <View>
      <Image
        source={require('../../../assets/movieImage.png')}
        style={styles.recomImage}
        resizeMode="cover"
      />
    </View>
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
  gradientContainer: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    zIndex: 1,
  },
  topGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '20%',
  },
  bottomGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '20%',
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
  castItemContainer: {
    margin: 4,
    width: 80,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },

  castImage: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginBottom: 6,
  },

  castName: {
    color: colors.textColorWhite,
    fontSize: 12,
    textAlign: 'center',
    flexWrap: 'wrap',
  },
  seasonSelectorContainer: {
    paddingHorizontal: 10,
    marginTop: 10,
  },

  seasonListContent: {
    gap: 10,
  },

  seasonItem: {
    backgroundColor: colors.appButton,
    color: colors.textColorWhite,
    paddingVertical: 6,
    paddingHorizontal: 20,
    borderRadius: 20,
    fontSize: 14,
  },
  episodeListContainer: {
    paddingHorizontal: 10,
    marginVertical: 10,
  },
  selectedSeasonItem: {
    backgroundColor: colors.textColorWhite,
    color: colors.appButton,
    fontWeight: 'bold',
  },
  episodeImage: {
    width: width * 0.3 - 15,
    height: height * 0.2,
    borderRadius: 3,
    marginRight: 10,
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
    fontSize: 20,
    fontWeight: 'bold',
  },
  recommendedHeaderMore: {
    color: colors.appButton,
    fontSize: 16,
  },
  recomImage: {
    width: width * 0.45,
    height: height * 0.13,
    borderRadius: 5,
    marginRight: 10,
  },
});
