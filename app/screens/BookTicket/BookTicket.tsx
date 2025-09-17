import AppWrapper from "@/app/components/core/AppWrapper";
import AppButton from "@/app/components/ui/AppButton";
import AppText from "@/app/components/ui/CustomText";
import { Images } from "@/assets/images";
import { LeftArrowIcon } from "@/assets/images/svgs";
import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useState } from "react";
import {
  Dimensions,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const { width } = Dimensions.get("window");

const dates = [
  { id: "1", label: "5 Mar", value: "2025-03-05" },
  { id: "2", label: "6 Mar", value: "2025-03-06" },
  { id: "3", label: "7 Mar", value: "2025-03-07" },
  { id: "4", label: "8 Mar", value: "2025-03-08" },
  { id: "5", label: "9 Mar", value: "2025-03-09" },
];

const showtimes = [
  {
    id: "1",
    date: "2025-03-05",
    time: "12:30",
    hall: "Cinotech + Hall 1",
    price: "From 50$ or 2500 bonus",
  },
  {
    id: "2",
    date: "2025-03-05",
    time: "13:30",
    hall: "Cinotech + Hall 2",
    price: "From 75$ or 3000 bonus",
  },
  {
    id: "3",
    date: "2025-03-06",
    time: "10:00",
    hall: "Cinotech + Hall 1",
    price: "From 40$ or 2000 bonus",
  },
];

const BookScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const movie = route?.params?.movie;
  const [selectedDate, setSelectedDate] = useState(dates[0].value);

  const filteredShows = showtimes.filter((item) => item.date === selectedDate);

  return (
    <AppWrapper edgeToEdge={false}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.header}>
          <View style={styles.headerRow}>
            <TouchableOpacity
              activeOpacity={0.6}
              onPress={() => navigation.goBack()}
            >
              <LeftArrowIcon />
            </TouchableOpacity>

            <AppText
              label={movie?.title || "The King's Man"}
              fontSize={18}
              fontWeight="600"
              textAlign="center"
            />

            <View style={{ width: 24 }} />
          </View>

          <AppText
            label="In Theaters December 22, 2021"
            fontSize={14}
            color="#61C3F2"
            textAlign="center"
            textStyle={{
              marginTop: 4,
              textAlign: "center",
              alignSelf: "center",
            }}
          />
        </View>

        <View
          style={{
            marginTop: Dimensions.get("screen").height / 6,
          }}
        >
          <View style={styles.section}>
            <AppText
              label="Date"
              fontSize={16}
              fontWeight="600"
              textStyle={{ marginBottom: 10 }}
            />
            <FlatList
              data={dates}
              horizontal
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => {
                const isSelected = selectedDate === item.value;
                return (
                  <TouchableOpacity
                    onPress={() => setSelectedDate(item.value)}
                    style={[
                      styles.dateButton,
                      isSelected && styles.dateButtonActive,
                    ]}
                  >
                    <Text
                      style={[
                        styles.dateText,
                        isSelected && styles.dateTextActive,
                      ]}
                    >
                      {item.label}
                    </Text>
                  </TouchableOpacity>
                );
              }}
            />
          </View>

          <FlatList
            data={filteredShows}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => {
              return (
                <View>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      columnGap: 10,
                    }}
                  >
                    <AppText
                      label={item.time}
                      fontSize={16}
                      fontWeight="600"
                      textAlign="left"
                    />
                    <AppText
                      label={item.hall}
                      fontSize={14}
                      color="#8F8F8F"
                      textStyle={{ marginVertical: 6 }}
                    />
                  </View>
                  <View style={styles.card}>
                    <Image
                      source={Images.MapImage}
                      resizeMode="contain"
                      style={{ height: 145, width: "100%" }}
                    />
                  </View>
                  <AppText
                    label={item.price}
                    fontSize={14}
                    fontWeight="600"
                    color="#000"
                  />
                </View>
              );
            }}
            contentContainerStyle={{ paddingHorizontal: 20, paddingTop: 10 }}
          />
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <AppButton
          label="Select Seats"
          containerStyle={styles.bookButton}
          onPress={() =>
            navigation.navigate("SeatSelection", {
              movie,
            })
          }
        />
      </View>
    </AppWrapper>
  );
};

export default BookScreen;

const styles = StyleSheet.create({
  header: {
    paddingVertical: 20,
    backgroundColor: "white",
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  dateButton: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    marginRight: 10,
    backgroundColor: "white",
  },
  dateButtonActive: {
    backgroundColor: "#61C3F2",
    borderColor: "#61C3F2",
  },
  dateText: {
    fontSize: 14,
    color: "#000",
  },
  dateTextActive: {
    color: "white",
    fontWeight: "600",
  },
  card: {
    width: width * 0.6,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 15,
    marginRight: 15,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    marginBottom: 5,
  },
  footer: {
    padding: 20,
  },
  bookButton: {
    backgroundColor: "#61C3F2",
    borderRadius: 20,
  },
});
