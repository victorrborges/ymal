import { Image, StyleSheet } from "react-native";
import { Text, View } from "../components/Themed";
import { InfoObject } from "../types/types";

export default function TrackItem({
  item,
  image,
}: {
  item: InfoObject;
  image: string | undefined;
}) {
  return (
    <View style={styles.content}>
      {image && <Image style={styles.image} source={{ uri: image }}></Image>}

      <Text style={styles.title}>{item.albumName}</Text>
      <Text style={styles.subtitle}>Album</Text>
      <Text style={styles.title}>{item.listeners}</Text>
      <Text style={styles.subtitle}>Listeners</Text>
      <View style={styles.tags}>
        {item.tags.map((tag) => (
          <Text key={tag} style={styles.tag}>
            {tag}
          </Text>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingBottom: 20,
    backgroundColor: "transparent",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    marginVertical: 5,
    color: "#000000",
  },
  subtitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#666666",
    marginBottom: 15,
  },
  image: {
    width: "auto",
    height: "80vw",
    borderRadius: 10,
    marginTop: 5,
    marginBottom: 20,
  },
  tags: {
    display: "flex",
    backgroundColor: "transparent",
    flexWrap: "wrap",
    flexDirection: "row",
    marginTop: 10,
  },
  tag: {
    borderRadius: 15,
    paddingVertical: 5,
    paddingHorizontal: 15,
    fontWeight: "bold",
    color: "#000000",
    backgroundColor: "#92AB9F",
    marginRight: 15,
    marginBottom: 10,
  },
});
