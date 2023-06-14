import { Stack, Typography, TextField, Box, Button } from '@mui/material'
import React, { useState } from 'react'



const Subscribe = () => {
    let [price, changePrice] = useState('299.00')
    return (
        <Box bgcolor={'background.default'} minHeight={'100vh'} color={'text.primary'}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', paddingTop: '15vh' }}>
                <Stack gap={4} width={{xs: '66vw', sm:'16vw'}} sx={{display: 'flex', alignItems: 'center'}}>
                    <Typography variant='h4' fontWeight={700}>Welcome</Typography>
                    <Stack gap={4} sx={{ display: 'flex', alignItems: 'flex-start', boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px', borderRadius: '10px' }} width={'100%'}>
                        <Box bgcolor={'#ECC949'} height={'5vh'} width={'100%'} sx={{display: 'flex', alignItems: 'center', borderRadius: '10px'}} >
                            <Typography p={2} variant='p'>Pro Pack - ₹{price}</Typography>
                        </Box>
                        <Stack sx={{display: 'flex', alignItems: 'center', textAlign: 'center'}} gap={2}>
                            <Typography>Join pro pack and get access to all content</Typography>
                            <Typography>₹{price} Only</Typography>
                            <Button size='large' variant='contained'>Buy Now</Button>
                        </Stack>
                        <Stack bgcolor={'#292729'} width={'100%'} height={'6vh'} color={'white'} sx={{display: 'flex', justifyContent: 'center', borderRadius: '10px'}}>
                            <Typography className='payment-secured' variant='p' paddingLeft={2} >100% REFUND AT CANCELLATION</Typography>
                            <Typography paddingLeft={2}>*Terms & Conditions Apply</Typography>
                        </Stack>
                    </Stack>
                </Stack>
            </Box>
        </Box>
    )
}

export default Subscribe