import { Stack, Typography, TextField, Box, Button } from '@mui/material'
import React, { useState } from 'react'
import { toast } from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { contactUs } from '../redux/actions/userActions'

const Contact = () => {
    let dispatch = useDispatch()
    let [userInfo, updateUserInfo] = useState({'name': '', 'email': '', 'message': ''})
    let contactUsHandler = () => {
        if(!userInfo.name || !userInfo.email || !userInfo.message){
            return toast.error('Some of the fields are missing')
        }
        dispatch(contactUs(userInfo.name, userInfo.email, userInfo.message))
        updateUserInfo({'name': '', 'email': '', 'message': ''})
    }
    return (
        <Box bgcolor={'background.default'} minHeight={'100vh'} color={'text.primary'}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', paddingTop: '20vh' }}>
                <Stack gap={9} width={{xs: '50vw', sm:'30vw'}}>
                    <Typography variant='h4' fontWeight={700}>Contact Us</Typography>
                    <Stack gap={2} sx={{ display: 'flex', alignItems: 'flex-start' }} width={'100%'}>
                        <TextField name='name' onChange={(e) => updateUserInfo({...userInfo, [e.target.name]:e.target.value})} fullWidth label="Name" value={userInfo.name} variant="outlined" size='small' type='text' />
                        <TextField name='email' onChange={(e) => updateUserInfo({...userInfo, [e.target.name]:e.target.value})} fullWidth label="Email Address" value={userInfo.email} variant="outlined" size='small' type='email' />
                        <TextField name='message' onChange={(e) => updateUserInfo({...userInfo, [e.target.name]:e.target.value})}  multiline rows={3} fullWidth label="Message" value={userInfo.message} variant="outlined" size='small'/>
                        <Button variant='contained' onClick={contactUsHandler} size='small'>Send Mail</Button>
                        <Typography className='new-user' variant='p'>Request for a course? <Link className='register' to={'/request'}>Click here</Link></Typography>
                    </Stack>
                </Stack>
            </Box>
        </Box>
    )
}

export default Contact