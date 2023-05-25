import React from "react";
import { StyleSheet, View, ViewToken, Text, FlatList } from "react-native";
import Animated, {
  useAnimatedStyle,
  withTiming,
  useSharedValue,
} from "react-native-reanimated";

const data = new Array(50).fill(0).map((_, index) => ({ id: index }));

const ListItem = React.memo(({ item, viewableItems }) => {
  const rStyle = useAnimatedStyle(() => {
    const isVisible = viewableItems.value
      .filter((item) => item.isViewable)
      .find((viewableItem) => viewableItem.item.id === item.id);

    return {
      opacity: withTiming(isVisible ? 1 : 0),
      transform: [
        {
          scale: withTiming(isVisible ? 1 : 0.6),
        },
      ],
    };
  }, []);

  return (
    <Animated.View
      style={[
        {
          height: 80,
          width: "90%",
          backgroundColor: "#78CAD2",
          alignSelf: "center",
          borderRadius: 15,
          marginTop: 20,
        },
        rStyle,
      ]}
    />
  );
});

export default function AnimatedFlatList15() {
  const viewableItems = useSharedValue([]);

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        contentContainerStyle={{ paddingTop: 40 }}
        onViewableItemsChanged={({ viewableItems: vItems }) => {
          viewableItems.value = vItems;
        }}
        renderItem={({ item }) => {
          return <ListItem item={item} viewableItems={viewableItems} />;
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
