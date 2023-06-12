import { Box, Button, Stack, Typography, styled } from '@mui/material'
import { LinkedIn, GitHub, Twitter, Facebook, YouTube } from '@mui/icons-material'
import React from 'react'
import GeekImage from '../assets/bg.png'
import '../styles/Home.css'
import { Link } from 'react-router-dom'

const ParentStack = styled(Stack)({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
})
const BannerBox = styled(Stack)({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#292729',
    color: 'white',
    padding: '30px 0'
})
const Home = () => {
  return (
    <Stack width={{xs:'100%', sm:'100%'}} height={'100vh'} direction={'column'} bgcolor={'background.default'} color={'text.primary'}>
        <ParentStack gap={10} direction={{xs: 'column', sm: 'row'}} flex={9}>
            <Stack flex={5} sx={{display: 'flex', alignItems: {xs:'center', sm:'flex-end'}, justifyContent: 'center'}} gap={2} p={3}>
                <Typography fontWeight={700} variant='h3'>LEARN FROM THE EXPERTS</Typography>
                <Typography variant='p'>Find Valuable Content At Reasonable Price</Typography>
                <Link to={'/courses'}><Button variant="contained" size='large'>Explore Now</Button></Link>
            </Stack>
            <Box flex={3} sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <img className='geek' src={GeekImage} alt="" style={{width: '70%'}}/>
            </Box>
        </ParentStack>
        <BannerBox gap={3} flex={2} width={'100%'}>
            <Typography variant='h4' fontWeight={'700'}>OUR SOCIALS</Typography>
            <Stack direction={'row'} width={'70%'} sx={{display: 'flex', justifyContent: 'space-around'}}>
                <Button sx={{color: 'white'}}>
                    <LinkedIn  fontSize='large'/>
                </Button>
                <Button sx={{color: 'white'}}>
                    <GitHub  fontSize='large'/>
                </Button>
                <Button sx={{color: 'white'}}>
                    <Twitter  fontSize='large'/>
                </Button>
                <Button sx={{color: 'white'}}>
                    <Facebook  fontSize='large'/>
                </Button>
                <Button sx={{color: 'white'}}>
                    <YouTube  fontSize='large'/>
                </Button>
            </Stack>
        </BannerBox>
    </Stack>
  )
}


export default Home