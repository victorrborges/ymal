import { StyleSheet, SafeAreaView, FlatList, TouchableHighlight } from "react-native";

import { RecommendationObject } from "../types/types";
import { View } from "./Themed";
import RecommendationsItem from "./RecommendationsItem";

export default function RecommendationsList({
  items,
}: {
  items: RecommendationObject[];
}) {
  const renderItem = ({ item }: { item: RecommendationObject }) => (
    <RecommendationsItem item={item} />
  );

  return (
    <View style={styles.container}>
      {items ? (
        <SafeAreaView style={styles.list}>
          <FlatList
            horizontal={false}
            data={items}
            renderItem={renderItem}
            keyExtractor={(item, index) => `${index}`}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 20 }}
            style={{width: "100%"}}
          />
        </SafeAreaView>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  list: {
    width: "100%",
    flex: 1,
    flexWrap: "wrap",
    alignContent: "flex-start"
  },
});
