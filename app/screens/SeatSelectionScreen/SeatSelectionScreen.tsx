import AppWrapper from "@/app/components/core/AppWrapper";
import AppButton from "@/app/components/ui/AppButton";
import AppText from "@/app/components/ui/CustomText";
import { LeftArrowIcon } from "@/assets/images/svgs";
import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useState } from "react";
import { Dimensions, StyleSheet, TouchableOpacity, View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

const ROWS = 8;
const COLS = 12;

const generateSeats = () => {
  const seats: any[] = [];
  for (let r = 0; r < ROWS; r++) {
    const row: any[] = [];
    for (let c = 0; c < COLS; c++) {
      row.push({
        id: `${r}-${c}`,
        type:
          r < 2
            ? "vip"
            : r === 4 && (c === 5 || c === 6)
            ? "unavailable"
            : "regular",
        selected: false,
        row: r + 1,
        col: c + 1,
      });
    }
    seats.push(row);
  }
  return seats;
};

const SeatSelectionScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const movie = route?.params?.movie;

  const [seats, setSeats] = useState(generateSeats());
  const [selectedSeats, setSelectedSeats] = useState<any[]>([]);

  const scale = useSharedValue(1);
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  const pinch = Gesture.Pinch()
    .onUpdate((e) => {
      scale.value = Math.max(1, Math.min(e.scale, 3));
    })
    .onEnd(() => {
      if (scale.value < 1) {
        scale.value = withSpring(1);
      } else if (scale.value > 3) {
        scale.value = withSpring(3);
      }
    });

  const pan = Gesture.Pan()
    .onUpdate((e) => {
      if (scale.value > 1) {
        translateX.value = e.translationX;
        translateY.value = e.translationY;
      }
    })
    .onEnd(() => {
      if (scale.value === 1) {
        translateX.value = withSpring(0);
        translateY.value = withSpring(0);
      }
    });

  const composed = Gesture.Simultaneous(pinch, pan);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: scale.value },
      { translateX: translateX.value },
      { translateY: translateY.value },
    ],
  }));

  const toggleSeat = (rowIdx: number, colIdx: number) => {
    const updatedSeats = [...seats];
    const seat = updatedSeats[rowIdx][colIdx];

    if (seat.type === "unavailable") return;

    seat.selected = !seat.selected;

    if (seat.selected) {
      setSelectedSeats([...selectedSeats, seat]);
    } else {
      setSelectedSeats(selectedSeats.filter((s) => s.id !== seat.id));
    }

    setSeats(updatedSeats);
  };

  return (
    <AppWrapper edgeToEdge={false}>
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

      <GestureDetector gesture={composed}>
        <Animated.View style={[styles.seatContainer, animatedStyle]}>
          {seats.map((row, rowIdx) => (
            <View key={rowIdx} style={styles.row}>
              {row.map((seat, colIdx) => (
                <TouchableOpacity
                  key={seat.id}
                  style={[
                    styles.seat,
                    seat.type === "vip" && styles.vip,
                    seat.type === "regular" && styles.regular,
                    seat.type === "unavailable" && styles.unavailable,
                    seat.selected && styles.selected,
                  ]}
                  onPress={() => toggleSeat(rowIdx, colIdx)}
                />
              ))}
            </View>
          ))}
        </Animated.View>
      </GestureDetector>

      <View
        style={{ position: "absolute", zIndex: 1, width: "100%", bottom: 0 }}
      >
        <View style={styles.legendContainer}>
          <View style={styles.seatViewContainer}>
            <View style={styles.legendItem}>
              <View style={[styles.seat, styles.selected]} />
              <AppText label="Selected" fontSize={12} />
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.seat, styles.vip]} />
              <AppText label="VIP (15$)" fontSize={12} />
            </View>
          </View>

          <View style={styles.seatViewContainer}>
            <View style={styles.legendItem}>
              <View style={[styles.seat, styles.regular]} />
              <AppText label="Regular (10$)" fontSize={12} />
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.seat, styles.unavailable]} />
              <AppText label="Not available" fontSize={12} />
            </View>
          </View>
        </View>

        <View style={styles.footer}>
          <View>
            <AppText label="Total Price" fontSize={12} color="#8F8F8F" />
            <AppText
              label={`$${selectedSeats.length * 10}`}
              fontSize={18}
              fontWeight="600"
            />
          </View>
          <AppButton
            label="Proceed to pay"
            containerStyle={styles.payButton}
            onPress={() => console.log("Proceeding with seats:", selectedSeats)}
          />
        </View>
      </View>
    </AppWrapper>
  );
};

export default SeatSelectionScreen;

const styles = StyleSheet.create({
  header: {
    paddingVertical: 15,
    backgroundColor: "white",
    paddingHorizontal: 10,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },

  seatContainer: {
    alignItems: "center",
    marginVertical: 10,
    marginTop: Dimensions.get("screen").height / 5,
  },
  seatViewContainer: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: 50,
  },
  row: {
    flexDirection: "row",
    marginVertical: 4,
  },
  seat: {
    width: 16,
    height: 16,
    borderRadius: 4,
    marginHorizontal: 4,
    backgroundColor: "#E0E0E0",
  },
  vip: {
    backgroundColor: "#800080",
  },
  regular: {
    backgroundColor: "#61C3F2",
  },
  unavailable: {
    backgroundColor: "#B0B0B0",
  },
  selected: {
    backgroundColor: "#FFD700",
  },
  legendContainer: {
    paddingVertical: 10,
    backgroundColor: "white",
    rowGap: 20,
    paddingHorizontal: 20,
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: "#F2F2F2",
    backgroundColor: "white",
  },
  payButton: {
    backgroundColor: "#61C3F2",
    borderRadius: 20,
    paddingHorizontal: 30,
  },
});
