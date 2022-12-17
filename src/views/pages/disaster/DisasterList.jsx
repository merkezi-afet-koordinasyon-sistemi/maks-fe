import React from 'react';
import {Button, Card, CardHeader, Grid} from "@mui/material";
import {DataGrid} from "@mui/x-data-grid";
import {Plus} from "mdi-material-ui";
import Link from "next/link";

const DisasterList = (props) => {
  const {disasters} = props;

  const columns = [
    {
      field: 'id',
      headerName: 'ID',
      width: 100,
      align: 'center',
      headerAlign: 'center',
    },
    {
      field: 'attributes.name',
      headerName: 'Name',
      flex: 1,
      valueGetter: (params) => params.row.attributes.name,
    }
  ]

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <CardHeader
            title="Disasters"
            action={
              <Link href="/">
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<Plus/>}
                  size="small"
                >
                  Create Disaster
                </Button>
              </Link>
            }
          />
          <DataGrid
            autoHeight
            sx={{'& .MuiDataGrid-columnHeaders': {borderRadius: 0}}}
            columns={columns}
            rows={disasters}
          />
        </Card>
      </Grid>
    </Grid>
  );
};

export default DisasterList;
