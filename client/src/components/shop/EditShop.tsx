import React, { useEffect, useState, ChangeEvent } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import Icon from '@mui/material/Icon'
import Avatar from '@mui/material/Avatar'
import Grid from '@mui/material/Grid'
import FileUpload from '@mui/icons-material/AddPhotoAlternate'

import auth from './../auth/auth-helper'
import { read, update } from './api-shop'
import { Shop } from './../../types/shop'
// import MyProducts from './../product/MyProducts'

interface EditShop {
  owner: string
  id: string
  name: string
  description: string
  image: File | null
  redirect: boolean
  error: string
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
    ? `/api/shops/logo/${values.id}?${new Date().getTime()}`
    : '/api/shops/defaultphoto'

  if (values.redirect) {
    return <Navigate to={'/seller/shops'} />
  }

  return (
    <div>
      <Grid container spacing={8}>
        <Grid item xs={6} sm={6}>
          <Card>
            <CardContent>
              <Typography variant="subtitle1" component="h2">
                Edit Shop
              </Typography>
              <br />
              <Avatar src={logoUrl} />
              <br />
              <input
                accept="image/*"
                onChange={handleChange('image')}
                id="icon-button-file"
                type="file"
              />
              <label htmlFor="icon-button-file">
                <Button variant="contained" component="span">
                  Change Logo
                  <FileUpload />
                </Button>
              </label>{' '}
              <span>{values.image ? values.image.name : ''}</span>
              <br />
              <TextField
                id="name"
                label="Name"
                value={values.name}
                onChange={handleChange('name')}
                margin="normal"
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
              />
              <br />
              <Typography variant="subtitle2" component="h4">
                Owner: {values.owner}
              </Typography>
              <br />
              {values.error && (
                <Typography component="p" color="error">
                  <Icon color="error">error</Icon>
                  {values.error}
                </Typography>
              )}
            </CardContent>
            <CardActions>
              <Button color="primary" variant="contained" onClick={clickSubmit}>
                Update
              </Button>
            </CardActions>
          </Card>
        </Grid>
        <Grid item xs={6} sm={6}>
          {/* <MyProducts shopId={shopId} /> */}
          <p>My Products goes</p>
        </Grid>
      </Grid>
    </div>
  )
}

export default EditShop
