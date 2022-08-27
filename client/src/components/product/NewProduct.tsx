import React, { useState, ChangeEvent } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import Icon from '@mui/material/Icon'
import FileUpload from '@mui/icons-material/AddPhotoAlternate'

import { create } from './api-product'
import auth from './../auth/auth-helper'

interface NewProduct {
  name: string
  description: string
  image: File | null
  category: string
  quantity: string
  price: string
  redirect: boolean
  error: string
}

const NewProduct = () => {
  const [values, setValues] = useState<NewProduct>({
    name: '',
    description: '',
    image: null,
    category: '',
    quantity: '',
    price: '',
    redirect: false,
    error: '',
  })
  const jwt = auth.isAuthenticated()
  const { shopId } = useParams()

  const handleChange =
    (name: string) => (event: ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files
        ? event.target.files[0]
        : event.target.value
      const value = name === 'image' ? file : event.target.value
      setValues({ ...values, [name]: value })
    }

  const clickSubmit = () => {
    const productData = new FormData()
    values.name && productData.append('name', values.name)
    values.description && productData.append('description', values.description)
    values.image && productData.append('image', values.image)
    values.category && productData.append('category', values.category)
    values.quantity && productData.append('quantity', values.quantity)
    values.price && productData.append('price', values.price)

    create(
      {
        shopId: shopId ?? '',
      },
      {
        t: jwt.token,
      },
      productData
    ).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error })
      } else {
        setValues({ ...values, error: '', redirect: true })
      }
    })
  }

  if (values.redirect) {
    return <Navigate to={'/seller/shop/edit/' + shopId} />
  }
  return (
    <div>
      <Card>
        <CardContent>
          <Typography variant="subtitle1" component="h2">
            New Shop
          </Typography>
          <br />
          <input
            accept="image/*"
            onChange={handleChange('image')}
            id="icon-button-file"
            type="file"
          />
          <label htmlFor="icon-button-file">
            <Button variant="contained" color="secondary" component="span">
              Upload Logo
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
            rows="2"
            value={values.description}
            onChange={handleChange('description')}
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
          <Link to="/seller/shops">
            <Button variant="contained">Cancel</Button>
          </Link>
        </CardActions>
      </Card>
    </div>
  )
}

export default NewProduct
