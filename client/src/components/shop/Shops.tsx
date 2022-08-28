import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Paper from '@mui/material/Paper'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import Avatar from '@mui/material/Avatar'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'

import { list } from './api-shop'
import { Shop } from '../../types/shop'
import theme from '../../styles/theme'
import { styled } from '@mui/system'

const URL = 'https://backend-online-shop-sla686.herokuapp.com/api/v1'

const styles = {
  root: {
    maxWidth: 900,
    margin: 'auto',
    padding: theme.spacing(3),
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(3),
  },
  avatar: {
    width: 100,
    height: 100,
  },
}

const Title = styled(Typography)(({ theme }) => ({
  margin: `${theme.spacing(3)} 0 ${theme.spacing(2)}`,
  textAlign: 'center',
  fontSize: '2em',
}))

const ShopTitle = styled(Typography)(() => ({
  fontSize: '1.6em',
  marginBottom: '5px',
}))

const ShopDescription = styled(Typography)(() => ({
  color: theme.palette.text.secondary,
}))

const Details = styled('div')(() => ({
  padding: '24px',
}))

const Shops = () => {
  const [shops, setShops] = useState<Shop[]>([])

  useEffect(() => {
    const abortController = new AbortController()
    const signal = abortController.signal
    list(signal).then((data) => {
      if (data.error) {
        console.log(data.error)
      } else {
        setShops(data)
      }
    })
    return function cleanup() {
      abortController.abort()
    }
  }, [])
  return (
    <>
      <Paper style={styles.root} elevation={4}>
        <Title variant="h1">All Shops</Title>
        <List dense>
          {shops.map((shop, i) => {
            return (
              <Link to={'/shops/' + shop._id} key={i}>
                <Divider />
                <ListItem button>
                  <ListItemAvatar>
                    <Avatar
                      style={styles.avatar}
                      src={
                        `${URL}/shops/logo/` + shop._id
                        // + '?' +
                        // new Date().getTime()
                      }
                    />
                  </ListItemAvatar>
                  <Details>
                    <ShopTitle variant="h3" color="primary">
                      {shop?.name}
                    </ShopTitle>
                    <ShopDescription variant="subtitle1">
                      {shop?.description}
                    </ShopDescription>
                  </Details>
                </ListItem>
                <Divider />
              </Link>
            )
          })}
        </List>
      </Paper>
    </>
  )
}

export default Shops
