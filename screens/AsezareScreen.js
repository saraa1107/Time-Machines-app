import React, { useEffect, useState, useRef, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ImageBackground,
  Animated,
  TouchableOpacity,
  PanResponder,
} from 'react-native';
import { Image as ExpoImage } from 'expo-image';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { s, vs, ms } from '../utils/scale';

export default function VanatoareScreen() {
  const navigation = useNavigation();

  const [showIntro, setShowIntro] = useState(true);
  const [fadeAnim] = useState(new Animated.Value(1));
  const [textShake] = useState(new Animated.Value(0));
  const [currentLine, setCurrentLine] = useState(0);
  const [showMiniGame, setShowMiniGame] = useState(false);
  const [hasCompletedMiniGame, setHasCompletedMiniGame] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);
  const [hasAnsweredCorrectly, setHasAnsweredCorrectly] = useState(false);
  const [showGif, setShowGif] = useState(false);
  const [seceraPosition] = useState(new Animated.ValueXY({ x: s(150), y: vs(400) }));

  const grauRef = useRef(null);
  const seceraRef = useRef(null);

  useFocusEffect(
    useCallback(() => {
      // Resetăm stările imediat la intrarea pe ecran
      setShowGif(false);
      setShowMiniGame(false);
      setHasCompletedMiniGame(false);
      setShowQuiz(false);
      setHasAnsweredCorrectly(false);
      setCurrentLine(0);
      setShowIntro(true);
      seceraPosition.setValue({ x: s(150), y: vs(400) });

      return () => {
        // Optional: curățenie la ieșire din ecran
        setShowGif(false);
      };
    }, [])
  );

  useEffect(() => {
  const unsubscribe = navigation.addListener('blur', () => {
    // Resetăm gif-ul când ieșim de pe ecran
    setShowGif(false);
  });

  return unsubscribe;
}, [navigation]);


  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: () => true,
    onPanResponderGrant: () => {
      seceraPosition.setOffset({
        x: seceraPosition.x._value,
        y: seceraPosition.y._value,
      });
      seceraPosition.setValue({ x: 0, y: 0 });
    },
    onPanResponderMove: Animated.event(
      [null, { dx: seceraPosition.x, dy: seceraPosition.y }],
      { useNativeDriver: false }
    ),
    onPanResponderRelease: () => {
  seceraPosition.flattenOffset();

  if (hasCompletedMiniGame) {
    // Dacă mini-jocul e gata, nu mai verificăm poziția și nu mai arătăm GIF
    return;
  }

  grauRef.current?.measure((fx, fy, width, height, px, py) => {
    const grauBounds = { x: px, y: py, width, height };

    seceraRef.current?.measure((fx2, fy2, width2, height2, px2, py2) => {
      const seceraBounds = { x: px2, y: py2, width: width2, height: height2 };

      const overlaps =
        seceraBounds.x < grauBounds.x + grauBounds.width &&
        seceraBounds.x + seceraBounds.width > grauBounds.x &&
        seceraBounds.y < grauBounds.y + grauBounds.height &&
        seceraBounds.y + seceraBounds.height > grauBounds.y;

      if (overlaps) {
        setShowGif(true);
      } else {
        Animated.spring(seceraPosition, {
          toValue: { x: s(150), y: vs(400) },
          useNativeDriver: false,
        }).start();
      }
    });
  });
}

  });

  const lucyLines = [
    'Bine ai venit în neolitic! Acum oamenii au început să se stabilească în așezări.',
    'De asemenea, au început să practice agricultura și creșterea animalelor.',
    'Sunt multe de făcut, așa că ei au nevoie de ajutorul tău. Poți să seceri grâul și să râșnești boabele?',
    'Te-ai descurcat foarte bine! Înainte de a pleca, locuitorii așezării vor să-ți mulțumească.',
    'Ei ți-au pregătit un mic cadou, o statuetă din piatră.',
    'Însă va trebui să răspunzi la o întrebare. Vrei să vezi cum arată o locuință din neolitic?',
    'Acum poți lua acasă un cadou unic!',
    'Din păcate, va trebui să te întorci în prezent.',
    'Se pare că mașina timpului va rămâne fără combustibil în curând.',
    'Călătoria noastră în Preistorie s-a încheiat. Eu și Lucy sperăm că te-am ajutat să înțelegi traiul oamenilor din această epocă.',
    'Vrei să te întorci în prezent și să-l revezi pe Profesorul Chronos? 👨‍🔬',
  ];

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(textShake, { toValue: 5, duration: 100, useNativeDriver: true }),
        Animated.timing(textShake, { toValue: -5, duration: 100, useNativeDriver: true }),
        Animated.timing(textShake, { toValue: 0, duration: 100, useNativeDriver: true }),
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

    if (currentLine === 5 && !hasAnsweredCorrectly) {
      setShowQuiz(true);
      return;
    }

    if (currentLine < lucyLines.length - 1) {
      setCurrentLine(currentLine + 1);
    }
  };

  const handleAnswer = (choice) => {
    if (choice === 'Așezări și agricultură') {
      setHasAnsweredCorrectly(true);
    }
  };

  return showIntro ? (
    <View style={styles.introContainer}>
      <Animated.Text style={[styles.introText, { opacity: fadeAnim, transform: [{ translateX: textShake }] }]}>
        5000 de ani î.Hr.
      </Animated.Text>
    </View>
  ) : (
    <ImageBackground source={require('../assets/backgrounds/asezare.webp')} style={styles.background}>
      <View style={styles.dialogContainer}>
        <Image source={require('../assets/Otzi/static.png')} style={styles.lucySmall} resizeMode="contain" />
        <View style={styles.speechBubble}>
          <Text style={styles.speechText}>{lucyLines[currentLine]}</Text>
        </View>
      </View>

      {!showMiniGame && !showQuiz && (
        <>
          {currentLine < lucyLines.length - 1 && (
            <TouchableOpacity
              style={[styles.nextButton, (currentLine === 2 || currentLine === 5) && styles.greenButton]}
              onPress={handleNext}
            >
              <Text style={styles.nextButtonText}>
                {(currentLine === 2 || currentLine === 5) ? 'Da' : 'Next'}
              </Text>
            </TouchableOpacity>
          )}

          {currentLine === lucyLines.length - 1 && (
            <TouchableOpacity style={[styles.nextButton, styles.greenButton]} onPress={() => navigation.navigate('TimeMachinesScreen')}>
              <Text style={styles.nextButtonText}>Da</Text>
            </TouchableOpacity>
          )}
        </>
      )}

      {showMiniGame && (
        <View style={styles.miniGameOverlay}>
          <View ref={grauRef} style={styles.grauImage}>
            <Image source={require('../assets/grau.png')} style={{ width: '100%', height: '100%', resizeMode: 'contain' }} />
          </View>

          <Animated.View ref={seceraRef} {...panResponder.panHandlers} style={[styles.seceraImage, seceraPosition.getLayout()]}>
            <Image source={require('../assets/tools/tool3.png')} style={{ width: '100%', height: '100%', resizeMode: 'contain' }} />
          </Animated.View>

          {showGif && (
            <>
              <ExpoImage source={require('../assets/harvest.gif')} style={styles.seceratGif} contentFit="contain" />
              <TouchableOpacity
                style={styles.doneButton}
                onPress={() => {
                  setShowGif(false);
                  setHasCompletedMiniGame(true);
                  setTimeout(() => {
                    setShowMiniGame(false);
                    setCurrentLine((prev) => prev + 1);
                  }, 300);
                }}
              >
                <Text style={styles.doneButtonText}>Gata</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      )}

      {showQuiz && (
        <ImageBackground source={require('../assets/backgrounds/quiz_bg.jpg')} style={styles.quizBackground} resizeMode="cover">
          <View style={styles.quizInnerContainer}>
            <Text style={styles.quizQuestion}>Care este scopul statuetelor de pe masa?</Text>

            <TouchableOpacity style={styles.quizOption} onPress={() => handleAnswer('Unelte din piatră')}>
              <Text style={styles.quizOptionText}>Sunt unelte din piatră, ajuta la agricultura si cules</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.quizOption} onPress={() => handleAnswer('Vânătoare și cules')}>
              <Text style={styles.quizOptionText}>Sunt arme din piatră care ajutau la apărarea așezărilor.</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.quizOption} onPress={() => handleAnswer('Așezări și agricultură')}>
              <Text style={styles.quizOptionText}>Sunt folosite in scop ritualic, se credea ca aduc prosperitate</Text>
            </TouchableOpacity>

            {hasAnsweredCorrectly && (
              <TouchableOpacity style={styles.doneButton} onPress={() => {
                setShowQuiz(false);
                setCurrentLine((prev) => prev + 1);
              }}>
                <Text style={styles.doneButtonText}>Gata</Text>
              </TouchableOpacity>
            )}
          </View>
        </ImageBackground>
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
    bottom: vs(-40),
    right: s(30),
    flexDirection: 'column',
    alignItems: 'flex-end',
  },
  lucySmall: {
    width: s(225),
    height: vs(225),
    right: s(180),
    top: vs(105),
  },
  speechBubble: {
    backgroundColor: '#fff8dc',
    borderColor: '#333',
    borderWidth: 2,
    borderRadius: ms(10),
    padding: ms(10),
    maxWidth: s(330),
    alignSelf: 'flex-end',
    marginBottom: vs(560),
    paddingBottom: vs(50),
  },
  speechText: {
    fontSize: ms(14),
    fontStyle: 'italic',
    color: '#333',
  },
  nextButton: {
    position: 'absolute',
    bottom: vs(530),
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
  grauImage: {
    position: 'absolute',
    top: vs(550),
    width: s(400),
    height: vs(300),
  },
  seceraImage: {
    position: 'absolute',
    top: vs(400),
    left: s(150),
    width: s(300),
    height: vs(300),
  },
  seceratGif: {
    position: 'absolute',
    top: vs(50),
    width: s(400),
    height: vs(400),
    resizeMode: 'contain',
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
  quizBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quizInnerContainer: {
    backgroundColor: 'rgba(255,248,220,0.9)',
    borderRadius: ms(12),
    padding: s(20),
    marginHorizontal: s(20),
    alignItems: 'center',
    width: '100%',
    top: vs(-150),
    left: 0,
    right: 0,
  },
  quizQuestion: {
    fontSize: ms(18),
    fontWeight: 'bold',
    marginBottom: vs(20),
    color: '#333',
    textAlign: 'center',
  },
  quizOption: {
    backgroundColor: '#ddd',
    padding: s(12),
    marginVertical: vs(8),
    width: '100%',
    borderRadius: ms(8),
  },
  quizOptionText: {
    fontSize: ms(16),
    textAlign: 'center',
    color: '#333',
  },
}); 