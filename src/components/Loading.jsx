import React from 'react'
import '../styles/Loader.css'
import { Box } from '@mui/material'

const Loading = () => {
  return (
    <Box sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100vw',
        height: '100vh'
    }} bgcolor={'background.default'} color={'text.primary'}>
        <div className="three-body">
            <div className="three-body__dot"></div>
            <div className="three-body__dot"></div>
            <div className="three-body__dot"></div>
        </div>
    </Box>
  )
}

export default Loading