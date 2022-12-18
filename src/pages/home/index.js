// ** MUI Imports
import { useState } from 'react'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import generateClient from 'src/utils/axiosClient'
import { useEffect } from 'react'

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
      {
        items.map((item) => (
          <Grid item xs={12}>
            <Card>
              <CardHeader title={item.attributes.name} />
              </Card>
          </Grid>
        ))
      }
    </Grid>
  )
}

Home.guestGuard = false
Home.authGuard = false
export default Home
