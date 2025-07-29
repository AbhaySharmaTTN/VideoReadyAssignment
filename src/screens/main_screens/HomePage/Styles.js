import { Dimensions, StyleSheet } from "react-native";
import { colors } from "../../../utils/colors";

const { width, height } = Dimensions.get('window');

export const styles = StyleSheet.create({
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
    fontSize: 13,
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
    fontWeight: 'bold',
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
