import { Stack, Typography, TextField, Box, Button } from '@mui/material'
import React, { useState } from 'react'
import '../styles/Login.css'
import { Navigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import { forgotPass } from '../redux/actions/userActions'

const ForgotPassword = ({isAuthenticated}) => {
    let [email, updateEmail] = useState('')
    let dispatch = useDispatch()
    if(isAuthenticated){
        toast.error('You are already logged in')
        return <Navigate to={'/profile'}/>
    }
    let forgotPasswordHandler = () => {
        if(!email){
            return toast.error('Please enter a valid email')
        }
        dispatch(forgotPass(email))
    }
    return (
        <Box bgcolor={'background.default'} minHeight={'100vh'} color={'text.primary'}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', paddingTop: '20vh' }}>
                <Stack gap={3} width={{xs: '50vw', sm:'30vw'}}>
                    <Typography variant='h4' fontWeight={700} sx={{paddingBottom: '3rem'}}>Forgot Password</Typography>
                    <TextField onChange={(e) => updateEmail(e.target.value)} fullWidth label="Email Address" value={email} variant="outlined" size='small' type='email' />
                    <Button variant='contained' size='medium' onClick={() => forgotPasswordHandler()}>Get Reset Token</Button>
                </Stack>
            </Box>
        </Box>
    )
}

export default ForgotPassword