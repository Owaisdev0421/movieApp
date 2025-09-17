import React from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import AppText from "../ui/CustomText";

interface Props {
  movie: any;
  onPress: () => void;
}

const MovieCard: React.FC<Props> = ({ movie, onPress }) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Image
        source={{
          uri: `https://image.tmdb.org/t/p/w200${movie?.poster_path}`,
        }}
        resizeMode="cover"
        style={styles.poster}
      />
      <View style={styles.info}>
        <AppText label={`${movie?.title}`} fontSize={16} fontWeight="500" />
        <AppText
          label={movie?.genre_ids?.[0] ? movie?.genre_ids[0]?.toString() : ""}
          fontSize={14}
          color="#8F8F8F"
        />
      </View>
    </TouchableOpacity>
  );
};

export default MovieCard;

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    marginBottom: 15,
  },
  poster: {
    width: 130,
    height: 100,
    borderRadius: 6,
    marginRight: 10,
  },
  info: {
    flex: 1,
    justifyContent: "center",
  },
});
