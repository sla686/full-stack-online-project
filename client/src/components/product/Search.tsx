import React, { useState, ChangeEvent, KeyboardEvent } from 'react'
import PropTypes from 'prop-types'
import Card from '@mui/material/Card'
import Divider from '@mui/material/Divider'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import SearchIcon from '@mui/icons-material/Search'
import { styled } from '@mui/system'

import { listSearch } from './api-product'
import Products from './Products'
import theme from '../../styles/theme'

const styles = {
  menu: {
    width: 600,
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 160,
    verticalAlign: 'bottom',
    marginBottom: '20px',
  },
  searchField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 300,
    marginBottom: '20px',
  },
  searchButton: {
    minWidth: '20px',
    height: '30px',
    padding: '0 8px',
    marginBottom: '20px',
  },
}

const StyledCard = styled(Card)(() => ({
  margin: 'auto',
  textAlign: 'center',
  paddingTop: 10,
  backgroundColor: '#80808024',
}))

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
      <StyledCard>
        <TextField
          variant="standard"
          id="select-category"
          select
          label="Select category"
          value={values.category}
          onChange={handleChange('category')}
          margin="normal"
          style={styles.textField}
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
          variant="standard"
          type="search"
          onKeyDown={enterKey}
          onChange={handleChange('search')}
          margin="normal"
          style={styles.searchField}
        />
        <Button
          variant="contained"
          color={'primary'}
          onClick={search}
          style={styles.searchButton}
        >
          <SearchIcon />
        </Button>
        <Divider />
        <Products products={values.results} searched={values.searched} />
      </StyledCard>
    </div>
  )
}
Search.propTypes = {
  categories: PropTypes.array.isRequired,
}

export default Search
