import { Box, Divider, List, ListItem, ListItemText, Stack, Typography } from '@mui/material'
import React from 'react'
import '../styles/CoursePage.css'
import MyVideo from '../assets/video.mp4'

const CoursePage = () => {
    return (
        <Box bgcolor={'background.default'} color={'text.primary'} minHeight={'100vh'} >
            <Box>
                <Stack direction={{xs:'column', sm:'row'}} paddingTop={5}>
                    <Stack flex={8} p={2} gap={1}>
                        <Box width={'100%'} height={{xs:'27vh', sm:'80vh'}}>
                            <video width="99%" height="99%" controls>
                                <source type="video/mp4" src={MyVideo} />
                            </video>
                        </Box>
                        <Typography variant='h5' fontWeight={700}>#1 Sample</Typography>
                        <Typography variant='h5' fontWeight={600}>Description</Typography>
                        <Typography variant='p'>This the first video of our course</Typography>
                    </Stack>
                    <Stack flex={2} sx={{ display: 'flex', alignItems: 'flex-start' }} padding={3}>
                        <Box className={'video-list'} width={'100%'} overflow={'scroll'} height={{xs:'40vh', sm:'90vh'}}>
                            <List component="nav" aria-label="mailbox folders">
                                <ListItem divider>
                                    <ListItemText primary="Video 1" />
                                </ListItem>
                                <ListItem divider>
                                    <ListItemText primary="Video 2" />
                                </ListItem>
                                <ListItem divider>
                                    <ListItemText primary="Video 3" />
                                </ListItem>
                                <ListItem divider>
                                    <ListItemText primary="Video 4" />
                                </ListItem>



                                
                                
                                
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