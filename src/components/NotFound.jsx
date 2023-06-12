import React from 'react'
import { Box, Stack, Typography } from '@mui/material'
import { Error } from '@mui/icons-material'
import { Link } from 'react-router-dom'
import '../styles/NotFound.css'

const NotFound = () => {
  return (
    <Box bgcolor={'background.default'} color={'text.primary'} width={'100vw'} height={'100vh'} sx={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
        <Stack sx={{display: 'flex', alignItems: 'center', justifyContent: 'center'}} gap={1.3}>
            <Box><Error style={{ fontSize: 75 }}/></Box>
            <Typography className='not-found' variant='h3'>Page Not Found</Typography>
            <Link to={'/'}>Go to home</Link>
        </Stack>
    </Box>
  )
}

export default NotFound