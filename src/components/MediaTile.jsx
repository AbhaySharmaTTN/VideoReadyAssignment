import React from 'react';
import {
  TouchableOpacity,
  Image,
  Text,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { colors } from '../utils/colors';

const { width, height } = Dimensions.get('window');

const MediaTile = ({
  onPress,
  episodeNumber,
  showEpisodeNumber = false,
  style,
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      style={[
        showEpisodeNumber ? styles.episodeContainer : styles.movieImageTile,style
      ]}
    >
      <Image
        source={require('../../assets/movieImage.png')}
        style={showEpisodeNumber ? styles.episodeImage : styles.movieImage}
        resizeMode="cover"
      />
      {showEpisodeNumber && episodeNumber !== undefined && (
        <Text style={styles.episodeNumber}>E{episodeNumber}</Text>
      )}
    </TouchableOpacity>
  );
};

export default MediaTile;

const styles = StyleSheet.create({
  movieImageTile: {
    width: width * 0.3,
    height: 180,
    marginVertical: 4,
    marginHorizontal: 6,
    borderRadius: 6,
    overflow: 'hidden',
  },
  movieImage: {
    width: '100%',
    height: '100%',
  },
  episodeContainer: {
    width: width * 0.3 - 15,
    height: height * 0.2,
    marginRight: 10,
    borderRadius: 3,
    overflow: 'hidden',
  },
  episodeImage: {
    width: '100%',
    height: '100%',
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
});
