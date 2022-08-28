import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardMedia from '@mui/material/CardMedia'
import IconButton from '@mui/material/IconButton'
import Icon from '@mui/material/Icon'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import Edit from '@mui/icons-material/Edit'

// import DeleteProduct from './../product/DeleteProduct'
import { listByShop } from './../product/api-product'
import { Product } from '../../types/product'

const URL = 'http://localhost:4000/api/v1'

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

  // Possible solution for removing the product
  /*   const removeProduct = (product: Product) => {
    const updatedProducts = [...products]
    const index = updatedProducts.indexOf(product)
    updatedProducts.splice(index, 1)
    setProducts(updatedProducts)
  } */
  return (
    <Card>
      <Typography variant="h3">
        Products
        <span>
          <Link to={'/seller/' + shopId + '/products/new'}>
            <Button color="primary" variant="contained">
              <Icon>add_box</Icon> New Product
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
                  image={
                    `${URL}/products/image/` +
                    product._id +
                    '?' +
                    new Date().getTime()
                  }
                  title={product.name}
                />
                <div>
                  <Typography
                    variant="subtitle1"
                    component="h2"
                    color="primary"
                  >
                    {product.name}
                  </Typography>
                  <Typography variant="subtitle2" component="h4">
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
                  {/*                   <DeleteProduct
                    product={product}
                    shopId={props.shopId}
                    onRemove={removeProduct}
                  /> */}
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
