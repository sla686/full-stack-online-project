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
import { styled } from '@mui/system'

import { read, update } from '../user/api-user'
import auth from '../auth/auth-helper'
import { User } from '../../types/user'
import theme from '../../styles/theme'

const styles = {
  error: {
    verticalAlign: 'middle',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 300,
  },
  submit: {
    margin: 'auto',
    marginBottom: theme.spacing(2),
  },
}

const StyledCard = styled(Card)(({ theme }) => ({
  maxWidth: 600,
  margin: 'auto',
  textAlign: 'center',
  marginTop: theme.spacing(5),
  paddingBottom: theme.spacing(2),
}))

const Title = styled(Typography)(() => ({
  margin: theme.spacing(2),
}))

const SellerTitle = styled(Typography)(() => ({
  marginTop: theme.spacing(2),
}))

/* const StyledSwitch = styled(Switch)(() => ({
  '&.Mui-checked': {},
})) */

const EditProfile = () => {
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
    <StyledCard>
      <CardContent>
        <Title variant="h4">Edit Profile</Title>
        <TextField
          id="name"
          label="Name"
          value={values.name}
          onChange={handleChange('name')}
          margin="normal"
          style={styles.textField}
        />
        <br />
        <TextField
          id="email"
          type="email"
          label="Email"
          value={values.email}
          onChange={handleChange('email')}
          margin="normal"
          style={styles.textField}
        />
        <br />
        <TextField
          id="password"
          type="password"
          label="Password"
          value={values.password}
          onChange={handleChange('password')}
          margin="normal"
          style={styles.textField}
        />
        <SellerTitle variant="subtitle1">Seller Account</SellerTitle>
        <FormControlLabel
          control={<Switch checked={values.seller} onChange={handleCheck} />}
          label={values.seller ? 'Active' : 'Inactive'}
        />
        <br />{' '}
        {values.error && (
          <Typography component="p" color="error">
            <Icon color="error" style={styles.error}>
              error
            </Icon>
            {values.error}
          </Typography>
        )}
      </CardContent>
      <CardActions>
        <Button
          color="primary"
          variant="contained"
          onClick={clickSubmit}
          style={styles.submit}
        >
          Submit
        </Button>
      </CardActions>
    </StyledCard>
  )
}

export default EditProfile
