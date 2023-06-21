import React, { useEffect, useState } from 'react'
import { Box, Stack, Typography, TableContainer, TableHead, TableRow, TableCell, Table, TableBody, Paper, Button, IconButton } from '@mui/material'
import Sidebar from './Sidebar'
import { Delete } from '@mui/icons-material'
import Poster from '../../assets/default_poster.png'
import Course from './Course'
import { toast } from 'react-hot-toast'
import { Navigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { deleteCourse, getAllCourses } from '../../redux/actions/courseActions'

const AllCourses = ({user, isAuthenticated}) => {
  let {courses} = useSelector(state => state.course)
  let [open, toggleOpen] = useState(false)
  let [courseId, changeCourseId] = useState('')
  let dispatch = useDispatch()
  let handleClick = (id) => {
    changeCourseId(id)
    toggleOpen(!open)
  }
  if(!isAuthenticated || user.role !== 'admin'){
    toast.error('Please login with an admin account to acces this')
    return <Navigate to={'/profile'}/>
  }
  let deleteCourseHandler = (id) => {
    dispatch(deleteCourse(id))
  }
  useEffect(() => {
    dispatch(getAllCourses())
  }, [dispatch])
  return (
    <Box minHeight={'100vh'} width={'100%'} bgcolor={'background.default'} color={'text.primary'}>
      <Stack paddingTop={5} direction={'row'} className='admin-cursor-add'>
        <Box flex={13} paddingRight={5}>
          <Stack p={5} gap={3} width={'100%'}>
            <Typography variant='h4' fontWeight={600}>All Courses</Typography>
            <TableContainer component={Paper} width={'100%'}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell align="left">POSTER</TableCell>
                    <TableCell align="right">TITLE</TableCell>
                    <TableCell align="right">CATEGORY</TableCell>
                    <TableCell align="right">CREATOR</TableCell>
                    <TableCell align="right">VIEWS</TableCell>
                    <TableCell align="right">LECTURES</TableCell>
                    <TableCell align="right">ACTIONS</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {courses.map((row) => (
                    <TableRow
                      key={row._id}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">{row._id}</TableCell>
                      <TableCell align="left">
                        <Box sx={{width:'70px', height:'45px'}}>
                          <img src={row.poster.url} style={{width:'100%', height:'100%'}}/>
                        </Box>
                      </TableCell>
                      <TableCell align="right">{row.title}</TableCell>
                      <TableCell align="right">{row.category}</TableCell>
                      <TableCell align="right">{row.createdBy}</TableCell>
                      <TableCell align="right">{row.views}</TableCell>
                      <TableCell align="right">{row.numOfVideos}</TableCell>
                      <TableCell align="right">
                        <Button 
                        onClick={() => handleClick(row._id)} 
                        size='small' 
                        variant='outlined' 
                        color='secondary'>
                          View Lectures
                        </Button>
                        <IconButton color='secondary' onClick={() => deleteCourseHandler(row._id)}>
                        <Delete />
                      </IconButton>
                      </TableCell>

                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Stack>
        </Box>
        <Sidebar />
      </Stack>
      <Course open={open} toggleOpen={toggleOpen} id={courseId}/>
    </Box>
  )
}




export default AllCourses