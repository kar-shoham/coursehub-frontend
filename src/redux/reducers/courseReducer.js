import { createSlice } from "@reduxjs/toolkit";

let courseSlice = createSlice({
  name: "course",
  initialState: { courses: [], loading: false },
  reducers: {
    getCourseRequest(state) {
      state.loading = true;
    },
    getCourseSuccess(state, action) {
        state.loading = false
        state.courses = action.payload.courses
    },
    getCourseFailure(state, action) {
        state.loading = false
        state.error = action.payload.message
    },
    setLoadingTrue(state){
      state.loading = true
    },
    setLoadingFalse(state){
      state.loading = false
    },
    removeACourse(state, action){
      state.courses = state.courses.filter(ele => ele._id !== action.payload.id)
    }
  },
});

export default courseSlice;

export const { 
    getCourseRequest, 
    getCourseSuccess, 
    getCourseFailure,
    setLoadingTrue,
    setLoadingFalse,
    removeACourse
} = courseSlice.actions;
