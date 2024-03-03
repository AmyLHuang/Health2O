import React from "react";
import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity, Switch } from "react-native";
import { signOut } from "firebase/auth";
import { auth } from "../../FirebaseConfig";
import { MaterialIcons } from '@expo/vector-icons'; 

const SettingsScreen = ({ navigation }) => {
  const [isEnabled, setIsEnabled] = React.useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      navigation.navigate("Login");
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Settings</Text>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Account</Text>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("EditProfile")}>
          <MaterialIcons name="person" size={24} color="black" />
          <Text style={styles.buttonText}>Edit Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("ChangePassword")}>
          <MaterialIcons name="lock" size={24} color="black" />
          <Text style={styles.buttonText}>Change Password</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleSignOut}>
          <MaterialIcons name="logout" size={24} color="black" />
          <Text style={styles.buttonText}>Sign Out</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Preferences</Text>
        <View style={styles.switchRow}>
          <Text style={styles.switchText}>Enable Notifications</Text>
          <Switch
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
            onValueChange={toggleSwitch}
            value={isEnabled}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f2f2",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#EC268F",
    marginTop: 15,
    marginBottom: 30,
    textAlign: "center",
  },
  section: {
    marginBottom: 30,
    paddingHorizontal: 12,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#FFF',
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: {
    marginLeft: 10,
    fontSize: 18,
    color: '#333',
  },
  switchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#FFF',
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
   shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  switchText: {
    fontSize: 18,
    color: '#333',
  },
});

export default SettingsScreen;
