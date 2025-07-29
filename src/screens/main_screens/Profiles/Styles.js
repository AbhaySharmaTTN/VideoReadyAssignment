import { Dimensions, StyleSheet } from "react-native";
import { colors } from "../../../utils/colors";

const screenWidth = Dimensions.get('window').width;
const gridItemSize = screenWidth / 3 - 14;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  profileRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  itemContainer: {
    alignItems: 'center',
    marginRight: 14,
    marginBottom: 12,
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
  },
  nameText: {
    color: colors.textColorWhite,
    fontSize: 13,
    marginTop: 4,
  },
  addText: {
    color: colors.textColorBlue,
    fontSize: 13,
    marginTop: 4,
  },
  addIcon: {
    fontSize: 24,
    color: colors.textColorBlue,
  },
  editProfile: {
    color: colors.textColorBlue,
    fontSize: 14,
    marginTop: 10,
    marginBottom: 10,
  },
  divider: {
    height: 1,
    backgroundColor: colors.labelColor,
    marginVertical: 12,
  },
  genreHeader: {
    color: colors.textColorWhite,
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  genreGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    gap: 10,
    paddingBottom: 20,
    marginTop: 10,
  },
  genreCard: {
    width: gridItemSize - 5,
    backgroundColor: '#001C37',
    padding: 3,
    borderRadius: 8,
    height: 132,
  },
  genreImage: {
    width: '100%',
    height: 104,
    borderRadius: 8,
  },
  genreText: {
    color: colors.descriptionTextColor,
    padding: 6,
    fontSize: 12,
    textAlign: 'left',
  },
  genreAddBox: {
    width: gridItemSize - 5,
    height: gridItemSize + 12,
    backgroundColor: '#122436',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  editProfile: {
    textAlign: 'center',
    paddingTop: 12,
    paddingBottom: 8,
    color: colors.appButton,
  },
  header: {
    flexDirection: 'row',
    width: '100%',
    marginBottom: 10,
  },
  headerIconContainer: {
    width: '40%',
  },
  headerText: {
    color: colors.textColorWhite,
  },
  closeIcon: {
    color: '#919DA7',
    fontSize: 12,
  },
  closeIconContainer: {
    position: 'absolute',
    right: 8,
    top: 8,
    backgroundColor: 'rgba(145, 157, 167, 0.2)',
    borderWidth: 1,
    borderRadius: 10,
    padding: 2,
    borderColor: '#919DA7',
  },
});