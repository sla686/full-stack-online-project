import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import Typography from '@mui/material/Typography'
import ImageList from '@mui/material/ImageList'
import ImageListItem from '@mui/material/ImageListItem'
import ImageListItemBar from '@mui/material/ImageListItemBar'

import { Product } from '../../types/product'
// import AddToCart from './../cart/AddToCart

const URL = 'http://localhost:4000/api/v1'

const Products = ({
  products,
  searched,
}: {
  products: Product[]
  searched: boolean
}) => {
  return (
    <div>
      {products.length > 0 ? (
        <div>
          <ImageList rowHeight={200} cols={3}>
            {products.map((product, i) => (
              <ImageListItem key={i}>
                <Link to={'/products/' + product._id}>
                  <img
                    src={`${URL}/products/image/` + product._id}
                    alt={product.name}
                  />
                </Link>
                <ImageListItemBar
                  title={
                    <Link to={'/products/' + product._id}>{product.name}</Link>
                  }
                  subtitle={<span>$ {product.price}</span>}
                  // actionIcon={<AddToCart item={product} />}
                />
              </ImageListItem>
            ))}
          </ImageList>
        </div>
      ) : (
        searched && (
          <Typography variant="subtitle2" component="h4">
            No products found! :(
          </Typography>
        )
      )}
    </div>
  )
}
Products.propTypes = {
  products: PropTypes.array.isRequired,
  searched: PropTypes.bool.isRequired,
}

export default Products
