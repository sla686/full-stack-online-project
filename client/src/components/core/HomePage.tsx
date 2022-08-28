import { useState, useEffect } from 'react'
import Grid from '@mui/material/Grid'
// import { useTheme } from '@mui/material/styles'
import { styled } from '@mui/system'

import Suggestions from '../product/Suggestions'
import { listLatest } from '../product/api-product'

const DivOuter = styled('div')(({ theme }) => ({
  flexGrow: 1,
  margin: 30,
}))

const HomePage = () => {
  const [suggestionTitle, setSuggestionTitle] = useState('Latest Products')
  const [suggestions, setSuggestions] = useState([])

  useEffect(() => {
    const abortController = new AbortController()
    const signal = abortController.signal

    listLatest(signal).then((data) => {
      console.log('something!')
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

  return (
    <DivOuter>
      <Grid container spacing={2}>
        <Grid item xs={4} sm={4}>
          <Suggestions products={suggestions} title={suggestionTitle} />
        </Grid>
      </Grid>
    </DivOuter>
  )
}

export default HomePage
