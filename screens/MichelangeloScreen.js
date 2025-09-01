import React, { useEffect, useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ImageBackground,
  Animated,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { s, vs, ms } from '../utils/scale';

const tools = [
  { image: require('../assets/pieta.jpg'), name: 'Pieta' },
  { image: require('../assets/david.jpg'), name: 'David' },
  { image: require('../assets/moise.jpg'), name: 'Moise' },
];

export default function VanatoareScreen() {
  const navigation = useNavigation();

  const [showIntro, setShowIntro] = useState(true);
  const [fadeAnim] = useState(new Animated.Value(1));
  const [textShake] = useState(new Animated.Value(0));
  const [currentLine, setCurrentLine] = useState(0);
  const [showMiniGame, setShowMiniGame] = useState(false);
  const [hasCompletedMiniGame, setHasCompletedMiniGame] = useState(false);
  const [showFinalScreen, setShowFinalScreen] = useState(false);
  const [hasLeftImprint, setHasLeftImprint] = useState(false);

  // Mini-joc potrivire
  const [matched, setMatched] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedName, setSelectedName] = useState(null);

  const shuffledNames = useMemo(
    () => tools.map(t => t.name).sort(() => Math.random() - 0.5),
    []
  );

  const lucyLines = [
    'Salut! Eu sunt Michelangelo, un mare pictor și sculptor din perioada Renașterii.',
    'Mai întâi aș vrea să-ți prezint sculpturile mele. Ele sunt foarte apreciate datorită detaliilor și expresivității lor.',
    'Însă memoria mea nu mai este la fel de clară ca în trecut. Poți să mă ajuți să-mi amintesc numele lor?',
    'Mulțumesc pentru ajutor! Probabil am uitat pentru că sunt extrem de obosit! Ultimul proiect la care am lucrat a fost foarte complex.',
    'Capela din spatele meu se numește Capela Sixtină. Aceasta este capela palatului papal din Vatican. În 1508, Papa Iulius al II-lea m-a angajat pentru a picta frescele acesteia.',
    'Am lucrat mai mult singur, pe schele proiectate chiar de mine, iar munca a fost epuizantă. Însă rezultatele au fost extraordinare. Uită-te la tavan. Poți găsi cea mai cunoscută pictură a mea?',
    'Corect! Este vorba de Facerea lui Adam. Te-ai descurcat de minune!',
    'Profesorul Chronos mi-a spus că frescele pictate de mine sunt prezervate foarte bine în timp și mulți turiști sunt fascinați de ele chiar și în perioada ta.',
    'Acest lucru mă bucură foarte mult! Sper că și ție ți-au plăcut.',
    'Se pare că trebuie să pleci. Mașina timpului a rămas fără combustibil. Mă bucur că te-am cunoscut!',
    'Ești pregătit să te întorci în laborator?',
  ];

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

  const handleImageSelect = (index) => {
    setSelectedImage(index);
    if (selectedName !== null) checkMatch(index, selectedName);
  };

  const handleNameSelect = (name) => {
    setSelectedName(name);
    if (selectedImage !== null) checkMatch(selectedImage, name);
  };

  const checkMatch = (imageIndex, name) => {
    if (tools[imageIndex].name === name) {
      setMatched(prev => [...prev, imageIndex]);
    }
    setSelectedImage(null);
    setSelectedName(null);
  };

  if (showFinalScreen) {
    return (
      <ImageBackground
        source={require('../assets/tavan.jpg')}
        style={styles.finalScreen}
      >
        {!hasLeftImprint ? (
          <TouchableOpacity
            style={styles.fullScreenTouchable}
            onPress={() => setHasLeftImprint(true)}
          >
          </TouchableOpacity>
        ) : (
          <>
            <Image
              source={require('../assets/tavan close.webp')}
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
          { opacity: fadeAnim, transform: [{ translateX: textShake }] },
        ]}
      >
        Michelangelo 1475-1564
      </Animated.Text>
    </View>
  ) : (
    <ImageBackground
      source={require('../assets/Sistina-interno.jpg')}
      style={styles.background}
    >
      <View style={styles.dialogContainer}>
        <Image
          source={require('../assets/mich.png')}
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
              onPress={() => navigation.navigate('TimeMachinesScreen')}
            >
              <Text style={styles.nextButtonText}>Da</Text>
            </TouchableOpacity>
          )}
        </>
      )}

      {showMiniGame && (
        <View style={styles.miniGameOverlay}>
          <Text style={styles.gameTitle}>Potrivește operele de artă cu denumirile lor</Text>

          {/* Rând cu imagini */}
          <View style={styles.rowContainer}>
            {tools.map((tool, i) => (
              <TouchableOpacity
                key={i}
                style={[
                  styles.toolImageContainer,
                  selectedImage === i && styles.selectedTool,
                  matched.includes(i) && styles.correctTool
                ]}
                onPress={() => handleImageSelect(i)}
                disabled={matched.includes(i)}
              >
                <Image source={tool.image} style={styles.toolImage} />
              </TouchableOpacity>
            ))}
          </View>

          {/* Rând cu denumiri */}
          <View style={styles.rowContainer}>
            {shuffledNames.map((name, i) => (
              <TouchableOpacity
                key={i}
                style={[
                  styles.nameBox,
                  selectedName === name && styles.selectedTool,
                  matched.some(idx => tools[idx].name === name) && styles.correctTool
                ]}
                onPress={() => handleNameSelect(name)}
                disabled={matched.some(idx => tools[idx].name === name)}
              >
                <Text style={styles.nameText}>{name}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {matched.length === tools.length && (
            <TouchableOpacity
              style={styles.doneButton}
              onPress={() => {
                setShowMiniGame(false);
                setHasCompletedMiniGame(true);
                setCurrentLine(prev => prev + 1);
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
    fontSize: s(28),
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
    width: s(300),
    height: s(300),
    top: vs(20),
  },
  speechBubble: {
    backgroundColor: '#fff8dc',
    borderColor: '#333',
    borderWidth: 2,
    borderRadius: ms(10),
    padding: s(10),
    maxWidth: s(330),
    alignSelf: 'flex-end',
    marginBottom: vs(10),
    paddingBottom: vs(50),
  },
  speechText: {
    fontSize: s(14),
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
    fontSize: s(16),
  },
  miniGameOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 248, 220, 0.95)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: s(20),
    zIndex: 10,
  },
  gameTitle: {
    fontSize: s(16),
    fontWeight: 'bold',
    marginBottom: vs(20),
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: vs(10),
    flexWrap: 'wrap',
  },
  toolImageContainer: {
    marginHorizontal: s(10),
    borderWidth: 2,
    borderColor: '#ccc',
    borderRadius: ms(10),
    padding: s(5),
    width: s(140),
    height: s(140),
  },
  toolImage: {
    width: s(120),
    height: s(120),
    resizeMode: 'contain',
  },
  nameBox: {
    marginHorizontal: s(10),
    paddingVertical: vs(10),
    paddingHorizontal: s(15),
    borderWidth: 2,
    borderColor: '#ccc',
    borderRadius: ms(8),
    backgroundColor: 'white',
  },
  nameText: {
    fontSize: s(16),
    fontWeight: '500',
  },
  selectedTool: {
    borderColor: 'orange',
    borderWidth: 3,
  },
  correctTool: {
    borderColor: 'green',
    borderWidth: 3,
    backgroundColor: '#c8f7c5',
  },
  doneButton: {
    marginTop: vs(30),
    backgroundColor: 'green',
    padding: vs(15),
    borderRadius: ms(10),
  },
  doneButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: s(16),
  },
  finalScreen: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
  },
  finalText: {
    fontSize: s(24),
    color: '#333',
    fontWeight: 'bold',
    backgroundColor: 'rgba(255, 248, 220, 0.9)',
    padding: s(20),
    borderRadius: ms(10),
  },
  fullScreenTouchable: {
    position: 'absolute',
    top: vs(450),
    left: s(50),
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    width: s(300),
    height: vs(200),
  },
  imprintImage: {
    width: s(300),
    height: s(300),
  },
});
