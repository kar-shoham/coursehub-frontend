import { Box, InputBase, Stack, Typography, styled, Button } from '@mui/material'
import React, { useEffect, useState } from 'react'
import '../styles/Courses.css'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Loading from '../components/Loading'
import { getAllCourses } from '../redux/actions/courseActions'
import axios from 'axios'
import { server } from '../redux/store'
import { toast } from 'react-hot-toast'

const CourseBox = styled(Stack)({
    width: '48%'
})

const Courses = () => {
    let categories = [
        'All',
        'Web Development',
        'Artificial Intelligence',
        'Data Struecures and Algorithms',
        'App Development',
        'Game Development',
        'Science',
        'Mathematics',
        'Language'
    ]
    let dispatch = useDispatch()
    let [searchInput, updateSearchInput] = useState({ 'keyword': '', 'category': '' })
    let { courses, loading } = useSelector(state => state.course)
    let addToPlaylistHandler = async(id) => {
        try {
            let {data} = await axios.post(`${server}/addtoplaylist`, {
                id
            },{
                withCredentials: true
            })
            toast.success(data.message)
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }
    useEffect(() => {
        dispatch(getAllCourses(searchInput.keyword, searchInput.category, 3))
    }, [searchInput.category, searchInput.keyword])
    return ( 
        (
            <Box bgcolor={'background.default'} minHeight={'100vh'} color={'text.primary'}>
                <Box sx={{ display: 'flex', justifyContent: 'center', paddingTop: '9vh' }}>
                    <CourseBox gap={2.5}>
                        <Typography variant='h4' fontWeight={600}>All Courses</Typography>
                        <Box sx={{ border: '1px solid grey', borderRadius: '5px' }} >
                            <InputBase value={searchInput.keyword} name='keyword' onChange={
                                (e) => updateSearchInput({ ...searchInput, [e.target.name]: e.target.value })}
                                sx={{ color: 'text.primary', padding: '0 5px' }} placeholder='Search...' />
                        </Box>
                        <Stack className='course-categories' direction={'row'} gap={2} height={'2rem'} sx={{ display: 'flex', overflow: 'scroll' }}>
                            {categories.map(ele => <Button name='category' value={ele} onClick={
                                (e) => updateSearchInput({ ...searchInput, [e.target.name]: e.target.value === 'All'? '' : e.target.value })} color='primary' size='small' sx={{ flexShrink: 0 }} key={ele} variant="contained">{ele}</Button>)}
                        </Stack>
                        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                            <Stack direction={{ xs: 'column', sm: 'row' }} gap={2}>
                                {courses.map(ele => <CourseCard
                                    id={ele._id} 
                                    key={ele._id}
                                    title={ele.title}
                                    description={ele.description}
                                    creator={ele.createdBy}
                                    numLectures={ele.numOfVideos}
                                    views={ele.views}
                                    poster={ele.poster.url}
                                    addToPlaylistHandler={addToPlaylistHandler}
                                />)}
                            </Stack>
                        </Box>
                    </CourseBox>
                </Box>
            </Box>
        )
    )
}

export const CourseCard = ({ id, poster, title, description, creator, numLectures, views, addToPlaylistHandler }) => (
    <Stack gap={5} sx={{ display: 'flex', alignItems: 'center', borderRadius: '5px' }} p={.5}>
        <Box
            component={'img'}
            src={poster}
            sx={{ width: '160px', height:'88px' }}
        />
        <Stack gap={1}>
            <Typography variant='p' fontWeight={600}>{title}</Typography>
            <Typography variant='p' >{description}</Typography>
            <Typography variant='p' ><Typography variant='p' fontWeight={600}>CREATOR: </Typography>{creator}</Typography>
            <Typography variant='p' fontWeight={600}>LECTURES - {numLectures}</Typography>
            <Typography variant='p' fontWeight={600}>VIEWS - {views}</Typography>
            <Stack direction={'row'}>
                <Link><Button variant='contained' color='secondary' size='small'>Watch Now</Button></Link>
                <Button onClick={() => addToPlaylistHandler(id)} variant='outlined' color='success' size='small'>Add to playlist</Button>
            </Stack>
        </Stack>
    </Stack>
)

export default Courses