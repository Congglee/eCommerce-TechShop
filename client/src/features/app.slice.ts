import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface AppState {
  currentWidth: number;
  showSidebar: boolean;
  isShowModal: boolean;
  modalChildren: any;
}

const initialState: AppState = {
  currentWidth: 0,
  showSidebar: false,
  isShowModal: false,
  modalChildren: null,
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

    showModal: (
      state,
      action: PayloadAction<{ isShowModal: boolean; modalChildren: any }>
    ) => {
      state.isShowModal = action.payload.isShowModal;
      state.modalChildren = action.payload.modalChildren;
    },
  },
});

export const { setCurrentScreenWidth, toggleShowSidebar, showModal } =
  appSlice.actions;
const appReducer = appSlice.reducer;
export default appReducer;
