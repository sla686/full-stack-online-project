import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import Typography from '@mui/material/Typography'
import ImageList from '@mui/material/ImageList'
import ImageListItem from '@mui/material/ImageListItem'
import ImageListItemBar from '@mui/material/ImageListItemBar'

import { Product } from '../../types/product'
import theme from '../../styles/theme'
import { styled } from '@mui/system'
// import AddToCart from './../cart/AddToCart

const URL = 'https://backend-online-shop-sla686.herokuapp.com/api/v1/'

const styles = {
  gridList: {
    width: '100%',
    minHeight: 200,
    padding: '16px 0 10px',
  },
  title: {
    padding: `${theme.spacing(3)} ${theme.spacing(2.5)}px ${theme.spacing(2)}`,
    width: '100%',
  },
  image: {
    height: '100%',
  },
  itemTitle: {
    fontSize: '1.1em',
    marginBottom: '5px',
    color: 'rgb(189, 222, 219)',
    display: 'block',
  },
}

const Root = styled('div')(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'space-around',
  overflow: 'hidden',
  background: theme.palette.background.paper,
  textAlign: 'left',
  padding: '0 8px',
}))

const Container = styled('div')(() => ({
  minWidth: '100%',
  paddingBottom: '14px',
}))

const Item = styled(ImageListItem)(() => ({
  textAlign: 'center',
  // height: '204px',
  padding: '2px',

  height: '100%',
  display: 'block',
  overflow: 'hidden',
  position: 'relative',
}))

const ItemBar = styled(ImageListItemBar)(() => ({
  backgroundColor: 'rgba(0, 0, 0, 0.72)',
  textAlign: 'left',
}))

const Products = ({
  products,
  searched,
}: {
  products: Product[]
  searched: boolean
}) => {
  return (
    <Root>
      {products.length > 0 ? (
        <Container>
          <ImageList rowHeight={200} cols={3} style={styles.gridList}>
            {products.map((product, i) => (
              <Item key={i}>
                <Link to={'/products/' + product._id}>
                  <img
                    style={styles.image}
                    src={`${URL}/products/image/` + product._id}
                    alt={product.name}
                  />
                </Link>
                <ItemBar
                  title={
                    <Link
                      to={'/products/' + product._id}
                      style={styles.itemTitle}
                    >
                      {product.name}
                    </Link>
                  }
                  subtitle={<span>$ {product.price}</span>}
                  // actionIcon={<AddToCart item={product} />}
                />
              </Item>
            ))}
          </ImageList>
        </Container>
      ) : (
        searched && (
          <Typography style={styles.title} variant="subtitle2" component="h4">
            No products found!
          </Typography>
        )
      )}
    </Root>
  )
}
Products.propTypes = {
  products: PropTypes.array.isRequired,
  searched: PropTypes.bool.isRequired,
}

export default Products
