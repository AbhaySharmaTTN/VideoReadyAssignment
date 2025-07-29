import { Dimensions, StyleSheet } from "react-native";
import { colors } from "../../../utils/colors";

const { width, height } = Dimensions.get('window');

export const styles = StyleSheet.create({
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
