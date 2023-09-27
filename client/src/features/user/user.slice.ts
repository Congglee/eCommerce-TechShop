import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface IUserState {
  isShowUpdateUserDrawer: boolean;
  userId: string;
  userSearchValue: string;
  userSelectedSort: string;
}

const initialState: IUserState = {
  isShowUpdateUserDrawer: false,
  userId: "",
  userSearchValue: "",
  userSelectedSort: "",
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

    setUserSearchValue: (
      state,
      action: PayloadAction<{ searchValue: string }>
    ) => {
      state.userSearchValue = action.payload.searchValue;
    },

    setUserSelectedSort: (
      state,
      action: PayloadAction<{ selectSort: string }>
    ) => {
      state.userSelectedSort = action.payload.selectSort;
    },
  },
});

export const {
  showUpdateUserDrawer,
  setUserDetail,
  setUserSearchValue,
  setUserSelectedSort,
} = userSlice.actions;

const userReducer = userSlice.reducer;
export default userReducer;
