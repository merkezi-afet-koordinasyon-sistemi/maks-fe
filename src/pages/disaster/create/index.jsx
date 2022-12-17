import React from 'react';
import {Card, Grid, CardHeader, TextField, CardContent, IconButton} from '@mui/material';
import {Plus} from 'mdi-material-ui';

const DisasterCreatePage = () => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <CardHeader title="Afet Olustur" action={<IconButton color="primary"><Plus/></IconButton>} />
          <CardContent>
            <Grid container spacing={6}>
              <Grid item xs={6}>
                <TextField id="outlined-basic" fullWidth label="Name" variant="outlined" />
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default DisasterCreatePage;
