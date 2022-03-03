import { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import RecommendationsList from "../components/RecommendationsList";
import SearchForm from "../components/SearchForm";
import SearchResultsList from "../components/SearchResultsList";
import SubHeader from "../components/SubHeader";
import { View } from "../components/Themed";
import { MyRecommendationsContext } from "../hooks/useRecommendationsContext";
import { MySearchResultsContext } from "../hooks/useSearchResultsContext";
import { RootStackScreenProps } from "../types/types";

export default function HomeScreen({}: RootStackScreenProps<"Home">) {
  const [searchResults, setSearchResults] = useState();
  const [recommendations, setRecommendations] = useState();
  const [recommendation, setRecommendation] = useState();

  useEffect(() => {
    setRecommendations(undefined);
  }, [searchResults]);

  return (
    <MyRecommendationsContext.Provider
      value={{
        recommendations,
        setRecommendations,
        recommendation,
        setRecommendation,
      }}
    >
      <View style={styles.container}>
        <MySearchResultsContext.Provider
          value={{
            searchResults,
            setSearchResults,
          }}
        >
          <SearchForm />

          <SearchResultsList />
        </MySearchResultsContext.Provider>

        <SubHeader />

        <RecommendationsList />
      </View>
    </MyRecommendationsContext.Provider>
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
