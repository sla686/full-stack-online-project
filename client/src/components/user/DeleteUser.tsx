import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Navigate } from 'react-router-dom'
import IconButton from '@mui/material/IconButton'
import Button from '@mui/material/Button'
import DeleteIcon from '@mui/icons-material/Delete'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'

import auth from '../auth/auth-helper'
import { remove } from '../user/api-user'

const DeleteUser = ({ userId }: { userId: string }) => {
  const [open, setOpen] = useState(false)
  const [redirect, setRedirect] = useState(false)
  const jwt = auth.isAuthenticated()

  const clickButton = () => {
    setOpen(true)
  }
  const handleRequestClose = () => {
    setOpen(false)
  }
  const deleteAccount = () => {
    remove(
      {
        userId: userId ?? '',
      },
      { t: jwt.token }
    ).then((data: any) => {
      if (data && data?.error) {
        console.log(data.error)
      } else {
        auth.clearJWT(() => console.log('deleted'))
        setRedirect(true)
      }
    })
  }
  if (redirect) {
    return <Navigate to="/" />
  }

  return (
    <span>
      <IconButton aria-label="Delete" onClick={clickButton} color="secondary">
        <DeleteIcon />
      </IconButton>

      <Dialog open={open} onClose={handleRequestClose}>
        <DialogTitle>{'Delete Account'}</DialogTitle>
        <DialogContent>
          <DialogContentText>Confirm to delete your account.</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleRequestClose} color="primary">
            Cancel
          </Button>
          <Button onClick={deleteAccount} color="secondary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </span>
  )
}

// To verify the userId prop
DeleteUser.propTypes = {
  userId: PropTypes.string.isRequired,
}

export default DeleteUser
