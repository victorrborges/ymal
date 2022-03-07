import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { FlatList, SafeAreaView, StyleSheet } from "react-native";
import { useRecommendations } from "../hooks/useRecommendations";
import { MyRecommendation } from "../hooks/useRecommendation";
import { RecommendationObject } from "../types/types";
import RecommendationsItem from "./RecommendationsItem";
import { View } from "./Themed";

export default function RecommendationsList() {
  const { recommendations } = useRecommendations();
  const [recommendation, setRecommendation] = useState();

  useEffect(() => setRecommendation(undefined), [recommendations]);

  const renderItem = ({ item }: { item: RecommendationObject }) => (
    <RecommendationsItem item={item} />
  );

  return (
    <MyRecommendation.Provider
      value={{
        recommendation,
        setRecommendation,
      }}
    >
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
                  keyExtractor={(item, index) => `${index}-${item.url}`}
                  showsVerticalScrollIndicator={false}
                  contentContainerStyle={{ paddingBottom: 20 }}
                  style={{ width: "100%" }}
                />
              </SafeAreaView>
            </View>
          </motion.div>
        )}
      </AnimatePresence>
    </MyRecommendation.Provider>
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
