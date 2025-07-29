import { StyleSheet } from "react-native";
import { colors } from "../../../utils/colors";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.appBackground,
  },
  innerContainer: {
    padding: 20,
  },
  imageContainer: {
    marginBottom: 20,
    alignSelf: 'center',
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  placeholder: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#2c2c2c',
    justifyContent: 'center',
    alignItems: 'center',
  },
  pickImageText: {
    color: colors.placeholderTextColor,
    fontSize: 12,
    marginTop: 6,
  },
  input: {
    width: '80%',
    borderBottomWidth: 1,
    borderBottomColor: colors.placeholderTextColor,
    fontSize: 16,
    color: colors.textColorWhite,
    paddingVertical: 8,
    marginBottom: 24,
    textAlign: 'center',
  },
  nameText: {
    color: colors.textColorWhite,
    textAlign: 'center',
    marginBottom: 25,
    fontWeight: 'bold',
  },
  imageAndTextContainer: {
    width: '100%',
    justifyContent: 'center',
  },
  header: {
    backgroundColor: colors.appHeaderColor,
    width: '100%',
    paddingVertical: 16,
    paddingHorizontal: 20,
  },

  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  headerText: {
    color: colors.textColorWhite,
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 12,
  },
});
