import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import SplashScreen from "../screens/SplashScreen";
import LoginScreen from "../screens/LoginScreen";
import SignupScreen from "../screens/SignupScreen";
import CreateProfileScreen from "../screens/CreateProfileScreen";
import HomeScreen from "../screens/HomeScreen";
import HydrationScreen from "../screens/HydrationScreen";
import SleepScreen from "../screens/SleepScreen";
import ExerciseScreen from "../screens/ExerciseScreen";
import SettingsScreen from "../screens/SettingsScreen";
import EditProfileScreen from "../screens/EditProfileScreen";
import AboutScreen from "../screens/AboutScreen";
import ChangePasswordScreen from "../screens/ChangePasswordScreen";

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
    <AuthStack.Screen name="CreateProfile" component={CreateProfileScreen} />
    <AuthStack.Screen name="Home" component={MainTabNavigator} />
  </AuthStack.Navigator>
);

const SettingsStackNavigator = () => (
  <SettingsStack.Navigator screenOptions={options}>
    <SettingsStack.Screen name="Settings" component={SettingsScreen} />
    <SettingsStack.Screen name="EditProfile" component={EditProfileScreen} />
    <SettingsStack.Screen name="About" component={AboutScreen} />
    <SettingsStack.Screen name="ChangePassword" component={ChangePasswordScreen} />
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
        unmountOnBlur: true,
      }}
    />
    <MainTabStack.Screen
      name="Sleep"
      component={SleepScreen}
      options={{
        tabBarLabel: "Sleep",
        tabBarIcon: ({ color, size }) => <Ionicons name="bed" size={size} color={color} />,
        unmountOnBlur: true,
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

export default AuthStackNavigator;
