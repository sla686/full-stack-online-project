import { ChangeEvent, useState, useEffect } from 'react'
import { useParams, Navigate } from 'react-router-dom'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Icon from '@mui/material/Icon'
import TextField from '@mui/material/TextField'
import FormControlLabel from '@mui/material/FormControlLabel'
import Switch from '@mui/material/Switch'

// import { useTheme } from '@mui/material/styles'

import { read, update } from '../user/api-user'
import auth from '../auth/auth-helper'
import { User } from '../../types/user'

const EditProfile = () => {
  // const theme = useTheme()
  const [values, setValues] = useState({
    userId: '',
    name: '',
    password: '',
    email: '',
    open: false,
    seller: false,
    error: '',
    redirectToProfile: false,
  })
  const { userId } = useParams()
  const jwt = auth.isAuthenticated()

  useEffect(() => {
    const abortController = new AbortController()
    const signal = abortController.signal

    read(
      {
        userId: userId ?? '',
      },
      { t: jwt.token },
      signal
    ).then((data) => {
      if (data && data?.error) {
        setValues({ ...values, error: data.error })
      } else {
        setValues({
          ...values,
          name: data.name,
          email: data.email,
          seller: data.seller,
        })
      }
    })
    return function cleanup() {
      abortController.abort()
    }
  }, [userId])

  const clickSubmit = () => {
    const user = {
      name: values.name || undefined,
      email: values.email || undefined,
      password: values.password || undefined,
      seller: values.seller ?? undefined,
    }
    console.log('Pressed submit: ', user)
    update(
      {
        userId: userId ?? '',
      },
      {
        t: jwt.token,
      },
      user
    ).then((data: User) => {
      // if (data && data?.error) {
      //   setValues({ ...values, error: data.error })
      // } else {
      //   setValues({ ...values, userId: data._id, redirectToProfile: true })
      // }
      if (!data?._id)
        throw new Error(
          'Something went wrong while submitting updated profile data'
        )
      auth.updateUser(data, () => {
        setValues({
          ...values,
          userId: data._id ?? '',
          redirectToProfile: true,
        })
      })
    })
  }
  const handleChange =
    (name: string) => (event: ChangeEvent<HTMLInputElement>) => {
      setValues({ ...values, [name]: event.target.value })
    }

  const handleCheck = (
    event: ChangeEvent<HTMLInputElement>,
    checked: boolean
  ) => {
    setValues({ ...values, seller: checked })
  }

  if (values.redirectToProfile) {
    return <Navigate to={'/users/' + values.userId} />
  }

  return (
    <Card>
      <CardContent>
        <Typography variant="h6">Edit Profile</Typography>
        <TextField
          id="name"
          label="Name"
          value={values.name}
          onChange={handleChange('name')}
          margin="normal"
        />
        <br />
        <TextField
          id="email"
          type="email"
          label="Email"
          value={values.email}
          onChange={handleChange('email')}
          margin="normal"
        />
        <br />
        <TextField
          id="password"
          type="password"
          label="Password"
          value={values.password}
          onChange={handleChange('password')}
          margin="normal"
        />
        <Typography variant="subtitle1">Seller Account</Typography>
        <FormControlLabel
          control={<Switch checked={values.seller} onChange={handleCheck} />}
          label={values.seller ? 'Active' : 'Inactive'}
        />
        <br />{' '}
        {values.error && (
          <Typography component="p" color="error">
            <Icon color="error">error</Icon>
            {values.error}
          </Typography>
        )}
      </CardContent>
      <CardActions>
        <Button color="primary" variant="contained" onClick={clickSubmit}>
          Submit
        </Button>
      </CardActions>
    </Card>
  )
}

export default EditProfile
