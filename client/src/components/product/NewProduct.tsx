import React, { useState, ChangeEvent } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import ErrorIcon from '@mui/icons-material/Error'
import FileUpload from '@mui/icons-material/AddPhotoAlternate'

import { create } from './api-product'
import auth from './../auth/auth-helper'
import theme from '../../styles/theme'

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
    fontSize: '2em',
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
  input: {
    display: 'none',
  },
  filename: {
    marginLeft: '10px',
  },
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
    return <Navigate to={'/seller/shops/edit/' + shopId} />
  }
  return (
    <>
      <Card sx={styles.card}>
        <CardContent>
          <Typography sx={styles.title} variant="h2" component="h2">
            New Product
          </Typography>
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
              Upload Logo
              <FileUpload />
            </Button>
          </label>
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
            rows="2"
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
            Submit
          </Button>
          <Link to={'/seller/shops/edit/' + shopId} style={styles.submit}>
            <Button variant="contained">Cancel</Button>
          </Link>
        </CardActions>
      </Card>
    </>
  )
}

export default NewProduct
