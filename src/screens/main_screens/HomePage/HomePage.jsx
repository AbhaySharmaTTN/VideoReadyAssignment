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
import { colors } from '../../../utils/colors';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AppButton from '../../../components/AppButton';
import { useNavigation } from '@react-navigation/native';
import { MainRoutes } from '../../../utils/Routes';
import MediaTile from '../../../components/MediaTile';
import {
  DR_STRANGE,
  MORE_DETAILS,
  WATCH_NOW,
  ADD_TO_PLAYLIST,
  ACTION_THRILLER_SUSPENSE,
  FLASH_CHANNEL,
  STAY_AT_HOME,
  MORE,
  EXPLORE,
} from '../../../utils/strings';
import { styles } from './Styles';

const movieTitlesForList = [1, 2, 3, 4, 5];

const HomePage = () => {
  const navigation = useNavigation();

  function onMovieTilePress() {
    navigation.navigate(MainRoutes.VIDEO_DETAILS);
  }

  return (
    <ScrollView style={styles.mainContainer}>
      <View style={styles.imageContainer}>
        <Image
          source={require('../../../../assets/Intro1.png')}
          style={styles.image}
          resizeMode="cover"
        />
        <View style={styles.movieDetailsContainer}>
          <Text style={styles.movieTitle}>{DR_STRANGE}</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.iconButton}>
              <Icon name="info" style={styles.icon} />
              <Text style={styles.iconText}>{MORE_DETAILS}</Text>
            </TouchableOpacity>

            <AppButton
              title={WATCH_NOW}
              style={styles.watchNow}
              icon="play-arrow"
              iconColor={colors.textColorWhite}
              iconSize={20}
              onPress={onMovieTilePress}
            />

            <TouchableOpacity style={styles.iconButton}>
              <Icon name="playlist-add" style={styles.icon} />
              <Text style={styles.iconText}>{ADD_TO_PLAYLIST}</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.descriptionText}>{ACTION_THRILLER_SUSPENSE}</Text>
        </View>
      </View>
      <View style={styles.listContainer}>
        <View>
          <View style={styles.listHeader}>
            <Text style={styles.listHeaderText}>{FLASH_CHANNEL}</Text>
            <TouchableOpacity>
              <Text style={styles.moreTextButton}>{MORE}</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={movieTitlesForList}
            keyExtractor={item => item}
            renderItem={() => (
              <MediaTile
                onPress={onMovieTilePress}
                style={{ height: 84, width: 149 }}
              />
            )}
            horizontal
            contentContainerStyle={{ padding: 8 }}
            showsHorizontalScrollIndicator={false}
          />
        </View>
        <View>
          <View style={styles.listHeader}>
            <Text style={styles.listHeaderText}>{STAY_AT_HOME}</Text>
            <TouchableOpacity>
              <Text style={styles.moreTextButton}>{MORE}</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={movieTitlesForList}
            keyExtractor={item => item}
            renderItem={() => (
              <MediaTile
                onPress={onMovieTilePress}
                style={{ width: 100, height: 150 }}
              />
            )}
            horizontal
            contentContainerStyle={{ padding: 8 }}
            showsHorizontalScrollIndicator={false}
          />
        </View>
        <View>
          <View style={styles.listHeader}>
            <Text style={styles.listHeaderText}>{EXPLORE}</Text>
            <TouchableOpacity>
              <Text style={styles.moreTextButton}>{MORE}</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={movieTitlesForList}
            keyExtractor={item => item}
            renderItem={() => (
              <MediaTile
                onPress={onMovieTilePress}
                style={{ width: 149, height: 84 }}
              />
            )}
            horizontal
            contentContainerStyle={{ padding: 8 }}
            showsHorizontalScrollIndicator={false}
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default HomePage;

