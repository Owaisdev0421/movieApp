import BookTicket from "@/app/screens/BookTicket/BookTicket";
import SearchInputScreen from "@/app/screens/Search/SearchInputScreen";
import SearchResultsScreen from "@/app/screens/Search/SearchResultsScreen";
import SeatSelectionScreen from "@/app/screens/SeatSelectionScreen/SeatSelectionScreen";
import MovieDetail from "@/app/screens/movieDetail/MovieDetail";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import BottomTabs from "./bottomTabs";

const ApplicationStack = createNativeStackNavigator();

function AppNavigationStack() {
  return (
    <ApplicationStack.Navigator>
      <ApplicationStack.Screen
        name="BottomNavigationBar"
        component={BottomTabs}
        options={{
          headerShown: false,
          gestureEnabled: false,
        }}
      />
      <ApplicationStack.Screen
        name="MovieDetail"
        component={MovieDetail}
        options={{
          headerShown: false,
          gestureEnabled: false,
        }}
      />
      <ApplicationStack.Screen
        name="SearchInput"
        component={SearchInputScreen}
        options={{
          headerShown: false,
          gestureEnabled: false,
        }}
      />
      <ApplicationStack.Screen
        name="SearchResults"
        component={SearchResultsScreen}
        options={{
          headerShown: false,
          gestureEnabled: false,
        }}
      />
      <ApplicationStack.Screen
        name="BookTicket"
        component={BookTicket}
        options={{
          headerShown: false,
          gestureEnabled: false,
        }}
      />
      <ApplicationStack.Screen
        name="SeatSelection"
        component={SeatSelectionScreen}
        options={{
          headerShown: false,
          gestureEnabled: false,
        }}
      />
    </ApplicationStack.Navigator>
  );
}

export default AppNavigationStack;
