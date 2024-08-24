import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Account {
  email: string;
  password: string;
}

interface AccountState {
  accounts: Account[];
}

const initialState: AccountState = {
  accounts: [],
};

export const accountReducer = createSlice({
  name: "account",
  initialState,
  reducers: {
    setAccounts: (state, action: PayloadAction<Account[]>) => {
      state.accounts = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setAccounts } = accountReducer.actions;

export default accountReducer.reducer;
