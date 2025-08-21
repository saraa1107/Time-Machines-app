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
import RomaniaPuzzle from './RomaniaPuzzle';

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
    'Vei avea nevoie de ajutor pentru a înțelege intamplarile din Primul Razboi Mondial',
    'Ea este Regina Maria a Romaniei, sotia regelui Ferdinand I și te va ajuta sa intelegi istoria Romaniei in timpurile grele ale razboiului.',
    'Acum poți vorbi cu Regina Maria. De abia așteaptă să te cunoască.(Tip: Daca apesi pe unele personaje, aceste vor incepe sa se miste.)',
  ];

  const lucyLines = [
    'Romania era o zona de interes prin pozitia sa geografica si a resurselor de cereale si petrol. Asa ca in 1914 anbele tabere o voiau de partea lor. ',
    'Romania a ramas neutra pana in 1916, cand a declarat razboi Austro-Ungariei, intrand in lupta de partea Antantei.',
    'Insa Romania a suferit pierderi majore, o mare parte din aceasta, inclusiv capitala,fiind ocupate.',
    'Iti pot arata o harta cu tara dezbinata. Crezi ca poti uni Romania?',
    'In realitate, unirea de la 1918 a fost mult mai greu de obtinut. Actul de unire a fost rezultatul unor negocieri complexe si a implicat multiple aspecte politice, sociale si economice. Unirea s a intocmit chiar in aceasta sala, in Alba Iulia',
    'Dar nimic din toate astea nu se putea intampla fara curajul soldatilor care in 1917 au obtinut victorii importante la Marasti, Marasesti si Oituz. Eu am contribuit enorm la ridicarea moralului soldatilor. Apasa pe filmul din spatele meu pentru a vedea.',
    'Sunt incantata ca te-am cunoscut! Sper ca ai inteles cum a afectat Primul Razboi Mondial Romania. Acum vrei sa vezi cum s a desfasurat in intreaga lume?',
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
          <Image
            source={require('../assets/film.gif')}
            style={styles.insideMirrorImage}
            resizeMode="contain"
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
            <Image
              source={
                lucyAnimated
                  ? require('../assets/regina animata.gif')
                  : require('../assets/regina maria.png')
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
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
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
    height: '100%',
    width: '100%',
    right: -40,
    top: -50,
  },
  insideMirrorImage: {
    width: '85%',
    height: '85%',
    alignSelf: 'center',
    marginTop: 65,
    bottom: 30,
    borderRadius: 10,
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
    bottom: 10,
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
    height: 480,
    top: 30,
    right: 10,
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
