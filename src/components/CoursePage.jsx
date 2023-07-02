import { Box, Button, Divider, List, ListItem, ListItemText, Stack, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import '../styles/CoursePage.css'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { server } from '../redux/store'
import { toast } from 'react-hot-toast'

const CoursePage = ({user, isAuthenticated}) => {
    let {id} = useParams()
    let navigate = useNavigate()
    let [lectures, changeLectures] = useState([])
    let [currentVideo, changeCurrentVideo] = useState('')
    let getLecture = async() => {
        try {
            let {data} = await axios.get(`${server}/course/${id}`, {withCredentials: true})
            changeLectures(data.lectures)
            if(data.lectures.length === 0){
                toast.error('No lectures are there in the course')
                return navigate('/courses')
            }
            changeCurrentVideo(data.lectures[0])
        } catch (error) {
            toast.error('Course not found')
            return navigate('/coursenotfound')
        }
    }
    let changeVideoHandler = (idx) => {
        changeCurrentVideo(lectures[idx])
    }
    useEffect(() => {
        if(!isAuthenticated){
            toast.error('Please login to view course')
            navigate('/login')
        }
        else if(user.role !== 'admin' && user.subscription?.status !== 'active'){
            toast.error('Please buy the pro back to access the resource')
            navigate('/subscribe', {replace : true})
        }
        else getLecture()
    }, [])
    return (
        <Box bgcolor={'background.default'} color={'text.primary'} minHeight={'100vh'} >
            <Box>
                <Stack direction={{xs:'column', sm:'row'}} paddingTop={5}>
                    <Stack flex={8} p={2} gap={1}>
                        <Box width={'100%'} height={{xs:'27vh', sm:'80vh'}}>
                            <video width="99%" height="99%" controls key={currentVideo._id}>
                                <source type="video/mp4" src={currentVideo?.video?.url}/>
                            </video>
                        </Box>
                        <Typography variant='h5' fontWeight={700}>{currentVideo.title}</Typography>
                        {/* <Typography variant='h6' fontWeight={600}>Description</Typography> */}
                        <Typography variant='p'>{currentVideo.description}</Typography>
                    </Stack>
                    <Stack flex={2} sx={{ display: 'flex', alignItems: 'flex-start' }} padding={3}>
                        <Box className={'video-list'} width={'100%'} overflow={'scroll'} height={{xs:'40vh', sm:'90vh'}}>
                            <List component="nav" aria-label="mailbox folders">
                                {lectures.map((ele, count) => 
                                    <ListItem divider key={ele._id}>
                                        <ListItemText 
                                            primary={ele.title} 
                                            sx={{'&:hover': {
                                                cursor: 'pointer'
                                            }}}
                                            className={currentVideo._id === ele._id ? 'playing': 'lol'}
                                            onClick={() => changeVideoHandler(count)}
                                        />
                                    </ListItem>
                                )}
                            </List>
                        </Box>
                        <Divider />
                    </Stack>
                </Stack>
            </Box>
        </Box>
    )
}

export default CoursePage