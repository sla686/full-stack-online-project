import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'

// Possible name of the component for the cart
/* import AddToCart from './../cart/AddToCart' */
import Suggestions from './../product/Suggestions'
import { read, listRelated } from './api-product'
import { Product } from '../../types/product'

const URL = 'https://backend-online-shop-sla686.herokuapp.com/api/v1/'

const styles = {
  root: {
    flexGrow: 1,
    margin: 30,
  },
  flex: {
    display: 'flex',
  },
  card: {
    padding: '24px 40px 40px',
  },
  subheading: {
    margin: '24px',
  },
  price: {
    padding: '16px',
    margin: '16px 0px',
    display: 'flex',
    backgroundColor: '#93c5ae3d',
    fontSize: '1.3em',
    color: '#375a53',
  },
  media: {
    height: 200,
    display: 'inline-block',
    width: '50%',
    marginLeft: '24px',
  },
  icon: {
    verticalAlign: 'sub',
  },
  link: {
    color: '#3e4c54b3',
    fontSize: '0.9em',
  },
  action: {
    margin: '8px 24px',
    display: 'inline-block',
  },
}

const SingleProduct = () => {
  const [product, setProduct] = useState<Product>({
    name: '',
    created: '',
    description: '',
    quantity: 0,
    shop: { _id: '', name: '' },
  })
  const [suggestions, setSuggestions] = useState([])
  const [, setError] = useState('')
  const { productId } = useParams()

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
        setError(data.error)
      } else {
        setProduct(data)
      }
    })
    return function cleanup() {
      abortController.abort()
    }
  }, [productId])

  useEffect(() => {
    const abortController = new AbortController()
    const signal = abortController.signal

    listRelated(
      {
        productId: productId ?? '',
      },
      signal
    ).then((data) => {
      if (data.error) {
        setError(data.error)
      } else {
        setSuggestions(data)
      }
    })
    return function cleanup() {
      abortController.abort()
    }
  }, [productId])

  const imageUrl = product._id
    ? `${URL}/products/image/${product._id}?${new Date().getTime()}`
    : `${URL}/products/defaultphoto`

  return (
    <div style={styles.root}>
      <Grid container spacing={10}>
        <Grid item xs={7} sm={7}>
          <Card sx={styles.card}>
            <CardHeader
              title={product.name}
              subheader={product.quantity > 0 ? 'In Stock' : 'Out of Stock'}
              action={
                <span style={styles.action}>
                  <p>AddToCart will be placed here</p>
                </span>
              }
            />
            <div style={styles.flex}>
              <CardMedia
                sx={styles.media}
                component="img"
                image={imageUrl}
                title={product.name}
              />
              <Typography
                sx={styles.subheading}
                component="p"
                variant="subtitle1"
              >
                {product.description}
                <br />
                <span style={styles.price}>$ {product.price}</span>
                <Link to={'/shops/' + product.shop._id} style={styles.link}>
                  <span>
                    <ShoppingCartIcon sx={styles.icon} />
                    {product.shop.name}
                  </span>
                </Link>
              </Typography>
            </div>
          </Card>
        </Grid>
        {suggestions.length > 0 && (
          <Grid item xs={5} sm={5}>
            <Suggestions products={suggestions} title="Related Products" />
          </Grid>
        )}
      </Grid>
    </div>
  )
}

export default SingleProduct
