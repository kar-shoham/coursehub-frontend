import { Stack, Typography, TextField, Box, Button } from '@mui/material'
import React, { useState } from 'react'
import { toast } from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { changePassword, getMyProfile } from '../redux/actions/userActions'


const ChangePassword = ({isAuthenticated}) => {
    let dispatch = useDispatch()
    let [userInfo, updateUserInfo] = useState({'oldPassword': '', 'newPassword': ''})
    let changePasswordHandler = () => {
        if(!userInfo.oldPassword || !userInfo.newPassword){
            return toast.error('Some of the fields are missing')
        }
        dispatch(changePassword(userInfo.oldPassword, userInfo.newPassword))
        updateUserInfo({'oldPassword': '', 'newPassword': ''})
    }
    if(!isAuthenticated){
        return <Navigate to={'/login'}/>
    }
    return (
        <Box bgcolor={'background.default'} minHeight={'100vh'} color={'text.primary'}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', paddingTop: '20vh' }}>
                <Stack gap={9} width={{xs: '50vw', sm:'30vw'}}>
                    <Typography variant='h4' fontWeight={700}>Change Password</Typography>
                    <Stack gap={2} sx={{ display: 'flex', alignItems: 'flex-start' }} width={'100%'}>
                        <TextField name='oldPassword' onChange={(e) => updateUserInfo({...userInfo, [e.target.name]:e.target.value})} fullWidth label="Old Password" value={userInfo.oldPassword} variant="outlined" size='small' type='password' />
                        <TextField name='newPassword' onChange={(e) => updateUserInfo({...userInfo, [e.target.name]:e.target.value})} fullWidth label="New Password" value={userInfo.newPassword} variant="outlined" size='small' type='password' />
                        <Box width={'100%'} sx={{display: 'flex', justifyContent: 'center'}}>
                            <Button onClick={changePasswordHandler} variant='contained' size='large'>Change Password</Button>
                        </Box>
                    </Stack>
                </Stack>
            </Box>
        </Box>
    )
}

export default ChangePassword