import React, { useEffect, useState, ChangeEvent } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import ErrorIcon from '@mui/icons-material/Error'
import Avatar from '@mui/material/Avatar'
import Grid from '@mui/material/Grid'
import FileUpload from '@mui/icons-material/AddPhotoAlternate'

import auth from './../auth/auth-helper'
import { read, update } from './api-shop'
import MyProducts from './../product/MyProducts'
import theme from '../../styles/theme'

interface EditShop {
  owner: string
  id: string
  name: string
  description: string
  image: File | null
  redirect: boolean
  error: string
}

const URL = 'https://backend-online-shop-sla686.up.railway.app/api/v1'

const styles = {
  root: {
    flexGrow: 1,
    margin: 30,
  },
  card: {
    textAlign: 'center',
    paddingBottom: theme.spacing(2),
  },
  title: {
    margin: theme.spacing(2),
    fontSize: '2em',
  },
  subheading: {
    marginTop: theme.spacing(2),
  },
  error: {
    verticalAlign: 'middle',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 400,
  },
  submit: {
    margin: 'auto',
    marginBottom: theme.spacing(2),
  },
  bigAvatar: {
    width: 60,
    height: 60,
    margin: 'auto',
  },
  input: {
    display: 'none',
  },
  filename: {
    marginLeft: '10px',
  },
}

const EditShop = () => {
  const [values, setValues] = useState<EditShop>({
    name: '',
    description: '',
    image: null,
    redirect: false,
    error: '',
    id: '',
    owner: '',
  })
  const jwt = auth.isAuthenticated()
  const { shopId } = useParams()

  useEffect(() => {
    const abortController = new AbortController()
    const signal = abortController.signal
    read(
      {
        shopId: shopId ?? '',
      },
      signal
    ).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error })
      } else {
        setValues({
          ...values,
          id: data._id,
          name: data.name,
          description: data.description,
          owner: data.owner.name,
        })
      }
    })
    return function cleanup() {
      abortController.abort()
    }
  }, [])

  const clickSubmit = () => {
    const shopData = new FormData()
    values.name && shopData.append('name', values.name)
    values.description && shopData.append('description', values.description)
    values.image && shopData.append('image', values.image)
    update(
      {
        shopId: shopId ?? '',
      },
      {
        t: jwt.token,
      },
      shopData
    ).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error })
      } else {
        setValues({ ...values, redirect: true })
      }
    })
  }
  const handleChange =
    (name: string) => (event: ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files
        ? event.target.files[0]
        : event.target.value

      const value = name === 'image' ? file : event.target.value
      setValues({ ...values, [name]: value })
    }

  const logoUrl = values.id
    ? `${URL}/shops/logo/${values.id}`
    : `${URL}/shops/defaultphoto`

  if (values.redirect) {
    return <Navigate to={'/seller/shops'} />
  }

  return (
    <div style={styles.root}>
      <Grid container spacing={8}>
        <Grid item xs={6} sm={6}>
          <Card sx={styles.card}>
            <CardContent>
              <Typography variant="subtitle1" component="h2" sx={styles.title}>
                Edit Shop
              </Typography>
              <br />
              <Avatar src={logoUrl} sx={styles.bigAvatar} />
              <br />
              <input
                accept="image/*"
                onChange={handleChange('image')}
                id="icon-button-file"
                type="file"
                style={styles.input}
              />
              <label htmlFor="icon-button-file">
                <Button variant="contained" component="span">
                  Change Logo
                  <FileUpload />
                </Button>
              </label>{' '}
              <span style={styles.filename}>
                {values.image ? values.image.name : ''}
              </span>
              <br />
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
                id="multiline-flexible"
                label="Description"
                multiline
                rows="3"
                value={values.description}
                onChange={handleChange('description')}
                margin="normal"
                sx={styles.textField}
              />
              <br />
              <Typography variant="subtitle2" component="h4">
                Owner: {values.owner}
              </Typography>
              <br />
              {values.error && (
                <Typography component="p" color="error" sx={styles.subheading}>
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
                Update
              </Button>
            </CardActions>
          </Card>
        </Grid>
        <Grid item xs={6} sm={6}>
          <MyProducts shopId={shopId ?? ''} />
        </Grid>
      </Grid>
    </div>
  )
}

export default EditShop
