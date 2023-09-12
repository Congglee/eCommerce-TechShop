import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface AppState {
  currentWidth: number;
  showSidebar: boolean;
}

const initialState: AppState = {
  currentWidth: 0,
  showSidebar: false,
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

    toggleShowSidebar: (state, action) => {
      state.showSidebar = action.payload;
    },
  },
});

export const { setCurrentScreenWidth, toggleShowSidebar } = appSlice.actions;
const appReducer = appSlice.reducer;
export default appReducer;
