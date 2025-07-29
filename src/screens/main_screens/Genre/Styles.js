import { Dimensions, StyleSheet } from 'react-native';
import { colors } from '../../../utils/colors';

const screenWidth = Dimensions.get('window').width;
const gridItemSize = screenWidth / 3 - 14;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.appBackground,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: colors.appBackground,
  },
  icon: {
    color: colors.textColorWhite,
    paddingRight: 10,
  },
  headerText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  grid: {
    paddingHorizontal: 12,
    paddingTop: 16,
  },
  column: {
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  gridItem: {
    width: gridItemSize,
    alignItems: 'center',
    backgroundColor: '#001C37',
    padding: 3,
    borderRadius: 8,
  },
  image: {
    width: '100%',
    height: gridItemSize,
    borderRadius: 8,
  },
  textRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 6,
    paddingVertical: 3,
    width: '100%',
  },
  title: {
    color: 'white',
    fontSize: 13,
    flexShrink: 1,
  },
  confirmButton: {
    marginHorizontal: 20,
    marginVertical: 10,
  },
});
