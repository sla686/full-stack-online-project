import { useState, useEffect } from 'react'
import Grid from '@mui/material/Grid'
// import { useTheme } from '@mui/material/styles'
import { styled } from '@mui/system'

import Suggestions from '../product/Suggestions'
import Categories from '../product/Categories'
import Search from '../product/Search'
import { listLatest, listCategories } from '../product/api-product'
import { Product } from '../../types/product'

const DivOuter = styled('div')(({ theme }) => ({
  flexGrow: 1,
  margin: 30,
}))

const HomePage = () => {
  const [suggestionTitle, setSuggestionTitle] = useState('Latest Products')
  const [categories, setCategories] = useState<string[]>([])
  const [suggestions, setSuggestions] = useState<Product[]>([])

  useEffect(() => {
    const abortController = new AbortController()
    const signal = abortController.signal

    listLatest(signal).then((data) => {
      if (data.error) {
        console.log(data.error)
      } else {
        setSuggestions(data)
      }
    })
    return function cleanup() {
      abortController.abort()
    }
  }, [])

  useEffect(() => {
    const abortController = new AbortController()
    const signal = abortController.signal
    listCategories(signal).then((data) => {
      if (data.error) {
        console.log(data.error)
      } else {
        setCategories(data)
      }
    })
    return function cleanup() {
      abortController.abort()
    }
  }, [])

  return (
    <DivOuter>
      <Grid container spacing={2}>
        <Grid item xs={8} sm={8}>
          <Search categories={categories} />
          <Categories categories={categories} />
        </Grid>
        <Grid item xs={4} sm={4}>
          <Suggestions products={suggestions} title={suggestionTitle} />
        </Grid>
      </Grid>
    </DivOuter>
  )
}

export default HomePage
