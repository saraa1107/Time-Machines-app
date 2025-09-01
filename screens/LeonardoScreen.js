import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Animated,
} from 'react-native';
import { Image as ExpoImage } from 'expo-image';
import { s, vs, ms } from '../utils/scale';

export default function PaleoliticScreen({ navigation }) {
  const [currentLine, setCurrentLine] = useState(0);
  const [lucyAnimated, setLucyAnimated] = useState(false);
  const [showMirrorView, setShowMirrorView] = useState(false);
  const [showNotebookView, setShowNotebookView] = useState(false);
  const [notebookAnimated, setNotebookAnimated] = useState(false);
  const [mirrorWasOpened, setMirrorWasOpened] = useState(false);
  const [mirrorUnlocked, setMirrorUnlocked] = useState(false);
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [selectionMessage, setSelectionMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const [fadeAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isLoading) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 800,
            useNativeDriver: true,
          }),
          Animated.timing(fadeAnim, {
            toValue: 0,
            duration: 800,
            useNativeDriver: true,
          }),
        ])
      ).start();
    }
  }, [isLoading]);

  const professorLines = [
    'Ai reușit să călătorești în timp cu succes! Însă vei avea nevoie de ajutor pentru a înțelege mai bine perioada Renașterii.',
    'Te vor ajuta chiar doi dintre cei mai buni artiști ai vremii: Leonardo da Vinci și Michelangelo.',
    'Acum poți vorbi cu Leonardo. De abia așteaptă să te cunoască.(Apasă pe el pentru a începe conversația)',
  ];

  const lucyLines = [
    'Salut! Eu sunt Leonardo da Vinci! Sunt un spirit universalist, sunt pictor, sculptor, arhitect, om de știință și inventator.',
    'Am creat opere de artă celebre și am făcut descoperiri științifice importante. Studiile mele au fost foarte variate și am încercat să înțeleg lumea din jurul meu prin observație și logică.',
    'Am fost destul de controversat în timpul vieții mele, însă am adus contribuții semnificative în multe domenii. Am înțeles că în timpul tău mulți mă consideră un geniu.',
    'Obișnuiesc să desenez extrem de mult în creion. Am trecut multe dintre invențiile și studiile mele într-un caiet. Pe copertă se află un desen: "omul vitruvian", studiu al proporțiilor corpului uman. Vrei să-mi vezi caietul?',
    'Acum este timpul să-ți continui călătoria. În continuare îl vei vizita pe Michelangelo. Însă arăți cam bizar. Îți trebuie o deghizare potrivită pentru a te integra mai bine în această perioadă.',
    'De-a lungul vieții mele am devenit renumit pentru picturile mele. Am pictat scene biblice, dar și portrete. Poți lua înfățișarea unuia din personajele pictate de mine. Apasă pe chevalet pentru a vedea personajele disponibile.',
    'Acum totul este gata! Vrei să-ți continui călătoria în timp?',
  ];

  let dialogLines = showMirrorView ? lucyLines : lucyAnimated ? lucyLines : professorLines;

  const handleNext = () => {
    if (dialogLines === lucyLines && currentLine === 5 && !mirrorWasOpened) return;
    if (currentLine < dialogLines.length - 1) {
      setCurrentLine(currentLine + 1);
    }
  };

  const handleLucyPress = () => {
    if (!lucyAnimated) {
      setLucyAnimated(true);
      setCurrentLine(0);
    }
  };

  const toggleMirrorView = () => {
    if (!showMirrorView) {
      setMirrorWasOpened(true);
      setCurrentLine(0);
    } else if (lucyAnimated) {
      setCurrentLine(6);
    }
    setShowMirrorView(!showMirrorView);
  };

  const openNotebook = () => {
    setShowNotebookView(true);
    setNotebookAnimated(false);
  };

  const closeNotebook = () => {
    setShowNotebookView(false);
    setCurrentLine(4);
    setMirrorUnlocked(true);
  };

  const goToVanatoare = () => {
    navigation.navigate('Michelangelo');
  };

  if (isLoading) {
    return (
      <View style={styles.loadingScreen}>
        <Animated.Text style={[styles.loadingText, { opacity: fadeAnim }]}>
          Leonardo da Vinci 1452-1519
        </Animated.Text>
      </View>
    );
  }

  return (
    <ImageBackground
      source={require('../assets/leo room.png')}
      style={styles.background}
    >
      {showNotebookView && (
        <View style={styles.overlayView}>
          <TouchableOpacity
            onPress={closeNotebook}
            style={styles.closeNotebookButton}
          >
            <Text style={styles.closeText}>Închide</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setNotebookAnimated(true)}
            style={styles.notebookContainer}
          >
            {notebookAnimated ? (
              <ExpoImage
                source={require('../assets/caiet.gif')}
                style={styles.notebookImage}
                contentFit="contain"
              />
            ) : (
              <Image
                source={require('../assets/Da_Vinci_Vitruve_Luc_Viatour.jpg')}
                style={styles.notebookImage}
                resizeMode="contain"
              />
            )}
          </TouchableOpacity>

          {!notebookAnimated && (
            <Text style={styles.tapText}>Apasă pe caiet pentru a începe</Text>
          )}
        </View>
      )}

      {showMirrorView ? (
        <ImageBackground
          source={require('../assets/mirror.png')}
          style={styles.mirrorFullScreen}
          resizeMode="contain"
        >
          <View style={styles.mirrorDialogue}>
            <Text style={styles.speechText}>
               Glisează înspre dreapta pentru a vedea personajele disponibile. Selectează unul dintre ele, apoi apasă butonul închide pentru a continua.
            </Text>
          </View>

          <ScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.characterSlider}
          >
            {[
              { name: 'Mona Lisa', image: require('../assets/Mona lisa.jpg') },
              { name: 'Lady with an Ermine', image: require('../assets/Lady with emire.jpg') },
              { name: 'Portrait of a Musician', image: require('../assets/Portrait of a musician.jpg') },
            ].map((character, index) => (
              <View key={index} style={styles.characterCard}>
                <Image
                  source={character.image}
                  style={styles.characterImage}
                  resizeMode="contain"
                />
                <Text style={styles.characterName}>{character.name}</Text>
                <TouchableOpacity
                  style={styles.selectButton}
                  onPress={() => {
                    setSelectedCharacter(character.name);
                    setSelectionMessage(`Ai ales să fii ${character.name}`);
                    setTimeout(() => setSelectionMessage(''), 3000);
                  }}
                >
                  <Text style={styles.selectButtonText}>Select</Text>
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>

          {selectionMessage !== '' && (
            <View style={styles.selectionMessageContainer}>
              <Text style={styles.selectionMessage}>{selectionMessage}</Text>
            </View>
          )}

          <TouchableOpacity style={styles.closeMirrorButton} onPress={toggleMirrorView}>
            <Text style={styles.closeText}>Închide</Text>
          </TouchableOpacity>
        </ImageBackground>
      ) : (
        <>
          <View style={styles.mirrorContainer}>
            <TouchableOpacity
              style={styles.invisibleMirrorButton}
              onPress={mirrorUnlocked ? toggleMirrorView : null}
              disabled={!mirrorUnlocked}
            />
          </View>

          <TouchableOpacity style={styles.characterContainer} onPress={handleLucyPress}>
            {lucyAnimated ? (
              <ExpoImage
                source={require('../assets/leo move.gif')}
                style={styles.cavemanImage}
                contentFit="contain"
              />
            ) : (
              <Image
                source={require('../assets/Default_leonardo_da_vinci_standing_full_body_image_it_s_for_a_3_ef634360-9541-4723-aa21-cf4bebcb45bc_0.png')}
                style={styles.cavemanImage}
                resizeMode="contain"
              />
            )}
          </TouchableOpacity>
        </>
      )}

      <View style={styles.leftSpeechContainer}>
        {!lucyAnimated && !showMirrorView && (
          <Image
            source={require('../assets/scientist/static.png')}
            style={styles.scientistImage}
            resizeMode="contain"
          />
        )}
        {!showMirrorView && !showNotebookView && (
          <View style={styles.speechBubble}>
            <Text style={styles.speechText}>{dialogLines[currentLine]}</Text>

            {dialogLines === lucyLines && currentLine === 3 ? (
              <TouchableOpacity onPress={openNotebook} style={styles.yesButton}>
                <Text style={styles.nextText}>Da</Text>
              </TouchableOpacity>
            ) : dialogLines === lucyLines && currentLine === 6 ? (
              <TouchableOpacity onPress={goToVanatoare} style={styles.yesButton}>
                <Text style={styles.nextText}>Da</Text>
              </TouchableOpacity>
            ) : currentLine < dialogLines.length - 1 &&
              !(dialogLines === lucyLines && currentLine === 5) ? (
              <TouchableOpacity onPress={handleNext} style={styles.nextButton}>
                <Text style={styles.nextText}>Next</Text>
              </TouchableOpacity>
            ) : null}
          </View>
        )}
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  loadingScreen: {
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: '#fff8dc',
    fontSize: s(28),
    fontWeight: 'bold',
    textAlign: 'center',
  },
  mirrorContainer: {
    position: 'absolute',
    top: vs(80),
    left: s(10),
    width: s(100),
    height: vs(120),
    zIndex: 5,
  },
  invisibleMirrorButton: {
    position: 'absolute',
    width: '200%',
    height: '200%',
    top: vs(240),
  },
  mirrorFullScreen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: s(-45),
    marginVertical: vs(100),
    height: '110%',
    width: '110%',
  },
  closeMirrorButton: {
    position: 'absolute',
    top: vs(20),
    right: s(20),
    backgroundColor: '#333',
    paddingHorizontal: s(12),
    paddingVertical: vs(6),
    borderRadius: ms(6),
  },
  closeNotebookButton: {
    position: 'absolute',
    top: vs(60),
    right: s(20),
    backgroundColor: '#333',
    paddingHorizontal: s(12),
    paddingVertical: vs(6),
    borderRadius: ms(6),
    zIndex: 100,
  },
  closeText: {
    color: '#fff8dc',
    fontSize: ms(14),
    fontWeight: 'bold',
  },
  tapText: {
    color: '#fff8dc',
    fontSize: ms(16),
    marginTop: vs(20),
    bottom: vs(-60),
  },
  notebookContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: vs(40),
  },

  notebookImage: {
    width: s(400),
    height: vs(400),
  },

  mirrorDialogue: {
    position: 'absolute',
    top: vs(540),
    left: s(60),
    right: s(20),
    backgroundColor: '#fff8dc',
    borderColor: '#333',
    borderWidth: 2,
    borderRadius: ms(10),
    padding: s(10),
    zIndex: 10,
  },
  leftSpeechContainer: {
    position: 'absolute',
    left: s(20),
    bottom: vs(30),
    alignItems: 'flex-start',
    zIndex: 10,
  },
  scientistImage: {
    width: s(220),
    height: vs(220),
    top: vs(60),
    right: s(30),
  },
  speechBubble: {
    backgroundColor: '#fff8dc',
    borderColor: '#333',
    borderWidth: 2,
    borderRadius: ms(10),
    padding: s(10),
    width: s(340),
    bottom: vs(10),
  },
  speechText: {
    fontSize: ms(14),
    fontStyle: 'italic',
    color: '#333',
  },
  nextButton: {
    marginTop: vs(8),
    alignSelf: 'flex-end',
    paddingVertical: vs(6),
    paddingHorizontal: s(14),
    backgroundColor: '#333',
    borderRadius: ms(6),
  },
  yesButton: {
    marginTop: vs(8),
    alignSelf: 'flex-end',
    paddingVertical: vs(6),
    paddingHorizontal: s(14),
    backgroundColor: '#2e8b57',
    borderRadius: ms(6),
  },
  nextText: {
    color: '#fff8dc',
    fontWeight: 'bold',
    fontSize: ms(14),
  },
  characterContainer: {
    position: 'absolute',
    left: s(60),
    top: '35%',
    transform: [{ translateY: vs(-80) }],
    zIndex: 2,
  },
  cavemanImage: {
    width: s(550),
    height: vs(550),
    right: s(30),
    bottom: vs(30),
  },
  overlayView: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.75)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 99,
    padding: s(20),
  },
  characterSlider: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '300%',
  },
  characterCard: {
    width: s(300),
    alignItems: 'center',
    justifyContent: 'center',
    padding: s(10),
    marginHorizontal: s(60),
  },
  characterImage: {
    width: s(350),
    height: vs(350),
    marginBottom: vs(10),
    top: vs(60),
    right: s(-30),
  },
  characterName: {
    fontSize: ms(14),
    fontWeight: 'bold',
    color: '#fff8dc',
    marginBottom: vs(6),
    textAlign: 'center',
  },
  selectButton: {
    backgroundColor: '#333',
    paddingVertical: vs(6),
    paddingHorizontal: s(12),
    borderRadius: ms(6),
  },
  selectButtonText: {
    color: '#fff8dc',
    fontSize: ms(14),
    fontWeight: 'bold',
  },
  selectionMessageContainer: {
    position: 'absolute',
    bottom: vs(480),
    left: s(50),
    backgroundColor: '#333',
    padding: s(12),
    borderRadius: ms(8),
  },
  selectionMessage: {
    color: '#fff8dc',
    fontSize: ms(16),
    fontWeight: 'bold',
  },
});
