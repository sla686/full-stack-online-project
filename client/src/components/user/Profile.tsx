import { useState, useEffect } from 'react'
import { Link, useParams, Navigate } from 'react-router-dom'
import Divider from '@mui/material/Divider'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import Avatar from '@mui/material/Avatar'
import IconButton from '@mui/material/IconButton'
import Person from '@mui/icons-material/Person'
import Edit from '@mui/icons-material/Edit'

import { read } from '../user/api-user'
import auth from '../auth/auth-helper'
import { User } from '../../types/user'
import DeleteUser from './DeleteUser'
import theme from '../../styles/theme'

const styles = {
  root: {
    maxWidth: 600,
    margin: 'auto',
    padding: theme.spacing(3),
    marginTop: theme.spacing(5),
    textAlign: 'center',
  },
  title: {
    margin: `${theme.spacing(3)} 0 ${theme.spacing(2)}`,
  },
}

const Profile = () => {
  const [user, setUser] = useState<User>()
  const [redirectToSignin, setRedirectToSignin] = useState(false)
  const { userId } = useParams()

  useEffect(() => {
    const abortController = new AbortController()
    const signal = abortController.signal
    const jwt = auth.isAuthenticated()
    read(
      {
        userId: userId ?? '',
      },
      { t: jwt.token },
      signal
    ).then((data) => {
      if (data && data?.error) {
        setRedirectToSignin(true)
      } else {
        setUser(data)
      }
    })

    return function cleanup() {
      abortController.abort()
    }
  }, [userId])

  if (redirectToSignin) {
    return <Navigate to="/" />
  }

  return (
    <Paper sx={styles.root} elevation={4}>
      <Typography sx={styles.title} variant="h4">
        Profile
      </Typography>
      <List dense>
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <Person />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary={user?.name} secondary={user?.email} />
          {auth.isAuthenticated().user &&
            auth.isAuthenticated().user._id === user?._id && (
              <ListItemSecondaryAction>
                <Link to={'/users/edit/' + user?._id}>
                  <IconButton aria-label="Edit" color="primary">
                    <Edit />
                  </IconButton>
                </Link>
                <DeleteUser userId={user?._id ?? ''} />
              </ListItemSecondaryAction>
            )}
        </ListItem>
        <Divider />
        <ListItem>
          <ListItemText
            primary={'Joined: ' + new Date(user?.created ?? 0).toDateString()}
          />
        </ListItem>
      </List>
    </Paper>
  )
}

export default Profile
