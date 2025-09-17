import { getUpcomingMovies } from "@/api-service";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import AppWrapper from "../../components/core/AppWrapper";
import AppHeader from "../../components/ui/AppHeader";
import AppText from "../../components/ui/CustomText";

const HomeComponent = () => {
  const [movies, setMovies] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const navigation = useNavigation();

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        const data = await getUpcomingMovies();
        setMovies(data.results || []);
      } catch (err) {
        console.error("Error fetching movies:", err);
        setError("Failed to load movies. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  const renderMovieItem = ({ item }: { item: any }) => {
    return (
      <TouchableOpacity
        activeOpacity={0.6}
        onPress={() => navigation.navigate("MovieDetail", { movieId: item.id })}
        style={styles.movieItem}
      >
        <ImageBackground
          source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }}
          style={styles.movieImage}
          imageStyle={styles.movieImageBorder}
        >
          <View style={styles.textOverlay}>
            <AppText
              label={item.title}
              color="white"
              fontSize={18}
              fontWeight="500"
            />
          </View>
        </ImageBackground>
      </TouchableOpacity>
    );
  };

  const renderEmptyList = () => {
    if (loading) return null;
    return (
      <View style={styles.emptyContainer}>
        <AppText
          label={error || "No movies found."}
          fontSize={16}
          color="gray"
          alignSelf="center"
        />
      </View>
    );
  };

  return (
    <AppWrapper edgeToEdge={false}>
      <AppHeader isLeftText isSearchIcon onSearchPress={() => {}} />

      {loading ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="#007bff" />
        </View>
      ) : (
        <FlatList
          data={movies}
          initialNumToRender={10}
          contentContainerStyle={styles.listContainer}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderMovieItem}
          ListEmptyComponent={renderEmptyList}
        />
      )}
    </AppWrapper>
  );
};

export default HomeComponent;

const styles = StyleSheet.create({
  listContainer: {
    paddingHorizontal: 20,
  },
  movieItem: {
    paddingVertical: 10,
  },
  movieImage: {
    width: "100%",
    height: 180,
    justifyContent: "flex-end",
  },
  movieImageBorder: {
    borderRadius: 10,
  },
  textOverlay: {
    position: "absolute",
    bottom: 10,
    left: 10,
    right: 10,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyContainer: {
    padding: 20,
    alignItems: "center",
  },
});
