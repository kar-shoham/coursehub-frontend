import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./reducers/userReducer";
import courseSlice from "./reducers/courseReducer";

let store = configureStore({
    reducer: {
        user: userSlice.reducer,
        course: courseSlice.reducer
    }
})

export default store
export const server = 'https://coursehub-backend.onrender.com/api/v1'