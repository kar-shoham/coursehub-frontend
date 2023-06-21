import axios from "axios"
import { getCourseFailure, getCourseRequest, getCourseSuccess, removeACourse, setLoadingFalse, setLoadingTrue } from "../reducers/courseReducer"
import { server } from "../store"
import { showError, showMessage } from "../reducers/userReducer"

export let getAllCourses = (keyword="", category="", limit = 'none') => async(dispatch) => {
    try {
        dispatch(getCourseRequest())
        let {data} = await axios.get(`${server}/courses?keyword=${keyword}&category=${category}`)
        if(limit !== 'none' && data.courses.length > limit) {
            data.courses = data.courses.slice(0, limit) 
        }
        dispatch(getCourseSuccess(data))
    } catch (error) {
        dispatch(getCourseFailure(error.response.data))
    }
}

export let createACourse = (formData) => async(dispatch) => {
    try {
        dispatch(setLoadingTrue())
        await axios.post(`${server}/createcourse`, formData, {withCredentials: true})
        dispatch(showMessage({'message': 'Course Created Successfully'}))
        dispatch(setLoadingFalse())
    } catch (error) {
        dispatch(showError(error.response.data))
        dispatch(setLoadingFalse())
    }
}

export let deleteCourse = (id) => async(dispatch) => {
    try {
        let {data} = await axios.delete(`${server}/course/${id}`, {withCredentials: true})
        dispatch(showMessage(data))
        dispatch(removeACourse({id}))
    } catch (error) {
        dispatch(showError(error.response.data))
    }
}

export let getACourses = (id) => async(dispatch) => {
    try {
        dispatch(setLoadingTrue())
        await axios.post(`${server}/createcourse`, formData, {withCredentials: true})
        dispatch(showMessage({'message': 'Course Created Successfully'}))
        dispatch(setLoadingFalse())
    } catch (error) {
        dispatch(showError(error.response.data))
        dispatch(setLoadingFalse())
    }
}