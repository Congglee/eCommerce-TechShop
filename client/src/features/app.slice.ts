import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface AppState {
  currentWidth: number;
}

const initialState: AppState = {
  currentWidth: 0,
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setCurrentScreenWidth: (
      state,
      action: PayloadAction<{ width: number }>
    ) => {
      state.currentWidth = action.payload.width;
    },
  },
});

export const { setCurrentScreenWidth } = appSlice.actions;
const appReducer = appSlice.reducer;
export default appReducer;
