import { View, Text, StyleSheet } from "react-native";

const RecommendationBox = ({ color, children }) => (
  <View style={styles.recommendBox}>
    <Text style={styles.recommendTitle}>Recommendation</Text>
    <View style={[styles.recommendTextBox, { backgroundColor: color }]}>
      <Text style={styles.recommendText}>{children}</Text>
    </View>
  </View>
);

export default RecommendationBox;

const styles = StyleSheet.create({
  recommendBox: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    margin: 20,
    padding: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
  },
  recommendTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#324A60",
    marginBottom: 10,
  },
  recommendTextBox: {
    backgroundColor: "#CCE0E9",
    borderRadius: 12,
    padding: 10,
  },
  recommendText: {
    fontSize: 16,
    color: "black",
  },
});
