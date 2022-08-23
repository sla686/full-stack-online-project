import React from 'react'
import { Navigate } from 'react-router-dom'

import auth from './auth-helper'

const PrivateRoute = ({ children }: { children: React.Component }) => {
  auth.isAuthenticated() ? children : <Navigate to="/signin" />
}

export default PrivateRoute
