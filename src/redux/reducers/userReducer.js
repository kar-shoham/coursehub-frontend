import { PlaylistAdd } from "@mui/icons-material";
import { createSlice } from "@reduxjs/toolkit";

let userSlice = createSlice({
  name: "user",
  initialState: {loading: false, playlist:[]},
  reducers: {
    loginRequest(state) {
      state.loading = true;
    },
    loginSuccess(state, action) {
      state.isAuthenticated = true;
      state.loading = false;
      state.user = action.payload.user;
      state.message = action.payload.message;
    },
    loginFailed(state, action) {
      state.isAuthenticated = false;
      state.loading = false;
      state.user = null;
      state.error = action.payload.message;
    },
    clearError(state) {
      state.error = null;
    },
    clearMessage(state) {
      state.message = null;
    },
    loadUserRequest(state) {
      state.loading = true;
    },
    loadUserSuccess(state, action) {
      state.user = action.payload.user;
      state.message = action.payload.message;
      state.isAuthenticated = true;
      state.loading = false;
    },
    loadUserFailed(state, action) {
      state.error = action.payload.message;
      state.isAuthenticated = false;
      state.user = null;
      state.loading = false;
    },
    logoutRequest(state) {
      state.loading = true;
    },
    logoutSuccess(state, action) {
      state.isAuthenticated = false;
      state.loading = false;
      state.user = null;
      state.message = action.payload.message;
    },
    logoutFailed(state, action) {
      state.isAuthenticated = true;
      state.loading = false;
      state.error = action.payload.message;
    },
    registerRequest(state, action) {
      state.loading = true
    },
    registerSuccess(state, action) {
      state.isAuthenticated = true;
      state.loading = false;
      state.user = action.payload.user;
      state.message = action.payload.message;
    },
    registerFailed(state, action) {
      state.isAuthenticated = false;
      state.loading = false;
      state.user = null;
      state.error = action.payload.message;
    },
    showError(state, action){
      state.error = action.payload.message
    },
    showMessage(state, action){
      state.message = action.payload.message
    },
    updateProfile(state, action){
      state.user.name = action.payload.name
      state.user.email = action.payload.email
    },
    setLoadingTrue(state){
      state.loading = true
    },
    setLoadingFalse(state){
      state.loading = false
    },
    addLecture(state, action){
      state.playlist = action.payload
    },
    removeLecture(state, action){
      state.playlist = state.playlist.filter(ele => ele._id !== action.payload.id)
    }
  },
});

export default userSlice;

export let {
  loginRequest,
  loginSuccess,
  loginFailed,
  clearError,
  clearMessage,
  loadUserRequest,
  loadUserSuccess,
  loadUserFailed,
  logoutRequest,
  logoutSuccess,
  logoutFailed,
  registerRequest,
  registerSuccess,
  registerFailed,
  showError,
  showMessage,
  updateProfile,
  setLoadingFalse,
  setLoadingTrue,
  addLecture,
  removeLecture
} = userSlice.actions;
