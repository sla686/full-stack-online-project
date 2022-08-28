import React, { useEffect, useState, ChangeEvent } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import ErrorIcon from '@mui/icons-material/Error'
import Avatar from '@mui/material/Avatar'
import FileUpload from '@mui/icons-material/AddPhotoAlternate'

import auth from './../auth/auth-helper'
import { read, update } from './api-product'
import theme from '../../styles/theme'

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

const styles = {
  card: {
    margin: 'auto',
    textAlign: 'center',
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(2),
    maxWidth: 500,
    paddingBottom: theme.spacing(2),
  },
  title: {
    margin: theme.spacing(2),
    fontSize: '2em',
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
    <>
      <Card sx={styles.card}>
        <CardContent>
          <Typography sx={styles.title} variant="h2" component="h2">
            Edit Product
          </Typography>
          <br />
          <Avatar src={imageUrl} sx={styles.bigAvatar} />
          <br />
          <input
            accept="image/*"
            onChange={handleChange('image')}
            id="icon-button-file"
            type="file"
            style={styles.input}
          />
          <label htmlFor="icon-button-file">
            <Button variant="contained" color="secondary" component="span">
              Change Image
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
          <TextField
            id="category"
            label="Category"
            value={values.category}
            onChange={handleChange('category')}
            margin="normal"
            sx={styles.textField}
          />
          <br />
          <TextField
            id="quantity"
            label="Quantity"
            value={values.quantity}
            onChange={handleChange('quantity')}
            type="number"
            margin="normal"
            sx={styles.textField}
          />
          <br />
          <TextField
            id="price"
            label="Price"
            value={values.price}
            onChange={handleChange('price')}
            type="number"
            margin="normal"
            sx={styles.textField}
          />
          <br />
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
            Update
          </Button>
          <Link to={'/seller/shops/edit/' + shopId} style={styles.submit}>
            <Button variant="contained">Cancel</Button>
          </Link>
        </CardActions>
      </Card>
    </>
  )
}

export default EditProduct
