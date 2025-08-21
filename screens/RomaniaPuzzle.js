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

const { width, height } = Dimensions.get('window');

export default function FossilPuzzle({ onComplete }) {
  const targets = {
    head: { x: width / 6.2 - 60, y: 247 },
    torso: { x: width / 1.5 - 70, y: 235 },
    limbs: { x: width / 1.8 - 70, y: height - 615 },
  };

  const initPos = {
    head: useRef(new Animated.ValueXY({ x: 20, y: 20 })).current,
    torso: useRef(new Animated.ValueXY({ x: width - 100, y: 25 })).current,
    limbs: useRef(new Animated.ValueXY({ x: 30, y: height - 180 })).current,
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
    head: createResponder('head', 210, 210),
    torso: createResponder('torso', 170, 170),
    limbs: createResponder('limbs', 100, 100),
  };

  const checkDrop = (name, pos) => {
    const target = targets[name];
    const dx = Math.abs(pos.x - target.x);
    const dy = Math.abs(pos.y - target.y);
    return dx < 60 && dy < 60;
  };

  const allPlaced = Object.values(placed).every((p) => p);

  return (
    <View style={styles.container}>
      {/* Silueta scheletului */}
      <Image
        source={require('../assets/romania.jpg')}
        style={styles.silhouette}
        resizeMode="contain"
      />

      {/* Puncte de ghidare */}
      <View
        style={[
          styles.guideDot,
          { backgroundColor: 'red', left: targets.head.x + 105, top: targets.head.y + 105 },
        ]}
      />
      <View
        style={[
          styles.guideDot,
          { backgroundColor: 'green', left: targets.torso.x + 85, top: targets.torso.y + 85 },
        ]}
      />
      <View
        style={[
          styles.guideDot,
          { backgroundColor: 'blue', left: targets.limbs.x + 50, top: targets.limbs.y + 50 },
        ]}
      />

      {/* Piese */}
      <Animated.View
        {...responders.head.panHandlers}
        style={[styles.piece, initPos.head.getLayout()]}
      >
        <Image
          source={require('../assets/transilvania.png')}
          style={styles.headImage}
          resizeMode="contain"
        />
      </Animated.View>

      <Animated.View
        {...responders.torso.panHandlers}
        style={[styles.piece, initPos.torso.getLayout()]}
      >
        <Image
          source={require('../assets/basarabia.png')}
          style={styles.torsoImage}
          resizeMode="contain"
        />
      </Animated.View>

      <Animated.View
        {...responders.limbs.panHandlers}
        style={[styles.piece, initPos.limbs.getLayout()]}
      >
        <Image
          source={require('../assets/bucovina.png')}
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
    width: '100%',
    height: '100%',
    opacity: 0.25,
  },
  piece: {
    position: 'absolute',
  },
  headImage: {
    width: 210,
    height: 210,
  },
  torsoImage: {
    width: 170,
    height: 170,
  },
  limbsImage: {
    width: 100,
    height: 100,
  },
  doneButton: {
    position: 'absolute',
    bottom: 40,
    backgroundColor: '#2e8b57',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  doneText: {
    color: '#fff8dc',
    fontWeight: 'bold',
    fontSize: 18,
  },

});
