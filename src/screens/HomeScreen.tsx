import { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import RecommendationsList from "../components/RecommendationsList";
import SearchForm from "../components/SearchForm";
import SearchResultsList from "../components/SearchResultsList";
import SubHeader from "../components/SubHeader";
import { View } from "../components/Themed";
import { MyAuthentication } from "../hooks/useAuth";
import { MyRecommendations } from "../hooks/useRecommendations";
import { MySearchResults } from "../hooks/useSearchResults";
import { MyBookmarks } from "../hooks/useBookmarks";
import { RootStackScreenProps } from "../types/types";
import { auth, getUserId } from "../services/AuthenticationProvider";
import { getBookmarks } from "../services/BookmarksProvider";

export default function HomeScreen({}: RootStackScreenProps<"Home">) {
  const [authenticated, setAuthenticated] = useState(false);
  const [userId, setUserId] = useState();

  const [searchResults, setSearchResults] = useState();
  const [recommendations, setRecommendations] = useState();

  const [bookmarks, setBookmarks] = useState();

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
      <MyRecommendations.Provider
        value={{
          recommendations,
          setRecommendations,
        }}
      >
        <View style={styles.container}>
          <MySearchResults.Provider
            value={{
              searchResults,
              setSearchResults,
            }}
          >
            <SearchForm />

            <SearchResultsList />
          </MySearchResults.Provider>

          <SubHeader />

          <MyBookmarks.Provider
            value={{
              bookmarks,
            }}
          >
            <RecommendationsList />
          </MyBookmarks.Provider>
        </View>
      </MyRecommendations.Provider>
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
