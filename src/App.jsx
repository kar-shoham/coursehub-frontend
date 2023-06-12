import React, { useState } from 'react'
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
import Subscribe from './components/Subscribe'
import PaymentSuccess from './components/PaymentSuccess'
import NotFound from './components/NotFound'
import PaymentFail from './components/PaymentFail'
import CoursePage from './components/CoursePage'
import Profile from './components/Profile'
import ChangePassword from './components/ChangePassword'
import UpdateProfile from './components/UpdateProfile'

const App = () => {
  let [mode, toggleMode] = useState('light')
  const DarkTheme = createTheme({
    palette: {
      mode: mode
    }
  })
  return (
    <ThemeProvider theme={DarkTheme}>
      <Router>
      <Header mode={mode} toggleMode={toggleMode}/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/courses' element={<Courses/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/forgotpassword' element={<ForgotPassword/>}/>
        <Route path='/resetpassword/:id' element={<ResetPassword/>}/>
        <Route path='/contactus' element={<Contact/>}/>
        <Route path='/request' element={<RequestCourse/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/subscribe' element={<Subscribe/>}/>
        <Route path='/paymentsuccess' element={<PaymentSuccess/>}/>
        <Route path='/paymentfailed' element={<PaymentFail/>}/>
        <Route path='/course/:id' element={<CoursePage/>} />
        <Route path='/profile' element={<Profile/>}/>
        <Route path='/changepassword' element={<ChangePassword/>}/>
        <Route path='/updateprofile' element={<UpdateProfile/>}/>
        <Route path='*' element={<NotFound/>}/>
      </Routes>
    </Router>
    </ThemeProvider>
  )
}

export default App