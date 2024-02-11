import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "./src/screens/LoginScreen";
import SignupScreen from "./src/screens/SignupScreen";
import HomeScreen from "./src/screens/HomeScreen";
import HydrationScreen from "./src/screens/HydrationScreen";
import SleepScreen from "./src/screens/SleepScreen";
import ExerciseScreen from "./src/screens/ExerciseScreen";

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Signup" component={SignupScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
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