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
import { styled } from '@mui/system'

import { list } from '../user/api-user'
import { User } from '../../types/user.js'

const PaperStyle = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  margin: 'auto',
  marginTop: theme.spacing(5),
  maxWidth: 600,
  textAlign: 'center',
}))

const TypographyStyle = styled(Typography)(({ theme }) => ({
  marginTop: theme.spacing(3),
  marginBottom: theme.spacing(2),
  marginLeft: 'auto',
  marginRight: 'auto',
  fontSize: '2em',
}))

const Users = () => {
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
    <PaperStyle elevation={4}>
      <TypographyStyle variant="h4">All Users</TypographyStyle>
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
    </PaperStyle>
  )
}

export default Users
