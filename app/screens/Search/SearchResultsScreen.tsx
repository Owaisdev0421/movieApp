import { searchMovies } from "@/api-service";
import AppWrapper from "@/app/components/core/AppWrapper";
import AppHeader from "@/app/components/ui/AppHeader";
import AppText from "@/app/components/ui/CustomText";
import MovieCard from "@/app/components/ui/MovieCard";
import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, StyleSheet, View } from "react-native";

const SearchResultsScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const query = route.params?.query;
  const [movies, setMovies] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        const data = await searchMovies(query?.length > 0 ? query : "");
        setMovies(data.results || []);
      } catch (err) {
        setError("Failed to fetch results");
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [query]);

  if (loading) {
    return (
      <AppWrapper edgeToEdge={false}>
        <View style={styles.centered}>
          <ActivityIndicator size="large" color="#61C3F2" />
          <AppText label="Searching..." fontSize={16} color="#8F8F8F" />
        </View>
      </AppWrapper>
    );
  }

  if (error) {
    return (
      <AppWrapper edgeToEdge={false}>
        <View style={styles.centered}>
          <AppText label={error} color="red" fontSize={16} />
        </View>
      </AppWrapper>
    );
  }

  return (
    <AppWrapper edgeToEdge={false}>
      <AppHeader
        isBackArrow
        isLeftText
        label={`${movies?.length} Results Found`}
      />
      <View style={styles.container}>
        <FlatList
          data={movies}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item) => item.id?.toString()}
          renderItem={({ item }) => (
            <MovieCard
              movie={item}
              onPress={() =>
                navigation.navigate("MovieDetail", { movieId: item.id })
              }
            />
          )}
        />
      </View>
    </AppWrapper>
  );
};

export default SearchResultsScreen;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
