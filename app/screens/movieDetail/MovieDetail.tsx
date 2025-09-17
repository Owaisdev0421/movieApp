import { getMovieDetails } from "@/api-service";
import AppWrapper from "@/app/components/core/AppWrapper";
import AppButton from "@/app/components/ui/AppButton";
import AppText from "@/app/components/ui/CustomText";
import { WhiteArrow } from "@/assets/images/svgs";
import { Ionicons } from "@expo/vector-icons"; // Play icon from expo vector icons
import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  ImageBackground,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const genreColors = [
  "#FF6B6B",
  "#4ECDC4",
  "#45B7D1",
  "#FFA07A",
  "#9B59B6",
  "#F39C12",
  "#2ECC71",
  "#E67E22",
  "#16A085",
  "#D35400",
];

const MovieDetail = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const movieId = route?.params?.movieId;
  const [movie, setMovie] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const insets = useSafeAreaInsets();

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        setLoading(true);
        const data = await getMovieDetails(movieId);
        setMovie(data);
      } catch (err) {
        setError("Failed to load movie details. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    if (movieId) fetchMovie();
  }, [movieId]);

  if (loading) {
    return (
      <AppWrapper edgeToEdge>
        <View style={styles.centered}>
          <ActivityIndicator size="large" color="#FF6B6B" />
          <AppText
            label="Loading movie details..."
            fontSize={16}
            color="#8F8F8F"
            textStyle={{ marginTop: 10 }}
          />
        </View>
      </AppWrapper>
    );
  }

  if (error) {
    return (
      <AppWrapper edgeToEdge>
        <View style={styles.centered}>
          <AppText label={error} fontSize={16} color="red" textAlign="center" />
        </View>
      </AppWrapper>
    );
  }

  if (!movie) {
    return null;
  }

  return (
    <AppWrapper edgeToEdge>
      <ScrollView
        style={styles.scrollContainer}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <ImageBackground
          source={{
            uri: `https://image.tmdb.org/t/p/w500${movie?.poster_path}`,
          }}
          style={styles.poster}
          resizeMode="cover"
        >
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            activeOpacity={0.6}
            style={[
              styles.headerContainer,
              {
                paddingTop: insets.top + 10,
              },
            ]}
          >
            <WhiteArrow />
            <AppText label="Watch" color="white" fontSize={16} />
          </TouchableOpacity>

          <View style={styles.posterOverlay}>
            <AppText
              label={movie?.title || ""}
              fontSize={22}
              fontWeight="700"
              color="white"
              textAlign="center"
              alignSelf="center"
            />

            <View style={styles.buttonRow}>
              <AppButton
                label="Get Tickets"
                onPress={() =>
                  navigation.navigate("BookTicket", {
                    movie,
                  })
                }
                containerStyle={styles.ticketButton}
                textStyle={{ color: "white" }}
              />

              <AppButton
                label="Watch Trailer"
                onPress={() => console.log("Watch Trailer pressed")}
                iconLeft={
                  <Ionicons
                    name="play"
                    size={16}
                    color="white"
                    style={{ marginRight: 6 }}
                  />
                }
                containerStyle={styles.trailerButton}
                textStyle={{ color: "white" }}
              />
            </View>
          </View>
        </ImageBackground>

        <View style={styles.content}>
          <AppText label="Genres" fontSize={20} fontWeight="600" />

          <FlatList
            data={movie?.genres || []}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.id?.toString()}
            renderItem={({ item, index }) => {
              return (
                <View
                  style={[
                    styles.genreBadge,
                    {
                      backgroundColor: genreColors[index % genreColors?.length],
                    },
                  ]}
                >
                  <AppText label={item?.name} fontSize={12} fontWeight="500" />
                </View>
              );
            }}
            style={styles.genreList}
          />

          <View style={styles.divider} />

          <AppText
            label="Overview"
            fontSize={18}
            fontWeight="500"
            textStyle={styles.overviewHeading}
          />
          <AppText
            label={movie?.overview || ""}
            fontSize={16}
            fontWeight="400"
            color="#8F8F8F"
          />
        </View>
      </ScrollView>
    </AppWrapper>
  );
};

export default MovieDetail;

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 30,
  },
  poster: {
    width: "100%",
    height: 400,
    marginBottom: 20,
    justifyContent: "space-between",
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: 20,
    paddingHorizontal: 20,
  },
  posterOverlay: {
    paddingHorizontal: 40,
    paddingBottom: 20,
  },
  buttonRow: {
    marginTop: 12,
    rowGap: 12,
  },
  ticketButton: {
    backgroundColor: "#61C3F2",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  trailerButton: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#61C3F2",
    borderWidth: 1,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  content: {
    paddingHorizontal: 20,
  },
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: "#F2F2F2",
    marginVertical: 10,
  },
  overviewHeading: {
    marginTop: 10,
    marginBottom: 10,
  },
  genreList: {
    marginVertical: 10,
  },
  genreBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginRight: 8,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
});
