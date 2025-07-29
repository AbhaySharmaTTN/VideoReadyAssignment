import { Dimensions, StyleSheet } from 'react-native';
import { colors } from '../../../utils/colors';

const screenWidth = Dimensions.get('window').width;
const itemSize = screenWidth / 2 - 20;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.appBackground,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  title: {
    fontSize: 24,
    color: 'white',
    alignSelf: 'center',
    marginBottom: 20,
    fontFamily: 'Roboto-Bold',
  },
  grid: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 40,
  },
  itemContainer: {
    width: itemSize,
    alignItems: 'center',
    marginVertical: 16,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  nameText: {
    color: 'white',
    fontSize: 16,
    marginTop: 8,
  },
  addText: {
    color: '#1E90FF',
    fontSize: 16,
    marginTop: 8,
  },
  deleteIconContainer: {
    position: 'absolute',
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgb(1,1,1,0.6)',
    justifyContent: 'center',
  },
  deleteIcon: {
    color: colors.appButton,
    alignSelf: 'center',
  },
});
