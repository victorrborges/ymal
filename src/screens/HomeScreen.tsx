import { useState, useEffect } from "react";
import { StyleSheet, TextInput, Pressable } from "react-native";
import { useForm } from "react-hook-form";
import { FontAwesome } from "@expo/vector-icons";

import { Text, View } from "../components/Themed";
import { RootStackScreenProps, FormObject } from "../types/types";
import { getSearchResults } from "../services/LastFMAPIProvider";
import SearchResultsList from "../components/SearchResultsList";
import RecommendationsList from "../components/RecommendationsList";
import { MyRecommendationsContext } from "../hooks/useRecommendationsContext";
import { motion, AnimatePresence } from "framer-motion";

export default function HomeScreen({
  navigation,
}: RootStackScreenProps<"Home">) {
  const [searchResults, setSearchResults] = useState();
  const { setValue, handleSubmit } = useForm();
  const [recommendations, setRecommendations] = useState();
  const [recommendation, setRecommendation] = useState();

  useEffect(() => {
    setRecommendations(undefined);
  }, [searchResults]);

  const onSubmit = (formData: object) => {
    const data = formData as FormObject;
    if (data?.search) {
      getSearchResults(data.search, setSearchResults);
    }
  };

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
        <View style={styles.textContainer}>
          <Text style={styles.title}>you like</Text>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              onChangeText={(text) => setValue("search", text)}
            />
            <Pressable
              onPress={handleSubmit(onSubmit)}
              style={styles.inputButton}
            >
              <FontAwesome
                name="search"
                size={30}
                style={{ color: "#FFFFFF" }}
              />
            </Pressable>
          </View>
        </View>

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
              <View style={styles.searchListContainer}>
                <SearchResultsList items={searchResults}></SearchResultsList>
              </View>
            </motion.div>
          )}
        </AnimatePresence>
        
        <View style={styles.textContainer}>
          <Text style={styles.title}>you might</Text>
          <Text style={styles.secondaryTitle}>also like</Text>
        </View>

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
              <View style={styles.resultsListContainer}>
                <RecommendationsList
                  items={recommendations}
                ></RecommendationsList>
              </View>
            </motion.div>
          )}
        </AnimatePresence>
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
  textContainer: {
    marginBottom: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
  },
  inputContainer: {
    flexDirection: "row",
  },
  input: {
    width: "85%",
    fontSize: 40,
    borderStyle: "solid",
    borderColor: "#FFFFFF",
    borderWidth: 2,
    borderRightWidth: 0,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    fontWeight: "bold",
    color: "#666666",
    paddingVertical: 5,
    paddingLeft: 10,
  },
  inputButton: {
    width: "15%",
    fontSize: 40,
    borderStyle: "solid",
    borderColor: "#FFFFFF",
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
    borderLeftWidth: 0,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    paddingRight: 10,
  },
  searchListContainer: {
    width: "100%",
  },
  resultsListContainer: {
    flexShrink: 1,
    width: "100%",
  },
  title: {
    fontSize: 40,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#FFFFFF",
  },
  secondaryTitle: {
    fontSize: 40,
    fontWeight: "bold",
    marginTop: -20,
    textAlign: "center",
    color: "#666666",
  },
});

