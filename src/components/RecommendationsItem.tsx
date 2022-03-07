import { AnimatePresence, motion } from "framer-motion";
import { FontAwesome } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { Pressable, StyleSheet, TouchableHighlight } from "react-native";
import { useRecommendation } from "../hooks/useRecommendation";
import { addBookmark, deleteBookmark } from "../services/BookmarksProvider";
import { useAuthentication } from "../hooks/useAuth";
import { useBookmarks } from "../hooks/useBookmarks";
import {
  getArtistInfo,
  getArtistTopTrack,
  getTracksInfo,
} from "../services/LastFMAPIProvider";
import { InfoObject, RecommendationObject } from "../types/types";
import ArtistItem from "./ArtistItem";
import { Text, View } from "./Themed";
import TrackItem from "./TrackItem";

export default function RecommendationsItem({
  item,
}: {
  item: RecommendationObject;
}) {
  const { authenticated, userId } = useAuthentication();
  const { recommendation, setRecommendation } = useRecommendation();
  const { bookmarks } = useBookmarks();
  const [expanded, setExpanded] = useState(recommendation?.url === item.url);
  const [info, setInfo] = useState<InfoObject>();
  const [image, setImage] = useState<string>();
  const [topTrack, setTopTrack] = useState<InfoObject>();
  const [isBookmarked, setIsBookmarked] = useState<boolean>(false); 

  useEffect(() => {
    bookmarks && setIsBookmarked(bookmarks.map((b) => b.bookmark.url).includes(item.url))
  }, [bookmarks])

  const deleteBookmarkWrapper = () => {
    const bookmark = bookmarks?.find((b) => b.bookmark.url === item.url);
    deleteBookmark(bookmark?.id)
  }

  const fetchInfo = item.artist ? getTracksInfo : getArtistInfo;

  useEffect(() => {
    topTrack &&
      topTrack.images &&
      setImage(topTrack.images[topTrack.images.length - 1]);
  }, [topTrack]);

  useEffect(() => {
    info &&
      (info.type === "track"
        ? info.images && setImage(info.images[info.images.length - 1])
        : getArtistTopTrack(item, setTopTrack));
  }, [info]);

  useEffect(() => {
    expanded && fetchInfo(item, setInfo);
  }, [expanded]);

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
          animate={{
            backgroundColor: expanded ? "#E0E0E0" : "#878787",
            display: "flex",
          }}
        >
          <View style={styles.header}>
            <Text style={styles.title}>{item.name}</Text>
            {item.artist ? (
              <Text style={styles.artistName}>{item.artist.name}</Text>
            ) : (
              <Text style={styles.artistPlaceholder}>Artist</Text>
            )}
          </View>
          {authenticated && (
            <Pressable
              onPress={() => isBookmarked ? deleteBookmarkWrapper() : addBookmark(userId, item)}
              style={styles.button}
            >
              <FontAwesome name={isBookmarked ? "star" : "star-o"} size={25} />
            </Pressable>
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
                {info?.type === "track" ? (
                  <TrackItem item={info} image={image} />
                ) : info?.type === "artist" ? (
                  <>
                    <ArtistItem item={info} image={image} topTrack={topTrack} />
                  </>
                ) : null}
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
    backgroundColor: "transparent",
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
  header: {
    width: "88%",
    backgroundColor: "transparent",
  },
  button: {
    width: "12%",
    alignItems: "center",
    justifyContent: "center",
    paddingRight: 10,
  },
});
