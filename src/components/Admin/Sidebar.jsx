import { ListItemButton, ListItemIcon, ListItemText, Stack } from '@mui/material'
import { Dashboard as DashBoardIcon, AddCircleOutline, Visibility, Person } from '@mui/icons-material'
import { NavLink } from 'react-router-dom'
import React from 'react'

const Sidebar = () => {
  return (
    <Stack flex={2}  sx={{display: 'flex', alignItems: 'flex-start'}} p={3} gap={3}>
        {/* <DrawerList text='Dashboard' Icon={DashBoardIcon} to={'/admin/dashboard'}/> */}
        <DrawerList text='Create Course' Icon={AddCircleOutline} to={'/admin/createcourse'}/>
        <DrawerList text='Courses' Icon={Visibility} to={'/admin/courses'}/>
        <DrawerList text='Users' Icon={Person} to={'/admin/users'}/>
    </Stack>
  )
}

const DrawerList = ({Icon, text, to }) => {
    return (
        <NavLink to={to} style={({isActive}) => {
            return {
                color: isActive ? '#6d1b7b' : 'gray'
            }
        }}>
        <ListItemButton>
            <ListItemIcon>
                <Icon />
            </ListItemIcon>
            <ListItemText primary={text} />
        </ListItemButton>
        </NavLink>
    )
}

export default Sidebar