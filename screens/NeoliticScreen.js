import React, { useState, useEffect } from 'react';
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

export default function NeoliticScreen({ navigation }) {
  const [currentLine, setCurrentLine] = useState(0);
  const [lucyAnimated, setLucyAnimated] = useState(false);
  const [showMirrorView, setShowMirrorView] = useState(false);
  const [showRadiography, setShowRadiography] = useState(false);
  const [mirrorWasOpened, setMirrorWasOpened] = useState(false);
  const [mirrorUnlocked, setMirrorUnlocked] = useState(false);

  const professorLines = [
    'Vei avea nevoie de ajutor pentru a înțelege cum trăiau oamenii în Neolitic.',
    'El este Otzi și te va ajuta să te integrezi în această lume preistorică.',
    'Acum poți vorbi cu Otzi. De abia așteaptă să te cunoască.(Apasă pe el pentru a începe conversația)',
  ];

  const lucyLines = [
    'Salut! Eu sunt Otzi! Fac parte din specia Homo sapiens.',
    'Am fost descoperit în Alpii italieni, în 1991. Datorită gheții, corpul meu s-a conservat foarte bine.',
    'Îți va plăcea Neoliticul! Este o perioadă de mari schimbări!',
    'Acum sunt pregătit să călătoresc înapoi în timp, însă tu vei avea nevoie de o deghizare.',
    'Profesorul Chronos ți-a pregătit o oglindă magică care te va ajuta să arăți ca oamenii din Neolitic.',
    'Acum totul este gata! Vrei să începi călătoria în timp?',
  ];

  const mirrorLines = [
    'Aceasta este oglinda. Privește cu atenție! Vei observa evoluția omului.',
    'Acum ești un Homo sapiens. Fermier, meșteșugar și constructor de așezări.',
    'Creierul tău a evoluat, iar acum folosești unelte sofisticate și ai o viață mai organizată. Apasă butonul Închide pentru a continua.',
  ];

  let dialogLines;
  if (showMirrorView) {
    dialogLines = mirrorLines;
  } else {
    dialogLines = lucyAnimated ? lucyLines : professorLines;
  }

  useEffect(() => {
    if (lucyAnimated && currentLine === 4) {
      setMirrorUnlocked(true);
    }
  }, [currentLine, lucyAnimated]);

  const handleNext = () => {
    if (dialogLines === lucyLines && currentLine === 4 && !mirrorWasOpened) return;
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
        setCurrentLine(5);
      }
    }
    setShowMirrorView(!showMirrorView);
  };

  const goToAsezare = () => {
    navigation.navigate('Asezare');
  };

  return (
    <ImageBackground
      source={require('../assets/backgrounds/clasaV-bg.jpg')}
      style={styles.background}
    >
      {showMirrorView ? (
        <ImageBackground
          source={require('../assets/mirror.png')}
          style={styles.mirrorFullScreen}
          resizeMode="contain"
        >
          {/* ✅ GIF-ul animat în oglindă */}
          <ExpoImage
            source={require('../assets/gifs/evolution.gif')}
            style={styles.insideMirrorVideo}
            contentFit="contain"
          />

          <TouchableOpacity style={styles.closeMirrorButton} onPress={toggleMirrorView}>
            <Text style={styles.closeText}>Închide</Text>
          </TouchableOpacity>
        </ImageBackground>
      ) : (
        <>
          <View style={styles.mirrorWrapper}>
            <TouchableOpacity
              style={styles.mirrorTouchable}
              onPress={mirrorUnlocked ? toggleMirrorView : null}
              disabled={!mirrorUnlocked}
              activeOpacity={0.8}
            >
              <Image
                source={require('../assets/mirror.png')}
                style={styles.mirrorImage}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.characterContainer} onPress={handleLucyPress}>
            {lucyAnimated ? (
              <ExpoImage
                source={require('../assets/Otzi/animated.gif')}
                style={styles.cavemanImage}
                contentFit="contain"
              />
            ) : (
              <Image
                source={require('../assets/Otzi/static.png')}
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

          {dialogLines === lucyLines && currentLine === 5 ? (
            <TouchableOpacity onPress={goToAsezare} style={styles.yesButton}>
              <Text style={styles.nextText}>Da</Text>
            </TouchableOpacity>
          ) : currentLine < dialogLines.length - 1 &&
            !(dialogLines === lucyLines && currentLine === 4) ? (
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
  mirrorWrapper: {
    position: 'absolute',
    top: vs(120),
    left: s(30),
    zIndex: 5,
  },
  mirrorTouchable: {
    width: s(150),
    height: vs(200),
  },
  mirrorImage: {
    width: '100%',
    height: '100%',
  },
  mirrorFullScreen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: s(-45),
    marginVertical: vs(100),
    height: '110%',
    width: '110%',
    position: 'relative',
  },
  insideMirrorVideo: {
    width: '120%',
    height: '120%',
    alignSelf: 'center',
    marginTop: vs(65),
    left: s(20),
    borderRadius: ms(10),
    zIndex: 1,
  },
  closeMirrorButton: {
  position: 'absolute',
  top: vs(20),
  right: s(20),
  backgroundColor: '#333',
  paddingHorizontal: s(12),
  paddingVertical: vs(6),
  borderRadius: ms(6),
  zIndex: 999, // 🔥 adaugă zIndex mare
  elevation: 10, // pentru Android (opțional)
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
    top: '35%',
    transform: [{ translateY: vs(-80) }],
    zIndex: 2,
  },
  cavemanImage: {
    width: s(450),
    height: vs(450),
    top: vs(50),
    right: s(40),
  },
});
