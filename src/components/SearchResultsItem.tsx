import { StyleSheet, TouchableHighlight } from "react-native";

import {
  getArtistRecommendations,
  getTracksRecommendations,
} from "../services/LastFMAPIProvider";
import { LastFMSearchObject } from "../types/types";
import { Text, View } from "./Themed";
import { useRecommendationsContext } from "../hooks/useRecommendationsContext";

export default function SearchResultsItem({
  item,
}: {
  item: LastFMSearchObject;
}) {
  const { setRecommendations } = useRecommendationsContext();

  const onItemPress =
    item.type === "artist"
      ? getArtistRecommendations
      : getTracksRecommendations;

  return (
    <View>
      <TouchableHighlight onPress={() => onItemPress(item, setRecommendations)}>
        <View style={styles.item}>
          <Text style={styles.title}>{item.name}</Text>
          {item.artistName ? (
            <Text style={styles.artistName}>{item.artistName}</Text>
          ) : (
            <Text style={styles.artistPlaceholder}>Artist</Text>
          )}
        </View>
      </TouchableHighlight>
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: "#878787",
    borderRadius: 10,
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    marginTop: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    marginVertical: 5,
    color: "#FFFFFF",
  },
  artistName: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 5,
    color: "#FFFFFF",
  },
  artistPlaceholder: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 5,
    color: "#4D4D4D",
  },
});
