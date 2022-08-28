import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import Grid from '@mui/material/Grid'
import ImageList from '@mui/material/ImageList'
import ImageListItem from '@mui/material/ImageListItem'
import Icon from '@mui/material/Icon'
import { styled } from '@mui/system'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'

import { listSearch } from './api-product'
import Products from './Products'
import theme from '../../styles/theme'

const styles = {
  itemTitle: {
    verticalAlign: 'middle',
    lineHeight: 2.5,
    textAlign: 'center',
    fontSize: '1.35em',
    margin: '0 4px 0 0',
  },
  card: {
    margin: 'auto',
    marginTop: 20,
  },
  title: {
    padding: `${theme.spacing(3)} ${theme.spacing(2.5)} ${theme.spacing(2)}`,
    backgroundColor: '#80808024',
    fontSize: '1.1em',
  },
  icon: {
    verticalAlign: 'sub',
    color: '#738272',
    fontSize: '0.9em',
  },
  link: {
    color: '#4d6538',
    textShadow: '0px 2px 12px #ffffff',
    cursor: 'pointer',
  },
}

const Categories = ({ categories }: { categories: string[] }) => {
  const [products, setProducts] = useState([])
  const [selected, setSelected] = useState(categories[0])

  useEffect(() => {
    const abortController = new AbortController()
    listSearch({
      category: categories[0],
    }).then((data) => {
      if (data.error) {
        console.log(data.error)
      } else {
        setProducts(data)
      }
    })
    return function cleanup() {
      abortController.abort()
    }
  }, [categories])

  const listbyCategory = (category: string) => () => {
    setSelected(category)
    listSearch({
      category: category,
    }).then((data) => {
      if (data.error) {
        console.log(data.error)
      } else {
        setProducts(data)
      }
    })
  }

  return (
    <>
      <Card sx={styles.card}>
        <Typography variant="subtitle1" sx={styles.title}>
          Explore by category
        </Typography>
        <div>
          <div className="categories">
            <ul className="categories--items">
              {categories.map((item, i) => (
                <li className="categories--list" key={i}>
                  <span
                    className="categories--list--item"
                    onClick={listbyCategory(item)}
                    style={{
                      backgroundColor:
                        selected == item
                          ? 'rgba(95, 139, 137, 0.56)'
                          : 'rgba(95, 124, 139, 0.32)',
                    }}
                  >
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <Divider />
        <Products products={products} searched={false} />
      </Card>
    </>
  )
}
Categories.propTypes = {
  categories: PropTypes.array.isRequired,
}

export default Categories
