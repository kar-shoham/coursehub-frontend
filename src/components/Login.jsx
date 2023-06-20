import { Stack, Typography, TextField, Box, Button } from '@mui/material'
import React, { useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import '../styles/Login.css'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../redux/actions/userActions'
import { toast } from 'react-hot-toast'


const Login = ({isAuthenticated, user}) => {
    let [userInfo, updateUserInfo] = useState({'email': '', 'password': ''})
    let dispatch = useDispatch()
    let {loading} = useSelector(state => state.user)
    let loginHandler = () => {
        if(!userInfo.email || !userInfo.password){
            return toast.error('Some of the fields are missing')
        }
        dispatch(login(userInfo.email, userInfo.password))
    }
    if(isAuthenticated){
        return <Navigate to={'/profile'} replace/>
    }
    return (
        <Box bgcolor={'background.default'} minHeight={'100vh'} color={'text.primary'}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', paddingTop: '20vh' }}>
                <Stack gap={9} width={{xs: '50vw', sm:'30vw'}}>
                    <Typography variant='h4' fontWeight={700}>Welcome to Course Hub</Typography>
                    <Stack gap={2} sx={{ display: 'flex', alignItems: 'flex-start' }} width={'100%'}>
                        <TextField name='email' onChange={(e) => updateUserInfo({...userInfo, [e.target.name]:e.target.value})} fullWidth label="Email Address" value={userInfo.email} variant="outlined" size='small' type='email' />
                        <TextField name='password' onChange={(e) => updateUserInfo({...userInfo, [e.target.name]:e.target.value})} fullWidth label="Password" value={userInfo.password} variant="outlined" size='small' type='password' />
                        <Link className='login-links' to={'/forgotpassword'}>Forgot Password</Link>
                        <Button disabled={loading} onClick={() => loginHandler()} variant='contained' size='small'>Login</Button>
                        <Typography className='new-user' variant='p'>New User? <Link className='register' to={'/register'}>Sign Up</Link> here</Typography>
                    </Stack>
                </Stack>
            </Box>
        </Box>
    )
}

export default Login