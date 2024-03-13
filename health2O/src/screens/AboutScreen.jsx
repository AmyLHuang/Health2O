import React from "react";
import { View, Text, SafeAreaView, TouchableOpacity, StyleSheet, ScrollView } from "react-native";

const AboutScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backButtonText}>← Go Back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>About Health20</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.subHeader}>Wellness Advisor App</Text>
        <Text style={styles.bodyText}>
          Health20 is a wellness advisor app focused on three essential wellness categories: exercise, sleep, and hydration. Our mission is to help users lead healthier lives by providing a
          comprehensive solution to manage and improve these critical areas.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.subHeader}>Our Philosophy</Text>
        <Text style={styles.bodyText}>
          We believe that a balanced approach to physical activity, rest, and hydration is key to maintaining optimal health. Health20 aims to empower you with knowledge, insights, and tools to make
          positive lifestyle changes that last.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.subHeader}>Join Us</Text>
        <Text style={styles.bodyText}>Start your journey towards a healthier life today. Let Health20 guide you through each step of the way. Together, we can build a happier, healthier future.</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  // backButton: {
  //   marginRight: 10,
  //   backgroundColor: "#EC268F",
  //   borderRadius: 20,
  //   width: 40,
  //   height: 40,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  // },
  // backButtonText: {
  //   color: "#ffffff",
  //   fontSize: 24,
  // },
  backButton: {
    alignSelf: "flex-start",
    marginBottom: 10,
    padding: 20,
  },
  backButtonText: {
    fontSize: 18,
    color: "#EC268F",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#EC268F",
    marginBottom: 20,
    textAlign: "center",
  },
  header: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333333",
  },
  section: {
    marginBottom: 30,
    marginHorizontal: 20,
  },
  subHeader: {
    fontSize: 22,
    fontWeight: "600",
    color: "#EC268F",
    marginBottom: 10,
  },
  bodyText: {
    fontSize: 16,
    lineHeight: 24,
    color: "#666666",
    textAlign: "justify",
  },
});

export default AboutScreen;
