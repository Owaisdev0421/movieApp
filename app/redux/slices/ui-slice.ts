import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type UIState = {
  statusBarStyle: "light" | "dark" | "auto";
  statusBarColor: string;
  navBarColor: string;
  backgroundColor: string;
  translucentBars: boolean;
  edgeToEdge: boolean;
};

const initialState: UIState = {
  statusBarStyle: "light",
  statusBarColor: "white",
  navBarColor: "transparent",
  backgroundColor: "#F6F5FA",
  translucentBars: true,
  edgeToEdge: true,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setUIColors(state, action: PayloadAction<Partial<UIState>>) {
      console.log("UI Colors ::", JSON.stringify(action.payload, null, 2));
      return { ...state, ...action.payload };
    },
  },
});

export const { setUIColors } = uiSlice.actions;

export const uiReducer = uiSlice.reducer;

export default uiSlice;
