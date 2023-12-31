import { Stack, Typography, TextField, Box, Button } from '@mui/material'
import React, { useState } from 'react'
import { toast } from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { requestACourse } from '../redux/actions/userActions'

const RequestCourse = () => {
    let dispatch = useDispatch()
    let [userInfo, updateUserInfo] = useState({'name': '', 'email': '', 'course': ''})
    let requestCourseHandler = () => {
        if(!userInfo.name || !userInfo.email || !userInfo.course){
            return toast.error('Some of the fields are missing')
        }
        dispatch(requestACourse(userInfo.name, userInfo.email, userInfo.course))
        updateUserInfo({'name': '', 'email': '', 'course': ''})
    }
    return (
        <Box bgcolor={'background.default'} minHeight={'100vh'} color={'text.primary'}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', paddingTop: '20vh' }}>
                <Stack gap={9} width={{xs: '50vw', sm:'30vw'}}>
                    <Typography variant='h4' fontWeight={700}>Request New Course</Typography>
                    <Stack gap={2} sx={{ display: 'flex', alignItems: 'flex-start' }} width={'100%'}>
                        <TextField name='name' onChange={(e) => updateUserInfo({...userInfo, [e.target.name]:e.target.value})} fullWidth label="Name" value={userInfo.name} variant="outlined" size='small' type='text' />
                        <TextField name='email' onChange={(e) => updateUserInfo({...userInfo, [e.target.name]:e.target.value})} fullWidth label="Email Address" value={userInfo.email} variant="outlined" size='small' type='email' />
                        <TextField name='course' onChange={(e) => updateUserInfo({...userInfo, [e.target.name]:e.target.value})}  multiline rows={3} fullWidth label="Explain the course" value={userInfo.course} variant="outlined" size='small'/>
                        <Button variant='contained' size='small' onClick={requestCourseHandler}>Request Course</Button>
                        <Typography className='new-user' variant='p'>See available courses! <Link className='register' to={'/courses'}>Click here</Link></Typography>
                    </Stack>
                </Stack>
            </Box>
        </Box>
    )
}

export default RequestCourse