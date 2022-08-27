import React, { useState, useEffect } from 'react'
import { Navigate, Link } from 'react-router-dom'

import Paper from '@mui/material/Paper'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction'
import ListItemText from '@mui/material/ListItemText'
import Avatar from '@mui/material/Avatar'
import IconButton from '@mui/material/IconButton'
import Icon from '@mui/material/Icon'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import Edit from '@mui/icons-material/Edit'

import { Shop } from '../../types/shop'
import auth from './../auth/auth-helper'
import { listByOwner } from './api-shop'
import DeleteShop from './DeleteShop'

const URL = 'http://localhost:4000'

const MyShops = () => {
  const [shops, setShops] = useState<Shop[]>([])
  const [redirectToSignin, setRedirectToSignin] = useState(false)
  const jwt = auth.isAuthenticated()

  useEffect(() => {
    const abortController = new AbortController()
    const signal = abortController.signal
    listByOwner(
      {
        userId: jwt.user._id,
      },
      { t: jwt.token },
      signal
    ).then((data) => {
      if (data.error) {
        setRedirectToSignin(true)
      } else {
        setShops(data)
      }
    })
    return function cleanup() {
      abortController.abort()
    }
  }, [])

  const removeShop = (shop: Shop) => {
    const updatedShops = [...shops]
    const index = updatedShops.indexOf(shop)
    updatedShops.splice(index, 1)
    setShops(updatedShops)
  }

  if (redirectToSignin) {
    return <Navigate to="/signin" />
  }

  return (
    <div>
      <Paper elevation={4}>
        <Typography variant="subtitle1">
          Your Shops
          <span>
            <Link to="/seller/shops/new">
              <Button color="primary" variant="contained">
                <Icon>add_box</Icon> New Shop
              </Button>
            </Link>
          </span>
        </Typography>
        <List dense>
          {shops.map((shop, i) => {
            return (
              <span key={i}>
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
                  <ListItemText
                    primary={shop?.name}
                    secondary={shop?.description}
                  />
                  {auth.isAuthenticated().user &&
                    auth.isAuthenticated().user._id == shop?.owner._id && (
                      <ListItemSecondaryAction>
                        <Link
                          to={'/seller/orders/' + shop?.name + '/' + shop?._id}
                        >
                          <Button aria-label="Orders" color="primary">
                            View Orders
                          </Button>
                        </Link>
                        <Link to={'/seller/shops/edit/' + shop?._id}>
                          <IconButton aria-label="Edit" color="primary">
                            <Edit />
                          </IconButton>
                        </Link>
                        <DeleteShop shop={shop} onRemove={removeShop} />
                      </ListItemSecondaryAction>
                    )}
                </ListItem>
                <Divider />
              </span>
            )
          })}
        </List>
      </Paper>
    </div>
  )
}

export default MyShops
