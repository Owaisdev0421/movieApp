import { getGenres } from "@/api-service";
import AppWrapper from "@/app/components/core/AppWrapper";
import AppText from "@/app/components/ui/CustomText";
import SearchBar from "@/app/components/ui/SearchBar";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";

const { width } = Dimensions.get("window");
const CARD_MARGIN = 20;
const CARD_WIDTH = (width - CARD_MARGIN * 3) / 2;

const genreImages: Record<number, string> = {
  28: "https://image.tmdb.org/t/p/w500/2lEyzOFE79nL8Rz95Xh9sUQOE9G.jpg",
  35: "https://image.tmdb.org/t/p/w500/6Pvq9tHlbK6Z8bYBHyLlqQUZlL1.jpg",
  18: "https://image.tmdb.org/t/p/w500/8UlWHLMpgZm9bx6QYh0NFoq67TZ.jpg",
  14: "https://image.tmdb.org/t/p/w500/x747ZvF0CcYYTTpPRCoUrxA2cYy.jpg",
  27: "https://image.tmdb.org/t/p/w500/AaV1YIdWKnjAIAOe8UUKBFm327v.jpg",
};

const WatchComponent = () => {
  const navigation = useNavigation();
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        setLoading(true);
        const genres = await getGenres();

        const genresWithImages = genres.map((genre: any) => ({
          ...genre,
          image:
            genreImages[genre.id] ||
            `https://picsum.photos/seed/${genre.id}/400/300`,
        }));

        setCategories(genresWithImages);
      } catch (err) {
        console.error("Error fetching genres:", err);
        setError("Failed to load categories. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchGenres();
  }, []);

  if (loading) {
    return (
      <AppWrapper>
        <View style={styles.centered}>
          <ActivityIndicator size="large" color="#61C3F2" />
          <AppText
            label="Loading categories..."
            fontSize={16}
            color="#8F8F8F"
          />
        </View>
      </AppWrapper>
    );
  }

  if (error) {
    return (
      <AppWrapper>
        <View style={styles.centered}>
          <AppText label={error} fontSize={16} color="red" textAlign="center" />
        </View>
      </AppWrapper>
    );
  }

  const handleSearch = () => {
    navigation.navigate("SearchInput");
  };

  return (
    <AppWrapper edgeToEdge={false}>
      <View style={{ backgroundColor: "white" }}>
        <SearchBar editable={false} onPress={handleSearch} />
      </View>
      <FlatList
        data={categories}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        columnWrapperStyle={styles.row}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("SearchInput", { genreId: item.id })
            }
            style={styles.cardContainer}
          >
            <ImageBackground source={{ uri: item.image }} style={styles.card}>
              <View style={styles.overlay} />
              <View style={styles.textContainer}>
                <AppText
                  label={item.name}
                  fontSize={16}
                  color="white"
                  fontWeight="600"
                />
              </View>
            </ImageBackground>
          </TouchableOpacity>
        )}
      />
    </AppWrapper>
  );
};

export default WatchComponent;

const styles = StyleSheet.create({
  row: {
    justifyContent: "space-between",
    marginHorizontal: CARD_MARGIN,
    marginTop: 20,
  },
  cardContainer: {
    marginBottom: CARD_MARGIN,
    width: CARD_WIDTH,
  },
  card: {
    height: 120,
    justifyContent: "center",
    borderRadius: 10,
    overflow: "hidden",
    paddingHorizontal: 10,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.3)",
  },
  textContainer: {
    position: "absolute",
    bottom: 20,
    left: 10,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
