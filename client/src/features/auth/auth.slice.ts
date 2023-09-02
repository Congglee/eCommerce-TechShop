import { IUser } from "./../../interfaces/user.interface";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IAuthState {
  token?: string;
  userData?: IUser;
  isLoggedIn: boolean;
  // cartProducts: IProduct[];
}

const initialState: IAuthState = {
  token: "",
  userData: undefined,
  isLoggedIn: false,
  // cartProducts: localStorage.getItem("cartProducts")
  //   ? JSON.parse(localStorage.getItem("cartProducts")!)
  //   : [],
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (
      state,
      action: PayloadAction<{
        isLoggedIn: boolean;
        userData?: IUser;
        token?: string;
      }>
    ) => {
      state.isLoggedIn = action.payload.isLoggedIn;
      state.userData = action.payload.userData;
      state.token = action.payload.token;
      // state.cartProducts = action.payload.cartProducts;
    },

    setCurrentUser: (state, action: PayloadAction<{ userData?: IUser }>) => {
      state.userData = action.payload.userData;
    },

    logOut: (state) => {
      state.isLoggedIn = false;
      state.token = "";
      state.userData = undefined;
    },
  },
});

export const { setUser, logOut, setCurrentUser } = authSlice.actions;
const authReducer = authSlice.reducer;
export default authReducer;
