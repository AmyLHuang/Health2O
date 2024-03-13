import { NavigationContainer } from "@react-navigation/native";
import AuthStackNavigator from "./src/navigation/Navigation";

const App = () => {
  return (
    <NavigationContainer>
      <AuthStackNavigator />
    </NavigationContainer>
  );
};

export default App;
