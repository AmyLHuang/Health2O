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
import EditProfileScreen from "./src/screens/EditProfileScreen";
import AboutScreen from "./src/screens/AboutScreen";

const options = {
  gestureEnabled: false,
  headerShown: false,
};

const AuthStack = createStackNavigator();
const MainTabStack = createBottomTabNavigator();
const SettingsStack = createStackNavigator();

const AuthStackNavigator = () => (
  <AuthStack.Navigator screenOptions={options} initialRouteName="Splash">
    <AuthStack.Screen name="Splash" component={SplashScreen} />
    <AuthStack.Screen name="Login" component={LoginScreen} />
    <AuthStack.Screen name="Signup" component={SignupScreen} />
    <AuthStack.Screen name="NewUserInfo" component={NewUserInfoScreen} />
    <AuthStack.Screen name="Home" component={MainTabNavigator} />
  </AuthStack.Navigator>
);

const SettingsStackNavigator = () => (
  <SettingsStack.Navigator screenOptions={options}>
    <SettingsStack.Screen name="Settings" component={SettingsScreen} />
    <SettingsStack.Screen name="EditProfile" component={EditProfileScreen} />
    <SettingsStack.Screen name="About" component={AboutScreen} />
  </SettingsStack.Navigator>
);

const MainTabNavigator = () => (
  <MainTabStack.Navigator screenOptions={options}>
    <MainTabStack.Screen
      name="HomeTab"
      component={HomeScreen}
      options={{
        tabBarLabel: "Home",
        tabBarIcon: ({ color, size }) => <Ionicons name="home" size={size} color={color} />,
      }}
    />
    <MainTabStack.Screen
      name="Sleep"
      component={SleepScreen}
      options={{
        tabBarLabel: "Sleep",
        tabBarIcon: ({ color, size }) => <Ionicons name="bed" size={size} color={color} />,
      }}
    />
    <MainTabStack.Screen
      name="Hydration"
      component={HydrationScreen}
      options={{
        tabBarLabel: "Hydrate",
        tabBarIcon: ({ color, size }) => <Ionicons name="water" size={size} color={color} />,
      }}
    />
    <MainTabStack.Screen
      name="Exercise"
      component={ExerciseScreen}
      options={{
        tabBarLabel: "Exercise",
        tabBarIcon: ({ color, size }) => <Ionicons name="footsteps" size={size} color={color} />,
      }}
    />
    <MainTabStack.Screen
      name="SettingsTab"
      component={SettingsStackNavigator}
      options={{
        tabBarLabel: "Settings",
        tabBarIcon: ({ color, size }) => <Ionicons name="settings" size={size} color={color} />,
      }}
    />
  </MainTabStack.Navigator>
);

const App = () => {
  return (
    <NavigationContainer>
      <AuthStackNavigator />
    </NavigationContainer>
  );
};

export default App;
