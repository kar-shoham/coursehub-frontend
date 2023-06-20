import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./reducers/userReducer";

let store = configureStore({
    reducer: {
        user: userSlice.reducer
    }
})

export default store
export const server = 'https://coursehub-backend.onrender.com/api/v1'