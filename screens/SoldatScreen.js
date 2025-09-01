import React, { useEffect, useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ImageBackground,
  Animated,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { s, vs, ms } from '../utils/scale';

const tools = [
  { image: require('../assets/zeppelin.jpg'), name: 'Am avut multã multumire sufleteascã, am scris prin altã carte postalã că un glont a trecut prin urechea mea stângã. Mi-a trecut rana aproape pe deplin. Sunt multumit că copiii sunt cu-minti si ascultã de povetele mele. Ce faceti cu zepelinele? Aici stăm toatã ziua sub focurile artileriei. Vă särut pe toti, Alexandru.' },
  { image: require('../assets/transee.jpg'), name: 'Poate nu vã imaginati cum arăta un om care stätuse în transeele alea o săptămânã, unde nu avea cum sã se spele. Primea ceai într-o cutie de tablă, în care fusese benzinã la inceput. ([...] Conditiile erau groaznice. [...] Multi soldati se îmbolnăveau de diverse boli.' },
  { image: require('../assets/mitraliera.jpeg'), name: 'Noaptea trecutã a fost de cosmar. La ora 1, trupele din prima linie au initiat două atacuri cu bombã asupra germanilor, iar noi a trebuit sã le sprijinim. Timp de o orã, s-a dezläntuit iadul. Eu am stat tot timpul ăsta ghemuit in noroi, lângã o mitralierã. Am tras incontinuu, într-un zgomot innebunitor si miros de exploziv care te fácea sã vomiti.' },
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

  // perechi asociate corect
  const [matchedPairs, setMatchedPairs] = useState([]); // [{imageIndex, name}]
  // selecție temporară
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedName, setSelectedName] = useState(null);

  const shuffledNames = useMemo(
    () => tools.map(t => t.name).sort(() => Math.random() - 0.5),
    []
  );

  const lucyLines = [
    'Datorită Revoluției Industriale, au apărut arme mai performante. În potriva acestor arme care trageau de la distanță s-a trecut la lupta în tranșee.',
    'Viața era extrem de grea în tranșee, așa că noi, soldații, scriam scrisori sau în jurnale de război.',
    'Multe dintre aceste arme nou apărute apar în memoriile acestora. Crezi că poți să le găsești?',
    'Noile arme aveau avantajul că puteau fi produse în masă într-un timp scurt.',
    'În lipsa bărbaților, plecați la război, femeile au fost nevoite să preia roluri mai active în societate și să lucreze în fabrici și uzine.',
    'Vrei să vezi fotografii și articole de ziar care demonstrează acest lucru?',
    'Acest război a cauzat multe victime atât printre soldați, care mureau ori în luptă ori din cauza condițiilor precare din tranșee, cât și printre civili.',
    'A fost o încercare grea pentru noi toți și pe frontul propriu-zis și pe frontul de acasă. Sunetul grenadelor și al artileriei s-a auzit pretutindeni.',
    'Se pare că trebuie să pleci. Mașina timpului a rămas fără combustibil, iar tu sigur nu vrei să rămâi în aceste timpuri grele.',
    'Ești pregătit să te întorci la Profesorul Chronos?',
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
      setMatchedPairs(prev => [...prev, { imageIndex, name }]);
    }
    setSelectedImage(null);
    setSelectedName(null);
  };

  const isMatchedImage = (i) => matchedPairs.some(p => p.imageIndex === i);
  const isMatchedName = (n) => matchedPairs.some(p => p.name === n);

  if (showFinalScreen) {
    return (
      <ImageBackground
        source={require('../assets/woman.jpg')}
        style={styles.finalScreen}
      >
        <Text style={styles.finalText}>
          Apasă pe ecran pentru a vedea prima pagină a unui ziar!
        </Text> 
        {!hasLeftImprint ? (
          <TouchableOpacity
            style={styles.fullScreenTouchable}
            onPress={() => setHasLeftImprint(true)}
          />
        ) : (
          <>
            <Image
              source={require('../assets/ziar.jpg')}
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
        Primul Razboi Mondial 1914-1918
      </Animated.Text>
    </View>
  ) : (
    <ImageBackground
      source={require('../assets/wwi.jpg')}
      style={styles.background}
    >
      <View style={styles.dialogContainer}>
        <Image
          source={require('../assets/soldat.png')}
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
          <Text style={styles.gameTitle}>Găsește armele din imagini în memoriile soldaților.</Text>

          <ScrollView
            style={styles.scrollContainer}
            contentContainerStyle={styles.scrollContent}
          >
            {/* Rând cu imagini */}
            <View style={styles.rowContainer}>
              {tools.map((tool, i) => (
                <TouchableOpacity
                  key={i}
                  style={[
                    styles.toolImageContainer,
                    selectedImage === i && styles.selectedTool,
                    isMatchedImage(i) && styles.correctTool
                  ]}
                  onPress={() => handleImageSelect(i)}
                  disabled={isMatchedImage(i)}
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
                    isMatchedName(name) && styles.correctTool
                  ]}
                  onPress={() => handleNameSelect(name)}
                  disabled={isMatchedName(name)}
                >
                  <Text style={styles.nameText}>{name}</Text>
                </TouchableOpacity>
              ))}
            </View>

            {matchedPairs.length === tools.length && (
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
          </ScrollView>
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
    backgroundColor: 'rgba(255, 248, 220, 0.95)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: s(100),
    zIndex: 10,
  },
  gameTitle: {
    fontSize: ms(20),
    fontWeight: 'bold',
    marginBottom: vs(20),
  },
  scrollContainer: {
    width: '160%',
  },
  scrollContent: {
    alignItems: 'center',
    paddingBottom: vs(40),
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
    padding: s(10),
    width: s(250),
    height: vs(200),
  },
  toolImage: {
    width: s(200),
    height: vs(200),
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
    fontSize: ms(16),
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
    width: s(500),
    height: s(500),
  },
});
