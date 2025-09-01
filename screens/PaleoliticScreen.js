import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { Image as ExpoImage } from 'expo-image';
import { s, vs, ms } from '../utils/scale';
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
    'Acum poți vorbi cu Lucy. De abia așteaptă să te cunoască.(Apasă pe ea pentru a începe conversația)',
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
    'Acum ești un Homo habilis. Primul făuritor de unelte de piatră.',
    'Apasă imaginea pentru a vedea o radiografie a craniului tău.',
    'Deși creierul e mic, ai destulă dexteritate pentru a crea unelte de piatră prin lovirea a două pietre. Apasă butonul Închide pentru a continua.',
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
            {lucyAnimated ? (
              <ExpoImage
                source={require('../assets/Lucy/animated.gif')}
                style={styles.cavemanImage}
                contentFit="contain"
              />
            ) : (
              <Image
                source={require('../assets/Lucy/static.png')}
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
    top: vs(80),
    left: s(10),
    width: s(100),
    height: vs(120),
    zIndex: 5,
  },
  mirrorImage: {
    top: vs(70),
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
    marginHorizontal: s(-45),
    marginVertical: vs(100),
    height: '110%',
    width: '110%',
  },
  insideMirrorImage: {
    width: '63%',
    height: '63%',
    alignSelf: 'center',
    marginTop: vs(65),
    left: s(20),
    borderRadius: ms(10),
  },
  invisibleOverlayButton: {
    position: 'absolute',
    width: '63%',
    height: '63%',
    top: vs(65),
    left: s(20),
    zIndex: 10,
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
  closeText: {
    color: '#fff8dc',
    fontSize: ms(14),
    fontWeight: 'bold',
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
    top: vs(30),
    right: s(30),
  },
  speechBubble: {
    backgroundColor: '#fff8dc',
    borderColor: '#333',
    borderWidth: 2,
    borderRadius: ms(10),
    padding: ms(10),
    width: s(340),
    bottom: vs(30),
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
    top: vs(200),
    width: s(550),
    height: vs(550),
    zIndex: 2,
    backgroundColor: 'transparent',
  },
  cavemanImage: {
    width: s(550),
    height: vs(550),
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
});
