import { motion } from "framer-motion";
import { useState } from "react";
import { FlatList, Pressable, SafeAreaView, StyleSheet } from "react-native";
import { useBookmarks } from "../hooks/useBookmarks";
import { FetchedBookmarks } from "../types/types";
import BookmarksItem from "./BookmarksItem";
import { View, Text } from "./Themed";

export default function Bookmarks() {
  const { bookmarks, isDrawerOpen, setIsDrawerOpen } = useBookmarks();
  const [openedItem, setOpenedItem] = useState();

  const renderItem = ({ item }: { item: FetchedBookmarks }) => (
    <BookmarksItem
      item={item.bookmark}
      openedItem={openedItem}
      setOpenedItem={setOpenedItem}
    />
  );

  return (
    <>
      <motion.div
        className="drawer-background"
        key="drawer-background"
        initial="collapsed"
        animate={isDrawerOpen ? "open" : "collapsed"}
        exit="collapsed"
        variants={{
          open: {
            height: "97%",
            transition: { duration: 1, ease: [0.04, 0.62, 0.23, 0.98] },
          },
          collapsed: {
            height: "40px",
            overflow: "hidden",
            transition: { duration: 1, ease: [0.04, 0.62, 0.23, 0.98] },
          },
        }}
      ></motion.div>
      <motion.div
        className="drawer"
        key="drawer"
        initial="collapsed"
        animate={isDrawerOpen ? "open" : "collapsed"}
        exit="collapsed"
        variants={{
          open: {
            height: "80%",
            overflowY: "scroll",
            transition: { duration: 1, ease: [0.04, 0.62, 0.23, 0.98] },
          },
          collapsed: {
            height: "40px",
            overflowY: "hidden",
            transition: { duration: 1, ease: [0.04, 0.62, 0.23, 0.98] },
          },
        }}
      >
        <View style={styles.container}>
          <Pressable
            onPress={() => setIsDrawerOpen(!isDrawerOpen)}
            style={styles.header}
          ></Pressable>
          <Text
            onPress={() => setIsDrawerOpen(!isDrawerOpen)}
            style={styles.title}
          >
            bookmarks
          </Text>
          <SafeAreaView style={styles.list}>
            <FlatList
              horizontal={false}
              data={bookmarks}
              renderItem={renderItem}
              keyExtractor={(item, index) => `${index}-${item.bookmark.url}`}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ paddingBottom: 20 }}
              style={{ width: "100%" }}
            />
          </SafeAreaView>
        </View>
      </motion.div>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flexShrink: 1,
    width: "100%",
    flex: 1,
    alignItems: "center",
    backgroundColor: "transparent",
    overflow: "visible",
  },
  list: {
    width: "90%",
    flex: 1,
    flexWrap: "wrap",
    alignContent: "flex-start",
    overflow: "visible",
  },
  header: {
    height: "40px",
    width: "100%",
  },
  title: {
    marginVertical: 10,
    fontSize: 40,
    fontWeight: "bold",
    textAlign: "center",
    color: "#FFFFFF",
  },
});
