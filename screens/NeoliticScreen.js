import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

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
    'Acum poți vorbi cu Otzi. De abia așteaptă să te cunoască.',
  ];

  const lucyLines = [
    'Salut! Eu sunt Otzi! Fac parte din specia Homo sapiens.',
    'Am fost descoperit în Alpii italieni, in 1991. Datorita ghetii, corpul meu s-a conservat foarte bine.',
    'Iti va placea Neoliticul! Este o perioadă de mari schimbări!',
    'Acum sunt pregătit să călătoresc înapoi în timp, însă tu vei avea nevoie de o deghizare.',
    'Profesorul Chronos ți-a pregătit o oglindă magică care te va ajuta să arăți ca oamenii din Neolitic.',
    'Acum totul este gata! Vrei să începi călătoria în timp?',
  ];

  const mirrorLines = [
    'Aceasta este oglinda. Privește cu atenție! Vei observa evolutia omului',
    'Acum esti un Homo sapiens. Fermier, meșteșugar și constructor de așezări.',
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
          <Image
            source={require('../assets/gifs/evolution.gif')} // Actualizează calea dacă este diferită
            style={styles.insideMirrorVideo}
            resizeMode="contain"
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
            <Image
              source={
                lucyAnimated
                  ? require('../assets/Otzi/animated.gif')
                  : require('../assets/Otzi/static.png')
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
    top: 120,
    left: 30,
    zIndex: 5,
  },
  mirrorTouchable: {
    width: 150,
    height: 200,
  },
  mirrorImage: {
    width: '100%',
    height: '100%',
  },
  mirrorFullScreen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: -45,
    marginVertical: 100,
    height: '110%',
    width: '110%',
    position: 'relative',
  },
  insideMirrorVideo: {
    width: '120%',
    height: '120%',
    alignSelf: 'center',
    marginTop: 65,
    left: 20,
    borderRadius: 10,
    zIndex: 1,
  },
  closeMirrorButton: {
  position: 'absolute',
  top: 20,
  right: 20,
  backgroundColor: '#333',
  paddingHorizontal: 12,
  paddingVertical: 6,
  borderRadius: 6,
  zIndex: 999, // 🔥 adaugă zIndex mare
  elevation: 10, // pentru Android (opțional)
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
    width: 450,
    height: 450,
    top: 50,
    right: 40,
  },
});
