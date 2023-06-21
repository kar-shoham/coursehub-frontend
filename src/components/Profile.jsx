import { Stack, Typography, Box, Button, Avatar, Modal } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import '../styles/Profile.css'
import { TextField } from '@mui/material'
import { Close } from '@mui/icons-material'
import { IconButton } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { getMyProfile, getPlaylist, updateProfilePicture } from '../redux/actions/userActions'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import { server } from '../redux/store'
import { removeLecture, setLoadingFalse, setLoadingTrue } from '../redux/reducers/userReducer'

const Profile = ({isAuthenticated, user}) => {
    
    if(!isAuthenticated){
        return <Navigate to={'/login'} replace/>
    }
    let {playlist} = useSelector(state => state.user)
    let [createdAt, updateCreatedAt] = useState('25-03-2023')
    let [open, changeOpen] = useState(false)
    let [image, changeImage] = useState('')
    let [imagePrev, changeImgPrev] = useState(user.avatar.url)
    let [tempImgPrev, changeTempImgPrev] = useState('')
    let dispatch = useDispatch()
    let cancelSubscription = async() => {
        try{
            dispatch(setLoadingTrue())
            await axios.delete(`${server}/cancelsubscription`, {withCredentials: true})
            toast.success('Subscription cancelled')
            dispatch(getMyProfile())
            dispatch(setLoadingFalse())
        } catch(err){
            toast.error(err.response.data.message)
            dispatch(setLoadingFalse())
        }
    }
    let removeFromPlaylistHandler = async(id) => {
        try {
            await axios.post(`${server}/removefromplaylist`, {id},{withCredentials: true})
            dispatch(removeLecture({id}))
            toast.success('Course removed from playlist')
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }
    let lectureIds = user?.playlist.map(ele => ele.course)
    useEffect(() => {
        dispatch(getPlaylist(lectureIds))
    }, [])
    return (
        <Box bgcolor={'background.default'} minHeight={'100vh'} color={'text.primary'}>
            <ChangeAvtarModal
                open={open}
                image={image}
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
                                <Typography>{user.name}</Typography>
                            </Stack>
                            <Stack direction={'row'} gap={2}>
                                <Typography fontWeight={600}>Email </Typography>
                                <Typography>{user.email}</Typography>
                            </Stack>
                            <Stack direction={'row'} gap={2}>
                                <Typography fontWeight={600}>Created At </Typography>
                                <Typography>{createdAt}</Typography>
                            </Stack>
                            <Stack direction={'row'} gap={2} sx={{ display: 'flex', alignItems: 'center' }}>
                                <Typography fontWeight={600}>Subscription </Typography>
                                {user.subscription?.status === 'active' ? (
                                <Button className='checkout-plan' onClick={cancelSubscription}>Cancel Subscription</Button>
                                ) : (
                                <Link className='checkout-plan' to={'/subscribe'}>Buy Subscription</Link>
                                )}
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
                            {playlist.map(ele => 
                                <PlaylistCourseCard
                                    id={ele._id}
                                    title={ele.title}
                                    poster={ele.poster.url}
                                    key={ele._id}
                                    removeFromPlaylistHandler={removeFromPlaylistHandler}
                                />
                            )}
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


const ChangeAvtarModal = ({ image, open, changeOpen, changeImage, changeImgPrev, tempImgPrev, changeTempImgPrev }) => {
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
    let dispatch = useDispatch()
    let avtarHandler = (e) => {
        let file = e.target.files[0]
        let reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onloadend = () => {
            changeTempImgPrev(reader.result)
            changeImage(file)
        }
    } 
    let changeAvtar = async() => {
        changeImgPrev(tempImgPrev)
        changeTempImgPrev('')
        changeOpen(!open)
        let formData = new FormData()
        formData.append('file', image)
        dispatch(updateProfilePicture(formData))
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

const PlaylistCourseCard = ({ poster, title, id, removeFromPlaylistHandler }) => (
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
                <Button variant='outlined' color='success' size='small' onClick={() => removeFromPlaylistHandler(id)}>Remove</Button>
            </Stack>
        </Stack>
    </Stack>
)

export default Profile