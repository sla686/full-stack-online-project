import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Avatar from '@mui/material/Avatar'
import Grid from '@mui/material/Grid'

import { read } from './api-shop'
import { Shop } from '../../types/shop'

const SingleShop = () => {
  const [shop, setShop] = useState<Shop>()
  const [products, setProducts] = useState([])
  const [error, setError] = useState('')
  const { shopId } = useParams()

  useEffect(() => {
    const abortController = new AbortController()
    const signal = abortController.signal

    // listByShop(
    //   {
    //     shopId: shopId ?? '',
    //   },
    //   signal
    // ).then((data) => {
    //   if (data.error) {
    //     setError(data.error)
    //   } else {
    //     setProducts(data)
    //   }
    // })
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

  useEffect(() => {
    const abortController = new AbortController()
    const signal = abortController.signal

    // listByShop(
    //   {
    //     shopId: shopId ?? '',
    //   },
    //   signal
    // ).then((data) => {
    //   if (data.error) {
    //     setError(data.error)
    //   } else {
    //     setProducts(data)
    //   }
    // })

    return function cleanup() {
      abortController.abort()
    }
  }, [shopId])

  const logoUrl = shop?._id
    ? `/shops/logo/${shop._id}?${new Date().getTime()}`
    : '/shops/defaultphoto'
  return (
    <div>
      <Grid container spacing={8}>
        <Grid item xs={4} sm={4}>
          <Card>
            <CardContent>
              <Typography variant="subtitle1" component="h2">
                {shop?.name}
              </Typography>
              <br />
              <Avatar src={logoUrl} />
              <br />
              <Typography variant="subtitle2" component="h2">
                {shop?.description}
              </Typography>
              <br />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={8} sm={8}>
          <Card>
            <Typography variant="subtitle1" component="h2">
              Products
            </Typography>
            {/* <Products products={products} searched={false} /> */}
          </Card>
        </Grid>
      </Grid>
    </div>
  )
}

export default SingleShop
