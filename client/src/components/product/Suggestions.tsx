import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import Icon from '@mui/material/Icon'
import Divider from '@mui/material/Divider'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import ViewIcon from '@mui/icons-material/Visibility'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import { styled } from '@mui/system'

import { Product } from '../../types/product'

const URL = 'https://backend-online-shop-sla686.herokuapp.com/api/v1'

const styles = {
  cardMedia: {
    width: '65%',
    height: 130,
    margin: '8px',
  },
  cardContent: {
    flex: '1 0 auto',
    padding: '16px 8px 0px',
  },
  productTitle: {
    fontSize: '1.15em',
    marginBottom: '5px',
  },
  subtitle: {
    color: 'rgba(88, 114, 128, 0.67)',
  },
  icon: { verticalAlign: 'sub' },
  date: { color: 'rgba(0, 0, 0, 0.4)' },
  controls: { marginTop: '8px' },
  actions: { float: 'right', marginRight: '6px' },
  iconButton: { width: '28px', height: '28px' },
}

const Price = styled(Typography)(({ theme }) => ({
  display: 'inline',
  lineHeight: '3',
  paddingLeft: '8px',
  color: theme.palette.text.secondary,
}))
const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(1),
  paddingBottom: 24,
  backgroundColor: '#80808024',
}))
const Title = styled(Typography)(({ theme }) => ({
  margin: `${theme.spacing(3)} 0 ${theme.spacing(2)}`,
  fontSize: '1.75em',
  // textAlign: 'center',
}))
const StyledCard = styled(Card)(() => ({
  width: '100%',
  display: 'inline-flex',
}))
const Details = styled('div')(() => ({
  display: 'inline-block',
  width: '100%',
}))

const Suggestions = ({
  products,
  title,
}: {
  products: Product[]
  title: string
}) => {
  return (
    <div>
      <StyledPaper elevation={4}>
        <Title variant="h2">{title}</Title>
        {products.map((item, i) => {
          return (
            <span key={i}>
              <StyledCard>
                <CardMedia
                  component="img"
                  src={`${URL}/products/image/` + item._id}
                  title={item.name}
                  style={styles.cardMedia}
                />
                <Details>
                  <CardContent style={styles.cardContent}>
                    <Link to={'/products/' + item._id}>
                      <Typography
                        variant="h3"
                        component="h3"
                        color="primary"
                        style={styles.productTitle}
                      >
                        {item.name}
                      </Typography>
                    </Link>
                    <Link to={'/shops/' + item.shop._id}>
                      <Typography variant="subtitle2" style={styles.subtitle}>
                        <Icon style={styles.icon}>
                          <ShoppingCartIcon />
                        </Icon>{' '}
                        {item.shop.name}
                      </Typography>
                    </Link>
                    <Typography component="p" style={styles.date}>
                      Added on {new Date(item.created).toDateString()}
                    </Typography>
                  </CardContent>
                  <div style={styles.controls}>
                    <Price variant="subtitle2" color="primary">
                      $ {item.price}
                    </Price>
                    <span style={{ float: 'right', marginRight: '6px' }}>
                      <Link to={'/products/' + item._id}>
                        <IconButton color="secondary" size="small">
                          <ViewIcon style={styles.iconButton} />
                        </IconButton>
                      </Link>
                      {/* <AddToCart item={item} /> */}
                    </span>
                  </div>
                </Details>
              </StyledCard>
              <Divider />
            </span>
          )
        })}
      </StyledPaper>
    </div>
  )
}

Suggestions.propTypes = {
  products: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired,
}

export default Suggestions
