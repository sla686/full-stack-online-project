import React, { useState, ChangeEvent, KeyboardEvent } from 'react'
import PropTypes from 'prop-types'
import Card from '@mui/material/Card'
import Divider from '@mui/material/Divider'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import SearchIcon from '@mui/icons-material/Search'

import { listSearch } from './api-product'
import Products from './Products'

const Search = ({ categories }: { categories: string[] }) => {
  const [values, setValues] = useState({
    category: '',
    search: '',
    results: [],
    searched: false,
  })
  const handleChange =
    (name: string) => (event: ChangeEvent<HTMLInputElement>) => {
      setValues({
        ...values,
        [name]: event.target.value,
      })
    }
  const search = () => {
    if (values.search) {
      listSearch({
        search: values.search || undefined,
        category: values.category,
      }).then((data) => {
        if (data.error) {
          console.log(data.error)
        } else {
          setValues({ ...values, results: data, searched: true })
        }
      })
    }
  }
  const enterKey = (event: KeyboardEvent) => {
    if (event.key === 'Enter') {
      event.preventDefault()
      search()
    }
  }
  return (
    <div>
      <Card>
        <TextField
          id="select-category"
          select
          label="Select category"
          value={values.category}
          onChange={handleChange('category')}
          margin="normal"
        >
          <MenuItem value="All">All</MenuItem>
          {categories.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          id="search"
          label="Search products"
          type="search"
          onKeyDown={enterKey}
          onChange={handleChange('search')}
          margin="normal"
        />
        <Button variant="contained" color={'primary'} onClick={search}>
          <SearchIcon />
        </Button>
        <Divider />
        <Products products={values.results} searched={values.searched} />
      </Card>
    </div>
  )
}
Search.propTypes = {
  categories: PropTypes.array.isRequired,
}

export default Search
