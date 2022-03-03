import { AnimatePresence, motion } from "framer-motion";
import { FlatList, SafeAreaView, StyleSheet } from "react-native";
import { useRecommendationsContext } from "../hooks/useRecommendationsContext";
import { useSearchResultsContext } from "../hooks/useSearchResultsContext";
import { LastFMSearchObject } from "../types/types";
import SearchResultsItem from "./SearchResultsItem";
import { View } from "./Themed";

export default function SearchResultsList() {
  const renderItem = ({ item }: { item: LastFMSearchObject }) => (
    <SearchResultsItem item={item} />
  );

  const { recommendations } = useRecommendationsContext();
  const { searchResults } = useSearchResultsContext();

  return (
    <AnimatePresence exitBeforeEnter>
      {!recommendations && searchResults && (
        <motion.div
          className="motion-div"
          key="search-results"
          initial="collapsed"
          animate="open"
          exit="collapsed"
          variants={{
            open: {
              opacity: 1,
              height: "auto",
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
                horizontal={true}
                data={searchResults}
                renderItem={renderItem}
                keyExtractor={(item, index) =>
                  `${item.type}-${item.name}-${index}`
                }
                showsHorizontalScrollIndicator={false}
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
    flex: 1,
    alignItems: "center",
    marginBottom: 20,
    width: "100%",
  },
  list: {
    width: "100%",
  },
});
