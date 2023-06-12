import { Stack, Typography, TextField, Box, Button } from '@mui/material'
import React, { useState } from 'react'
import '../styles/Login.css'

const ForgotPassword = () => {
    let [email, updateEmail] = useState('')
    return (
        <Box bgcolor={'background.default'} minHeight={'100vh'} color={'text.primary'}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', paddingTop: '20vh' }}>
                <Stack gap={3} width={{xs: '50vw', sm:'30vw'}}>
                    <Typography variant='h4' fontWeight={700} sx={{paddingBottom: '3rem'}}>Forgot Password</Typography>
                    <TextField onChange={(e) => updateEmail(e.target.value)} fullWidth label="Email Address" value={email} variant="outlined" size='small' type='email' />
                    <Button variant='contained' size='medium'>Get Reset Token</Button>
                </Stack>
            </Box>
        </Box>
    )
}

export default ForgotPassword