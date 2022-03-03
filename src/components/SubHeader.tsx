import { StyleSheet } from "react-native";
import { Text, View } from "../components/Themed";

export default function SubHeader() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>you might</Text>
      <Text style={styles.secondaryTitle}>also like</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
  },
  title: {
    fontSize: 45,
    fontWeight: "bold",
    textAlign: "center",
    color: "#FFFFFF",
  },
  secondaryTitle: {
    fontSize: 45,
    fontWeight: "bold",
    textAlign: "center",
    color: "#666666",
  },
});
