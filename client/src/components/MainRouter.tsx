import React from 'react'
import { Route, Routes } from 'react-router-dom'

import PrivateRoute from './auth/PrivateRoute'
import HomePage from './core/HomePage'
import Menu from './core/Menu'
import Users from './user/Users'
import Profile from './user/Profile'
import EditProfile from './user/EditProfile'
import SignUp from './user/SignUp'
import SignIn from './auth/SignIn'
import NewShop from './shop/NewShop'
import Shops from './shop/Shops'
import MyShops from './shop/MyShops'
import SingleShop from './shop/SingleShop'
import EditShop from './shop/EditShop'
import NewProduct from './product/NewProduct'

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

        <Route path="/shops" element={<Shops />} />
        <Route path="/shops/:shopId" element={<SingleShop />} />
        <Route
          path="/seller/shops/new"
          element={
            <PrivateRoute>
              <NewShop />
            </PrivateRoute>
          }
        />
        <Route
          path="/users/edit/:userId"
          element={
            <PrivateRoute>
              <EditProfile />
            </PrivateRoute>
          }
        />
        <Route
          path="/seller/shops"
          element={
            <PrivateRoute>
              <MyShops />
            </PrivateRoute>
          }
        />
        <Route
          path="/seller/shops/edit/:shopId"
          element={
            <PrivateRoute>
              <EditShop />
            </PrivateRoute>
          }
        />
        <Route
          path="/seller/:shopId/products/new"
          element={
            <PrivateRoute>
              <NewProduct />
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
