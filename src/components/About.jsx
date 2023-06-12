import { Stack, Typography, TextField, Box, Button, Avatar } from '@mui/material'
import React, { useState } from 'react'
import MyImg from '../assets/me.jpeg'
import { Link } from 'react-router-dom'
import '../styles/About.css'
import { Paid } from '@mui/icons-material'
import tnc from '../assets/tnc.js'

const About = () => {
    let [details, updateDetails] = useState({
        'name': 'Shoham Kar', 
        'info': 'Hi, I am a noob who is learning full-stack web development.',
        'aboutSite': 'Course Hub is a platform where you and upload and view courses from a variety of categories. Some of the courses are only for premium users.',
        'tnc': tnc
    })
    return (
        <Box bgcolor={'background.default'} minHeight={'100vh'} color={'text.primary'}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                <Stack gap={3} p={'7rem 5rem 2rem 5rem'} width={{xs: '50vw', sm:'48vw'}} minHeight={'100vh'} sx={{boxShadow: {xs: 'none', sm:'rgba(0, 0, 0, 0.1) 0px 4px 12px'}, display: 'flex', alignItems: 'center'}}>
                    <Typography variant='h4' fontWeight={700}>About Us</Typography>
                    <Stack direction={{xs:'column', sm:'row'}} width={'75%'} sx={{display:'flex', justifyContent: 'space-between', alignItems: 'center'}} p={2}>
                        <Avatar src={MyImg} sx={{width: '11rem', height: '11rem'}}/>
                        <Stack width={'66%'} gap={2}>
                            <Typography variant='h4' fontWeight={600} fontSize={{xs:'1.1rem', sm: '2rem'}}>{details.name}</Typography>
                            <Typography variant='p' sx={{display: {xs: 'none', sm: 'block'}}} >{details.info}</Typography>

                        </Stack>
                    </Stack>
                    <Stack direction={{xs:'column', sm:'row'}} paddingTop={7} paddingBottom={7} width={'88%'} sx={{display: 'flex', alignItems: 'center'}} gap={2}>
                        <Typography className='details' flex={8}>{details.aboutSite}</Typography>
                        <Box flex={2}>
                            <Link className='checkout-plan'>Checkout Our Plan</Link>
                        </Box>
                    </Stack>
                    <Stack width={'88%'} sx={{display: 'flex', alignItems:'center'}} paddingBottom={7}>
                    <Typography className='payment-secured' variant='h5'>Terms & Conditions</Typography>
                    <TextField  multiline rows={20} fullWidth  value={details.tnc} variant="outlined"/>
                    </Stack>
                    <Box sx={{display: 'flex', alignItems: 'center'}} gap={2}>
                        <Paid/>
                        <Typography className='payment-secured' variant='h6'>Payment secured by Razorpay</Typography>
                    </Box>

                </Stack>
            </Box>
        </Box>
    )
}

export default About