import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './components/Home'
import Header from './components/Header'
import { ThemeProvider, createTheme } from '@mui/material'
import Courses from './components/Courses'
import Login from './components/Login'
import Register from './components/Register'
import ForgotPassword from './components/ForgotPassword'
import ResetPassword from './components/ResetPassword'
import Contact from './components/Contact'
import RequestCourse from './components/RequestCourse'
import About from './components/About'
import Subscribe from './components/Payment/Subscribe'
import PaymentSuccess from './components/Payment/PaymentSuccess'
import NotFound from './components/NotFound'
import PaymentFail from './components/Payment/PaymentFail'
import CoursePage from './components/CoursePage'
import Profile from './components/Profile'
import ChangePassword from './components/ChangePassword'
import UpdateProfile from './components/UpdateProfile'
// import Dashboard from './components/Admin/Dashboard'
import CreateCourse from './components/Admin/CreateCourse'
import AllCourses from './components/Admin/AllCourses'
import Users from './components/Admin/Users'
import { Toaster, toast } from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { clearError, clearMessage } from './redux/reducers/userReducer'
import { getMyProfile } from './redux/actions/userActions'
import Loading from './components/Loading'
import CourseNotFound from './components/CourseNotFound'

const App = () => {
  let [mode, toggleMode] = useState('light')
  const DarkTheme = createTheme({
    palette: {
      mode: mode
    }
  })

  let {isAuthenticated, user, error, message, loading} = useSelector(state => state.user)
  let dispatch = useDispatch()
  useEffect(() => {
    if(error){
      toast.error(error)
      dispatch(clearError())
    }
    if(message){
      toast.success(message)
      dispatch(clearMessage())
    }
  }, [dispatch, error, message])

  useEffect(() => {
    dispatch(getMyProfile())
  }, [dispatch])
  return (
    <ThemeProvider theme={DarkTheme}>
      <Router>
        {loading === true ? (<Loading/>) : (
          <>
          <Header mode={mode} toggleMode={toggleMode} isAuthenticated={isAuthenticated} user={user}/>
          <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/courses' element={<Courses/>}/>
            <Route path='/login' element={<Login isAuthenticated={isAuthenticated} user={user}/>}/>
            <Route path='/register' element={<Register isAuthenticated={isAuthenticated}/>}/>
            <Route path='/forgotpassword' element={<ForgotPassword isAuthenticated={isAuthenticated}/>}/>
            <Route path='/resetpassword/:id' element={<ResetPassword isAuthenticated={isAuthenticated}/>}/>
            <Route path='/contactus' element={<Contact/>}/>
            <Route path='/request' element={<RequestCourse/>}/>
            <Route path='/about' element={<About/>}/>
            <Route path='/subscribe' element={<Subscribe isAuthenticated={isAuthenticated} user={user}/>}/>
            <Route path='/paymentsuccess' element={<PaymentSuccess/>}/>
            <Route path='/paymentfailed' element={<PaymentFail/>}/>
            <Route path='/course/:id' element={<CoursePage user={user} isAuthenticated={isAuthenticated}/>} />
            <Route path='/profile' element={<Profile isAuthenticated={isAuthenticated} user={user}/>}/>
            <Route path='/changepassword' element={<ChangePassword isAuthenticated={isAuthenticated} />}/>
            <Route path='/updateprofile' element={<UpdateProfile isAuthenticated={isAuthenticated}/>}/>
    
            {/* <Route path='/admin/dashboard' element={<Dashboard/>}/> */}
            <Route path='/admin/createcourse' element={<CreateCourse user={user} isAuthenticated={isAuthenticated}/>}/>
            <Route path='/admin/courses' element={<AllCourses user={user} isAuthenticated={isAuthenticated}/>}/>
            <Route path='/admin/users' element={<Users user={user} isAuthenticated={isAuthenticated}/>} />

            <Route path='/coursenotfound' element={<CourseNotFound/>}/>
            <Route path='*' element={<NotFound/>}/>
          </Routes>
          <Toaster/>
          </>
        )}
    </Router>
    </ThemeProvider>
  )
}

export default App