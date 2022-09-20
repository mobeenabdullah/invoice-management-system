import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
// import type { RootState } from '../../store'

// Define a type for the slice state
interface userState {
  user_id: string;
  email: string;
  name: string;
  registeredUser: boolean;
  signUpMessage: string;
  error: boolean;
}

// Define the initial state using that type
const initialState: userState = {
  user_id: "",
  email: "",
  name: "",
  registeredUser: false,
  signUpMessage: "",
  error: false,
};

export const userSlice = createSlice({
  name: "user",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    addUser: (state, action: PayloadAction<userState>) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { addUser } = userSlice.actions;

export default userSlice.reducer;
