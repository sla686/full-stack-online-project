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
import ArrowForward from '@mui/icons-material/ArrowForward'
import { useTheme } from '@mui/material/styles'

import { read } from '../user/api-user'
import { User } from '../../types/user'

const Profile = () => {
  const [user, setUser] = useState<any>()
  const [redirectToSignin, setRedirectToSignin] = useState(false)
  const theme = useTheme()
  const { userId } = useParams()

  useEffect(() => {
    const abortController = new AbortController()
    const signal = abortController.signal
    read(
      {
        userId: userId ?? '',
      },
      { t: '123456789' },
      signal
    ).then((data) => {
      if (data && data.error) {
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
    <Paper
      sx={{
        maxWidth: 600,
        margin: 'auto',
        padding: theme.spacing(3),
        marginTop: theme.spacing(5),
      }}
      elevation={4}
    >
      <Typography
        sx={{
          margin: `${theme.spacing(3)} 0 ${theme.spacing(2)}`,
        }}
        variant="h6"
      >
        Profile
      </Typography>
      <List dense>
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <Person />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary={user?.name} secondary={user?.email} />{' '}
        </ListItem>
        <Divider />
        <ListItem>
          <ListItemText
            primary={'Joined: ' + new Date(user?.created).toDateString()}
          />
        </ListItem>
      </List>
    </Paper>
  )
}

export default Profile
