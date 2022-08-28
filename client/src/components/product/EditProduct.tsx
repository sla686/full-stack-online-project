import React, { useEffect, useState, ChangeEvent } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import Icon from '@mui/material/Icon'
import Avatar from '@mui/material/Avatar'
import FileUpload from '@mui/icons-material/AddPhotoAlternate'

import auth from './../auth/auth-helper'
import { read, update } from './api-product'

interface EditProduct {
  id: string
  name: string
  description: string
  image: File | null
  category: string
  quantity: string
  price: string
  redirect: boolean
  error: string
}

const URL = 'http://localhost:4000/api/v1'

const EditProduct = () => {
  const [values, setValues] = useState<EditProduct>({
    id: '',
    name: '',
    description: '',
    image: null,
    category: '',
    quantity: '',
    price: '',
    redirect: false,
    error: '',
  })
  const { shopId, productId } = useParams()
  const jwt = auth.isAuthenticated()

  useEffect(() => {
    const abortController = new AbortController()
    const signal = abortController.signal
    read(
      {
        productId: productId ?? '',
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
          category: data.category,
          quantity: data.quantity,
          price: data.price,
        })
      }
    })
    return function cleanup() {
      abortController.abort()
    }
  }, [])
  const clickSubmit = () => {
    const productData = new FormData()
    values.name && productData.append('name', values.name)
    values.description && productData.append('description', values.description)
    values.image && productData.append('image', values.image)
    values.category && productData.append('category', values.category)
    values.quantity && productData.append('quantity', values.quantity)
    values.price && productData.append('price', values.price)

    update(
      {
        shopId: shopId ?? '',
        productId: productId ?? '',
      },
      {
        t: jwt.token,
      },
      productData
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
  const imageUrl = values.id
    ? `${URL}/products/image/${values.id}?${new Date().getTime()}`
    : `${URL}/products/defaultphoto`

  if (values.redirect) {
    return <Navigate to={'/seller/shops/edit/' + shopId} />
  }
  return (
    <div>
      <Card>
        <CardContent>
          <Typography variant="subtitle1" component="h2">
            Edit Product
          </Typography>
          <br />
          <Avatar src={imageUrl} />
          <br />
          <input
            accept="image/*"
            onChange={handleChange('image')}
            id="icon-button-file"
            type="file"
          />
          <label htmlFor="icon-button-file">
            <Button variant="contained" color="secondary" component="span">
              Change Image
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
          <TextField
            id="category"
            label="Category"
            value={values.category}
            onChange={handleChange('category')}
            margin="normal"
          />
          <br />
          <TextField
            id="quantity"
            label="Quantity"
            value={values.quantity}
            onChange={handleChange('quantity')}
            type="number"
            margin="normal"
          />
          <br />
          <TextField
            id="price"
            label="Price"
            value={values.price}
            onChange={handleChange('price')}
            type="number"
            margin="normal"
          />
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
          <Link to={'/seller/shops/edit/' + shopId}>
            <Button variant="contained">Cancel</Button>
          </Link>
        </CardActions>
      </Card>
    </div>
  )
}

export default EditProduct
