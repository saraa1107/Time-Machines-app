import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  Image,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  Animated,
} from 'react-native';
import { Image as ExpoImage } from 'expo-image';
import RomaniaPuzzle from './RomaniaPuzzle';
import { s, vs, ms } from '../utils/scale';

export default function PaleoliticScreen({ navigation }) {
  const [currentLine, setCurrentLine] = useState(0);
  const [lucyAnimated, setLucyAnimated] = useState(false);
  const [showMirrorView, setShowMirrorView] = useState(false);
  const [showFossilView, setShowFossilView] = useState(false);
  const [mirrorWasOpened, setMirrorWasOpened] = useState(false);
  const [mirrorUnlocked, setMirrorUnlocked] = useState(false);

  const [showIntro, setShowIntro] = useState(true);
  const fadeAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (showIntro) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(fadeAnim, {
            toValue: 0,
            duration: 500,
            useNativeDriver: true,
          }),
          Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
          }),
        ])
      ).start();

      const timer = setTimeout(() => {
        setShowIntro(false);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [showIntro]);

  const professorLines = [
    'Vei avea nevoie de ajutor pentru a înțelege întâmplările din Primul Război Mondial.',
    'Ea este Regina Maria a României, soția regelui Ferdinand I și te va ajuta să înțelegi istoria României în timpurile grele ale războiului.',
    'Acum poți vorbi cu Regina Maria. De abia așteaptă să te cunoască. (Apasă pe ea pentru a începe conversația)',
  ];

  const lucyLines = [
    'România era o zonă de interes prin poziția sa geografică și a resurselor de cereale și petrol. Așa că în 1914 ambele tabere o voiau de partea lor.',
    'România a rămas neutră până în 1916, când a declarat război Austro-Ungariei, intrând în luptă de partea Antantei.',
    'Însă România a suferit pierderi majore, o mare parte din aceasta, inclusiv capitala, fiind ocupate.',
    'Îți pot arăta o hartă cu țara dezbinată. Crezi că poți uni România?',
    'În realitate, unirea de la 1918 a fost mult mai greu de obținut. Actul de unire a fost rezultatul unor negocieri complexe și a implicat multiple aspecte politice, sociale și economice. Unirea s-a întocmit chiar în această sală, în Alba Iulia.',
    'Dar nimic din toate acestea nu se putea întâmpla fără curajul soldaților care în 1917 au obținut victorii importante la Mărăști, Mărășești și Oituz. Eu am contribuit enorm la ridicarea moralului soldaților. Apasă pe filmul din spatele meu pentru a vedea.',
    'Sunt încântată că te-am cunoscut! Sper că ai înțeles cum a afectat Primul Război Mondial România. Acum vrei să vezi cum s-a desfășurat în întreaga lume?',
  ];

  const mirrorLines = [
    '„Refuz să mă las înfrântă sau să mă simt înfrântă până nu mi s-a smuls și ultima fărâmă de speranță”. Regina Maria',
    '„Ofiţerii şi soldaţii noştri de la Mărăşti şi Mărăşeşti nu o vor uita nici pe pământ nici în cer pe Regina Maria a României, mama celor răniţi şi descurajaţi în acele momente, nu o vor uita şi o vor slăvi veşnic pentru că ea le-a alinat durerile fizice şi le-a micşorat suferinţele morale; pentru aceasta întregul neam românesc trebuie să poarte marii Regine o recunoscătoare şi caldă dragoste, iar generaţiile viitoare o veşnică amintire”. Ion I. Nistor, Istoria românilor, vol II, Editura Biblioteca Bucureștilor, București, 2003, p. 311.',
    '„Regina cu o energie mai presus de orice laudă, ajutată de fiicele ei, mergea din spital în spital. Cu un dispreţ desăvârşit de pericol nu pregeta să se arate unde epidemia era mai violentă. Nu mii, zeci de mii de soldaţi răniţi şi bolnavi au văzut-o în acele luni la căpătâiul lor. Ea a trăit atunci cea mai frumoasă pagină a vieţii ei. O pagină pentru care… România îi datoreşte o admirativă recunoştinţă”.I.G. Duca, Memorii. Războiul 1916-1919, vol. II, ediție și schiță biografică de Stelian Neagoe, ed. Machiavelli, ed. Institutului de Științe Politice și Relații Internaționale, 2015, București, p. 157.',
    '„Am lăsat drumul şi am intrat în tranşee, un întreg labirint de tranşee, alunecoase, prin care ne era greu să înaintăm, cu multe suişuri şi coborâşuri”. „Soldaţii au fost uimiţi şi încântaţi să mă vadă […], m-au primit cu cea mai adâncă şi sinceră bucurie”, mărturisea regina Maria în jurnalul său. Maria, Regina României, Jurnal de război. 1917-1918, Editura Humanitas, București, 2015, p. 243.',
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
    navigation.navigate('SoldatScreen');
  };

  return (
    <ImageBackground
      source={require('../assets/sala unirii.jpg')}
      style={styles.background}
    >
      {showIntro && (
        <View style={styles.introOverlay}>
          <Animated.Text style={[styles.introText, { opacity: fadeAnim }]}>
            România în Primul Război Mondial 1914-1918
          </Animated.Text>
        </View>
      )}

      {showFossilView && (
        <View style={styles.overlayView}>
          <RomaniaPuzzle onComplete={closeFossilView} />
        </View>
      )}

      {showMirrorView ? (
        <ImageBackground
          source={require('../assets/film.jpg')}
          style={styles.mirrorFullScreen}
          resizeMode="contain"
        >
          <ExpoImage
            source={require('../assets/film.gif')}
            style={styles.insideMirrorImage}
            contentFit="contain"
          />
          <TouchableOpacity style={styles.closeMirrorButton} onPress={toggleMirrorView}>
            <Text style={styles.closeText}>Închide</Text>
          </TouchableOpacity>
        </ImageBackground>
      ) : (
        <>
          <View style={styles.mirrorContainer}>
            <Image
              source={require('../assets/film.jpg')}
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
                source={require('../assets/regina animata.gif')}
                style={styles.cavemanImage}
                contentFit="contain"
              />
            ) : (
              <Image
                source={require('../assets/regina maria.png')}
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
  introOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  introText: {
    color: '#fff8dc',
    fontSize: ms(24),
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
    height: '100%',
    width: '100%',
    right: s(-40),
    top: vs(-50),
  },
  insideMirrorImage: {
    width: '85%',
    height: '85%',
    alignSelf: 'center',
    marginTop: vs(65),
    bottom: vs(30),
    borderRadius: ms(10),
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
    bottom: vs(10),
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
    padding: s(10),
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
    height: vs(480),
    top: vs(30),
    right: s(10),
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
