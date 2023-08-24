import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface IOrderState {
  userOrderInfo: {
    address: string;
    name: string;
    email: string;
    mobile: string;
  } | null;
  orderId: string;
}

export const initialState: IOrderState = {
  userOrderInfo: null,
  orderId: "",
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

    setOrderDetail: (state, action: PayloadAction<{ id: string }>) => {
      state.orderId = action.payload.id;
    },
  },
});

export const { setUserOrderInfo, setOrderDetail } = orderSlice.actions;
export const orderReducer = orderSlice.reducer;
