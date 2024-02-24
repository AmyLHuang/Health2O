import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import SplashScreen from "./src/screens/SplashScreen";
import LoginScreen from "./src/screens/LoginScreen";
import SignupScreen from "./src/screens/SignupScreen";
import NewUserInfoScreen from "./src/screens/NewUserInfoScreen";
import HomeScreen from "./src/screens/HomeScreen";
import HydrationScreen from "./src/screens/HydrationScreen";
import SleepScreen from "./src/screens/SleepScreen";
import ExerciseScreen from "./src/screens/ExerciseScreen";
import SettingsScreen from "./src/screens/SettingsScreen";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const opt = {
  gestureEnabled: false,
  headerShown: false,
};

const HomeTabs = () => {
  return (
    <Tab.Navigator options={opt}>
      <Tab.Screen
        name="Home2"
        component={HomeScreen}
        options={{
          headerShown: false,
          gestureEnabled: false,
          tabBarLabel: "Home",
          tabBarIcon: ({ color, size }) => <Ionicons name="home" size={size} color={color} />,
        }}
      />
      <Tab.Screen
        name="Sleep"
        component={SleepScreen}
        options={{
          headerShown: false,
          gestureEnabled: false,
          tabBarLabel: "Sleep",
          tabBarIcon: ({ color, size }) => <Ionicons name="bed" size={size} color={color} />,
        }}
      />
      <Tab.Screen
        name="Hydration"
        component={HydrationScreen}
        options={{
          headerShown: false,
          gestureEnabled: false,
          tabBarLabel: "Hydrate",
          tabBarIcon: ({ color, size }) => <Ionicons name="water" size={size} color={color} />,
        }}
      />
      <Tab.Screen
        name="Exercise"
        component={ExerciseScreen}
        options={{
          headerShown: false,
          gestureEnabled: false,
          tabBarLabel: "Exercise",
          tabBarIcon: ({ color, size }) => <Ionicons name="footsteps" size={size} color={color} />,
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          headerShown: false,
          gestureEnabled: false,
          tabBarLabel: "Settings",
          tabBarIcon: ({ color, size }) => <Ionicons name="settings" size={size} color={color} />,
        }}
      />
    </Tab.Navigator>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash">
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen options={opt} name="Login" component={LoginScreen} />
        <Stack.Screen options={opt} name="Signup" component={SignupScreen} />
        <Stack.Screen options={opt} name="NewUserInfo" component={NewUserInfoScreen} />
        <Stack.Screen options={opt} name="Home" component={HomeTabs} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
