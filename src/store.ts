import { configureStore } from "@reduxjs/toolkit";
import { accountReducer } from "./redux/accountRedux";

export default configureStore({
  reducer: {
    account: accountReducer.reducer,
  },
});
