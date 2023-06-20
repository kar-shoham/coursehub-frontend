import React from 'react'
import { Box, Stack } from '@mui/material'
import '../../styles/Dashboard.css'
import Sidebar from './Sidebar'


const Dashboard = ({user, isAuthenticated}) => {
  return (
    <Box minHeight={'100vh'} width={'100%'} bgcolor={'background.default'} color={'text.primary'}>
        <Stack paddingTop={5} direction={'row'} className='admin-cursor-add'>
            <Box flex={13}>

            </Box>
            <Sidebar/>
        </Stack>
    </Box>
  )
}




export default Dashboard