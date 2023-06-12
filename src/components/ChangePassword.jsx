import { Stack, Typography, TextField, Box, Button } from '@mui/material'
import React, { useState } from 'react'


const ChangePassword = () => {
    let [userInfo, updateUserInfo] = useState({'oldPassword': '', 'newPassword': ''})
    return (
        <Box bgcolor={'background.default'} minHeight={'100vh'} color={'text.primary'}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', paddingTop: '20vh' }}>
                <Stack gap={9} width={{xs: '50vw', sm:'30vw'}}>
                    <Typography variant='h4' fontWeight={700}>Change Password</Typography>
                    <Stack gap={2} sx={{ display: 'flex', alignItems: 'flex-start' }} width={'100%'}>
                        <TextField name='oldPassword' onChange={(e) => updateUserInfo({...userInfo, [e.target.name]:e.target.value})} fullWidth label="Old Password" value={userInfo.oldPassword} variant="outlined" size='small' type='password' />
                        <TextField name='newPassword' onChange={(e) => updateUserInfo({...userInfo, [e.target.name]:e.target.value})} fullWidth label="New Password" value={userInfo.newPassword} variant="outlined" size='small' type='password' />
                        <Box width={'100%'} sx={{display: 'flex', justifyContent: 'center'}}>
                            <Button variant='contained' size='large'>Change Password</Button>
                        </Box>
                    </Stack>
                </Stack>
            </Box>
        </Box>
    )
}

export default ChangePassword