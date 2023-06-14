import { Box, Button, Stack, styled, Drawer, Typography, Divider, ListItemButton, ListItemText } from '@mui/material'
import { Menu, ModeNight, Dashboard,Logout } from '@mui/icons-material'
import React, { useState } from 'react'
import Logo from '../assets/chlogo.png'
import { Link } from 'react-router-dom'


const MyStack = styled(Stack)({
    display: 'flex',
    justifyContent: 'space-between',
    position: 'absolute',
    width: '98vw'
})
const DrawerBox = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '100vh',
    padding: '.5rem .5rem 1.2rem .5rem',
    width: '90%'
})
const Header = ({ mode, toggleMode }) => {

    let [isAuthenticated, toggleAuth] = useState(true)
    let [user, updateUser] = useState({ role: 'admin' })

    let [drawer, toggleDrawer] = useState(false)
    return (
        <Box className='header'>
            <Drawer anchor='left' open={drawer} onClose={() => toggleDrawer(false)}>
                <DrawerBox>
                    <Stack>
                        <Typography sx={{ display: 'flex', alignItems: 'center' }} fontWeight={500} variant='h6' width={'10rem'} textAlign={'center'} p={1.2}>COURSE HUB
                            &nbsp; <img src={Logo} alt="" style={{ width: '1.5rem', height: '1.3rem' }} /></Typography>
                        <Divider />
                        <DrawerList to={'/'} text={'Home'} toggleDrawer={toggleDrawer} drawer={drawer} />
                        <DrawerList to={'/courses'} text={'Browse All Courses'} toggleDrawer={toggleDrawer} drawer={drawer} />
                        <DrawerList to={'/request'} text={'Request a Course'} toggleDrawer={toggleDrawer} drawer={drawer} />
                        <DrawerList to={'/contactus'} text={'Contact Us'} toggleDrawer={toggleDrawer} drawer={drawer} />
                        <DrawerList to={'/about'} text={'About'} toggleDrawer={toggleDrawer} drawer={drawer} />
                    </Stack>
                    <Stack sx={{ display: 'flex', alignItems: 'center' }} gap={2}>
                        {isAuthenticated ?
                            (<Stack direction={'row'} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                                <Link to={'/profile'}><Button onClick={() => toggleDrawer(!drawer)} variant="outlined" size='small' color='success'>Profile</Button></Link>
                                <Link to={'/logout'}><Button onClick={() => toggleDrawer(!drawer)} variant="contained" size='small' startIcon={<Logout/>} >Logout</Button></Link>
                            </Stack>)
                            :
                            (<Stack direction={'row'} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                                <Link to={'/login'}><Button onClick={() => toggleDrawer(!drawer)} variant="contained" size='small'>Login</Button></Link>
                                <Typography variant='p'>or</Typography>
                                <Link to={'/register'}><Button onClick={() => toggleDrawer(!drawer)} variant="contained" size='small'>Register</Button></Link>
                            </Stack>)}

                        {user.role === 'admin' ? (<Link to={'/admin/createcourse'}>
                            <Button variant="outlined" onClick={() => toggleDrawer(!drawer)} size='small' startIcon={<Dashboard />}>Admin</Button>
                        </Link>) : (<></>)}

                    </Stack>
                </DrawerBox>
            </Drawer>
            <MyStack direction={'row'}>
                <Button onClick={() => toggleDrawer(!drawer)}>
                    <Menu />
                </Button>
                <Button onClick={() => { mode === 'light' ? toggleMode('dark') : toggleMode('light') }}>
                    <ModeNight />
                </Button>
            </MyStack>
        </Box>
    )
}
const DrawerList = ({ text, to, drawer, toggleDrawer }) => {
    return (
        <ListItemButton onClick={() => toggleDrawer(!drawer)} component={Link} to={to}>
            <ListItemText primary={text} />
        </ListItemButton>
    )
}

export default Header