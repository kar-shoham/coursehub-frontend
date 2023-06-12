import { Stack, Typography, Box, Button, Avatar, Modal } from '@mui/material'
import React, { useState } from 'react'
import MyImg from '../assets/me.jpeg'
import { Link } from 'react-router-dom'
import '../styles/Profile.css'
import tnc from '../assets/tnc.js'
import { TextField } from '@mui/material'
import { Close } from '@mui/icons-material'
import { IconButton } from '@mui/material'

const Profile = () => {
    let [details, updateDetails] = useState({
        'name': 'Shoham Kar',
        'email': 'kar.shoham@gmail.com',
        'createdAt': '25-03-2023',
        'tnc': tnc
    })
    let [open, changeOpen] = useState(false)
    let [image, changeImage] = useState('')
    let [imagePrev, changeImgPrev] = useState(MyImg)
    let [tempImgPrev, changeTempImgPrev] = useState('')
    return (
        <Box bgcolor={'background.default'} minHeight={'100vh'} color={'text.primary'}>
            <ChangeAvtarModal
                open={open}
                changeImage={changeImage}
                changeOpen={changeOpen}
                changeImgPrev={changeImgPrev}
                tempImgPrev={tempImgPrev}
                changeTempImgPrev={changeTempImgPrev}
            />
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Stack gap={3} p={'7rem 5rem 2rem 5rem'} width={{ xs: '50vw', sm: '48vw' }} sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography variant='h4' fontWeight={700}>Profile</Typography>
                    <Stack direction={{ xs: 'column', sm: 'row' }} width={'75%'} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} p={2}>
                        <Stack>
                            <Avatar src={imagePrev} sx={{ width: '11rem', height: '11rem' }} />
                            <Button className='change-photo' onClick={() => changeOpen(!open)}>Change Photo</Button>
                        </Stack>
                        <Stack width={{ xs: '100%', sm: '66%' }} gap={2}>
                            <Stack direction={'row'} gap={2}>
                                <Typography fontWeight={600}>Name </Typography>
                                <Typography>{details.name}</Typography>
                            </Stack>
                            <Stack direction={'row'} gap={2}>
                                <Typography fontWeight={600}>Email </Typography>
                                <Typography>{details.email}</Typography>
                            </Stack>
                            <Stack direction={'row'} gap={2}>
                                <Typography fontWeight={600}>Created At </Typography>
                                <Typography>{details.createdAt}</Typography>
                            </Stack>
                            <Stack direction={'row'} gap={2} sx={{ display: 'flex', alignItems: 'center' }}>
                                <Typography fontWeight={600}>Subscription </Typography>
                                <Link className='checkout-plan'>Cancel Subscription</Link>
                            </Stack>
                            <Stack direction={{ xs: 'column', sm: 'row' }} gap={2}>
                                <Link to={'/updateprofile'}>
                                    <Button className='change-photo' variant='contained'>Update Profile</Button>
                                </Link>
                                <Link to={'/changepassword'}>
                                    <Button className='change-photo' variant='contained'>Change Password</Button>
                                </Link>
                            </Stack>
                        </Stack>
                    </Stack>
                    <Stack paddingTop={7} paddingBottom={7} width={'88%'} sx={{ display: 'flex', alignItems: 'center' }} gap={2}>
                        <Typography className='details' flex={8} fontWeight={700} fontSize={'1.5rem'}>Playlists</Typography>
                        <Stack direction={{ xs: 'column', sm: 'row' }} gap={2}>
                            <PlaylistCourseCard
                                title="Web Dev"
                                poster={'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&w=350&dpr=2'}
                            />
                            <PlaylistCourseCard
                                title="Web Dev"
                                poster={'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&w=350&dpr=2'}
                            />
                            <PlaylistCourseCard
                                title="Web Dev"
                                poster={'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&w=350&dpr=2'}
                            />
                        </Stack>
                    </Stack>
                </Stack>
            </Box>
        </Box>
    )
}


const ChangeAvtarModal = ({ open, changeOpen, changeImage, changeImgPrev, tempImgPrev, changeTempImgPrev }) => {
    const modalStyle = {
        position: 'absolute',
        top: '25%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '20vw',
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
    };
    let avtarHandler = (e) => {
        let file = e.target.files[0]
        let reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onloadend = () => {
            changeTempImgPrev(reader.result)
            changeImage(file)
        }
    } 
    let changeAvtar = () => {
        changeImgPrev(tempImgPrev)
        changeTempImgPrev('')
        changeOpen(!open)
    }
    return (
        <Modal open={open} onClose={() => changeOpen(!open)} >
            <Box bgcolor={'red'} sx={modalStyle} color={'text.primary'}>
                <Stack gap={4}>
                    <Stack direction={'row'} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Typography variant='h5' fontWeight={600}>Change Avtar</Typography>
                        <IconButton onClick={() => changeOpen(!open)} ><Close /></IconButton>
                    </Stack>
                    <Box width={'100%'} sx={{ display: 'flex', justifyContent: 'center'}}>
                        <Avatar src={tempImgPrev} sx={{ width: '8rem', height: '8rem' }} />
                    </Box>
                    <TextField onChange={avtarHandler} className='avtar' fullWidth variant="outlined" size='small' type='file' inputProps={{ accept: "image/*" }} />
                    <Button onClick={changeAvtar} variant='contained'>Change</Button>
                </Stack>
            </Box>
        </Modal>
    )
}

const PlaylistCourseCard = ({ poster, title }) => (
    <Stack gap={5} sx={{ display: 'flex', alignItems: 'center', borderRadius: '5px' }} p={.5}>
        <Box
            component={'img'}
            src={poster}
            sx={{ width: '12rem' }}
        />
        <Stack gap={1}>
            <Typography variant='p' fontWeight={600}>{title}</Typography>
            <Stack direction={'row'} gap={1}>
                <Link><Button variant='contained' color='secondary' size='small'>Watch Now</Button></Link>
                <Link><Button variant='outlined' color='success' size='small'>Remove</Button></Link>
            </Stack>
        </Stack>
    </Stack>
)

export default Profile