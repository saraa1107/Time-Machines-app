import React, { useState } from 'react';
import {
  View,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
  Text,
  Image,
  ScrollView,
} from 'react-native';
import { Image as ExpoImage } from 'expo-image';
import { s, vs, ms } from '../utils/scale';

const gifs = [
  {
    id: 1,
    src: require('../assets/gifs/1.gif'),
    thumbnail: require('../assets/images/1.png'),
    text: 'Învățăceii clasei a V-a',
  },
  {
    id: 2,
    src: require('../assets/gifs/2.gif'),
    thumbnail: require('../assets/images/2.png'),
    text: 'Exploratorii clasei      a VI-a',
  },
  {
    id: 3,
    src: require('../assets/gifs/3.gif'),
    thumbnail: require('../assets/images/3.png'),
    text: 'Temerarii clasei a VII-a',
  },
  {
    id: 4,
    src: require('../assets/gifs/4.gif'),
    thumbnail: require('../assets/images/4.png'),
    text: 'Experții clasei a VIII-a',
  },
];

export default function TimeMachinesScreen({ navigation }) {
  const [showScroll, setShowScroll] = useState(false);
  const [activeGifs, setActiveGifs] = useState({});
  const [scientistActive, setScientistActive] = useState(false);
  const [currentLine, setCurrentLine] = useState(0);
  const [introVisible, setIntroVisible] = useState(true); // text intro vizibil la start

  const dialogLines = [
    'Salut! Bine ai venit în laboratorul meu! Mă numesc Profesorul Chronos.',
    'Ești pregătit să explorezi istoria? Vom călători împreună în timp!',
    'Alege mașina timpului potrivită pentru tine și începe aventura!',
    'Atinge tabla din spatele meu pentru a vedea mașinile timpului disponibile.',
  ];

  const introText = "Salută-l pe Profesorul Chronos! 👨‍🔬(Apasă pe el pentru a începe conversația)";

  const handleGifPress = (id) => {
    const count = activeGifs[id] || 0;
    if (count === 0) {
      setActiveGifs({ ...activeGifs, [id]: 1 });
    } else if (count === 1) {
      let screenName = '';
      switch (id) {
        case 1:
          screenName = 'ClsVScreen';
          break;
        case 2:
          screenName = 'ClsVIScreen';
          break;
        case 3:
          screenName = 'ClsVIIScreen';
          break;
        case 4:
          screenName = 'ClsVIIIScreen';
          break;
        default:
          return;
      }
      navigation.navigate(screenName);
    }
  };

  const handleScientistPress = () => {
    setScientistActive(true);
    setCurrentLine(0);
    setIntroVisible(false); // ascunde intro la apăsare
  };

  return (
    <ImageBackground
      source={require('../assets/backgrounds/laborator.jpg')}
      style={styles.background}
    >
      {!showScroll && (
        <>
          <TouchableOpacity style={styles.scientistContainer} onPress={handleScientistPress}>
            {scientistActive ? (
              <ExpoImage
                source={require('../assets/scientist/animated.gif')}
                style={styles.scientistImage}
                contentFit="contain"
              />
            ) : (
              <Image
                source={require('../assets/scientist/static.png')}
                style={styles.scientistImage}
              />
            )}
          </TouchableOpacity>

          {/* Textul intro care apare la start */}
          {introVisible && (
            <View style={styles.speechBubble}>
              <Text style={styles.speechText}>{introText}</Text>
            </View>
          )}

          {/* Dialogul când omul este activ */}
          {scientistActive && !introVisible && (
            <View style={styles.speechBubble}>
              <Text style={styles.speechText}>{dialogLines[currentLine]}</Text>
              {currentLine < dialogLines.length - 1 && (
                <TouchableOpacity
                  style={styles.nextButton}
                  onPress={() => setCurrentLine(currentLine + 1)}
                >
                  <Text style={styles.nextButtonText}>Next</Text>
                </TouchableOpacity>
              )}
            </View>
          )}
        </>
      )}

      {!showScroll && (
        <TouchableOpacity
          style={styles.hiddenButton}
          onPress={() => {
            setShowScroll(true);
            setScientistActive(false);
          }}
        />
      )}

      {showScroll && (
        <ImageBackground
          source={require('../assets/backgrounds/tabla.jpg')}
          style={styles.parchment}
          imageStyle={{ borderRadius: 20 }}
        >
          <ScrollView contentContainerStyle={styles.scrollContainer}>
            {gifs.map((gif, index) => {
              const isLeft = index % 2 === 0;
              return (
                <TouchableOpacity
                  key={gif.id}
                  onPress={() => handleGifPress(gif.id)}
                  style={[
                    styles.gifContainer,
                    { flexDirection: isLeft ? 'row' : 'row-reverse' },
                  ]}
                >
                  <ExpoImage
                    source={activeGifs[gif.id] ? gif.src : gif.thumbnail}
                    style={styles.gifImage}
                    contentFit="contain"
                  />
                  {activeGifs[gif.id] === 1 && (
                    <View style={styles.gifTextContainer}>
                      <Text style={styles.gifText}>{gif.text}</Text>
                    </View>
                  )}
                </TouchableOpacity>
              );
            })}
          </ScrollView>

          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => {
              setShowScroll(false);
              setActiveGifs({});
              setScientistActive(false);
              setIntroVisible(true); // resetează intro când închizi scroll-ul
            }}
          >
            <Image
              source={require('../assets/images/back.png')}
              style={styles.backImage}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </ImageBackground>
      )}
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  hiddenButton: {
    position: 'absolute',
    left: s(30),
    top: vs(280),
    width: '20%',
    height: '20%',
    zIndex: 10,
  },
  parchment: {
    position: 'absolute',
    top: vs(80),
    left: s(20),
    right: s(20),
    bottom: vs(40),
    padding: ms(15),
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollContainer: {
    alignItems: 'center',
    paddingBottom: 20,
    width: '100%',
  },
  gifContainer: {
    marginVertical: 15,
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '90%',
    paddingHorizontal: 10,
  },
  gifImage: {
    width: s(150),
    height: vs(125),
    resizeMode: 'contain',
    borderRadius: ms(15),
  },
  gifTextContainer: {
    flex: 1,
    paddingHorizontal: 5,
  },
  gifText: {
    fontSize: 16,
    fontFamily: 'arial',
    fontStyle: 'italic',
    color: '#e9e3d3',
    textAlign: 'center',
  },
  closeButton: {
    marginLeft:s( 250),
    marginBottom:vs( 60),
  },
  backImage: {
    width: s(60),
    height: vs(30),
  },
  scientistContainer: {
    position: 'absolute',
    top: vs(250),
    right: s(180),
    width: s(300),
    height: vs(200),
    zIndex: 10,
    backgroundColor: 'transparent',
  },
  scientistImage: {
    width: '200%',
    height: '200%',
    resizeMode: 'contain',
  },
  speechBubble: {
    position: 'absolute',
    bottom: vs(50),
    left: s(20),
    right: s(20),
    backgroundColor: '#fff8dc',
    padding: ms(12),
    borderRadius: ms(10),
    borderWidth: 2,
    borderColor: '#333',
  },
  speechText: {
    fontSize: ms(14),
    color: '#333',
    fontFamily: 'arial',
    fontStyle: 'italic',
    textAlign: 'center',
  },
  nextButton: {
    marginTop: vs(10),
    backgroundColor: '#333',
    paddingVertical: vs(6),
    paddingHorizontal: s(14),
    borderRadius: ms(6),
    alignSelf: 'flex-start',
  },
  nextButtonText: {
    color: '#fff8dc',
    fontSize: ms(14),
    fontWeight: 'bold',
  },
});
