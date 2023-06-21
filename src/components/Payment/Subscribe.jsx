import { Stack, Typography, TextField, Box, Button } from '@mui/material'
import axios from 'axios'
import React, { useState } from 'react'
import { Navigate } from 'react-router-dom'
import { server } from '../../redux/store'
import { toast } from 'react-hot-toast'



const Subscribe = ({isAuthenticated, user}) => {
    
    let [price, changePrice] = useState('199.00')
    let subscriptionHandler = async() => {
        try {
            
            let {data} = await axios.post(`${server}/buysubscription`, {}, {withCredentials: true})
            let options = {
                "key": "rzp_test_HxA0hFOgH4qpLB", // Enter the Key ID generated from the Dashboard
                "currency": "INR",
                "name": "Course Hub Pro Pack", //your business name
                "description": "Pro Pack Transaction",
                "image": "https://t3.ftcdn.net/jpg/04/47/40/04/360_F_447400471_uZrIJekwYkirXuG8p6XS9UfGBEqmt9yK.jpg",
                "subscription_id": data.subscription.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
                "callback_url": `${server}/paymentverification`,
                "prefill": { //We recommend using the prefill parameter to auto-fill customer's contact information especially their phone number
                    "name": user.name, //your customer's name
                    "email": user.email,
                    "contact": '9366504951' //Provide the customer's phone number for better conversion rates 
                },
                "notes": {
                    "address": "Razorpay Corporate Office"
                },
                "theme": {
                    "color": "#3399cc"
                }
            };
            let razorPay = new window.Razorpay(options);
            razorPay.open();
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }
    if(!isAuthenticated){
        return <Navigate to={'/login'}/>
    }
    if(user?.subscription?.status === 'active'){
        toast.error('You already have an active subscription')
        return <Navigate to={'/profile'}/>
    }
    if(user?.role === 'admin'){
        toast.error('Admin cannot buy subscription')
        return <Navigate to={'/profile'}/>
    }
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
                            <Button size='large' onClick={subscriptionHandler} variant='contained'>Buy Now</Button>
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