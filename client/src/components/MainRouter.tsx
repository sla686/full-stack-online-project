import React from 'react'
import { Route, Routes } from 'react-router-dom'

import HomePage from './core/HomePage'
import Menu from './core/Menu'
import Users from './user/Users'
import Profile from './user/Profile'
import EditProfile from './user/EditProfile'
import SignUp from './user/SignUp'
import SignIn from './auth/SignIn'
import PrivateRoute from './auth/PrivateRoute'

const MainRouter = () => {
  return (
    <div>
      <Menu />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/users" element={<Users />} />
        <Route path="/users/:userId" element={<Profile />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route
          path="/users/edit/:userId"
          element={
            <PrivateRoute>
              <EditProfile />
            </PrivateRoute>
          }
        />
        <Route
          path="*"
          element={
            <div>
              <h2>404 Page not found</h2>
            </div>
          }
        />
      </Routes>
    </div>
  )
}

export default MainRouter
