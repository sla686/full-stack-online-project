import Card from '@mui/material/Card'
import CardMedia from '@mui/material/CardMedia'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
// import { useTheme } from '@mui/material/styles'
import { styled } from '@mui/system'

import unicornbikeImg from '../../images/unicornbike.jpeg'

const CardStyle = styled(Card)(({ theme }) => ({
  maxWidth: 600,
  margin: 'auto',
  marginTop: theme.spacing(5),
  marginBottom: theme.spacing(5),
}))

const TypographyHome = styled(Typography)(({ theme }) => ({
  padding: `${theme.spacing(3)} ${theme.spacing(2.5)} ${theme.spacing(2)}`,
}))

const TypographyPhoto = styled(Typography)(() => ({
  padding: '10px',
  textAlign: 'right',
  backgroundColor: '#ededed',
  borderBottom: '1px solid #d0d0d0',
  '& a': {
    color: '#3f4771',
  },
}))

const CardMediaStyle = styled(CardMedia)(() => ({
  minHeight: 400,
}))
const HomePage = () => {
  return (
    <CardStyle>
      <TypographyHome variant="h6">Home Page</TypographyHome>
      <CardMediaStyle image={unicornbikeImg} title="Unicorn Bicycle" />
      <TypographyPhoto>
        <Typography variant="body2" component="p" color="textSecondary">
          Photo by{' '}
          <a
            href="https://unsplash.com/@boudewijn_huysmans"
            target="_blank"
            rel="noopener noreferrer"
          >
            Boudewijn Huysmans
          </a>{' '}
          on Unsplash
        </Typography>
      </TypographyPhoto>
      <CardContent>
        <Typography variant="body1" component="p">
          Welcome to the MERN Skeleton home page.
        </Typography>
      </CardContent>
    </CardStyle>
  )
}

export default HomePage
