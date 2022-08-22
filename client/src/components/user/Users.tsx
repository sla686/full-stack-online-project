import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
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

import { list } from '../user/api-user'
import { User } from '../../types/user.js'

const Users = () => {
  const theme = useTheme()
  const [users, setUsers] = useState<User[]>([])

  useEffect(() => {
    const abortController = new AbortController()
    const signal = abortController.signal

    list(signal).then((data) => {
      if (data && data.error) {
        console.log(data.error)
      } else {
        setUsers(data)
      }
    })

    return function cleanup() {
      abortController.abort()
    }
  }, [])

  return (
    <Paper
      sx={{ padding: theme.spacing(1), margin: theme.spacing(5) }}
      elevation={4}
    >
      <Typography
        sx={{ margin: `${theme.spacing(4)} 0 ${theme.spacing(2)}` }}
        variant="h6"
      >
        All Users
      </Typography>
      <List dense>
        {users.map((item, i) => (
          <Link to={'/users/' + item._id} key={i}>
            <ListItem button>
              <ListItemAvatar>
                <Avatar>
                  <Person />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={item.name} />
              <ListItemSecondaryAction>
                <IconButton>
                  <ArrowForward />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          </Link>
        ))}
      </List>
    </Paper>
  )
}

export default Users
