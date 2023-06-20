import React, { useEffect, useState } from 'react'
import { Box, Stack, Typography, TableContainer, TableHead, TableRow, TableCell, Table, TableBody, Paper, Button, IconButton } from '@mui/material'
import Sidebar from './Sidebar'
import { Delete } from '@mui/icons-material'
import { toast } from 'react-hot-toast'
import { Navigate } from 'react-router-dom'
import axios from 'axios'
import { server } from '../../redux/store'


const Users = ({user, isAuthenticated}) => {
  let [users, updateUsers] = useState([]) 

  if(!isAuthenticated || user.role !== 'admin'){
    toast.error('Please login with an admin account to acces this')
    return <Navigate to={'/profile'}/>
  }
  let getUsers = async() => {
    try{
      let {data} = await axios.get(`${server}/admin/users`, {withCredentials: true})
      updateUsers(data.users)
    }
    catch(err){
      toast.error('Some error occured')
    }
  }
  let makeAdminHandler = async(id) => {
    try {
      await axios.patch(`${server}/makeadmin/${id}`, {}, {withCredentials: true})
      let updatedUsers = users.map(ele => {
        if(ele._id === id) ele.role = 'admin'
        return ele
      })
      updateUsers(updatedUsers)
      toast.success('The user is now admin')
    } catch (error) {
      toast.error('Unable to make admin')
    }
  }
  let deleteUserHandler = async(id) => {
    try {
      await axios.delete(`${server}/admin/deleteuser/${id}`, {}, {withCredentials: true})
      let updatedUsers = users.filter(ele => ele._id !== id)
      updateUsers(updatedUsers)
      toast.success('User deleted successfully')
    } catch (error) {
      // console.log(error.response.data)
      toast.error('Some error occured')
    }
  } 
  useEffect(() => {
    getUsers()
  }, [])
  return (
    <Box minHeight={'100vh'} width={'100%'} bgcolor={'background.default'} color={'text.primary'}>
      <Stack paddingTop={5} direction={'row'} className='admin-cursor-add'>
        <Box flex={13}>
          <Stack p={5} gap={3}>
            <Typography variant='h4' fontWeight={600}>All Users</Typography>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell align="right">NAME</TableCell>
                    <TableCell align="right">EMAIL</TableCell>
                    <TableCell align="right">ROLE</TableCell>
                    <TableCell align="right">SUBSCRIPTION</TableCell>
                    <TableCell align="right">ACTION</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {users.map((row) => (
                    <TableRow
                      key={row._id}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">{row._id}</TableCell>
                      <TableCell align="right">{row.name}</TableCell>
                      <TableCell align="right">{row.email}</TableCell>
                      <TableCell align="right">{row.role}</TableCell>
                      <TableCell align="right">{row.subscription}</TableCell>
                      <TableCell align="right">
                        <Button disabled={row.role === 'admin'} onClick={() => makeAdminHandler(row._id)} size='small' variant='outlined' color='secondary'>Make Admin</Button>
                        <IconButton disabled={row.role === 'admin'} onClick={() => deleteUserHandler(row._id)} color='secondary'>
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
    </Box>
  )
}




export default Users