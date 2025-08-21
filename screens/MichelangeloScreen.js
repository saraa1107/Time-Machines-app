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
    'Salut! Eu sunt Michelangelo, un mare pictor si sculptor din perioada Renasterii.',
    'Mai intai as vrea sa-ti prezint sculpturile mele. Ele sunt foarte apreciate datorita detaliilor si expresivitatii lor.',
    'Insa memoria mea nu mai este la fel de clara ca in trecut. Poti sa ma ajuti sa-mi amintesc numele lor?',
    'Multumesc pentru ajutor! probabil am uitat pentru ca sunt extrem de obosit! Ultimul proiect la care am lucrat a fost foarte complex.',
    'Capela din spatele meu se numeste Capela Sixtina. Aceasta este capela palatului papal din Vatican. In 1508, Papa Iulius al II-lea m-a angajat pentru a picta frescele acesteia.',
    'Am lucrat mai mult singur, pe schele proiectate chiar de mine, iar munca a fost epuizanta. Insa rezultatele au fost extraordinare. Uita-te la tavan. Poti gasi cea mai cunoscuta pictura a mea?',
    'Corect! Este vorba de Facerea lui Adam. Te-ai descurcat de minune!',
    'Profesorul Chronos mi-a spus ca frescele pictate de mine sunt prezervate foarte bine in timp si multi turisti sunt fascinati de ele chiar si in perioada ta.',
    'Acest lucru ma bucura foarte mult! Sper ca si tie ti-au placut.',
    'Se pare ca trebuie sa pleci. Masina timpului a ramas fara combustibil. Ma bucur ca te-am cunoscut!',
    'Esti pregatit sa te intorci in laborator?',
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
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  dialogContainer: {
    position: 'absolute',
    bottom: 40,
    right: 30,
    flexDirection: 'column',
    alignItems: 'flex-end',
  },
  lucySmall: {
    width: 300,
    height: 300,
    top: 20,
  },
  speechBubble: {
    backgroundColor: '#fff8dc',
    borderColor: '#333',
    borderWidth: 2,
    borderRadius: 10,
    padding: 10,
    maxWidth: 330,
    alignSelf: 'flex-end',
    marginBottom: 10,
    paddingBottom: 50,
  },
  speechText: {
    fontSize: 14,
    fontStyle: 'italic',
    color: '#333',
  },
  nextButton: {
    position: 'absolute',
    bottom: 60,
    right: 40,
    backgroundColor: '#333',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  greenButton: {
    backgroundColor: 'green',
  },
  nextButtonText: {
    color: '#fff8dc',
    fontWeight: 'bold',
    fontSize: 16,
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
    padding: 20,
    zIndex: 10,
  },
  gameTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
    flexWrap: 'wrap',
  },
  toolImageContainer: {
    marginHorizontal: 10,
    borderWidth: 2,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 5,
    width: 180,
    height: 180,
  },
  toolImage: {
    width: 160,
    height: 160,
    resizeMode: 'contain',
  },
  nameBox: {
    marginHorizontal: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderWidth: 2,
    borderColor: '#ccc',
    borderRadius: 8,
    backgroundColor: 'white',
  },
  nameText: {
    fontSize: 16,
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
    marginTop: 30,
    backgroundColor: 'green',
    padding: 15,
    borderRadius: 10,
  },
  doneButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  finalScreen: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
  },
  finalText: {
    fontSize: 24,
    color: '#333',
    fontWeight: 'bold',
    backgroundColor: 'rgba(255, 248, 220, 0.9)',
    padding: 20,
    borderRadius: 10,
  },
  fullScreenTouchable: {
    position: 'absolute',
    top: 450,
    left: 50,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    width:300,
    height:200,
  },
  imprintImage: {
    width: 300,
    height: 300,
  },
});
