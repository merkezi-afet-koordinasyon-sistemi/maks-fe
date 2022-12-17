import React from 'react';
import {Card, CardHeader, Grid, IconButton, Stack} from '@mui/material';
import {DataGrid} from '@mui/x-data-grid'
import {Eye} from 'mdi-material-ui';
import Link from 'next/link';
import {disasters} from "../../../mock/disasters";

const DisasterListPage = () => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <CardHeader title="Afet Listesi"></CardHeader>
          <DataGrid
            rows={disasters}
            columns={[
              {field: 'name', headerName: 'Afet Adi', flex: 1},
              {
                field: 'actions',
                headerName: 'Actions',
                width: 100,
                renderCell: (params) => {
                  return (
                    <Stack>
                      <Link href={`/disaster/detail/${params.id}`}>
                        <IconButton><Eye/></IconButton>
                      </Link>
                    </Stack>
                  )
                },
              }
            ]}
            autoHeight
          />
        </Card>
      </Grid>
    </Grid>
  );
};

export default DisasterListPage;
