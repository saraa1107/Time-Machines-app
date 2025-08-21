import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import FossilPuzzle from './FossilPuzzle';

export default function PaleoliticScreen({ navigation }) {
  const [currentLine, setCurrentLine] = useState(0);
  const [lucyAnimated, setLucyAnimated] = useState(false);
  const [showMirrorView, setShowMirrorView] = useState(false);
  const [showFossilView, setShowFossilView] = useState(false);
  const [mirrorWasOpened, setMirrorWasOpened] = useState(false);
  const [showRadiography, setShowRadiography] = useState(false);
  const [mirrorUnlocked, setMirrorUnlocked] = useState(false);

  const professorLines = [
    'Vei avea nevoie de ajutor pentru a înțelege cum trăiau oamenii în Paleolitic.',
    'Ea este Lucy și te va ajuta să te integrezi în această lume preistorică.',
    'Acum poți vorbi cu Lucy. De abia așteaptă să te cunoască.',
  ];

  const lucyLines = [
    'Salut! Eu sunt Lucy! Fac parte din specia Australopithecus afarensis.',
    'Noi suntem primii oameni care au apărut pe Pământ.',
    'Fosilele mele au fost descoperite în Etiopia, Africa, în 1974.',
    'Însă ceva s-a întâmplat și ele s-au amestecat. Mă poți ajuta să le aranjez din nou?',
    'Acum sunt pregătită să călătoresc înapoi în timp, însă tu vei avea nevoie de o deghizare.',
    'Profesorul Chronos ți-a pregătit o oglindă magică care te va ajuta să arăți ca oamenii din Paleolitic.',
    'Acum totul este gata! Vrei să începi călătoria în timp?',
  ];

  const mirrorLines = [
    'Aceasta este oglinda. Privește cu atenție! Nu te recunoști?',
    'Acum esti un Homo habilis. Primul fauritor de unelte de piatra',
    'Apasă imaginea pentru a vedea o radiografie a craniului tău',
    'Desi creierul e mic, ai destula dexteritate pentru a crea unelte de piatra prin lovirea a doua pietre.Apasa butonul Inchide pentru a continua.',
  ];

  let dialogLines;
  if (showMirrorView) {
    dialogLines = mirrorLines;
  } else {
    dialogLines = lucyAnimated ? lucyLines : professorLines;
  }

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
      setShowRadiography(false);
    } else {
      if (lucyAnimated) {
        setCurrentLine(6);
      }
    }
    setShowMirrorView(!showMirrorView);
  };

  const handleYesPuzzle = () => {
    setShowFossilView(true);
  };

  const closeFossilView = () => {
    setShowFossilView(false);
    setCurrentLine(4);
    setMirrorUnlocked(true);
  };

  const goToVanatoare = () => {
    navigation.navigate('Vanatoare');
  };

  return (
    <ImageBackground
      source={require('../assets/backgrounds/clasaV-bg.jpg')}
      style={styles.background}
    >
      {showFossilView && (
        <View style={styles.overlayView}>
          <FossilPuzzle onComplete={closeFossilView} />
        </View>
      )}

      {showMirrorView ? (
        <ImageBackground
          source={require('../assets/mirror.png')}
          style={styles.mirrorFullScreen}
          resizeMode="contain"
        >
          <Image
            source={
              showRadiography
                ? require('../assets/homohibilis-radiografie.jpg')
                : require('../assets/homohibilis.png')
            }
            style={styles.insideMirrorImage}
            resizeMode="contain"
          />

          <TouchableOpacity
            style={styles.invisibleOverlayButton}
            onPress={mirrorUnlocked ? () => setShowRadiography(!showRadiography) : null}
            disabled={!mirrorUnlocked}
          />

          <TouchableOpacity style={styles.closeMirrorButton} onPress={toggleMirrorView}>
            <Text style={styles.closeText}>Închide</Text>
          </TouchableOpacity>
        </ImageBackground>
      ) : (
        <>
          <View style={styles.mirrorContainer}>
            <Image
              source={require('../assets/mirror.png')}
              style={styles.mirrorImage}
              resizeMode="contain"
            />
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
                  ? require('../assets/Lucy/animated.gif')
                  : require('../assets/Lucy/static.png')
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
        <View style={styles.speechBubble}>
          <Text style={styles.speechText}>{dialogLines[currentLine]}</Text>

          {dialogLines === lucyLines && currentLine === 3 ? (
            <TouchableOpacity onPress={handleYesPuzzle} style={styles.yesButton}>
              <Text style={styles.nextText}>Da</Text>
            </TouchableOpacity>
          ) : dialogLines === lucyLines && currentLine === 6 ? (
            <TouchableOpacity onPress={goToVanatoare} style={styles.yesButton}>
              <Text style={styles.nextText}>Da</Text>
            </TouchableOpacity>
          ) : currentLine < dialogLines.length - 1 && !(dialogLines === lucyLines && currentLine === 5) ? (
            <TouchableOpacity onPress={handleNext} style={styles.nextButton}>
              <Text style={styles.nextText}>Next</Text>
            </TouchableOpacity>
          ) : null}
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  mirrorContainer: {
    position: 'absolute',
    top: 80,
    left: 10,
    width: 100,
    height: 120,
    zIndex: 5,
  },
  mirrorImage: {
    top: 70,
    width: '150%',
    height: '150%',
  },
  invisibleMirrorButton: {
    position: 'absolute',
    width: '200%',
    height: '200%',
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
  insideMirrorImage: {
    width: '63%',
    height: '63%',
    alignSelf: 'center',
    marginTop: 65,
    left: 20,
    borderRadius: 10,
  },
  invisibleOverlayButton: {
    position: 'absolute',
    width: '63%',
    height: '63%',
    top: 65,
    left: 20,
    zIndex: 10,
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
  closeText: {
    color: '#fff8dc',
    fontSize: 14,
    fontWeight: 'bold',
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
    top: 30,
    right: 30,
  },
  speechBubble: {
    backgroundColor: '#fff8dc',
    borderColor: '#333',
    borderWidth: 2,
    borderRadius: 10,
    padding: 10,
    width: 340,
    bottom: 30,
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
});
