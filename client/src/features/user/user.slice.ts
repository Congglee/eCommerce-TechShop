import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface IUserState {
  isShowUpdateUserDrawer: boolean;
  userId: string;
}

const initialState: IUserState = {
  isShowUpdateUserDrawer: false,
  userId: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    showUpdateUserDrawer: (state, action) => {
      state.isShowUpdateUserDrawer = action.payload;
    },

    setUserDetail: (state, action: PayloadAction<{ id: string }>) => {
      state.userId = action.payload.id;
    },
  },
});

export const { showUpdateUserDrawer, setUserDetail } = userSlice.actions;

const userReducer = userSlice.reducer;
export default userReducer;
