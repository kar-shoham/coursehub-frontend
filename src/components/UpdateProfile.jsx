import { Stack, Typography, TextField, Box, Button } from '@mui/material'
import React, { useState } from 'react'

const UpdateProfile = () => {
    let [userInfo, updateUserInfo] = useState({'name': '', 'email': ''})
    return (
        <Box bgcolor={'background.default'} minHeight={'100vh'} color={'text.primary'}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', paddingTop: '20vh' }}>
                <Stack gap={9} width={{xs: '50vw', sm:'30vw'}}>
                    <Typography variant='h4' fontWeight={700}>Update Profile</Typography>
                    <Stack gap={2} sx={{ display: 'flex', alignItems: 'flex-start' }} width={'100%'}>
                        <TextField name='name' onChange={(e) => updateUserInfo({...userInfo, [e.target.name]:e.target.value})} fullWidth label="Name" value={userInfo.name} variant="outlined" size='small' type='text' />
                        <TextField name='email' onChange={(e) => updateUserInfo({...userInfo, [e.target.name]:e.target.value})} fullWidth label="Email" value={userInfo.email} variant="outlined" size='small' type='email' />
                        <Box width={'100%'} sx={{display: 'flex', justifyContent: 'center'}}>
                            <Button variant='contained' size='large'>Update Profile</Button>
                        </Box>
                    </Stack>
                </Stack>
            </Box>
        </Box>
    )
}

export default UpdateProfile