import { FontAwesome } from "@expo/vector-icons";
import { useForm } from "react-hook-form";
import { Pressable, StyleSheet, TextInput } from "react-native";
import { useRecommendations } from "../hooks/useRecommendations";
import { useSearchResults } from "../hooks/useSearchResults";
import { getSearchResults } from "../services/LastFMAPIProvider";
import { FormObject } from "../types/types";
import { Text, View } from "./Themed";

export default function SearchForm() {
  const { setValue, handleSubmit } = useForm();
  const { setRecommendations } = useRecommendations();
  const { setSearchResults } = useSearchResults();

  const resetSystem = () => {
    setRecommendations(undefined),
    setSearchResults(undefined)
  };

  const onSubmit = (formData: object) => {
    const data = formData as FormObject;
    if (data?.search) {
      setSearchResults(undefined);
      setRecommendations(undefined);
      getSearchResults(data.search, setSearchResults);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title} onPress={() => resetSystem()}>
        you like
      </Text>

      <View style={styles.input}>
        <TextInput
          style={styles.text}
          onChangeText={(text) => setValue("search", text)}
        />
        <Pressable onPress={handleSubmit(onSubmit)} style={styles.button}>
          <FontAwesome name="search" size={30} style={{ color: "#FFFFFF" }} />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
  },
  title: {
    fontSize: 45,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#FFFFFF",
  },
  input: {
    flexDirection: "row",
  },
  text: {
    width: "85%",
    fontSize: 45,
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
  button: {
    width: "15%",
    fontSize: 45,
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
});
