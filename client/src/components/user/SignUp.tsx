import { ChangeEvent, useState } from 'react'
import { Link } from 'react-router-dom'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import ErrorIcon from '@mui/icons-material/Error'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'

import { create } from './api-user'
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

const SignUp = () => {
  const [values, setValues] = useState({
    name: '',
    password: '',
    email: '',
    open: false,
    error: '',
  })

  const handleChange =
    (name: string) => (event: ChangeEvent<HTMLInputElement>) => {
      setValues({ ...values, [name]: event.target.value })
    }

  const clickSubmit = () => {
    const user = {
      name: values.name || undefined,
      email: values.email || undefined,
      password: values.password || undefined,
    }
    create(user).then(() => {
      // if (!data.ok) {
      //   setValues({ ...values, error: data.statusText })
      // } else {
      //   setValues({ ...values, open: true, error: '' })
      // }
      setValues({ ...values, open: true, error: '' })
    })
  }

  return (
    <>
      <Card sx={styles.card}>
        <CardContent>
          <Typography variant="h4" sx={styles.title}>
            Sign Up
          </Typography>
          <TextField
            id="name"
            label="Name"
            value={values.name}
            onChange={handleChange('name')}
            margin="normal"
            sx={styles.textField}
          />
          <br />
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
      <Dialog open={values.open}>
        <DialogTitle>New Account</DialogTitle>
        <DialogContent>
          <DialogContentText>
            New account successfully created.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Link to="/signin">
            <Button color="primary" variant="contained">
              Sign In
            </Button>
          </Link>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default SignUp
