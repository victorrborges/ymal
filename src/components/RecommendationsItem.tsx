import { StyleSheet, TouchableHighlight } from "react-native";

import { RecommendationObject } from "../types/types";
import { Text, View } from "./Themed";
import { useRecommendationsContext } from "../hooks/useRecommendationsContext";

export default function RecommendationsItem({
  item,
}: {
  item: RecommendationObject;
}) {
  const { setRecommendation } = useRecommendationsContext();

  return (
    <TouchableHighlight onPress={() => setRecommendation(item)}>
      <View style={styles.item}>
        <Text style={styles.title}>{item.name}</Text>
        {item.artist ? (
          <Text style={styles.artistName}>{item.artist.name}</Text>
        ) : (
          <Text style={styles.artistPlaceholder}>Artist</Text>
        )}
      </View>
    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: "#E0E0E0",
    borderRadius: 10,
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    marginTop: 20,
    position: "relative"
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    marginVertical: 5,
    color: "#000000",
  },
  artistName: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 5,
    color: "#666666",
  },
  artistPlaceholder: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 5,
    color: "#666666",
  },
});
