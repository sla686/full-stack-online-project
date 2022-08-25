import React from 'react'
import { Navigate } from 'react-router-dom'

import auth from './auth-helper'

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  return auth.isAuthenticated() ? children : <Navigate to="/signin" replace />
}

export default PrivateRoute
