import React from 'react';
import {Card, CardHeader, Grid} from "@mui/material";
import {useRouter} from "next/router";
import {disasters} from "../../../../mock/disasters";

const DisasterDetailPage = () => {
  const router = useRouter();
  const {id} = router.query;
  const disaster = disasters.find((disaster) => disaster.id === Number(id));

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <CardHeader title={disaster.name} />
        </Card>
      </Grid>
    </Grid>
  );
};

export default DisasterDetailPage;
