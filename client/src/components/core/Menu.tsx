import React from 'react'
import { useContext } from 'react'
import { Link, Outlet } from 'react-router-dom'

import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import HomeIcon from '@mui/icons-material/Home'
import GroupIcon from '@mui/icons-material/Group'
// import Button from '@mui/material/Button'
// import CartIcon from '@mui/icons-material/ShoppingCart'
// import Badge from '@mui/material/Badge'

// import auth from './../auth/auth-helper'
// import cart from './../cart/cart-helper'

// const isActive = (history, path) => {
//   if (history.location.pathname == path) return { color: '#bef67a' }
//   else return { color: '#ffffff' }
// }
// const isPartActive = (history, path) => {
//   if (history.location.pathname.includes(path)) return { color: '#bef67a' }
//   else return { color: '#ffffff' }
// }

const Menu = () => (
  <AppBar position="static">
    <Toolbar>
      <Typography variant="h6" color="inherit">
        MERN Online Shop
      </Typography>
      <div>
        <Link to="/">
          <IconButton aria-label="Home">
            <HomeIcon />
          </IconButton>
        </Link>
        <Link to="/users">
          <IconButton aria-label="Users">
            <GroupIcon />
          </IconButton>
        </Link>
      </div>
    </Toolbar>
  </AppBar>
)

export default Menu
