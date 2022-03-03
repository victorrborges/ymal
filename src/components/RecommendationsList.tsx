import { AnimatePresence, motion } from "framer-motion";
import { FlatList, SafeAreaView, StyleSheet } from "react-native";
import { useRecommendationsContext } from "../hooks/useRecommendationsContext";
import { RecommendationObject } from "../types/types";
import RecommendationsItem from "./RecommendationsItem";
import { View } from "./Themed";

export default function RecommendationsList() {
  const { recommendations } = useRecommendationsContext();

  const renderItem = ({ item }: { item: RecommendationObject }) => (
    <RecommendationsItem item={item} />
  );

  return (
    <AnimatePresence exitBeforeEnter>
      {recommendations && (
        <motion.div
          className="motion-div-content"
          key="recommendations"
          initial="collapsed"
          animate="open"
          exit="collapsed"
          variants={{
            open: {
              opacity: 1,
              height: "600px",
              transition: { duration: 1, ease: [0.04, 0.62, 0.23, 0.98] },
            },
            collapsed: {
              opacity: 0,
              height: 0,
              transition: { duration: 1, ease: [0.04, 0.62, 0.23, 0.98] },
            },
          }}
        >
          <View style={styles.container}>
            <SafeAreaView style={styles.list}>
              <FlatList
                horizontal={false}
                data={recommendations}
                renderItem={renderItem}
                keyExtractor={(item, index) => `${index}`}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 20 }}
                style={{ width: "100%" }}
              />
            </SafeAreaView>
          </View>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

const styles = StyleSheet.create({
  container: {
    flexShrink: 1,
    width: "100%",
    flex: 1,
    alignItems: "center",
  },
  list: {
    width: "100%",
    flex: 1,
    flexWrap: "wrap",
    alignContent: "flex-start",
  },
});
