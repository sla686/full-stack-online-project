import { useState, useEffect } from 'react'
import { useParams, Navigate } from 'react-router-dom'
import Divider from '@mui/material/Divider'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import ListItemAvatar from '@mui/material/ListItemAvatar'
// import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import Avatar from '@mui/material/Avatar'
// import IconButton from '@mui/material/IconButton'
import Person from '@mui/icons-material/Person'
// import ArrowForward from '@mui/icons-material/ArrowForward'
import { useTheme } from '@mui/material/styles'

import { read } from '../user/api-user'
import { User } from '../../types/user'

const EditProfile = () => {
  const theme = useTheme()
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
    seller: false,
    redirectToProfile: false,
    error: '',
  })
  const { userId } = useParams()

  // const jwt = auth.isAuthenticated()
  useEffect(() => {
    const abortController = new AbortController()
    const signal = abortController.signal

    // read(
    //   {
    //     userId: userId ?? '',
    //   },
    //   { t: jwt.token },
    //   signal
    // ).then((data) => {
    //   if (data && data.error) {
    //     setValues({ ...values, error: data.error })
    //   } else {
    //     setValues({
    //       ...values,
    //       name: data.name,
    //       email: data.email,
    //       seller: data.seller,
    //     })
    //   }
    // })
    return function cleanup() {
      abortController.abort()
    }
  }, [userId])

  return <div>EditProfile</div>
}

export default EditProfile
