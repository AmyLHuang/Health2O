import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import SplashScreen from "./src/screens/SplashScreen";
import LoginScreen from "./src/screens/LoginScreen";
import SignupScreen from "./src/screens/SignupScreen";
import NewUserInfoScreen from "./src/screens/NewUserInfoScreen";
import HomeScreen from "./src/screens/HomeScreen";
import HydrationScreen from "./src/screens/HydrationScreen";
import SleepScreen from "./src/screens/SleepScreen";
import ExerciseScreen from "./src/screens/ExerciseScreen";

const Stack = createStackNavigator();

const opt1 = {
  gestureEnabled: false,
  headerShown: true,
  headerLeft: () => <></>,
};

const opt2 = {
  gestureEnabled: false,
};

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash">
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen options={opt1} name="Login" component={LoginScreen} />
        <Stack.Screen options={opt1} name="Signup" component={SignupScreen} />
        <Stack.Screen name="NUI" component={NewUserInfoScreen} />
        <Stack.Screen options={opt2} name="Home" component={HomeScreen} />
        <Stack.Screen name="Hydrate" component={HydrationScreen} />
        <Stack.Screen name="Sleep" component={SleepScreen} />
        <Stack.Screen name="Exercise" component={ExerciseScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

// Note for future:
// to implement signout: import { getAuth, onAuthStateChanged, signOut } from '@firebase/auth';
// Citation: https://github.com/cebrailblox/firebase_auth_tutorial
