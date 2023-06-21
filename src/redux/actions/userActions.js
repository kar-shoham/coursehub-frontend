import { server } from "../store.js";
import {
  addLecture,
  loadUserFailed,
  loadUserRequest,
  loadUserSuccess,
  loginFailed,
  loginRequest,
  loginSuccess,
  logoutFailed,
  logoutRequest,
  logoutSuccess,
  registerFailed,
  registerRequest,
  registerSuccess,
  setLoadingFalse,
  setLoadingTrue,
  showError,
  showMessage,
  updateProfile,
} from "../reducers/userReducer.js";
import axios from "axios";
import { Navigate } from "react-router-dom";

export let login = (email, password) => async (dispatch) => {
  try {
    dispatch(loginRequest());

    let { data } = await axios.post(
      `${server}/login`,
      {
        email,
        password,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
    dispatch(loginSuccess(data));
  } catch (error) {
    dispatch(loginFailed(error.response.data));
  }
};

export let getMyProfile = () => async (dispatch) => {
  try {
    dispatch(loadUserRequest());
    let { data } = await axios.get(`${server}/me`, { withCredentials: true });
    // data.message = `Welcome back ${data.user.name}`;
    dispatch(loadUserSuccess(data));
  } catch (error) {
    error.response.data.message = "Please login";
    dispatch(loadUserFailed(error.response.data));
  }
};

export let logout = () => async (dispatch) => {
  try {
    dispatch(logoutRequest());
    let { data } = await axios.post(
      `${server}/logout`,
      {},
      { withCredentials: true }
    );
    dispatch(logoutSuccess(data));
  } catch (err) {
    err.message = "Logout Failed";
    dispatch(logoutFailed(err));
  }
};

export let register = (formData) => async (dispatch) => {
  try {
    dispatch(registerRequest());

    let { data } = await axios.post(
      `${server}/register`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      }
    );
    dispatch(registerSuccess(data));
  } catch (error) {
    dispatch(registerFailed(error.response.data));
  }
};


export let updateProfilePicture = (formData) => async (dispatch) => {
    try {
        let {data} = await axios.patch(`${server}/updateprofilepicture`, formData, {withCredentials: true})
        dispatch(showMessage(data))
    } catch (error) {
        error.message = 'Unable to update profile picture'
        dispatch(showError(error))
    }
}

export let changePassword = (oldPassword, newPassword) => async(dispatch) => {
    try{
        dispatch(setLoadingTrue())
        let {data} = await axios.patch(`${server}/changepassword`, {
            oldPassword, newPassword
        },{
            withCredentials: true
        })
        dispatch(showMessage(data))
        dispatch(setLoadingFalse())
    }catch(err){
        dispatch(showError(err.response.data))
        dispatch(setLoadingFalse())
    }
}

export let changeProfile = (name, email) => async(dispatch) => {
    try{
        dispatch(setLoadingTrue())
        let {data} = await axios.patch(`${server}/updateprofile`, {
            name, email
        },{
            withCredentials: true
        })
        dispatch(showMessage(data))
        dispatch(updateProfile({name, email}))
        dispatch(setLoadingFalse())

    }catch(err){
        dispatch(showError(err.response.data))
        dispatch(setLoadingFalse())
    }
}

export let forgotPass = (email) => async(dispatch) => {
    try{
        dispatch(setLoadingTrue())
        let {data} = await axios.post(`${server}/forgotpassword`, {email}, {withCredentials: true})
        dispatch(showMessage(data))
        dispatch(setLoadingFalse())
    } catch(err){
        dispatch(showError(err.response.data))
        dispatch(setLoadingFalse())
    }
}

export let resetPass = (token, newPassword) => async(dispatch) => {
    try{
        dispatch(setLoadingTrue())
        let {data} = await axios.patch(`${server}/resetpassword/${token}`, {
            newPassword
        }, {
            withCredentials: true
        })
        dispatch(showMessage(data))
        dispatch(setLoadingFalse())
    } catch(err) {
        dispatch(showError(err.response.data))
        dispatch(setLoadingFalse())
    }
}

export let requestACourse = (name, email, details) => async(dispatch) => {
  try {
    dispatch(setLoadingTrue())
    await axios.post(`${server}/requestcourse`, {
      name,
      email,
      details
    },{
      withCredentials: true
    })
    dispatch(setLoadingFalse())
    dispatch(showMessage({message: 'Course Request Sent'}))
  } catch (error) {
    dispatch(setLoadingFalse())
    dispatch(showError(error.response.data))
  }
}

export let contactUs = (name, email, message) => async(dispatch) => {
  try {
    dispatch(setLoadingTrue())
    await axios.post(`${server}/contactus`, {
      name,
      email,
      message
    },{
      withCredentials: true
    })
    dispatch(setLoadingFalse())
    dispatch(showMessage({message: 'Message Sent'}))
  } catch (error) {
    dispatch(setLoadingFalse())
    dispatch(showError({message: 'Some error occured'}))
  }
}

export let getPlaylist = (lectureIds) => async(dispatch) => {
  try {
    let {data} = await axios.get(`${server}/courses`, {withCredentials: true})
    let toAdd = []
    data.courses.forEach(ele => {
      if(lectureIds.includes(ele._id)) toAdd.push(ele)
    })
    dispatch(addLecture(toAdd))
  } catch (error) {
    dispatch(showError(error.response.data))
  }
}