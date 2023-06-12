import { Box, InputBase, Stack, Typography, styled, Button } from '@mui/material'
import React from 'react'
import '../styles/Courses.css'
import { Link } from 'react-router-dom'

const CourseBox = styled(Stack)({
    width: '48%'
})

const Courses = () => {
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
  return (
    <Box bgcolor={'background.default'} minHeight={'100vh'} color={'text.primary'}>
    <Box sx={{display: 'flex', justifyContent: 'center', paddingTop: '9vh'}}>
        <CourseBox gap={2.5}>
            <Typography variant='h4' fontWeight={600}>All Courses</Typography>
            <Box sx={{border: '1px solid grey', borderRadius: '5px'}} >
                <InputBase sx={{color: 'text.primary', padding: '0 5px'}} placeholder='Search...'/>
            </Box>
            <Stack className='course-categories' direction={'row'} gap={2} height={'2rem'} sx={{display: 'flex', overflow: 'scroll'}}>
                {categories.map(ele => <Button color='primary' size='small' sx={{flexShrink: 0}} key={ele} variant="contained">{ele}</Button>)}
            </Stack>
            <Box sx={{display: 'flex', justifyContent: 'center'}}>
            <Stack direction={{xs:'column', sm:'row'}} gap={2}>
                <CourseCard 
                title="Web Dev" 
                description={'Web Dev'} 
                creator={'Noobmaster 69'} 
                numLectures={19} 
                views={230}
                poster={'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&w=350&dpr=2'}
                />
                <CourseCard 
                title="Web Dev" 
                description={'Web Dev'} 
                creator={'Noobmaster 69'} 
                numLectures={19} 
                views={230}
                poster={'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&w=350&dpr=2'}
                />
                <CourseCard 
                title="Web Dev" 
                description={'Web Dev'} 
                creator={'Noobmaster 69'} 
                numLectures={19} 
                views={230}
                poster={'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&w=350&dpr=2'}
                />
            </Stack>
            </Box>
        </CourseBox>
    </Box>
    </Box>
  )
}

const CourseCard = ({poster, title, description, creator, numLectures, views}) => (
    <Stack gap={5} sx={{display: 'flex', alignItems: 'center', borderRadius: '5px'}} p={.5}>
        <Box 
        component={'img'} 
        src={poster}
        sx={{width:'95%'}}
        />
        <Stack gap={1}>
            <Typography variant='p' fontWeight={600}>{title}</Typography>
            <Typography variant='p' >{description}</Typography>
            <Typography variant='p' ><Typography variant='p' fontWeight={600}>CREATOR: </Typography>{creator}</Typography>
            <Typography variant='p' fontWeight={600}>LECTURES - {numLectures}</Typography>
            <Typography variant='p' fontWeight={600}>VIEWS - {views}</Typography>
            <Stack direction={'row'}>
                <Link><Button variant='contained' color='secondary' size='small'>Watch Now</Button></Link>
                <Link><Button variant='outlined' color='success' size='small'>Add to playlist</Button></Link>
            </Stack>
        </Stack>
    </Stack>
)

export default Courses