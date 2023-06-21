import React, { useEffect, useState } from 'react'
import { Modal, Box, Stack, Typography, IconButton, TextField, Button } from '@mui/material';
import { Close, Delete } from '@mui/icons-material';
import axios from 'axios';
import { server } from '../../redux/store';
import { toast } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../Loading'
import { setLoadingFalse, setLoadingTrue } from '../../redux/reducers/courseReducer';

const Course = ({open, toggleOpen, id}) => {
    let {loading} = useSelector(state => state.course)
    let dispatch = useDispatch()
    const modalStyle = {
        width: '100vw',
        height: '100vh',
        overflow: 'scroll'
    };
    let [lectures, updateLectures] = useState([])
    let [video, changeVideo] = useState('')
    let [videoPrev, changeVideoPrev] = useState('')
    let [courseTitle, changeCourseTitle] = useState('')
    let [newLecture, updateNewLecture] = useState({'title': '', 'description': ''})
    let videoHandler = e => {
        let file = e.target.files[0]
        let reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onloadend = () => {
            changeVideoPrev(reader.result)
            changeVideo(file)
        }    
    }
    let getCourseLectures = async() => {
        try {
            dispatch(setLoadingTrue())
            let {data} = await axios.get(`${server}/course/${id}`, {withCredentials: true})
            updateLectures(data.lectures)
            changeCourseTitle(data.title)
            dispatch(setLoadingFalse())
        } catch (error) {
            toggleOpen(false)
            dispatch(setLoadingFalse())
        }

    }
    let deleteLectureHandler = async(lectureId) => {
        try {
            await axios.delete(`${server}/lecture?courseId=${id}&lectureId=${lectureId}`, {
                withCredentials: true
            })
            let temp = lectures.filter(ele => ele._id !== lectureId)
            toast.success('Lecture deleted successfully')
            updateLectures(temp)
        } catch (error) {
            toast.error('Unable to delete lecture')
        }
    }
    let addLectureHandler = async() => {
        if(!newLecture.title || !newLecture.description || !video){
            return toast.error('Some of the fields are missing')
        }
        try{
            let formData = new FormData()
            formData.append('title', newLecture.title)
            formData.append('description', newLecture.description)
            formData.append('file', video)
            await axios.post(`${server}/course/${id}`, formData, {withCredentials: true})
            toast.success('Lecture added successfully')
            await getCourseLectures()
            updateNewLecture({'title': '', 'description': ''})
            changeVideo('')
        }
        catch(err){
            toast.error('Unable to add lecture')
        }
    }
    useEffect(() => {
        getCourseLectures()
    }, [id])
    return (
        loading ? <Loading/> : (

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
                            <Typography variant='h3' fontWeight={700}>{courseTitle}</Typography>
                            <Typography variant='p' color={'gray'} sx={{fontSize: 'small'}}>{id}</Typography>
                        </Stack>
                        <Stack gap={3}>
                        <Typography variant='h4' fontWeight={600}>Lectures</Typography>
                        <Stack gap={2}>
                            {lectures.map((ele, curr) => {
                                return <LectureCard key={curr} lectureId={ele._id} deleteLectureHandler={deleteLectureHandler}  title={ele.title} description={ele.description} num={curr+1}/>
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
                                    <TextField name='title' onChange={(e) => updateNewLecture({...newLecture, [e.target.name]:e.target.value})} fullWidth label="Title" value={newLecture.title} variant="outlined" size='small' type='text' />
                                    <TextField name='description' onChange={(e) => updateNewLecture({...newLecture, [e.target.name]:e.target.value})} fullWidth label="Description" value={newLecture.description} variant="outlined" size='small' type='email' />
                                    <TextField onChange={videoHandler} className='video-input'  variant="outlined" size='small' type='file'  inputProps={{accept:"video/*"}} fullWidth/>
                                    <Button onClick={addLectureHandler} variant='contained' color='secondary' size='medium' fullWidth>Upload</Button>
                                </Stack>
                                
                            </Stack>
                        </Box>
                    </Box>
                    </Stack>
                </Stack>
            </Box>
        </Modal>
        )
        )
}

const LectureCard = ({num, title, description, deleteLectureHandler, lectureId}) => (
    <Stack direction={'row'} sx={{justifyContent: 'space-between', borderRadius: '7px', boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px'}} width={'90%'} p={3}>
        <Stack gap={1}>
            <Typography variant='p' fontWeight={600}>#{num}. {title}</Typography>
            <Typography variant='p' fontSize={'small'}>{description}</Typography>
        </Stack>
        <IconButton aria-label="delete" onClick={() => deleteLectureHandler(lectureId)}>
            <Delete />
        </IconButton>
    </Stack>
)

export default Course