import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store/store";
import { IUser } from "../../interfaces/user.interface";

export interface IAuthState {
  token: string | null;
  userData: IUser | null;
}

const initialState: IAuthState = {
  token: null,
  userData: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (
      state,
      action: PayloadAction<{ token: string; userData: IUser }>
    ) => {
      localStorage.setItem(
        "accessToken",
        JSON.stringify({ token: action.payload.token })
      );
      state.token = action.payload.token;
      state.userData = action.payload.userData;
    },
    logOut: (state) => {
      localStorage.clear();
      state.token = null;
      state.userData = null;
    },
  },
});

export const { setUser, logOut } = authSlice.actions;
const authReducer = authSlice.reducer;
export default authReducer;
