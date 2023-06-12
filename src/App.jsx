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
      </Routes>
    </Router>
    </ThemeProvider>
  )
}

export default App