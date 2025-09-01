import React, { useRef, useState } from 'react';
import {
  View,
  Image,
  StyleSheet,
  PanResponder,
  Animated,
  TouchableOpacity,
  Text,
  Dimensions,
} from 'react-native';
import { s, vs, ms } from '../utils/scale';

const { width, height } = Dimensions.get('window');

export default function FossilPuzzle({ onComplete }) {
  const targets = {
    head: { x: width / 2.35 - s(60), y: vs(90) },
    torso: { x: width / 3.5 - s(70), y: vs(220) },
    limbs: { x: width / 5.1 - s(70), y: height - vs(445) },
  };

  const initPos = {
    head: useRef(new Animated.ValueXY({ x: s(20), y: vs(20) })).current,
    torso: useRef(new Animated.ValueXY({ x: width - s(100), y: vs(25) })).current,
    limbs: useRef(new Animated.ValueXY({ x: s(30), y: height - vs(180) })).current,
  };

  const [placed, setPlaced] = useState({
    head: false,
    torso: false,
    limbs: false,
  });

  const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

  const createResponder = (name, imageWidth, imageHeight) =>
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (_, gestureState) => {
        const newX = clamp(
          gestureState.moveX - imageWidth / 2,
          0,
          width - imageWidth
        );
        const newY = clamp(
          gestureState.moveY - imageHeight / 2,
          0,
          height - imageHeight
        );
        initPos[name].setValue({ x: newX, y: newY });
      },
      onPanResponderRelease: (_, gesture) => {
        const dropX = clamp(
          gesture.moveX - imageWidth / 2,
          0,
          width - imageWidth
        );
        const dropY = clamp(
          gesture.moveY - imageHeight / 2,
          0,
          height - imageHeight
        );

        if (checkDrop(name, { x: dropX, y: dropY })) {
          Animated.spring(initPos[name], {
            toValue: targets[name],
            useNativeDriver: false,
          }).start(() => {
            setPlaced((prev) => ({ ...prev, [name]: true }));
          });
        } else {
          const resetX = clamp(
            gesture.x0 - imageWidth / 2,
            0,
            width - imageWidth
          );
          const resetY = clamp(
            gesture.y0 - imageHeight / 2,
            0,
            height - imageHeight
          );

          Animated.spring(initPos[name], {
            toValue: { x: resetX, y: resetY },
            useNativeDriver: false,
          }).start();
        }
      },
    });

  const responders = {
    head: createResponder('head', s(140), vs(140)),
    torso: createResponder('torso', s(270), vs(270)),
    limbs: createResponder('limbs', s(340), vs(340)),
  };

  const checkDrop = (name, pos) => {
    const target = targets[name];
    const dx = Math.abs(pos.x - target.x);
    const dy = Math.abs(pos.y - target.y);
    return dx < s(60) && dy < vs(60);
  };

  const allPlaced = Object.values(placed).every((p) => p);

  return (
    <View style={styles.container}>
      {/* Silueta scheletului */}
      <Image
        source={require('../assets/fossils/silhouette.png')}
        style={styles.silhouette}
        resizeMode="contain"
      />

      {/* Piese */}
      <Animated.View
        {...responders.head.panHandlers}
        style={[styles.piece, initPos.head.getLayout()]}
      >
        <Image
          source={require('../assets/fossils/1.png')}
          style={styles.headImage}
          resizeMode="contain"
        />
      </Animated.View>

      <Animated.View
        {...responders.torso.panHandlers}
        style={[styles.piece, initPos.torso.getLayout()]}
      >
        <Image
          source={require('../assets/fossils/2.png')}
          style={styles.torsoImage}
          resizeMode="contain"
        />
      </Animated.View>

      <Animated.View
        {...responders.limbs.panHandlers}
        style={[styles.piece, initPos.limbs.getLayout()]}
      >
        <Image
          source={require('../assets/fossils/3.png')}
          style={styles.limbsImage}
          resizeMode="contain"
        />
      </Animated.View>

      {/* Buton GATA */}
      {allPlaced && (
        <TouchableOpacity style={styles.doneButton} onPress={onComplete}>
          <Text style={styles.doneText}>GATA</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  silhouette: {
    position: 'absolute',
    width: '80%',
    height: '80%',
    opacity: 0.25,
  },
  piece: {
    position: 'absolute',
  },
  headImage: {
    width: s(140),
    height: vs(140),
  },
  torsoImage: {
    width: s(260),
    height: vs(260),
  },
  limbsImage: {
    width: s(330),
    height: vs(330),
  },
  doneButton: {
    position: 'absolute',
    bottom: vs(40),
    backgroundColor: '#2e8b57',
    paddingHorizontal: s(20),
    paddingVertical: vs(10),
    borderRadius: ms(8),
  },
  doneText: {
    color: '#fff8dc',
    fontWeight: 'bold',
    fontSize: ms(18),
  },
});
