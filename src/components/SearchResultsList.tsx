import { StyleSheet, SafeAreaView, FlatList } from "react-native";

import { LastFMSearchObject } from "../types/types";
import { View } from "./Themed";
import SearchResultsItem from "./SearchResultsItem";

export default function SearchResultsList({
  items
}: {
  items: LastFMSearchObject[];
}) {

  const renderItem = ({ item }: { item: LastFMSearchObject }) => (
    <SearchResultsItem item={item} />
  );

  return (
    <View style={styles.container}>
      {items ? (
        <SafeAreaView style={styles.list}>
          <FlatList
            horizontal={true}
            data={items}
            renderItem={renderItem}
            keyExtractor={(item, index) => `${item.type}-${item.name}-${index}`}
            showsHorizontalScrollIndicator={false}
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
    marginBottom: 20
  },
  list: {
    width: "100%"
  },
});
