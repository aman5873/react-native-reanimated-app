import React from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  cancelAnimation,
  useAnimatedGestureHandler,
  useDerivedValue,
  useSharedValue,
  withDecay,
} from "react-native-reanimated";

import {
  PanGestureHandler,
  GestureHandlerRootView,
} from "react-native-gesture-handler";

const { width: PAGE_WIDTH } = Dimensions.get("window");

const titles = ["What's", "up", "mobile", "devs?"];
const MAX_TRANSLATE_X = -PAGE_WIDTH * (titles.length - 1);

const Page = ({ index, title, translateX }) => {
  const pageOffset = PAGE_WIDTH * index;

  const rStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value + pageOffset }],
    };
  });

  return (
    <Animated.View
      style={[
        {
          ...StyleSheet.absoluteFillObject,
          backgroundColor: `rgba(0,0,256,0.${index + 2})`,
          alignItems: "center",
          justifyContent: "center",
        },
        rStyle,
      ]}
    >
      <Text
        style={{
          fontSize: 70,
          fontWeight: "700",
          letterSpacing: 1.5,
          textTransform: "uppercase",
        }}
      >
        {title}
      </Text>
    </Animated.View>
  );
};

function App() {
  const translateX = useSharedValue(0);

  const clampedTranslateX = useDerivedValue(() => {
    return Math.max(Math.min(translateX.value, 0), MAX_TRANSLATE_X);
  });

  const panGestureEvent = useAnimatedGestureHandler({
    onStart: (event, context) => {
      context.x = clampedTranslateX.value;
      cancelAnimation(translateX);
    },
    onActive: (event, context) => {
      translateX.value = event.translationX + context.x;
    },
    onEnd: (event) => {
      translateX.value = withDecay({ velocity: event.velocityX });
    },
  });

  return (
    <View style={styles.container}>
      <PanGestureHandler onGestureEvent={panGestureEvent}>
        <Animated.View style={{ flex: 1, flexDirection: "row" }}>
          {titles.map((title, index) => {
            return (
              <Page
                key={index.toString()}
                translateX={clampedTranslateX}
                index={index}
                title={title}
              />
            );
          })}
        </Animated.View>
      </PanGestureHandler>
    </View>
  );
}

export default () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <App />
    </GestureHandlerRootView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
