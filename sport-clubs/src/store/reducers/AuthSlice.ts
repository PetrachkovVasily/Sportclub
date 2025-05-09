import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import pb from "../../lib/pocketbase";

interface AuthState {
  token: string | null;
  userId: string | null;
}

const initialState: AuthState = {
  token: null,
  userId: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials(
      state,
      action: PayloadAction<{ token: string; userId: string }>
    ) {
      state.token = action.payload.token;
      state.userId = action.payload.userId;
    },
    logout(state) {
      pb.authStore.clear();

      state.token = null;
      state.userId = null;
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
