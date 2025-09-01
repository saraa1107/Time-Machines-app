import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ImageBackground,
  Animated,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { s, vs, ms } from '../utils/scale';

const toolImages = [
  require('../assets/tools/tool1.png'),
  require('../assets/tools/tool2.png'),
  require('../assets/tools/tool3.png'),
];

export default function VanatoareScreen() {
  const navigation = useNavigation();

  const [showIntro, setShowIntro] = useState(true);
  const [fadeAnim] = useState(new Animated.Value(1));
  const [textShake] = useState(new Animated.Value(0));
  const [currentLine, setCurrentLine] = useState(0);
  const [showMiniGame, setShowMiniGame] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [hasCompletedMiniGame, setHasCompletedMiniGame] = useState(false);
  const [showFinalScreen, setShowFinalScreen] = useState(false);
  const [hasLeftImprint, setHasLeftImprint] = useState(false);

  const lucyLines = [
    'Suntem gata să începem vânătoarea! În cetele de vânătoare vei avea nevoie de unelte potrivite.',
    'Profesorul Chronos ți-a pregătit deja mai multe unelte pentru a te ajuta.',
    'Alege-o pe cea potrivită pentru perioada în care te afli. Ești pregătit?',
    'Acum ești pregătit! În apropiere se află o peșteră.',
    'Înainte de a pleca la vânătoare, ceilalți membri ai cetei au hotărât că ești unul de-al lor.',
    'Acum îți poți lăsa amprenta pe pereții peșterii. Vrei să mergi mai departe?',
    'Vânătoarea a fost un succes! Ai reușit să te integrezi în comunitatea lor.',
    'Însă din păcate, oamenii din paleolitic sunt nomazi, iar acum trebuie să plece mai departe.',
    'Călătoria noastră continuă, iar tu trebuie să te pregătești pentru următoarea aventură.',
    'Eu trebuie să plec acum, dar tu îți poți continua călătoria înapoi în neolitic alături de un bun prieten al meu.',
    'Vrei să continui călătoria?',
  ];

  const correctIndex = 1;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(textShake, {
          toValue: 5,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(textShake, {
          toValue: -5,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(textShake, {
          toValue: 0,
          duration: 100,
          useNativeDriver: true,
        }),
      ])
    ).start();

    setTimeout(() => {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }).start(() => setShowIntro(false));
    }, 3000);
  }, []);

  const handleNext = () => {
    if (currentLine === 2 && !hasCompletedMiniGame) {
      setShowMiniGame(true);
      return;
    }

    if (currentLine === 5) {
      setShowFinalScreen(true);
      return;
    }

    if (currentLine < lucyLines.length - 1) {
      setCurrentLine(currentLine + 1);
    }
  };

  const handleSelection = (index) => {
    if (selectedItems.includes(index)) {
      setSelectedItems([]);
    } else {
      setSelectedItems([index]);
    }
  };

  const isCorrectSelection =
    selectedItems.length === 1 && selectedItems[0] === correctIndex;

  if (showFinalScreen) {
    return (
      <ImageBackground
        source={require('../assets/backgrounds/final-cave.jpg')}
        style={styles.finalScreen}
      >
        {!hasLeftImprint ? (
          <TouchableOpacity
            style={styles.fullScreenTouchable}
            onPress={() => setHasLeftImprint(true)}
          >
            <Text style={styles.finalText}>Apasă pe ecran pentru a-ți lăsa amprenta!</Text>
          </TouchableOpacity>
        ) : (
          <>
            <Image
              source={require('../assets/handprint.png')}
              style={styles.imprintImage}
              resizeMode="contain"
            />
            <TouchableOpacity
              style={styles.doneButton}
              onPress={() => {
                setShowFinalScreen(false);
                setHasLeftImprint(false);
                setCurrentLine(6);
              }}
            >
              <Text style={styles.doneButtonText}>Gata</Text>
            </TouchableOpacity>
          </>
        )}
      </ImageBackground>
    );
  }

  return showIntro ? (
    <View style={styles.introContainer}>
      <Animated.Text
        style={[
          styles.introText,
          {
            opacity: fadeAnim,
            transform: [{ translateX: textShake }],
          },
        ]}
      >
        2,5-2 milioane de ani î.Hr.
      </Animated.Text>
    </View>
  ) : (
    <ImageBackground
      source={require('../assets/backgrounds/hunting-scene.jpeg')}
      style={styles.background}
    >
      <View style={styles.dialogContainer}>
        <Image
          source={require('../assets/Lucy/static.png')}
          style={styles.lucySmall}
          resizeMode="contain"
        />
        <View style={styles.speechBubble}>
          <Text style={styles.speechText}>{lucyLines[currentLine]}</Text>
        </View>
      </View>

      {!showMiniGame && (
        <>
          {currentLine < lucyLines.length - 1 && (
            <TouchableOpacity
              style={[
                styles.nextButton,
                (currentLine === 2 || currentLine === 5) && styles.greenButton,
              ]}
              onPress={handleNext}
            >
              <Text style={styles.nextButtonText}>
                {(currentLine === 2 || currentLine === 5) ? 'Da' : 'Next'}
              </Text>
            </TouchableOpacity>
          )}

          {currentLine === lucyLines.length - 1 && (
            <TouchableOpacity
              style={[styles.nextButton, styles.greenButton]}
              onPress={() => navigation.navigate('ClsVScreen')}
            >
              <Text style={styles.nextButtonText}>Da</Text>
            </TouchableOpacity>
          )}
        </>
      )}

      {showMiniGame && (
        <View style={styles.miniGameOverlay}>
          {!hasCompletedMiniGame && (
            <Text style={styles.gameTitle}>Alege unealta corectă</Text>
          )}

          <View style={styles.imagesContainer}>
            {toolImages.map((img, i) => (
              <TouchableWithoutFeedback key={i} onPress={() => handleSelection(i)}>
                <Image
                  source={img}
                  style={[
                    styles.toolImage,
                    selectedItems.includes(i) && styles.selectedTool,
                  ]}
                />
              </TouchableWithoutFeedback>
            ))}
          </View>

          {isCorrectSelection && (
            <TouchableOpacity
              style={styles.doneButton}
              onPress={() => {
                setShowMiniGame(false);
                setSelectedItems([]);
                setHasCompletedMiniGame(true);
                setCurrentLine((prev) => prev + 1);
              }}
            >
              <Text style={styles.doneButtonText}>Gata</Text>
            </TouchableOpacity>
          )}
        </View>
      )}
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  introContainer: {
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  introText: {
    color: '#fff8dc',
    fontSize: ms(28),
    fontWeight: 'bold',
    textAlign: 'center',
  },
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  dialogContainer: {
    position: 'absolute',
    bottom: vs(40),
    right: s(30),
    flexDirection: 'column',
    alignItems: 'flex-end',
  },
  lucySmall: {
    width: s(400),
    height: vs(400),
    left: s(140),
    top: vs(160),
  },
  speechBubble: {
    backgroundColor: '#fff8dc',
    borderColor: '#333',
    borderWidth: 2,
    borderRadius: ms(10),
    padding: ms(10),
    maxWidth: s(330),
    alignSelf: 'flex-end',
    marginBottom: vs(10),
    paddingBottom: vs(50),
  },
  speechText: {
    fontSize: ms(14),
    fontStyle: 'italic',
    color: '#333',
  },
  nextButton: {
    position: 'absolute',
    bottom: vs(60),
    right: s(40),
    backgroundColor: '#333',
    paddingVertical: vs(10),
    paddingHorizontal: s(20),
    borderRadius: ms(8),
  },
  greenButton: {
    backgroundColor: 'green',
  },
  nextButtonText: {
    color: '#fff8dc',
    fontWeight: 'bold',
    fontSize: ms(16),
  },
  miniGameOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 248, 220, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: s(20),
    zIndex: 10,
  },
  gameTitle: {
    fontSize: ms(22),
    fontWeight: 'bold',
    marginBottom: vs(20),
  },
  imagesContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: s(10),
  },
  toolImage: {
    width: s(150),
    height: vs(150),
    margin: s(10),
    borderWidth: 2,
    borderColor: '#ccc',
    borderRadius: ms(10),
    resizeMode: 'contain',
  },
  selectedTool: {
    borderColor: 'green',
    borderWidth: 4,
  },
  doneButton: {
    marginTop: vs(30),
    backgroundColor: 'green',
    padding: s(15),
    borderRadius: ms(10),
  },
  doneButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: ms(16),
  },
  finalScreen: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
  },
  finalText: {
    fontSize: ms(24),
    color: '#333',
    fontWeight: 'bold',
    backgroundColor: 'rgba(255, 248, 220, 0.9)',
    padding: s(20),
    borderRadius: ms(10),
  },
  fullScreenTouchable: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imprintImage: {
    width: 300,
    height: 300,
  },
});
