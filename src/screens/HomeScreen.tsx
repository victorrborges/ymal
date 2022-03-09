import { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import Bookmarks from "../components/Bookmarks";
import RecommendationsList from "../components/RecommendationsList";
import SearchSection from "../components/SearchSection";
import SubHeader from "../components/SubHeader";
import { View } from "../components/Themed";
import { MyAuthentication } from "../hooks/useAuth";
import { MyBookmarks } from "../hooks/useBookmarks";
import { MyRecommendations } from "../hooks/useRecommendations";
import { MySearchResults } from "../hooks/useSearchResults";
import { auth, getUserId } from "../services/AuthenticationProvider";
import { getBookmarks } from "../services/BookmarksProvider";
import { RootStackScreenProps } from "../types/types";

export default function HomeScreen({}: RootStackScreenProps<"Home">) {
  const [authenticated, setAuthenticated] = useState(false);
  const [userId, setUserId] = useState();

  const [searchResults, setSearchResults] = useState();
  const [recommendations, setRecommendations] = useState();

  const [bookmarks, setBookmarks] = useState();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  useEffect(() => {
    userId && getBookmarks(userId, setBookmarks);
  }, [userId]);

  useEffect(() => {
    authenticated && getUserId(setUserId);
  }, [authenticated]);

  useEffect(() => {
    auth(setAuthenticated);
  }, []);

  return (
    <MyAuthentication.Provider
      value={{
        authenticated,
        userId,
        setUserId,
      }}
    >
      <MySearchResults.Provider
        value={{
          searchResults,
          setSearchResults,
        }}
      >
        <MyRecommendations.Provider
          value={{
            recommendations,
            setRecommendations,
          }}
        >
          <MyBookmarks.Provider
            value={{
              bookmarks,
              isDrawerOpen,
              setIsDrawerOpen,
            }}
          >
            <View style={styles.container}>
              <SearchSection />

              <SubHeader />
              <RecommendationsList />
              <Bookmarks />
            </View>
          </MyBookmarks.Provider>
        </MyRecommendations.Provider>
      </MySearchResults.Provider>
    </MyAuthentication.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 30,
    paddingHorizontal: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "black",
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: "100%",
  },
});
