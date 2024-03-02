import React from "react";
import { View, Text, SafeAreaView, Button } from "react-native";

const AboutScreen = ({ navigation }) => {
  return (
    <View>
      <SafeAreaView>
        <Text>About Screen</Text>
      </SafeAreaView>
      <Button title="Go Back" onPress={() => navigation.navigate("Settings")}></Button>
      <Text>Health20 is a wellness advisor app.</Text>
      <Text>
        Our goal is to create an application that focuses on three important wellness categories: exercise, sleep, and hydration. Poor sleep, inadequate hydration, and lack of physical activity can
        lead to a range of health issues. Thus, we recognize a need for a comprehensive solution that will address these crucial lifestyle factors and encourage users to make positive choices for
        their well-being.
      </Text>
    </View>
  );
};

export default AboutScreen;
