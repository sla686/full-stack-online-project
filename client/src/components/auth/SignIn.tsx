import { ChangeEvent, useState } from 'react'
import { Navigate } from 'react-router-dom'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import ErrorIcon from '@mui/icons-material/Error'

import { signin } from './api-auth'
import auth from './auth-helper'
import { UserAuth } from '../../types/user'
import theme from '../../styles/theme'

const styles = {
  card: {
    maxWidth: 600,
    margin: 'auto',
    textAlign: 'center',
    marginTop: theme.spacing(5),
    paddingBottom: theme.spacing(2),
  },
  error: {
    verticalAlign: 'middle',
  },
  title: {
    marginTop: theme.spacing(2),
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

const SignIn = () => {
  const [values, setValues] = useState({
    email: '',
    password: '',
    error: '',
    redirect: false,
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
      //     setValues({ ...values, error: '', redirect: true })
      //   })
      // }
      if (!data?.token)
        throw new Error('Something went wrong while obraining a token')
      auth.authenticate(data, () => {
        setValues({ ...values, error: '', redirect: true })
      })
    })
  }

  const handleChange =
    (name: string) => (event: ChangeEvent<HTMLInputElement>) => {
      setValues({ ...values, [name]: event.target.value })
    }

  const { redirect } = values
  if (redirect) {
    return <Navigate to="/" />
  }

  return (
    <Card sx={styles.card}>
      <CardContent>
        <Typography sx={styles.title} variant="h4">
          Sign In
        </Typography>
        <TextField
          id="email"
          type="email"
          label="Email"
          value={values.email}
          onChange={handleChange('email')}
          margin="normal"
          sx={styles.textField}
        />
        <br />
        <TextField
          id="password"
          type="password"
          label="Password"
          value={values.password}
          onChange={handleChange('password')}
          margin="normal"
          sx={styles.textField}
        />
        <br />{' '}
        {values.error && (
          <Typography component="p" color="error">
            <ErrorIcon color="error" sx={styles.error} />
            {values.error}
          </Typography>
        )}
      </CardContent>
      <CardActions>
        <Button
          color="primary"
          variant="contained"
          onClick={clickSubmit}
          sx={styles.submit}
        >
          Submit
        </Button>
      </CardActions>
    </Card>
  )
}

export default SignIn
