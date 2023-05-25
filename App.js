import { StyleSheet } from "react-native";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";

import AntDesign from "react-native-vector-icons/AntDesign";

import HomePage from "./src/HomePage";
import IntroductionReanimated2 from "./src/IntroductionReanimated2";
import PanGestureHandlerBasics01 from "./src/PanGestureHandlerBasics01";
import InterpolateWithScrollView02 from "./src/InterpolateWithScrollView02";
import InterpolateColor03 from "./src/InterpolateColor03";
import PinchGestureHandlerBasics04 from "./src/PinchGestureHandlerBasics04";
import DoubleTapGestureHandler05 from "./src/DoubleTapGestureHandler05";
import ScrollBehaviorWithPanGesture06 from "./src/ScrollBehaviorWithPanGesture06";
import ColorPicker07 from "./src/ColorPicker07";
import CircularProgressBar08 from "./src/CircularProgressBar08";
import SwipeToDelete09 from "./src/SwipeToDelete09";
import RippleEffect10 from "./src/RippleEffect10";
import MenuPerspective11 from "./src/MenuPerspective11";
import SlidingCounter12 from "./src/SlidingCounter12";
import ClockLoader13 from "./src/ClockLoader13";
import LayoutAnimations14 from "./src/LayoutAnimations14";
import AnimatedFlatList15 from "./src/AnimatedFlatList15";

const Stack = createNativeStackNavigator();

function DrawerNavigation(props) {
  const Drawer = createDrawerNavigator();

  return (
    <Drawer.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        unmountOnBlur: true,
      }}
    >
      <Drawer.Screen
        name="Home"
        options={({ route, navigation }) => ({
          headerShown: true,
        })}
        component={HomePage}
      />
      <Drawer.Screen
        name="IntroductionReanimated2"
        options={({ route, navigation }) => ({
          headerShown: true,
        })}
        component={IntroductionReanimated2}
      />
      <Drawer.Screen
        name="PanGestureHandlerBasics01"
        options={({ route, navigation }) => ({
          headerShown: true,
        })}
        component={PanGestureHandlerBasics01}
      />
      <Drawer.Screen
        name="InterpolateWithScrollView02"
        options={({ route, navigation }) => ({
          headerShown: true,
        })}
        component={InterpolateWithScrollView02}
      />
      <Drawer.Screen
        name="InterpolateColor03"
        options={({ route, navigation }) => ({
          headerShown: true,
        })}
        component={InterpolateColor03}
      />
      <Drawer.Screen
        name="PinchGestureHandlerBasics04"
        options={({ route, navigation }) => ({
          headerShown: true,
        })}
        component={PinchGestureHandlerBasics04}
      />
      <Drawer.Screen
        name="DoubleTapGestureHandler05"
        options={({ route, navigation }) => ({
          headerShown: true,
        })}
        component={DoubleTapGestureHandler05}
      />
      <Drawer.Screen
        name="ScrollBehaviorWithPanGesture06"
        options={({ route, navigation }) => ({
          headerShown: true,
        })}
        component={ScrollBehaviorWithPanGesture06}
      />
      <Drawer.Screen
        name="ColorPicker07"
        options={({ route, navigation }) => ({
          headerShown: true,
        })}
        component={ColorPicker07}
      />
      <Drawer.Screen
        name="CircularProgressBar08"
        options={({ route, navigation }) => ({
          headerShown: true,
        })}
        component={CircularProgressBar08}
      />
      <Drawer.Screen
        name="SwipeToDelete09"
        options={({ route, navigation }) => ({
          headerShown: true,
        })}
        component={SwipeToDelete09}
      />
      <Drawer.Screen
        name="RippleEffect10"
        options={({ route, navigation }) => ({
          headerShown: true,
        })}
        component={RippleEffect10}
      />
      <Drawer.Screen
        name="MenuPerspective11"
        options={({ route, navigation }) => ({
          headerShown: true,
        })}
        component={MenuPerspective11}
      />
      <Drawer.Screen
        name="SlidingCounter12"
        options={({ route, navigation }) => ({
          headerShown: true,
        })}
        component={SlidingCounter12}
      />
      <Drawer.Screen
        name="ClockLoader13"
        options={({ route, navigation }) => ({
          headerShown: true,
        })}
        component={ClockLoader13}
      />
      <Drawer.Screen
        name="LayoutAnimations14"
        options={({ route, navigation }) => ({
          headerShown: true,
        })}
        component={LayoutAnimations14}
      />
      <Drawer.Screen
        name="AnimatedFlatList15"
        options={({ route, navigation }) => ({
          headerShown: true,
        })}
        component={AnimatedFlatList15}
      />
    </Drawer.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Drawer"
        screenOptions={() => ({
          headerTransparent: true,
        })}
      >
        <Stack.Screen
          name="Drawer"
          options={({ route, navigation }) => ({
            headerShown: false,
            title: "Drawer",
          })}
        >
          {() => <DrawerNavigation />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
