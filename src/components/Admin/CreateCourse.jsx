import React, {useEffect, useState} from 'react'
import { Box, Stack, Typography, TextField, Select, MenuItem, FormControl, InputLabel, Button } from '@mui/material'
import '../../styles/Dashboard.css'
import Sidebar from './Sidebar'
import Poster from '../../assets/default_poster.png'
import { toast } from 'react-hot-toast'
import { Navigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { createACourse } from '../../redux/actions/courseActions'
import Loading from '../Loading'

const CreateCourse = ({user, isAuthenticated}) => {
  let categories = [
    'Web Development',
    'Artificial Intelligence',
    'Data Struecures and Algorithms',
    'App Development',
    'Game Development',
    'Science',
    'Mathematics',
    'Language',
    'Other'
  ]
  let dispatch = useDispatch()
  let {loading} = useSelector(state => state.course)
  let [image, changeImage] = useState('')
  let [imagePrev, changeImgPrev] = useState('')
  let [course, updateCourse] = useState({'title': '', 'description': '', 'creator':'', 'category':''})
  useEffect(() => {
    changeImgPrev(Poster)
  }, [])
  let avtarHandler = (e) => {
    let file = e.target.files[0]
    let reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onloadend = () => {
        changeImgPrev(reader.result)
        changeImage(file)
    }
  } 
  let inputHandler = (e) => {
    updateCourse({...course, [e.target.name]:e.target.value})
  }
  let submitHandler = () => {
    if(!course.title || !course.description || !course.creator || !course.category || !image){
      return toast.error('Some of the fields are missing')
    }
    if(course.title.length <= 8 || course.title.length >= 30){
      return toast.error('Course Title must be of 9 to 29 characters')
    }
    if(course.title.description <= 10){
      return toast.error('Course description must be longer than 9 characters')
    }
    let formData = new FormData()
    formData.append('title', course.title)
    formData.append('description', course.description)
    formData.append('createdBy', course.creator)
    formData.append('category', course.category)
    formData.append('file', image)
    dispatch(createACourse(formData))
    updateCourse({'title': '', 'description': '', 'creator':'', 'category':''})
  }

  if(!isAuthenticated || user.role !== 'admin'){
    toast.error('Please login with an admin account to acces this')
    return <Navigate to={'/profile'}/>
  }
  return (
    loading === true ? <Loading/> : (

    <Box minHeight={'100vh'} width={'100%'} bgcolor={'background.default'} color={'text.primary'}>
        <Stack paddingTop={5} direction={'row'} className='admin-cursor-add'>
            <Box flex={13} sx={{display:' flex', justifyContent: 'center'}}>
              <Stack gap={5} paddingTop={7}>
                <Typography variant='h4' fontWeight={600}>Create Course</Typography>
                <Stack gap={3}>
                  <TextField size='small' name='title' onChange={(e) => inputHandler(e)} value={course.title} label="Title" variant="outlined" />
                  <TextField size='small' name='description' onChange={(e) => inputHandler(e)} value={course.description} label="Description" variant="outlined" />
                  <TextField size='small' name='creator' onChange={(e) => inputHandler(e)} value={course.creator} label="Creator Name" variant="outlined" />
                  <FormControl fullWidth size='small'>
                    <InputLabel id="select-category">Select Category</InputLabel>
                    <Select labelId="select-category" label="Category" value={course.category} name='category' onChange={(e) => inputHandler(e)}>
                      {categories.map(ele => <MenuItem key={ele} value={ele}>{ele}</MenuItem>)}
                    </Select>
                  </FormControl>
                  <TextField className='avtar' onChange={avtarHandler}  variant="outlined" size='small' type='file'  inputProps={{accept:"image/*"}}/>
                </Stack>
                <Box width={'100%'} sx={{display: 'flex', justifyContent: 'center'}}>
                  <img style={{width: '80%', height: '180px'}} src={imagePrev}/>
                </Box>
                <Button variant='contained' color='secondary' onClick={submitHandler}>Create</Button>
              </Stack>
            </Box>
            <Sidebar/>
        </Stack>
    </Box>
    )
  )
}




export default CreateCourse