const recommendationsForKyoto = [
  {
    name: "Chinese Satellite",
    playcount: 2428250,
    match: 1,
    url: "https://www.last.fm/music/Phoebe+Bridgers/_/Chinese+Satellite",
    streamable: {
      "#text": "0",
      fulltrack: "0",
    },
    artist: {
      name: "Phoebe Bridgers",
      url: "https://www.last.fm/music/Phoebe+Bridgers",
    },
    image: [
      {
        "#text":
          "https://lastfm.freetls.fastly.net/i/u/34s/2a96cbd8b46e442fc41c2b86b821562f.png",
        size: "small",
      },
      {
        "#text":
          "https://lastfm.freetls.fastly.net/i/u/64s/2a96cbd8b46e442fc41c2b86b821562f.png",
        size: "medium",
      },
      {
        "#text":
          "https://lastfm.freetls.fastly.net/i/u/174s/2a96cbd8b46e442fc41c2b86b821562f.png",
        size: "large",
      },
      {
        "#text":
          "https://lastfm.freetls.fastly.net/i/u/300x300/2a96cbd8b46e442fc41c2b86b821562f.png",
        size: "extralarge",
      },
      {
        "#text":
          "https://lastfm.freetls.fastly.net/i/u/300x300/2a96cbd8b46e442fc41c2b86b821562f.png",
        size: "mega",
      },
      {
        "#text":
          "https://lastfm.freetls.fastly.net/i/u/300x300/2a96cbd8b46e442fc41c2b86b821562f.png",
        size: "",
      },
    ],
  },
  {
    name: "Garden Song",
    playcount: 3961798,
    match: 0.989987,
    url: "https://www.last.fm/music/Phoebe+Bridgers/_/Garden+Song",
    streamable: {
      "#text": "0",
      fulltrack: "0",
    },
    artist: {
      name: "Phoebe Bridgers",
      url: "https://www.last.fm/music/Phoebe+Bridgers",
    },
    image: [
      {
        "#text":
          "https://lastfm.freetls.fastly.net/i/u/34s/2a96cbd8b46e442fc41c2b86b821562f.png",
        size: "small",
      },
      {
        "#text":
          "https://lastfm.freetls.fastly.net/i/u/64s/2a96cbd8b46e442fc41c2b86b821562f.png",
        size: "medium",
      },
      {
        "#text":
          "https://lastfm.freetls.fastly.net/i/u/174s/2a96cbd8b46e442fc41c2b86b821562f.png",
        size: "large",
      },
      {
        "#text":
          "https://lastfm.freetls.fastly.net/i/u/300x300/2a96cbd8b46e442fc41c2b86b821562f.png",
        size: "extralarge",
      },
      {
        "#text":
          "https://lastfm.freetls.fastly.net/i/u/300x300/2a96cbd8b46e442fc41c2b86b821562f.png",
        size: "mega",
      },
      {
        "#text":
          "https://lastfm.freetls.fastly.net/i/u/300x300/2a96cbd8b46e442fc41c2b86b821562f.png",
        size: "",
      },
    ],
  },
  {
    name: "Night Shift",
    playcount: 1667310,
    match: 0.289507,
    url: "https://www.last.fm/music/Lucy+Dacus/_/Night+Shift",
    streamable: {
      "#text": "0",
      fulltrack: "0",
    },
    artist: {
      name: "Lucy Dacus",
      url: "https://www.last.fm/music/Lucy+Dacus",
    },
    image: [
      {
        "#text":
          "https://lastfm.freetls.fastly.net/i/u/34s/2a96cbd8b46e442fc41c2b86b821562f.png",
        size: "small",
      },
      {
        "#text":
          "https://lastfm.freetls.fastly.net/i/u/64s/2a96cbd8b46e442fc41c2b86b821562f.png",
        size: "medium",
      },
      {
        "#text":
          "https://lastfm.freetls.fastly.net/i/u/174s/2a96cbd8b46e442fc41c2b86b821562f.png",
        size: "large",
      },
      {
        "#text":
          "https://lastfm.freetls.fastly.net/i/u/300x300/2a96cbd8b46e442fc41c2b86b821562f.png",
        size: "extralarge",
      },
      {
        "#text":
          "https://lastfm.freetls.fastly.net/i/u/300x300/2a96cbd8b46e442fc41c2b86b821562f.png",
        size: "mega",
      },
      {
        "#text":
          "https://lastfm.freetls.fastly.net/i/u/300x300/2a96cbd8b46e442fc41c2b86b821562f.png",
        size: "",
      },
    ],
  },
  {
    name: "First Love / Late Spring",
    playcount: 4856222,
    mbid: "0fccbc82-2cdc-42b6-a403-1d134f06fb78",
    match: 0.257328,
    url: "https://www.last.fm/music/Mitski/_/First+Love+%2F+Late+Spring",
    streamable: {
      "#text": "0",
      fulltrack: "0",
    },
    duration: 278,
    artist: {
      name: "Mitski",
      mbid: "fa58cf24-0e44-421d-8519-8bf461dcfaa5",
      url: "https://www.last.fm/music/Mitski",
    },
    image: [
      {
        "#text":
          "https://lastfm.freetls.fastly.net/i/u/34s/2a96cbd8b46e442fc41c2b86b821562f.png",
        size: "small",
      },
      {
        "#text":
          "https://lastfm.freetls.fastly.net/i/u/64s/2a96cbd8b46e442fc41c2b86b821562f.png",
        size: "medium",
      },
      {
        "#text":
          "https://lastfm.freetls.fastly.net/i/u/174s/2a96cbd8b46e442fc41c2b86b821562f.png",
        size: "large",
      },
      {
        "#text":
          "https://lastfm.freetls.fastly.net/i/u/300x300/2a96cbd8b46e442fc41c2b86b821562f.png",
        size: "extralarge",
      },
      {
        "#text":
          "https://lastfm.freetls.fastly.net/i/u/300x300/2a96cbd8b46e442fc41c2b86b821562f.png",
        size: "mega",
      },
      {
        "#text":
          "https://lastfm.freetls.fastly.net/i/u/300x300/2a96cbd8b46e442fc41c2b86b821562f.png",
        size: "",
      },
    ],
  },
  {
    name: "Pristine",
    playcount: 1600963,
    match: 0.224135,
    url: "https://www.last.fm/music/Snail+Mail/_/Pristine",
    streamable: {
      "#text": "0",
      fulltrack: "0",
    },
    artist: {
      name: "Snail Mail",
      mbid: "86cd4d38-857c-42bd-a5da-9acedcab1e01",
      url: "https://www.last.fm/music/Snail+Mail",
    },
    image: [
      {
        "#text":
          "https://lastfm.freetls.fastly.net/i/u/34s/2a96cbd8b46e442fc41c2b86b821562f.png",
        size: "small",
      },
      {
        "#text":
          "https://lastfm.freetls.fastly.net/i/u/64s/2a96cbd8b46e442fc41c2b86b821562f.png",
        size: "medium",
      },
      {
        "#text":
          "https://lastfm.freetls.fastly.net/i/u/174s/2a96cbd8b46e442fc41c2b86b821562f.png",
        size: "large",
      },
      {
        "#text":
          "https://lastfm.freetls.fastly.net/i/u/300x300/2a96cbd8b46e442fc41c2b86b821562f.png",
        size: "extralarge",
      },
      {
        "#text":
          "https://lastfm.freetls.fastly.net/i/u/300x300/2a96cbd8b46e442fc41c2b86b821562f.png",
        size: "mega",
      },
      {
        "#text":
          "https://lastfm.freetls.fastly.net/i/u/300x300/2a96cbd8b46e442fc41c2b86b821562f.png",
        size: "",
      },
    ],
  },
  {
    name: "The Steps",
    playcount: 1123296,
    match: 0.209494,
    url: "https://www.last.fm/music/HAIM/_/The+Steps",
    streamable: {
      "#text": "0",
      fulltrack: "0",
    },
    artist: {
      name: "HAIM",
      mbid: "aef06569-098f-4218-a577-b413944d9493",
      url: "https://www.last.fm/music/HAIM",
    },
    image: [
      {
        "#text":
          "https://lastfm.freetls.fastly.net/i/u/34s/2a96cbd8b46e442fc41c2b86b821562f.png",
        size: "small",
      },
      {
        "#text":
          "https://lastfm.freetls.fastly.net/i/u/64s/2a96cbd8b46e442fc41c2b86b821562f.png",
        size: "medium",
      },
      {
        "#text":
          "https://lastfm.freetls.fastly.net/i/u/174s/2a96cbd8b46e442fc41c2b86b821562f.png",
        size: "large",
      },
      {
        "#text":
          "https://lastfm.freetls.fastly.net/i/u/300x300/2a96cbd8b46e442fc41c2b86b821562f.png",
        size: "extralarge",
      },
      {
        "#text":
          "https://lastfm.freetls.fastly.net/i/u/300x300/2a96cbd8b46e442fc41c2b86b821562f.png",
        size: "mega",
      },
      {
        "#text":
          "https://lastfm.freetls.fastly.net/i/u/300x300/2a96cbd8b46e442fc41c2b86b821562f.png",
        size: "",
      },
    ],
  },
  {
    name: "Heat Wave",
    playcount: 1317553,
    match: 0.187655,
    url: "https://www.last.fm/music/Snail+Mail/_/Heat+Wave",
    streamable: {
      "#text": "0",
      fulltrack: "0",
    },
    artist: {
      name: "Snail Mail",
      mbid: "86cd4d38-857c-42bd-a5da-9acedcab1e01",
      url: "https://www.last.fm/music/Snail+Mail",
    },
    image: [
      {
        "#text":
          "https://lastfm.freetls.fastly.net/i/u/34s/2a96cbd8b46e442fc41c2b86b821562f.png",
        size: "small",
      },
      {
        "#text":
          "https://lastfm.freetls.fastly.net/i/u/64s/2a96cbd8b46e442fc41c2b86b821562f.png",
        size: "medium",
      },
      {
        "#text":
          "https://lastfm.freetls.fastly.net/i/u/174s/2a96cbd8b46e442fc41c2b86b821562f.png",
        size: "large",
      },
      {
        "#text":
          "https://lastfm.freetls.fastly.net/i/u/300x300/2a96cbd8b46e442fc41c2b86b821562f.png",
        size: "extralarge",
      },
      {
        "#text":
          "https://lastfm.freetls.fastly.net/i/u/300x300/2a96cbd8b46e442fc41c2b86b821562f.png",
        size: "mega",
      },
      {
        "#text":
          "https://lastfm.freetls.fastly.net/i/u/300x300/2a96cbd8b46e442fc41c2b86b821562f.png",
        size: "",
      },
    ],
  },
  {
    name: "My Body's Made of Crushed Little Stars",
    playcount: 990766,
    match: 0.183952,
    url: "https://www.last.fm/music/Mitski/_/My+Body%27s+Made+of+Crushed+Little+Stars",
    streamable: {
      "#text": "0",
      fulltrack: "0",
    },
    artist: {
      name: "Mitski",
      mbid: "fa58cf24-0e44-421d-8519-8bf461dcfaa5",
      url: "https://www.last.fm/music/Mitski",
    },
    image: [
      {
        "#text":
          "https://lastfm.freetls.fastly.net/i/u/34s/2a96cbd8b46e442fc41c2b86b821562f.png",
        size: "small",
      },
      {
        "#text":
          "https://lastfm.freetls.fastly.net/i/u/64s/2a96cbd8b46e442fc41c2b86b821562f.png",
        size: "medium",
      },
      {
        "#text":
          "https://lastfm.freetls.fastly.net/i/u/174s/2a96cbd8b46e442fc41c2b86b821562f.png",
        size: "large",
      },
      {
        "#text":
          "https://lastfm.freetls.fastly.net/i/u/300x300/2a96cbd8b46e442fc41c2b86b821562f.png",
        size: "extralarge",
      },
      {
        "#text":
          "https://lastfm.freetls.fastly.net/i/u/300x300/2a96cbd8b46e442fc41c2b86b821562f.png",
        size: "mega",
      },
      {
        "#text":
          "https://lastfm.freetls.fastly.net/i/u/300x300/2a96cbd8b46e442fc41c2b86b821562f.png",
        size: "",
      },
    ],
  },
  {
    name: "Pay Your Way In Pain",
    playcount: 657551,
    match: 0.155392,
    url: "https://www.last.fm/music/St.+Vincent/_/Pay+Your+Way+In+Pain",
    streamable: {
      "#text": "0",
      fulltrack: "0",
    },
    artist: {
      name: "St. Vincent",
      mbid: "5334edc0-5faf-4ca5-b1df-000de3e1f752",
      url: "https://www.last.fm/music/St.+Vincent",
    },
    image: [
      {
        "#text":
          "https://lastfm.freetls.fastly.net/i/u/34s/2a96cbd8b46e442fc41c2b86b821562f.png",
        size: "small",
      },
      {
        "#text":
          "https://lastfm.freetls.fastly.net/i/u/64s/2a96cbd8b46e442fc41c2b86b821562f.png",
        size: "medium",
      },
      {
        "#text":
          "https://lastfm.freetls.fastly.net/i/u/174s/2a96cbd8b46e442fc41c2b86b821562f.png",
        size: "large",
      },
      {
        "#text":
          "https://lastfm.freetls.fastly.net/i/u/300x300/2a96cbd8b46e442fc41c2b86b821562f.png",
        size: "extralarge",
      },
      {
        "#text":
          "https://lastfm.freetls.fastly.net/i/u/300x300/2a96cbd8b46e442fc41c2b86b821562f.png",
        size: "mega",
      },
      {
        "#text":
          "https://lastfm.freetls.fastly.net/i/u/300x300/2a96cbd8b46e442fc41c2b86b821562f.png",
        size: "",
      },
    ],
  },
  {
    name: "Paul",
    playcount: 1674759,
    match: 0.151023,
    url: "https://www.last.fm/music/Big+Thief/_/Paul",
    streamable: {
      "#text": "0",
      fulltrack: "0",
    },
    artist: {
      name: "Big Thief",
      url: "https://www.last.fm/music/Big+Thief",
    },
    image: [
      {
        "#text":
          "https://lastfm.freetls.fastly.net/i/u/34s/2a96cbd8b46e442fc41c2b86b821562f.png",
        size: "small",
      },
      {
        "#text":
          "https://lastfm.freetls.fastly.net/i/u/64s/2a96cbd8b46e442fc41c2b86b821562f.png",
        size: "medium",
      },
      {
        "#text":
          "https://lastfm.freetls.fastly.net/i/u/174s/2a96cbd8b46e442fc41c2b86b821562f.png",
        size: "large",
      },
      {
        "#text":
          "https://lastfm.freetls.fastly.net/i/u/300x300/2a96cbd8b46e442fc41c2b86b821562f.png",
        size: "extralarge",
      },
      {
        "#text":
          "https://lastfm.freetls.fastly.net/i/u/300x300/2a96cbd8b46e442fc41c2b86b821562f.png",
        size: "mega",
      },
      {
        "#text":
          "https://lastfm.freetls.fastly.net/i/u/300x300/2a96cbd8b46e442fc41c2b86b821562f.png",
        size: "",
      },
    ],
  },
];
