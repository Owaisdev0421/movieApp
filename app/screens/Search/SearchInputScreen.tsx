import AppWrapper from "@/app/components/core/AppWrapper";
import SearchBar from "@/app/components/ui/SearchBar";
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";

const SearchInputScreen = () => {
  const [query, setQuery] = useState("");
  const navigation = useNavigation();

  const handleSearch = () => {
    if (query?.trim()?.length > 0) {
      navigation.navigate("SearchResults", { query });
    }
  };

  return (
    <AppWrapper edgeToEdge={false}>
      <View style={styles.container}>
        <SearchBar
          value={query}
          onChangeText={setQuery}
          onSubmit={handleSearch}
          autoFocus
          onClear={() => setQuery("")}
        />
      </View>
    </AppWrapper>
  );
};

export default SearchInputScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
  },
});
