import { Link, useLocation, useNavigate } from 'react-router-dom'
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

const Menu = () => {
  const navigate = useNavigate()
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" color="inherit">
          MERN Online Shop
        </Typography>
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
        {auth.isAuthenticated() && (
          <span>
            <Link to={'/users/' + auth.isAuthenticated().user._id}>
              <Button
                style={isActive('/users/' + auth.isAuthenticated().user._id)}
              >
                My Profile
              </Button>
            </Link>
            <Button
              color="inherit"
              onClick={() => {
                auth.clearJWT(() => navigate('/'))
              }}
            >
              Sign out
            </Button>
          </span>
        )}
      </Toolbar>
    </AppBar>
  )
}

export default Menu
