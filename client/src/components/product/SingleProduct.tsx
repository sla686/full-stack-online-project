import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import Icon from '@mui/material/Icon'
import Grid from '@mui/material/Grid'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'

// Possible new component for the cart
/* import AddToCart from './../cart/AddToCart' */
import Suggestions from './../product/Suggestions'
import { read, listRelated } from './api-product'
import { Product } from '../../types/product'

const URL = 'http://localhost:4000/api/v1'

const SingleProduct = () => {
  const [product, setProduct] = useState<Product>({
    name: '',
    created: '',
    description: '',
    quantity: 0,
    shop: { _id: '', name: '' },
  })
  const [suggestions, setSuggestions] = useState([])
  const [error, setError] = useState('')
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
    <div>
      <Grid container spacing={10}>
        <Grid item xs={7} sm={7}>
          <Card>
            <CardHeader
              title={product.name}
              subheader={product.quantity > 0 ? 'In Stock' : 'Out of Stock'}
              action={
                <span>
                  {/* <AddToCart cartStyle={classes.addCart} item={product} /> */}
                  <p>Cart adding will be here</p>
                </span>
              }
            />
            <div>
              <CardMedia
                component="img"
                image={imageUrl}
                title={product.name}
              />
              <Typography component="p" variant="subtitle1">
                {product.description}
                <br />
                <span>$ {product.price}</span>
                <Link to={'/shops/' + product.shop._id}>
                  <span>
                    <Icon>
                      <ShoppingCartIcon />
                    </Icon>{' '}
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
