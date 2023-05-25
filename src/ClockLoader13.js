import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";

import Animated, {
  useAnimatedStyle,
  useDerivedValue,
  withSpring,
  withTiming,
  Easing,
  useSharedValue,
  withRepeat,
} from "react-native-reanimated";

export const N = 12;
export const SQUARE_SIZE = 12;

const Square = ({ index, progress }) => {
  const offsetAngle = (2 * Math.PI) / N;
  const finalAngle = offsetAngle * (N - 1 - index);

  const rotate = useDerivedValue(() => {
    if (progress.value <= 2 * Math.PI) {
      return Math.min(finalAngle, progress.value);
    }
    if (progress.value - 2 * Math.PI < finalAngle) {
      return finalAngle;
    }

    return progress.value;
  }, []);

  const translateY = useDerivedValue(() => {
    if (rotate.value === finalAngle) {
      return withSpring(-N * SQUARE_SIZE);
    }

    if (progress.value > 2 * Math.PI) {
      return withTiming((index - N) * SQUARE_SIZE);
    }

    return withTiming(-index * SQUARE_SIZE);
  });

  const rStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { rotate: `${rotate.value}rad` },
        { translateY: translateY.value },
      ],
    };
  });

  return (
    <Animated.View
      style={[
        {
          height: SQUARE_SIZE,
          aspectRatio: 1,
          backgroundColor: "white",
          //   opacity: (index + 1) / N,
          position: "absolute",
        },
        rStyle,
      ]}
    />
  );
};

export default function ClockLoader13() {
  const progress = useSharedValue(0);

  useEffect(() => {
    progress.value = withRepeat(
      withTiming(4 * Math.PI, {
        duration: 8000,
        easing: Easing.linear,
      }),
      -1
    );
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar style="inverted" />
      {new Array(N).fill(0).map((_, index) => {
        return <Square key={index} progress={progress} index={index} />;
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#111",
    alignItems: "center",
    justifyContent: "center",
  },
});
