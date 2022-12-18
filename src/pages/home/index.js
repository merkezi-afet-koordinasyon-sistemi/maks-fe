/* eslint-disable */
// ** MUI Imports
import {useEffect, useState} from 'react'
import Grid from '@mui/material/Grid'
import generateClient from 'src/utils/axiosClient'
import {Button, Card, CardContent, CardMedia, Typography} from "@mui/material";
import {ArrowRight} from "mdi-material-ui";
import Link from "next/link";

const client = generateClient()

const Home = () => {
  const [items, setItems] = useState([])

  const fetchItems = async () => {
    const response = await client.get('/disasters', {
      params: {
        populate: '*'
      }
    })

    setItems(response.data.data)
  }

  useEffect(() => {
    fetchItems()
  }, [])

  return (
    <Grid container spacing={6}>
      {items.map((item) => (
        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardContent sx={{ p: theme => `${theme.spacing(4, 5)} !important` }}>
              <Typography variant='h6' sx={{ mb: 2 }}>{item.attributes.name}</Typography>
            </CardContent>
            <Link href={`/disaster/${item.id}`}>
              <Button size='large' variant='contained' sx={{ width: '100%', borderTopLeftRadius: 0, borderTopRightRadius: 0 }}>
                Detaylara Git <ArrowRight />
              </Button>
            </Link>
          </Card>
        </Grid>
      ))}
    </Grid>
  )
}

Home.guestGuard = false
Home.authGuard = false

export default Home
