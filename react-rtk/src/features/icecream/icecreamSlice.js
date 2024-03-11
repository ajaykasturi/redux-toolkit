import { createSlice } from "@reduxjs/toolkit";
import { cakeActions } from "../cake/cakeSlice";

const initialState = {
  numberOfIceCreams: 20,
};
const icecreamSlice = createSlice({
  name: "icecream",
  initialState,
  reducers: {
    ordered: (state) => {
      state.numberOfIceCreams--;
    },
    restocked: (state, action) => {
      state.numberOfIceCreams += action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(cakeActions.ordered, (state) => {
      state.numberOfIceCreams--;
    });
  },
});

export default icecreamSlice.reducer;
export const icecreamActions = icecreamSlice.actions;
