import { useEffect, useState } from "react";
import { Text, View, Dimensions } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useAnimatedScrollHandler,
  withTiming,
  Easing,
  runOnJS,
} from "react-native-reanimated";

const { width } = Dimensions.get("window");

export function Card({ index }) {
  return (
    <View
      style={{
        borderWidth: 2,
        borderColor: "black",
        width: "100%",
        height: 50,
        alignSelf: "center",
        margin: 5,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Card ({index + 1})</Text>
    </View>
  );
}

function AnimatedFAB(props) {
  const { scrollDirection } = props;
  const animateWidth = useSharedValue(100);

  const actionBarStyle = useAnimatedStyle(() => {
    return { width: animateWidth.value };
  });
  useEffect(() => {
    animateWidth.value = withTiming(scrollDirection === "up" ? 100 : 50, {
      duration: 400,
      easing: Easing.inOut(Easing.ease),
    });
  }, [scrollDirection]);

  const actionTextStyle = useAnimatedStyle(() => {
    return {
      width: withTiming(scrollDirection === "up" ? 50 : 0, {
        duration: 400,
        easing: Easing.inOut(Easing.ease),
      }),
    };
  });

  return (
    <Animated.View
      style={[
        {
          flexDirection: "row",
          borderWidth: 1,
          borderRadius: 25,
          padding: 2,
          position: "absolute",
          bottom: 5,
          right: "5%",
          backgroundColor: "#000",
          alignItems: "center",
          justifyContent: "center",
        },
        // actionBarStyle,
      ]}
    >
      <MaterialCommunityIcons
        name={"plus-circle"}
        style={{
          color: "white",
          backgroundColor: "black",
          borderRadius: 25,
          alignSelf: "center",
          alignItems: "center",
        }}
        size={40}
      />
      <Animated.Text
        numberOfLines={1}
        style={[{ textAlign: "center", color: "#fff" }, actionTextStyle]}
      >
        Like
      </Animated.Text>
    </Animated.View>
  );
}
export default function HomePage() {
  const [scrollDirection, setScrollDirection] = useState(null);

  const lastContentOffset = useSharedValue(0);
  const isScrolling = useSharedValue(false);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      if (
        lastContentOffset.value > event.contentOffset.y &&
        isScrolling.value
      ) {
        runOnJS(setScrollDirection)("up");
      } else if (
        lastContentOffset.value < event.contentOffset.y &&
        isScrolling.value
      ) {
        runOnJS(setScrollDirection)("down");
      }
      lastContentOffset.value = event.contentOffset.y;
    },
    onBeginDrag: (e) => {
      isScrolling.value = true;
    },
    onEndDrag: (e) => {
      isScrolling.value = false;
    },
  });

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Animated.ScrollView
        scrollEventThrottle={16}
        onScroll={scrollHandler}
        style={{ width: width, padding: 10 }}
      >
        {new Array(20).fill(0).map((_, index) => {
          return <Card key={index} index={index} />;
        })}
      </Animated.ScrollView>
      <AnimatedFAB scrollDirection={scrollDirection} />
    </View>
  );
}
