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

const URL = 'http://localhost:4000'

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
    <div>
      <Paper elevation={4}>
        <Typography variant="subtitle1">All Shops</Typography>
        <List dense>
          {shops.map((shop, i) => {
            return (
              <Link to={'/shops/' + shop._id} key={i}>
                <Divider />
                <ListItem button>
                  <ListItemAvatar>
                    <Avatar
                      src={
                        `${URL}/api/v1/shops/logo/` + shop._id
                        // + '?' +
                        // new Date().getTime()
                      }
                    />
                  </ListItemAvatar>
                  <div>
                    <Typography
                      variant="subtitle1"
                      component="h2"
                      color="primary"
                    >
                      {shop?.name}
                    </Typography>
                    <Typography variant="subtitle2" component="h4">
                      {shop?.description}
                    </Typography>
                  </div>
                </ListItem>
                <Divider />
              </Link>
            )
          })}
        </List>
      </Paper>
    </div>
  )
}

export default Shops
