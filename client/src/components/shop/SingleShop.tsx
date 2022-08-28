import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Avatar from '@mui/material/Avatar'
import Grid from '@mui/material/Grid'

import { read } from './api-shop'
import { listByShop } from '../product/api-product'
import { Shop } from '../../types/shop'
import Products from '../product/Products'
import theme from '../../styles/theme'

const URL = 'https://backend-online-shop-sla686.herokuapp.com/api/v1/'

const styles = {
  root: {
    flexGrow: 1,
    margin: 30,
  },
  card: {
    textAlign: 'center',
    paddingBottom: theme.spacing(2),
  },
  title: {
    margin: theme.spacing(2),
    fontSize: '2em',
  },
  subheading: {
    marginTop: theme.spacing(1),
  },
  bigAvatar: {
    width: 100,
    height: 100,
    margin: 'auto',
  },
  productTitle: {
    padding: `${theme.spacing(3)} ${theme.spacing(2.5)} ${theme.spacing(
      1
    )} ${theme.spacing(2)}`,
    width: '100%',
    fontSize: '1.7em',
  },
}

const SingleShop = () => {
  const [shop, setShop] = useState<Shop>()
  const [products, setProducts] = useState([])
  const [, setError] = useState('')
  const { shopId } = useParams()

  useEffect(() => {
    const abortController = new AbortController()
    const signal = abortController.signal

    listByShop(
      {
        shopId: shopId ?? '',
      },
      signal
    ).then((data) => {
      if (data.error) {
        setError(data.error)
      } else {
        setProducts(data)
      }
    })
    read(
      {
        shopId: shopId ?? '',
      },
      signal
    ).then((data) => {
      if (data.error) {
        setError(data.error)
      } else {
        setShop(data)
      }
    })

    return function cleanup() {
      abortController.abort()
    }
  }, [shopId])

  const logoUrl = shop?._id
    ? `${URL}/shops/logo/` + shop._id
    : `${URL}/shops/defaultphoto`

  return (
    <div style={styles.root}>
      <Grid container spacing={8}>
        <Grid item xs={4} sm={4}>
          <Card sx={styles.card}>
            <CardContent>
              <Typography sx={styles.title} variant="subtitle1" component="h1">
                {shop?.name}
              </Typography>
              <br />
              <Avatar src={logoUrl} sx={styles.bigAvatar} />
              <br />
              <Typography
                sx={styles.subheading}
                variant="subtitle2"
                component="h2"
              >
                {shop?.description}
              </Typography>
              <br />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={8} sm={8}>
          <Card>
            <Typography
              sx={styles.productTitle}
              variant="subtitle1"
              component="h2"
            >
              Products
            </Typography>
            <Products products={products} searched={false} />
          </Card>
        </Grid>
      </Grid>
    </div>
  )
}

export default SingleShop
