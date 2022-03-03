import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { StyleSheet, TouchableHighlight } from "react-native";
import { useRecommendationsContext } from "../hooks/useRecommendationsContext";
import { RecommendationObject } from "../types/types";
import { Text, View } from "./Themed";

export default function RecommendationsItem({
  item,
}: {
  item: RecommendationObject;
}) {
  const { recommendation, setRecommendation } = useRecommendationsContext();
  const [expanded, setExpanded] = useState(recommendation?.url === item.url);

  useEffect(
    () => setExpanded(recommendation?.url === item.url),
    [recommendation]
  );

  return (
    <TouchableHighlight
      style={styles.item}
      onPress={() =>
        expanded ? setRecommendation(undefined) : setRecommendation(item)
      }
    >
      <>
        <motion.header
          initial={false}
          animate={{ backgroundColor: expanded ? "#E0E0E0" : "#878787" }}
        >
          <Text style={styles.title}>{item.name}</Text>
          {item.artist ? (
            <Text style={styles.artistName}>{item.artist.name}</Text>
          ) : (
            <Text style={styles.artistPlaceholder}>Artist</Text>
          )}
        </motion.header>
        <AnimatePresence initial={false}>
          {expanded && (
            <motion.section
              key="content"
              initial="collapsed"
              animate="open"
              exit="collapsed"
              variants={{
                open: { opacity: 1, height: "auto" },
                collapsed: { opacity: 0, height: 0 },
              }}
              transition={{ duration: 0.8, ease: [0.04, 0.62, 0.23, 0.98] }}
            >
              <View style={styles.content}>
                <Text style={styles.title}>{item.name}</Text>
                <Text style={styles.title}>{item.name}</Text>
                <Text style={styles.title}>{item.name}</Text>
                {item.artist ? (
                  <Text style={styles.artistName}>{item.artist.name}</Text>
                ) : (
                  <Text style={styles.artistPlaceholder}>Artist</Text>
                )}
              </View>
            </motion.section>
          )}
        </AnimatePresence>
      </>
    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({
  item: {
    position: "relative",
    width: "100%",
  },
  content: {
    paddingVertical: 20,
    backgroundColor: "transparent"
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
