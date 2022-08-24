import { ChangeEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import Icon from '@mui/material/Icon'

import { signin } from './api-auth'
import auth from './auth-helper'
import { UserAuth } from '../../types/user'

const SignIn = () => {
  const [values, setValues] = useState({
    email: '',
    password: '',
    error: '',
    redirectToReferrer: false,
  })

  const clickSubmit = () => {
    const user = {
      email: values.email || undefined,
      password: values.password || undefined,
    }

    signin(user).then((data: UserAuth) => {
      // if (data.error) {
      //   setValues({ ...values, error: data.error })
      // } else {
      //   auth.authenticate(data, () => {
      //     setValues({ ...values, error: '', redirectToReferrer: true })
      //   })
      // }
      if (!data?.token)
        throw new Error('Something went wrong while obraining a token')
      auth.authenticate(data, () => {
        setValues({ ...values, error: '', redirectToReferrer: true })
      })
    })
  }

  const handleChange =
    (name: string) => (event: ChangeEvent<HTMLInputElement>) => {
      setValues({ ...values, [name]: event.target.value })
    }

  const navigate = useNavigate()

  const { redirectToReferrer } = values
  if (redirectToReferrer) {
    navigate(-1)
  }

  return (
    <Card>
      <CardContent>
        <Typography variant="h6">Sign In</Typography>
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

export default SignIn
