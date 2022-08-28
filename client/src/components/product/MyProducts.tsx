import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardMedia from '@mui/material/CardMedia'
import IconButton from '@mui/material/IconButton'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import Edit from '@mui/icons-material/Edit'
import AddBoxIcon from '@mui/icons-material/AddBox'

import DeleteProduct from './../product/DeleteProduct'
import { listByShop } from './../product/api-product'
import { Product } from '../../types/product'
import theme from '../../styles/theme'

const URL = 'https://backend-online-shop-sla686.herokuapp.com/api/v1/'

const styles = {
  card: {
    padding: '24px',
  },
  leftIcon: {
    marginRight: '8px',
  },
  title: {
    margin: theme.spacing(2),
    fontSize: '2em',
  },
  subheading: {
    marginTop: theme.spacing(2),
  },
  cover: {
    width: 110,
    height: 100,
    margin: '8px',
  },
  details: {
    padding: '10px',
  },
}

const MyProducts = ({ shopId }: { shopId: string }) => {
  const [products, setProducts] = useState<Product[]>([])

  useEffect(() => {
    const abortController = new AbortController()
    const signal = abortController.signal

    listByShop(
      {
        shopId: shopId,
      },
      signal
    ).then((data) => {
      if (data.error) {
        console.log(data.error)
      } else {
        setProducts(data)
      }
    })
    return function cleanup() {
      abortController.abort()
    }
  }, [])

  const removeProduct = (product: Product) => {
    const updatedProducts = [...products]
    const index = updatedProducts.indexOf(product)
    updatedProducts.splice(index, 1)
    setProducts(updatedProducts)
  }
  return (
    <Card sx={styles.card}>
      <Typography variant="h1" sx={styles.title}>
        Products
        <span style={{ float: 'right' }}>
          <Link to={'/seller/' + shopId + '/products/new'}>
            <Button color="primary" variant="contained">
              <AddBoxIcon sx={styles.leftIcon} />
              New Product
            </Button>
          </Link>
        </span>
      </Typography>
      <List dense>
        {products.map((product, i) => {
          return (
            <span key={i}>
              <ListItem>
                <CardMedia
                  sx={styles.cover}
                  image={
                    `${URL}/products/image/` +
                    product._id +
                    '?' +
                    new Date().getTime()
                  }
                  title={product.name}
                />
                <div style={styles.details}>
                  <Typography
                    variant="subtitle1"
                    component="h2"
                    color="primary"
                    sx={styles.subheading}
                  >
                    {product.name}
                  </Typography>
                  <Typography
                    variant="subtitle2"
                    component="h4"
                    sx={styles.subheading}
                  >
                    Quantity: {product.quantity} | Price: ${product.price}
                  </Typography>
                </div>
                <ListItemSecondaryAction>
                  <Link
                    to={
                      '/seller/' +
                      product.shop._id +
                      '/' +
                      product._id +
                      '/edit'
                    }
                  >
                    <IconButton aria-label="Edit" color="primary">
                      <Edit />
                    </IconButton>
                  </Link>
                  <DeleteProduct
                    product={product}
                    shopId={shopId}
                    onRemove={removeProduct}
                  />
                </ListItemSecondaryAction>
              </ListItem>
              <Divider />
            </span>
          )
        })}
      </List>
    </Card>
  )
}
MyProducts.propTypes = {
  shopId: PropTypes.string.isRequired,
}

export default MyProducts
