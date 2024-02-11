import React, {useEffect} from "react";
import { StyleSheet, View, Text, Button, Image } from "react-native";

const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate("Login");
    }, 3000); // 3 seconds
    return () => clearTimeout(timer);
  }, []);

  return (
    
    <View style={styles.container}>
      <Image
        source={require("../../assets/health20.png")}
        style = {styles.logo}
      />
      <Text style={styles.slogan}>
        Rest, Hydrate, Elevate
      </Text>
      <Text style={styles.sloganDescription}>
        Sleep well, drink smart, and move your body for a healthier you!
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: "center",
    alignItems: "center",
  },
  logo: { 
    width: 300,
    height: 300,
    marginBottom: '5%', 
  },
  slogan: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    color: 'black'
  },
  sloganDescription: {
    fontSize: 16,
    fontStyle: 'italic',
    textAlign: "center",
    marginBottom: 30,
    color: "#EC268F", 
    paddingHorizontal: 10,

  },
});


export default SplashScreen;
