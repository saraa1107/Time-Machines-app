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
    'Ai reusit sa calatoresi in timp cu succes! Insa vei avea nevoie de ajutor pentru a înțelege mai bine perioada Renasterii',
    'Te vor ajuta chiar doi dintre cei mai buni  artisti ai vremii: Leonardo da Vinci și Michelangelo.',
    'Acum poți vorbi cu Leonardo. De abia așteaptă să te cunoască.',
  ];

  const lucyLines = [
    'Salut! Eu sunt Leonardo da Vinci! Sunt un spirit universalist, sunt pictor, sculptor, arhitect, om de stiinta si inventator.',
    'Am creat opere de artă celebre și am făcut descoperiri științifice importante. Studiile mele au fost foarte variate și am încercat să înțeleg lumea din jurul meu prin observație și logică.',
    'Am fost destul de controversat în timpul vieții mele, insa am adus contributii semnificative in multe domenii. Am inteles ca in timpul tau multi ma considera un geniu.',
    'Obisnuiesc sa desenez extrem de mult in creion. Am trecut multe dintre inventiile si studiile mele intr un caiet. Pe coperta se afla un desen: "omul vitruvian", studiu al proportiilor corpului uman. Vrei să-mi vezi caietul?',
    'Acum este timpul sa ti continui calatoria. In continuare il vei vizita pe Michelangelo.Insa arati cam bizar. Iti trebuie o deghizare potrivită pentru a te integra mai bine în aceasta perioada.',
    'De-a lungul vietii mele am devenit renumit pentru picturile mele. Am pictat scene biblice, dar si portrete. Poti lua infatisarea unuai din personajele pictate de mine. Apasa pe chevalet pentru a vedea personajele disponibile.',
    'Acum totul este gata! Vrei să ti continui călătoria în timp?',
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
            <Image
              source={
                notebookAnimated
                  ? require('../assets/caiet.gif')
                  : require('../assets/Da_Vinci_Vitruve_Luc_Viatour.jpg')
              }
              style={styles.notebookImage}
              resizeMode="contain"
            />
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
               Gliseaza inspre dreapta pentru a vedea personajele disponibile. Selecteaza unul dintre ele, apoi apasa butonul inchide pentru a continua.
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
            <Image
              source={
                lucyAnimated
                  ? require('../assets/leo move.gif')
                  : require('../assets/Default_leonardo_da_vinci_standing_full_body_image_it_s_for_a_3_ef634360-9541-4723-aa21-cf4bebcb45bc_0.png')
              }
              style={styles.cavemanImage}
              resizeMode="contain"
            />
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
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  mirrorContainer: {
    position: 'absolute',
    top: 80,
    left: 10,
    width: 100,
    height: 120,
    zIndex: 5,
  },
  invisibleMirrorButton: {
    position: 'absolute',
    width: '200%',
    height: '200%',
    top: 240,
  },
  mirrorFullScreen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: -45,
    marginVertical: 100,
    height: '110%',
    width: '110%',
  },
  closeMirrorButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    backgroundColor: '#333',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  closeNotebookButton: {
    position: 'absolute',
    top: 60,
    right: 20,
    backgroundColor: '#333',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    zIndex: 100,
  },
  closeText: {
    color: '#fff8dc',
    fontSize: 14,
    fontWeight: 'bold',
  },
  tapText: {
    color: '#fff8dc',
    fontSize: 16,
    marginTop: 20,
    bottom: -60,
  },
  notebookContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 40,
  },

  notebookImage: {
    width: 400,
    height: 400,
  },

  mirrorDialogue: {
    position: 'absolute',
    top: 630,
    left: 60,
    right: 20,
    backgroundColor: '#fff8dc',
    borderColor: '#333',
    borderWidth: 2,
    borderRadius: 10,
    padding: 10,
    zIndex: 10,
  },
  leftSpeechContainer: {
    position: 'absolute',
    left: 20,
    bottom: 30,
    alignItems: 'flex-start',
    zIndex: 10,
  },
  scientistImage: {
    width: 220,
    height: 220,
    top: 60,
    right: 30,
  },
  speechBubble: {
    backgroundColor: '#fff8dc',
    borderColor: '#333',
    borderWidth: 2,
    borderRadius: 10,
    padding: 10,
    width: 340,
    bottom: 10,
  },
  speechText: {
    fontSize: 14,
    fontStyle: 'italic',
    color: '#333',
  },
  nextButton: {
    marginTop: 8,
    alignSelf: 'flex-end',
    paddingVertical: 6,
    paddingHorizontal: 14,
    backgroundColor: '#333',
    borderRadius: 6,
  },
  yesButton: {
    marginTop: 8,
    alignSelf: 'flex-end',
    paddingVertical: 6,
    paddingHorizontal: 14,
    backgroundColor: '#2e8b57',
    borderRadius: 6,
  },
  nextText: {
    color: '#fff8dc',
    fontWeight: 'bold',
    fontSize: 14,
  },
  characterContainer: {
    position: 'absolute',
    left: 60,
    top: '35%',
    transform: [{ translateY: -80 }],
    zIndex: 2,
  },
  cavemanImage: {
    width: 550,
    height: 550,
    right: 30,
    bottom: 30,
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
    padding: 20,
  },
  characterSlider: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '300%',
  },
  characterCard: {
    width: 300,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    marginHorizontal: 70,
  },
  characterImage: {
    width: 350,
    height: 350,
    marginBottom: 10,
    top: 60,
    right: -30,
  },
  characterName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#fff8dc',
    marginBottom: 6,
    textAlign: 'center',
  },
  selectButton: {
    backgroundColor: '#333',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  selectButtonText: {
    color: '#fff8dc',
    fontSize: 14,
    fontWeight: 'bold',
  },
  selectionMessageContainer: {
    position: 'absolute',
    bottom: 50,
    backgroundColor: '#333',
    padding: 12,
    borderRadius: 8,
  },
  selectionMessage: {
    color: '#fff8dc',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
