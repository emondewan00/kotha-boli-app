import React, {useEffect, useRef} from 'react';
import {Text, View, Animated, StyleSheet} from 'react-native';

// type TypingDotsProps = {
//   username: string;
// };

export default function TypingDots() {
  const dot1 = useRef<Animated.Value>(new Animated.Value(0)).current;
  const dot2 = useRef<Animated.Value>(new Animated.Value(0)).current;
  const dot3 = useRef<Animated.Value>(new Animated.Value(0)).current;

  useEffect(() => {
    const animateDot = (dot: Animated.Value, delay: number) => {
      return Animated.loop(
        Animated.sequence([
          Animated.timing(dot, {
            toValue: 1,
            duration: 300,
            delay,
            useNativeDriver: true,
          }),
          Animated.timing(dot, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
          }),
        ]),
      ).start();
    };

    animateDot(dot1, 0);
    animateDot(dot2, 150);
    animateDot(dot3, 300);
  }, [dot1, dot2, dot3]);

  return (
    <View style={styles.container} className="rounded-tl-3xl">
      <Text style={styles.text}> typing</Text>
      <Animated.Text style={[styles.dot, {opacity: dot1}]}>.</Animated.Text>
      <Animated.Text style={[styles.dot, {opacity: dot2}]}>.</Animated.Text>
      <Animated.Text style={[styles.dot, {opacity: dot3}]}>.</Animated.Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingRight: 16,
    paddingLeft: 24,
    paddingVertical: 8,
    alignItems: 'center',
    backgroundColor: '#AD87E4',
    borderTopRightRadius: 9999,
    borderBottomRightRadius: 9999,
    borderTopLeftRadius: 9999,
    marginVertical: 8,
    maxWidth: 100,
  },
  text: {
    fontSize: 14,
    color: '#fff',
  },
  dot: {
    fontSize: 14,
    color: '#fff',
    marginLeft: 2,
  },
});
