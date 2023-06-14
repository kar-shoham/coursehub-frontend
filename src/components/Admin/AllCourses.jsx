import React, { useState } from 'react'
import { Box, Stack, Typography, TableContainer, TableHead, TableRow, TableCell, Table, TableBody, Paper, Button, IconButton } from '@mui/material'
import Sidebar from './Sidebar'
import { Delete } from '@mui/icons-material'
import Poster from '../../assets/default_poster.png'
import Course from './Course'

const AllCourses = () => {
  let [courses, updateCourses] = useState([{
    id: '647a215858b029e6a20273ba',
    poster: Poster,
    title: 'React Course',
    category: 'Web Development',
    creator: 'FreeCodeCamp',
    views: 1234,
    lectures: 15
  }]) 
  let [open, toggleOpen] = useState(false)
  let handleClick = () => {
    toggleOpen(!open)
  }
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
                      key={row.id}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">{row.id}</TableCell>
                      <TableCell align="left">
                        <Box sx={{width:'70px', height:'45px'}}>
                          <img src={row.poster} style={{width:'100%', height:'100%'}}/>
                        </Box>
                      </TableCell>
                      <TableCell align="right">{row.title}</TableCell>
                      <TableCell align="right">{row.category}</TableCell>
                      <TableCell align="right">{row.creator}</TableCell>
                      <TableCell align="right">{row.views}</TableCell>
                      <TableCell align="right">{row.lectures}</TableCell>
                      <TableCell align="right">
                        <Button onClick={handleClick} size='small' variant='outlined' color='secondary'>View Lectures</Button>
                        <IconButton color='secondary'>
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
      <Course open={open} toggleOpen={toggleOpen}/>
    </Box>
  )
}




export default AllCourses