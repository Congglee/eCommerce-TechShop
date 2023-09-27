import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface IOrderState {
  userOrderInfo: {
    address: string;
    name: string;
    email: string;
    mobile: string;
  } | null;
  orderId: string;
  orderSearchValue: string;
  orderSelectedSort: string;
  orderStatus: string;
}

export const initialState: IOrderState = {
  userOrderInfo: null,
  orderId: "",
  orderSearchValue: "",
  orderSelectedSort: "",
  orderStatus: "",
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

    setOrderSearchValue: (
      state,
      action: PayloadAction<{ searchValue: string }>
    ) => {
      state.orderSearchValue = action.payload.searchValue;
    },

    setOrderSelectedSort: (
      state,
      action: PayloadAction<{ selectSort: string }>
    ) => {
      state.orderSelectedSort = action.payload.selectSort;
    },

    setOrderStatus: (state, action: PayloadAction<{ status: string }>) => {
      state.orderStatus = action.payload.status;
    },

    setOrderDetail: (state, action: PayloadAction<{ id: string }>) => {
      state.orderId = action.payload.id;
    },
  },
});

export const {
  setUserOrderInfo,
  setOrderDetail,
  setOrderSearchValue,
  setOrderSelectedSort,
  setOrderStatus,
} = orderSlice.actions;
export const orderReducer = orderSlice.reducer;
