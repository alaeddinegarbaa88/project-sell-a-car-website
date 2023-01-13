import { createSlice } from "@reduxjs/toolkit";

export const UserSlice = createSlice({
  name: "User",
  initialState: null,
  reducers: {
    setUser: (state, actions) => {
      if (actions.payload) {
        return { ...actions.payload, isAuth: true };
      } else {
        return { isAuth: false };
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const { setUser } = UserSlice.actions;

export default UserSlice.reducer;
