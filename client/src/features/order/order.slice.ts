import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface IOrderState {
  userOrderInfo: {
    address: string;
    name: string;
    email: string;
    mobile: string;
  } | null;
}

export const initialState: IOrderState = {
  userOrderInfo: null,
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    setUserOrderInfo: (
      state,
      action: PayloadAction<{
        address: string;
        name: string;
        email: string;
        mobile: string;
      }>
    ) => {
      state.userOrderInfo = {
        address: action.payload.address,
        name: action.payload.name,
        mobile: action.payload.mobile,
        email: action.payload.email,
      };
    },
  },
});

export const { setUserOrderInfo } = orderSlice.actions;
export const orderReducer = orderSlice.reducer;
