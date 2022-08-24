import { Link, useLocation } from 'react-router-dom'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import HomeIcon from '@mui/icons-material/Home'
import GroupIcon from '@mui/icons-material/Group'
import Button from '@mui/material/Button'
// import CartIcon from '@mui/icons-material/ShoppingCart'
// import Badge from '@mui/material/Badge'

import auth from '../auth/auth-helper'

const isActive = (path: string) => {
  const location = useLocation()
  if (location.pathname === path) return { color: '#ff6000' }
  else return { color: '#ffffff' }
}

const Menu = () => (
  <AppBar position="static">
    <Toolbar>
      <Typography variant="h6" color="inherit">
        MERN Online Shop
      </Typography>
      <div>
        <Link to="/">
          <IconButton aria-label="Home" style={isActive('/')}>
            <HomeIcon />
          </IconButton>
        </Link>
        <Link to="/users">
          <IconButton aria-label="Users" style={isActive('/users')}>
            <GroupIcon />
          </IconButton>
        </Link>
        {!auth.isAuthenticated() && (
          <span>
            <Link to="/signup">
              <Button style={isActive('/signup')}>Sign up</Button>
            </Link>
            <Link to="/signin">
              <Button style={isActive('/signin')}>Sign In</Button>
            </Link>
          </span>
        )}
      </div>
    </Toolbar>
  </AppBar>
)

export default Menu
