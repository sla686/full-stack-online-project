import React, { useState } from 'react'
import PropTypes from 'prop-types'
import IconButton from '@mui/material/IconButton'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import DeleteIcon from '@mui/icons-material/Delete'

import auth from './../auth/auth-helper'
import { remove } from './api-shop'
import { Shop } from '../../types/shop'

const DeleteShop = ({
  shop,
  onRemove,
}: {
  shop: Shop
  onRemove: (shop: Shop) => void
}) => {
  const [open, setOpen] = useState(false)
  const jwt = auth.isAuthenticated()

  const clickButton = () => {
    setOpen(true)
  }
  const handleRequestClose = () => {
    setOpen(false)
  }

  const deleteShop = () => {
    remove(
      {
        shopId: shop._id ?? '',
      },
      { t: jwt.token }
    ).then((data) => {
      if (data.error) {
        console.log(data.error)
      } else {
        setOpen(false)
        onRemove(shop)
      }
    })
  }

  return (
    <span>
      <IconButton aria-label="Delete" onClick={clickButton} color="secondary">
        <DeleteIcon />
      </IconButton>

      <Dialog open={open} onClose={handleRequestClose}>
        <DialogTitle>{'Delete ' + shop.name}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Confirm to delete your shop {shop.name}.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleRequestClose} color="primary">
            Cancel
          </Button>
          <Button onClick={deleteShop} color="secondary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </span>
  )
}
DeleteShop.propTypes = {
  shop: PropTypes.object.isRequired,
  onRemove: PropTypes.func.isRequired,
}

export default DeleteShop
