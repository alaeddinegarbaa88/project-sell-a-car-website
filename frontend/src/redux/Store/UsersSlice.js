import { createSlice } from "@reduxjs/toolkit";

export const UsersSlice = createSlice({
  name: "Users",
  initialState: null,
  reducers: {
    setUsers: (state, actions) => {
      if (actions.payload) {
        return actions.payload;
      } else {
        return [];
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const { setUsers } = UsersSlice.actions;

export default UsersSlice.reducer;
