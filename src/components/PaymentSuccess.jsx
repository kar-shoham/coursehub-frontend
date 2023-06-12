import { CheckCircle } from '@mui/icons-material'
import { Stack, Typography, TextField, Box, Button } from '@mui/material'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'


const PaymentSuccess = () => {
    let [refId, changeRefId] = useState('dsfdzdfsakjh12.fdsa')
    return (
        <Box bgcolor={'background.default'} minHeight={'100vh'} color={'text.primary'}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', paddingTop: '15vh' }}>
                <Stack gap={4} width={{xs: '66vw', sm:'18vw'}} sx={{display: 'flex', alignItems: 'center'}}>
                    <Typography variant='h4' fontWeight={700}>You have Pro Pack</Typography>
                    <Stack gap={4} paddingBottom={4} sx={{ display: 'flex', alignItems: 'flex-start', boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px', borderRadius: '10px' }} width={'100%'}>
                        <Box bgcolor={'#ECC949'} height={'5vh'} width={'100%'} sx={{display: 'flex', alignItems: 'center', borderRadius: '10px'}} >
                            <Typography p={2} variant='p'>Payment Success</Typography>
                        </Box>
                        <Stack sx={{display: 'flex', alignItems: 'center', textAlign: 'center'}} gap={2} p={2}>
                            <Typography>Congratulations, you're a pro member now. You have access to premium content.</Typography>
                            <Box><CheckCircle style={{ fontSize: 55 }}/></Box>
                            <Link className='checkout-plan' to={'/profile'}>Go to profile</Link>
                            <Typography fontWeight={600} >Reference: {refId}</Typography>
                        </Stack>
                    </Stack>
                </Stack>
            </Box>
        </Box>
    )
}

export default PaymentSuccess