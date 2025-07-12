import { useRef, useState } from 'react';
import {
  View,
  Image,
  StyleSheet,
  Dimensions,
  Text,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../../utils/colors';

const { width, height } = Dimensions.get('window');

const carouselItems = [
  {
    imageUri: require('../../../assets/Intro1.png'),
    title: 'WATCH',
    subtitle: 'your favourite shows and movies',
    description: 'Watch on Mobile, Smart TV and more',
  },
  {
    imageUri: require('../../../assets/Intro2.png'),
    title: 'STREAM',
    subtitle: 'Anywhere on 5 devices, 2 concurrently',
    description: 'Watch on Mobile, Smart TV and more',
  },
  {
    imageUri: require('../../../assets/Intro3.png'),
    title: 'COLLECT',
    subtitle: 'loyalty points on every purchase',
    description: 'Less money for more benefits',
  },
];

const Carousel = () => {
  const flatListRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToNextPage = () => {
    let nextIndex = (currentIndex + 1) % carouselItems.length;
    flatListRef.current?.scrollToIndex({ index: nextIndex, animated: false });
    setCurrentIndex(nextIndex);
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <View style={styles.carouselContainer}>
        <FlatList
          ref={flatListRef}
          data={carouselItems}
          keyExtractor={index => index.toString()}
          renderItem={({ item }) => (
            <CarouselItem
              title={item.title}
              image={item.imageUri}
              subtitle={item.subtitle}
              description={item.description}
              goToNextPage={goToNextPage}
            />
          )}
          horizontal
          snapToInterval={width}
          decelerationRate="fast"
          showsHorizontalScrollIndicator={true}
          style={styles.flatList}
          bounces={false}
          scrollEnabled={false}
        />
      </View>

      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.button} onPress={goToNextPage}>
          <Text style={styles.buttonText}>GET ENTERTAINED</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.skipButton}>
          <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const CarouselItem = ({
  title,
  subtitle,
  description,
  image,
  goToNextPage,
}) => {
  return (
    <View style={styles.carouselItem}>
      <View style={styles.imageContainer}>
        <Image source={image} style={styles.image} resizeMode="cover" />
        <LinearGradient
          colors={['#001122', 'rgba(0,0,0,0)']}
          style={styles.topGradient}
        />
      </View>

      <View style={styles.logoContainer}>
        <Image
          source={require('../../../assets/video_ready_text.png')}
          style={styles.videoReadyTextImage}
          resizeMode="contain"
        />
      </View>

      <TouchableOpacity onPress={goToNextPage}>
        <View style={styles.textContainer}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.subtitle}>{subtitle}</Text>
          <Text style={styles.description}>{description}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default Carousel;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  carouselContainer: {
    flex: 1,
  },
  flatList: {
    flex: 1,
  },
  carouselItem: {
    flex: 1,
    alignItems: 'center',
    width: width,
  },
  imageContainer: {
    width: '100%',
    height: height * 0.55,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  topGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 120,
  },
  logoContainer: {
    marginTop: -40,
    alignItems: 'center',
  },
  videoReadyTextImage: {
    width: 220,
    height: 60,
  },
  textContainer: {
    alignItems: 'center',
    paddingHorizontal: 30,
    marginTop: 20,
  },
  title: {
    color: colors.textColorBlue,
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: 2,
  },
  subtitle: {
    color: colors.textColorWhite,
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 8,
    textAlign: 'center',
  },
  description: {
    color: colors.descriptionTextColor,
    fontSize: 14,
    marginTop: 6,
  },

  buttonsContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  button: {
    backgroundColor: colors.appButton,
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 12,
  },
  buttonText: {
    color: colors.textColorWhite,
    fontWeight: 'bold',
    fontSize: 16,
  },
  skipButton: {
    alignItems: 'center',
    paddingVertical: 10,
  },
  skipText: {
    color: colors.appButton,
    fontSize: 14,
  },
});
