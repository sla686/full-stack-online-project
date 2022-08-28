import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import ImageList from '@mui/material/ImageList'
import ImageListItem from '@mui/material/ImageListItem'
import Icon from '@mui/material/Icon'

import { listSearch } from './api-product'
import Products from './Products'

const Categories = ({ categories }: { categories: string[] }) => {
  const [products, setProducts] = useState([])
  const [selected, setSelected] = useState(categories[0])

  useEffect(() => {
    const abortController = new AbortController()
    const signal = abortController.signal

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
  }, [])

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
    <div>
      <Card>
        <Typography variant="subtitle1">Explore by category</Typography>
        <div>
          <ImageList cols={4}>
            {categories.map((item, i) => (
              <ImageListItem
                key={i}
                style={{
                  height: '64px',
                  backgroundColor:
                    selected == item
                      ? 'rgba(95, 139, 137, 0.56)'
                      : 'rgba(95, 124, 139, 0.32)',
                }}
              >
                <span onClick={listbyCategory(item)}>
                  {item} <Icon>{selected == item && 'arrow_drop_down'}</Icon>
                </span>
              </ImageListItem>
            ))}
          </ImageList>
        </div>
        <Divider />
        <Products products={products} searched={false} />
      </Card>
    </div>
  )
}
Categories.propTypes = {
  categories: PropTypes.array.isRequired,
}

export default Categories
