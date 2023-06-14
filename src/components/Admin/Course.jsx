import React, { useState } from 'react'
import { Modal, Box, Stack, Typography, IconButton, TextField, Button } from '@mui/material';
import { Close, Delete } from '@mui/icons-material';
import { Link } from 'react-router-dom';
const Course = ({open, toggleOpen}) => {
    const modalStyle = {
        width: '100vw',
        height: '100vh',
        overflow: 'scroll'
    };
    let [lectures, updateLectures] = useState([{
        'title': 'Lecture 1',
        'description': 'This is an introduction to our web development course'
    },
    {
        'title': 'Lecture 1',
        'description': 'This is an introduction to our web development course'
    },
    {
        'title': 'Lecture 1',
        'description': 'This is an introduction to our web development course'
    },
    {
        'title': 'Lecture 1',
        'description': 'This is an introduction to our web development course'
    },{
        'title': 'Lecture 1',
        'description': 'This is an introduction to our web development course'
    },{
        'title': 'Lecture 1',
        'description': 'This is an introduction to our web development course'
    },{
        'title': 'Lecture 1',
        'description': 'This is an introduction to our web development course'
    },{
        'title': 'Lecture 1',
        'description': 'This is an introduction to our web development course'
    },{
        'title': 'Lecture 1',
        'description': 'This is an introduction to our web development course'
    },{
        'title': 'Lecture 1',
        'description': 'This is an introduction to our web development course'
    }])
    let [details, updateDetails] = useState({
        'title': 'Web Development 101',
        'id': '647a215858b029e6a20273ba'
    })
    let [video, changeVideo] = useState('')
    let [videoPrev, changeVideoPrev] = useState('')

    let videoHandler = e => {
        let file = e.target.files[0]
        let reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onloadend = () => {
            changeVideoPrev(reader.result)
            changeVideo(file)
        }    
    }
    let [newLecture, updateNewLecture] = useState({'title': '', 'description': ''})
    return (
        <Modal open={open} onClose={() => toggleOpen(!open)} >
            <Box bgcolor={'background.default'} sx={modalStyle} color={'text.primary'}>
                <Stack gap={4} padding={3}>
                    <Stack direction={'row'} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Typography variant='h4' fontWeight={500}>Course</Typography>
                        <IconButton onClick={() => toggleOpen(!open)} ><Close /></IconButton>
                    </Stack>
                </Stack>
                <Stack direction={'row'} p={5}>
                    <Stack flex={12} gap={3}>
                        <Stack>
                            <Typography variant='h3' fontWeight={700}>{details.title}</Typography>
                            <Typography variant='p' color={'gray'} sx={{fontSize: 'small'}}>{details.id}</Typography>
                        </Stack>
                        <Stack gap={3}>
                        <Typography variant='h4' fontWeight={600}>Lectures</Typography>
                        <Stack gap={2}>
                            {lectures.map((ele, curr) => {
                                return <LectureCard key={curr} title={ele.title} description={ele.description} num={curr+1}/>
                            })}
                        </Stack>
                        </Stack>
                    </Stack>
                    <Stack flex={3}>
                    <Box bgcolor={'background.default'} minHeight={'100vh'} color={'text.primary'}>
                        <Box sx={{ display: 'flex'}}>
                            <Stack gap={7} width={{xs: '50vw', sm:'100%'}}>
                                <Typography variant='h4' fontWeight={700}>Add Lecture</Typography>
                                <Stack gap={2} sx={{ display: 'flex', alignItems: 'flex-start' }} width={'100%'}>
                                    <TextField name='title' onChange={(e) => updateLecture({...newLecture, [e.target.name]:e.target.value})} fullWidth label="Title" value={newLecture.title} variant="outlined" size='small' type='text' />
                                    <TextField name='description' onChange={(e) => updateLecture({...newLecture, [e.target.name]:e.target.value})} fullWidth label="Description" value={newLecture.description} variant="outlined" size='small' type='email' />
                                    <TextField onChange={videoHandler} className='video-input'  variant="outlined" size='small' type='file'  inputProps={{accept:"video/*"}} fullWidth/>
                                    <Button variant='contained' color='secondary' size='medium' fullWidth>Upload</Button>
                                </Stack>
                                
                            </Stack>
                        </Box>
                    </Box>
                    </Stack>
                </Stack>
            </Box>
        </Modal>
    )
}

const LectureCard = ({num, title, description}) => (
    <Stack direction={'row'} sx={{justifyContent: 'space-between', borderRadius: '7px', boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px'}} width={'90%'} p={3}>
        <Stack gap={1}>
            <Typography variant='p' fontWeight={600}>#{num}. {title}</Typography>
            <Typography variant='p' fontSize={'small'}>{description}</Typography>
        </Stack>
        <IconButton aria-label="delete">
            <Delete />
        </IconButton>
    </Stack>
)

export default Course