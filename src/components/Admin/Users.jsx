import React, { useState } from 'react'
import { Box, Stack, Typography, TableContainer, TableHead, TableRow, TableCell, Table, TableBody, Paper, Button, IconButton } from '@mui/material'
import Sidebar from './Sidebar'
import { Delete } from '@mui/icons-material'


const Users = () => {
  let [users, updateUsers] = useState([{
    id: '647a215858b029e6a20273ba',
    name: 'Shoham Kar',
    email: 'kar.shoham.25@gmail.com',
    role: 'user',
    subscription: 'active',
  }]) 
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
                      key={row.id}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">{row.id}</TableCell>
                      <TableCell align="right">{row.name}</TableCell>
                      <TableCell align="right">{row.email}</TableCell>
                      <TableCell align="right">{row.role}</TableCell>
                      <TableCell align="right">{row.subscription}</TableCell>
                      <TableCell align="right">
                        <Button disabled={row.role === 'admin'} size='small' variant='outlined' color='secondary'>Change Role</Button>
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
    </Box>
  )
}




export default Users