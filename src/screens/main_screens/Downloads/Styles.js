import { StyleSheet } from "react-native";
import { colors } from "../../../utils/colors";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: colors.appBackground,
    padding: 12,
  },
  sheetBackground: {
    backgroundColor: colors.bottomSheetBackgroundColor,
  },
  sheetContent: {
    height: '100%',
    justifyContent: 'space-between',
    padding: 24,
  },
  sheetTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  sheetSubtitle: {
    color: '#ccc',
    fontSize: 16,
    marginTop: 8,
  },
  downloadsList: {
    flex: 1,
  },
  movieItemContainer: {
    flexDirection: 'row',
    width: '100%',
    marginVertical: 10,
    alignItems: 'center',
  },
  icon: {
    fontSize: 20,
    color: colors.textColorWhite,
  },
  movieImage: {
    width: 130,
    height: 80,
    borderRadius: 8,
  },
  imageAndTitleContainer: {
    flexDirection: 'row',
    flex: 1,
  },
  titleAndDescription: {
    justifyContent: 'center',
    paddingLeft: 6,
  },
  titleText: {
    color: colors.textColorWhite,
    fontSize: 14,
  },
  descriptionText: {
    color: colors.labelColor,
    fontSize: 12,
  },
  divider: {
    width: '90%',
    height: 1,
    backgroundColor: '#242930',
  },
  renderItemViewContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  sheetButtons: {
    width: '100%',
    padding: 15,
    marginVertical: 5,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  text: {
    color: colors.textColorWhite,
  },
  encapsulate: {
    borderBottomColor: colors.labelColor,
    borderTopColor: colors.labelColor,
  },
  header: {
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerText: {
    color: colors.textColorWhite,
    fontSize: 20,
  },
  headerIcon: {
    width: '35%',
    fontSize: 20,
    color: colors.textColorWhite,
  },
  noDownloadsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
