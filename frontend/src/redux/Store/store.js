import { configureStore } from "@reduxjs/toolkit";

import CarSlice from "./CarSlice";
import userSlice from "./UserSlice";
import usersSlice from "./UsersSlice";

export default configureStore({
  reducer: {
    Car: CarSlice,
    User: userSlice,
    Users: usersSlice,
  },
});
