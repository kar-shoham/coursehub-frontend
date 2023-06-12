import { Stack, Typography, TextField, Box, Button } from '@mui/material'
import React, { useState } from 'react'
import '../styles/Login.css'

const ResetPassword = () => {
    let [password, updatePassword] = useState('')
    return (
        <Box bgcolor={'background.default'} minHeight={'100vh'} color={'text.primary'}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', paddingTop: '20vh' }}>
                <Stack gap={3} width={{xs: '50vw', sm:'30vw'}}>
                    <Typography variant='h4' fontWeight={700} sx={{paddingBottom: '3rem'}}>Reset Password</Typography>
                    <TextField onChange={(e) => updatePassword(e.target.value)} fullWidth label="New Password" value={password} variant="outlined" size='small' type='password' />
                    <Button variant='contained' size='medium'>Reset Password</Button>
                </Stack>
            </Box>
        </Box>
    )
}

export default ResetPassword