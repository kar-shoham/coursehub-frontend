import { Stack, Typography, TextField, Box, Button, Avatar, styled } from '@mui/material'
import React, { useState } from 'react'
import { toast } from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import { Link, Navigate } from 'react-router-dom'
import { register } from '../redux/actions/userActions'



const Register = ({isAuthenticated}) => {
    let [userInfo, updateUserInfo] = useState({'name': '', 'email': '', 'password': ''})
    let [image, changeImage] = useState('')
    let [imagePrev, changeImgPrev] = useState('')
    let dispatch = useDispatch()
    let avtarHandler = (e) => {
        let file = e.target.files[0]
        let reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onloadend = () => {
            changeImgPrev(reader.result)
            changeImage(file)
        }
    } 
    let registerHandler = () => {
        if(!userInfo.name || !userInfo.password || !userInfo.email || !image){
            return toast.error('Some of the fields are missing')
        }
        let formData = new FormData()
        formData.append('name', userInfo.name)
        formData.append('email', userInfo.email)
        formData.append('password', userInfo.password)
        formData.append('file', image)
        dispatch(register(formData))
    }
    if(isAuthenticated){
        return <Navigate to={'/profile'} replace/>
    }
    return (
        <Box bgcolor={'background.default'} minHeight={'100vh'} color={'text.primary'}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', paddingTop: '15vh' }}>
                <Stack gap={9} width={{xs: '50vw', sm:'30vw'}}>
                    <Typography variant='h4' fontWeight={700}>Register to Course Hub</Typography>
                    <Stack gap={2} sx={{ display: 'flex', alignItems: 'flex-start' }} width={'100%'}>
                        <Box width={'100%'} sx={{display: 'flex', justifyContent: 'center'}}>
                            <Avatar src={imagePrev} sx={{width: '8rem', height: '8rem'}}/>
                        </Box>
                        <TextField name='name' onChange={(e) => updateUserInfo({...userInfo, [e.target.name]:e.target.value})} fullWidth label="Name" value={userInfo.name} variant="outlined" size='small'/>
                        <TextField name='email' onChange={(e) => updateUserInfo({...userInfo, [e.target.name]:e.target.value})} fullWidth label="Email Address" value={userInfo.email} variant="outlined" size='small' type='email' />
                        <TextField name='password' onChange={(e) => updateUserInfo({...userInfo, [e.target.name]:e.target.value})} fullWidth label="Password" value={userInfo.password} variant="outlined" size='small' type='password' />
                        <TextField onChange={avtarHandler} className='avtar' fullWidth  variant="outlined" size='small' type='file'  inputProps={{accept:"image/*"}}/>
                        <Button onClick={() => registerHandler()} variant='contained' size='small'>Sign Up</Button>
                        <Typography className='new-user' variant='p'>Already Signed Up? <Link className='register' to={'/login'}>Login</Link> here</Typography>
                    </Stack>
                </Stack>
            </Box>
        </Box>
    )
}

export default Register