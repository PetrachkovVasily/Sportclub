import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser } from "../../models/IUser";

interface UserState {
  isMember: boolean;
}

const initialState: UserState = {
  isMember: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setMember(state, action: PayloadAction<boolean>) {
      state.isMember = action.payload;
    },
  },
});

export default userSlice.reducer;
