import Card from '@mui/material/Card'
import CardMedia from '@mui/material/CardMedia'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import { useTheme } from '@mui/material/styles'

import unicornbikeImg from '../../images/unicornbike.jpeg'

const HomePage = () => {
  const theme = useTheme()
  return (
    <Card
      sx={{
        maxWidth: 600,
        margin: 'auto',
        marginTop: theme.spacing(5),
        marginBottom: theme.spacing(5),
      }}
    >
      <Typography
        variant="h6"
        sx={{
          padding: `${theme.spacing(3)} ${theme.spacing(2.5)} ${theme.spacing(
            2
          )}`,
        }}
      >
        Home Page
      </Typography>
      <CardMedia
        sx={{ minHeight: 400 }}
        image={unicornbikeImg}
        title="Unicorn Bicycle"
      />
      <Typography
        variant="body2"
        component="p"
        sx={{
          padding: '10px',
          textAlign: 'right',
          backgroundColor: '#ededed',
          borderBottom: '1px solid #d0d0d0',
          '& a': {
            color: '#3f4771',
          },
        }}
        color="textSecondary"
      >
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
      <CardContent>
        <Typography variant="body1" component="p">
          Welcome to the MERN Skeleton home page.
        </Typography>
      </CardContent>
    </Card>
  )
}

export default HomePage
