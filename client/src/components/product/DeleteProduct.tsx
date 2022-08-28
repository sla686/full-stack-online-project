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
import { remove } from './api-product'
import { Product } from '../../types/product'

const DeleteProduct = ({
  shopId,
  product,
  onRemove,
}: {
  shopId: string
  product: Product
  onRemove: (product: Product) => void
}) => {
  const [open, setOpen] = useState(false)
  const jwt = auth.isAuthenticated()

  const clickButton = () => {
    setOpen(true)
  }

  const handleRequestClose = () => {
    setOpen(false)
  }

  const deleteProduct = () => {
    remove(
      {
        shopId: shopId ?? '',
        productId: product._id ?? '',
      },
      { t: jwt.token }
    ).then((data) => {
      if (data.error) {
        console.log(data.error)
      } else {
        setOpen(false)
        onRemove(product)
      }
    })
  }

  return (
    <span>
      <IconButton aria-label="Delete" onClick={clickButton} color="secondary">
        <DeleteIcon />
      </IconButton>
      <Dialog open={open} onClose={handleRequestClose}>
        <DialogTitle>{'Delete ' + product.name}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Confirm to delete your product {product.name}.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleRequestClose} color="primary">
            Cancel
          </Button>
          <Button onClick={deleteProduct} color="secondary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </span>
  )
}
DeleteProduct.propTypes = {
  shopId: PropTypes.string.isRequired,
  product: PropTypes.object.isRequired,
  onRemove: PropTypes.func.isRequired,
}

export default DeleteProduct
